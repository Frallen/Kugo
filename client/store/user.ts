import {isProduction, setLoading} from "~/composables/mixins";
import {successUserType, userResponseType, userType} from "~/types/user.types";
import {errorMessage} from "~/composables/useAlert";
import {useMain} from "~/store/main";


interface stateType {
    isAuth: boolean
    user: userType
}

export const useUser = defineStore("user", {
    state: (): stateType => ({
        isAuth: false,
        user: {}
    }),
    getters: {},
    actions: {
        async createUser(email: string, password: string) {
            setLoading(true)
            let cookie = useCookie<string>("user", {
                //Secure:true,
                ...(isProduction() && {
                    sameSite: "strict"
                }),
                maxAge: 3600,
            });
            const {data, error} = await useFetch<userResponseType>(
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
                this.user = data.value as successUserType
                cookie.value = (data.value as successUserType).jwt;
                this.isAuth = true
                await useMain().hideAllModals()
            }
            setLoading(false)
        },
        async authUser(email: string, password: string) {
            setLoading(true)
            let cookie = useCookie<string>("user", {
                //Secure:true,
                ...(isProduction() && {
                    sameSite: "strict"
                }),
                maxAge: 3600,
            });

            const {data, error} = await useFetch<userResponseType>(
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
                this.isAuth = true
                this.user = data.value as successUserType
                cookie.value = (data.value as successUserType).jwt;
                await useMain().hideAllModals()
            }
            setLoading(false)
        },
        async userFavorites(id: number, status: boolean) {
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
                if (this.user.Favorites) {
                    this.user.Favorites.map((p) => items.push(p.id))
                }
                items.push(id)

                let {data, error} = await useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/users/${this.user.id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${cookie.value}`,
                            "Content-Type": "application/json",
                        },
                        body: {
                            Favorites: items,
                        },
                    }
                );
                if (error.value) {
                    // console.log(error.value.data.error.message);
                    switch (error.value.data.error.message) {
                        default:
                            Error("Повторите попытку позже");
                    }
                }
            } else {
                let {data, error} = await useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/users/${this.user.id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${cookie.value}`,
                            "Content-Type": "application/json",
                        },
                        body: {
                            Favorites: this.user.Favorites.filter(p => p.id !== id),
                        },
                    }
                );
                if (error.value) {
                    // console.log(error.value.data.error.message);
                    switch (error.value.data.error.message) {
                        default:
                            Error("Повторите попытку позже");
                    }
                }
            }
            await this.userStatus()

            setLoading(false)
        },
        async userStatus() {
            setLoading(true)

            let cookie = useCookie<string>("user", {
                //secure:true,

                ...(isProduction() && {
                    sameSite: "strict"
                }),
                maxAge: 3600,
            });

            if (cookie.value) {


                const {data, error} = await useFetch<userResponseType>(
                    `${useRuntimeConfig().public.strapi.url}/api/users/me/?${populate()}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${cookie.value}`,
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
                    // cookie.value = (data.value as successUserType).jwt;
                }
            } else {
                this.isAuth = false
                this.user = {}
            }
            setLoading(false)
        },
        async logOut() {
            setLoading(true)
            this.isAuth = false
            this.user = {}
            await useRouter().push("/")
            setLoading(false)
        }
    }
})