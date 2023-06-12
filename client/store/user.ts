import {isProduction, setLoading, userCookieChecker} from "~/composables/mixins";
import {successUserType} from "~/types/user.types";
import {errorMessage} from "~/composables/useAlert";
import {useMain} from "~/store/main";
import {CatalogItemType, DetailItemType} from "~/types/catalog.types";
import {metaType} from "~/types/global.types";


interface stateType {
    isAuth: boolean
    user: successUserType | null
    Favorites: CatalogItemType | null
}

export const useUser = defineStore("user", {
    state: (): stateType => ({
        isAuth: false,
        user: null,
        Favorites: {} as CatalogItemType
    }),
    getters: {
        isFavorite: (state) => {
            return (id: number) => Object.keys(state.Favorites).length > 0 ? state.Favorites.data.some(p => p.id === id) : false;
        }
    },
    actions: {
        // Создаю пользователя
        async createUser(email: string, password: string) {
            setLoading(true)
            let cookie = useCookie<string>("user", {
                //Secure:true,
                ...(isProduction() && {
                    sameSite: "strict"
                }),
                maxAge: 3600,
            });
            const {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/auth/local/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        username: email,
                        email: email,
                        password: password,
                    },
                }
            );
            if (error.value) {
                // console.log(error.value.data.error.message);
                switch (error.value.data.error.message) {
                    case "Email or Username are already taken": {
                        errorMessage("Данный адрес почты уже существует");
                        break;
                    }
                    default:
                        errorMessage("Повторите попытку позже");
                }
            } else {
                //Данные юзера
                this.user = data.value as successUserType
                // jwt  в куки
                cookie.value = (data.value as successUserType).jwt;
                //создаю избранное для пользователя
                // избранное в отдельной талблице т.к ответ сервера другой для для компонента Offers
                await this.createFavorites((data.value as successUserType).user.id, cookie.value)
                //Ключ авторизации
                this.isAuth = true
                //Закрытваю все модалке
                await useMain().hideAllModals()

            }
            setLoading(false)
        },
        async createFavorites(id: number, jwt: string) {
            //Создаю избранное для пользователя
            const {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/favorites`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    body: {
                        data: {
                            User: id
                        }

                    },
                }
            )
            // для PUT запроса к избранному добавляю id
            // Далее этот id я буду использовать для поиска конретной записи в таблице
            // для PUT запроса небходим котретный id
            const user = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/users/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        "Content-Type": "application/json",
                    },
                    body: {
                        user_Favorites: data.value.data.id
                    },
                }
            );

        },

        //Авторизация пользователя
        async authUser(email: string, password: string) {
            setLoading(true)
            let cookie = useCookie<string>("user", {
                //Secure:true,
                ...(isProduction() && {
                    sameSite: "strict"
                }),
                maxAge: 3600,
            });

            const {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/auth/local`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        identifier: email,
                        password: password,
                    },
                }
            );
            if (error.value) {
                // console.log(error.value.data.error.message);
                switch (error.value.data.error.message) {
                    case "Invalid identifier or password": {
                        errorMessage("Не верная пароль или такой почты не существует ");
                        break;
                    }
                    default:
                        errorMessage("Повторите попытку позже");
                }
            } else {
                cookie.value = (data.value as successUserType).jwt;
                this.userStatus((data.value as successUserType).jwt)
            }
            setLoading(false)
        },
        // Получаю избранное для авторизованного пользователя
        async getFavorites() {

            interface responseType extends metaType {
                data: {
                    attributes: {
                        catalog_items: { data: DetailItemType[] }

                    }
                }
            }

            setLoading(true)
            let cookie = useCookie<string>("user", {
                //secure:true,

                ...(isProduction() && {
                    sameSite: "strict"
                }),
                maxAge: 3600,
            });
            // Беру конретный id избранного и ищу такую запись
            let {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/favorites/${this.user?.user_Favorites.id}?${populate()}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${cookie.value}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            if (error.value) {
                // console.log(error.value.data.error.message);
                switch (error.value.data.error.message) {
                    default:
                        errorMessage("Повторите попытку позже");
                }
            } else {
                //console.log((data.value as responseType).data.attributes.catalog_items)
                this.Favorites = (data.value as responseType).data.attributes.catalog_items
            }
            setLoading(false)
        },
        // Добавление/удаление из избранного
        async updateFavorites(id: number, status: boolean) {
            setLoading(true)
            let cookie = useCookie<string>("user", {
                //secure:true,

                ...(isProduction() && {
                    sameSite: "strict"
                }),
                maxAge: 3600,
            });
            if (status) {
                const items = []
                if (this.Favorites) {
                    this.Favorites.data.map((p) => items.push(p.id))
                }
                items.push(id)
                // Беру конретный id записи избранного и добавляю туда изменения
                let {data, error} = await useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/favorites/${this.user?.user_Favorites.id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${cookie.value}`,
                            "Content-Type": "application/json",
                        },
                        body: {
                            data: {
                                catalog_items: items,
                            }

                        },
                    }
                );
                if (error.value) {
                    // console.log(error.value.data.error.message);
                    switch (error.value.data.error.message) {
                        default:
                            errorMessage("Повторите попытку позже");
                    }
                }
            } else {
                // Беру конретный id записи избранного и добавляю туда изменения
                let {data, error} = await useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/favorites/${this.user?.user_Favorites.id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${cookie.value}`,
                            "Content-Type": "application/json",
                        },
                        body: {
                            data: {
                                catalog_items: this.Favorites?.data.filter(p => p.id !== id),
                            }

                        },
                    }
                );
                if (error.value) {
                    // console.log(error.value.data.error.message);
                    switch (error.value.data.error.message) {
                        default:
                            errorMessage("Повторите попытку позже");
                    }
                }
            }
            await this.userStatus()
            if (this.isAuth) {
                this.getFavorites()
            }
            setLoading(false)
        },

        //Подгружаю данные пользователя
        async userStatus(key?: string) {
            setLoading(true)


            if (userCookieChecker() || key) {
                const {data, error} = await useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/users/me/?${populate()}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${userCookieChecker() ? userCookieChecker() : key}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (error.value) {
                    // console.log(error.value.data.error.message);
                    switch (error.value.data.error.message) {
                        default:
                            errorMessage("Повторите попытку позже");
                    }
                } else {

                    this.isAuth = true
                    this.user = data.value as successUserType
                    await useMain().hideAllModals()
                    this.getFavorites()

                }
            } else {
                this.isAuth = false
                this.user = null
                this.Favorites = null
            }
            setLoading(false)
        },

        // Выход из аккаунта
        async logOut() {
            let cookie = useCookie<string>("user", {
                //secure:true,

                ...(isProduction() && {
                    sameSite: "strict"
                }),
                maxAge: 3600,
            });
            //очиска кук
            cookie.value = ""
            setLoading(true)
            // Зачистка данных и перенаправление пользователя
            this.isAuth = false
            this.user = null
            this.Favorites = null
            await useRouter().push("/")
            setLoading(false)
        }
    }
})