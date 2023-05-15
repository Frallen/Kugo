import {useMain} from "~/store/main";
import qs from "qs";
import {
    CatalogItemType,
    categoryType,
    DetailItemType,
    responseFilterType,
    SelectFilterType,
    filterType,
    AdditionalType,
    cookieOrderType,
} from "~/types/catalog.types";
import {AddedToBasket, errorMessage} from "~/composables/useAlert";
import {checkQueryPrice} from "~/composables/mixins";

const populate = (): string => {
    return qs.stringify(
        {
            populate: "deep",
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
};

const filterDeal = (value: string | [number]): string => {
    return qs.stringify({
        populate: "deep",
        filters: {
            id: {
                $eq: value,
            },
        },
    }, {
        encodeValuesOnly: true, // prettify URL
    });
}
const chooseFilter = (value: string): string => {
    return qs.stringify({
        populate: "deep",
        filters: {
            category: {
                Slug: {
                    $eq: value,
                }

            },
        },
    }, {
        encodeValuesOnly: true, // prettify URL
    });
}
const filterCatalog = (type: string, value?: responseFilterType, sort?: string): string => {

    return qs.stringify({
        sort: [sort],

        filters: {
            $and: [
                {
                    category: {
                        Title: {$eq: type}
                    }
                },

                {
                    ...(value && value.price && {
                        Price: {

                            $between: checkQueryPrice(value.price as string),

                        }
                    }),
                }, {
                    Weight: {

                        ...(value && value.weight?.includes("-") && {
                            $between: checkQueryPrice(value.weight as string),
                        }),
                        ...(value && !value.weight?.includes("-") && value.weight && parseInt(value.weight as string) <= 15 && {

                            $lt: value.weight,

                        }),
                        ...(value && !value.weight?.includes("-") && value.weight && parseInt(value.weight as string) >= 30 && {
                            $gt: value.weight,
                        }),
                    }
                },
                {
                    Scooter: {
                        $and: [
                            {
                                type_product: {
                                    Title: {$in: value && value.type_product}

                                }
                            },
                            {
                                user_type: {
                                    Title: {$in: value && value.user_type}
                                }

                            }
                        ]
                    }
                },

            ],

        },
    },);
}

const pagination = (page: string): string => {
    return qs.stringify({
        populate: "deep",
        pagination: {
            page: page,
            pageSize: 10,
        },
    }, {
        encodeValuesOnly: true, // prettify URL
    });
}

// интерфейс для катлога pinia
interface stateType {
    SortOptions: SelectFilterType[],
    Detail: DetailItemType,
    Deals: CatalogItemType,
    Cart: CatalogItemType,
    categories: categoryType,
    Filter: filterType,
    ServiceToOrder: AdditionalType[]
}


const setLoading = (loading: boolean): void => {
    useMain().isLoading = loading;
    overFlow(loading)
}

export const useCatalog = defineStore("catalog", {
    state: (): stateType => ({
        // объект для сортировки
        SortOptions: [
            {label: 'Сначала дешевле', sort: 'Price:asc'},
            {label: 'Сначала дороже', sort: 'Price:desc'},
            {label: 'По сумме скидки', sort: 'oldPrice:desc'}
        ],
        Detail: {},
        Deals: {},
        Cart: {},
        Filter: {},
        categories: {},
        ServiceToOrder: []
    }),
    getters: {
        // middleware существует ли slug путь
        routeExist: (state) => {
            return (query: string) =>
                state.categories.data.some(p => p.attributes.Slug === query)
        },
    },
    actions: {
        // Дополнительные услуги для деталки товара
        async setServiceData(data: AdditionalType) {

            if (!this.ServiceToOrder.some(p => p.Uid === data.Uid)) {
                this.ServiceToOrder.push(data)
            } else {
                let detail = this.ServiceToOrder.filter(p => p.Uid !== data.Uid)
                detail.push(data)
                this.ServiceToOrder = detail
            }
        },

        //очистка делатки и каталога
        async clearDeals() {
            this.Detail = {}
            this.Deals = {}
        },
        //Добавление заказа в куки
        async orderToCookie(OrderPrice: number, id?: number) {

            const cookie = useCookie<cookieOrderType[]>("order");
            let order = [...(cookie.value ?? "")] as cookieOrderType[];
            if (order && order.some(p => p.id === this.Detail.id)) {
                order.map(p => {
                    if (p.id === this.Detail.id) {

                        p.OrderPrice = OrderPrice
                        p.OrderService = this.ServiceToOrder
                    }
                })

                cookie.value = order
            } else {

                order.push({
                        id: this.Detail.id ?? id,
                        ...(OrderPrice && {
                            OrderPrice: OrderPrice
                        }),
                        ...(this.ServiceToOrder.length > 0 && {
                            OrderService: this.ServiceToOrder
                        }),
                    }
                )
                cookie.value = order
            }
            AddedToBasket()
        },
        // Подготовка элементов корзины
        async cartOrders() {
            const cookie = useCookie<cookieOrderType[]>("order");
            let order = [...(cookie.value ?? "")] as cookieOrderType[];
            const searchedItems: [number] = []
            if (order) {
                order.map(p => searchedItems.push(p.id))
                if (searchedItems.length > 0) {
                    setLoading(true)
                    let {data, error} = await useFetch(
                        `${useRuntimeConfig().public.strapi.url}/api/catalog-items?${filterDeal(searchedItems)}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    if (error.value) {

                    } else {
                        (data.value as CatalogItemType).data.map(i => {
                            order.map(p => {
                                if (p.id === i.id) {
                                    i.attributes.OrderPrice = p.OrderPrice
                                    i.attributes.OrderService = p.OrderService
                                }
                            })
                        })
                        this.Cart = data.value as CatalogItemType;
                    }
                    setLoading(false)

                }

            }

        },
        async deleteFromCookie(id: number) {
            const cookie = useCookie<cookieOrderType[]>("order");
            let order = [...(cookie.value ?? "")] as cookieOrderType[];
            cookie.value = order.filter(p => p.id !== id)

        },
        async clearCart() {
            const cookie = useCookie<cookieOrderType[]>("order");
            cookie.value = []
            this.Cart = []
        },
        // Проверка на существование категории
        async getFilters() {
            setLoading(true)
            const [{data: categories, error},

            ] = await Promise.all([
                useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/categories?${populate()}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ),

            ]);

            if (error.value) {
                switch (error.value.data.error.message) {
                    default:
                        errorMessage("Повторите попытку позже");
                }
            } else {
                this.categories = categories.value as categoryType
            }
            setLoading(false)
        },
        // фильтр под текущую категорию
        async getFilter(type: string) {
            setLoading(true)
            let {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/filters?${chooseFilter(type)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (error.value) {

            } else {

                this.Filter = data.value.data[0] as filterType
            }
            setLoading(false)
        },
        // делальная страница товара
        async filteredDeal(id: string) {
            setLoading(true)
            let {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/catalog-items?${filterDeal(id)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (error.value) {

            } else {
                this.Detail = (data.value as CatalogItemType).data[0] as DetailItemType
            }

            setLoading(false)
        },
        // каталог с пагинацией
        async getDeals(type: string, page: string, filters?: responseFilterType, sort?: string) {
            setLoading(true)

            const {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/catalog-items?${pagination(page ?? "1")}&${filterCatalog(type, filters, sort)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            this.Deals = data.value as CatalogItemType;
            setLoading(false)
        },
    },
});
