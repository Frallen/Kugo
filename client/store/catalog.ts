import {useMain} from "~/store/main";
import qs from "qs";
import {
    CatalogItemType,
    categoryType,
    commonFilterType,
    Settings, DetailItemType, responseFilterType, SelectFilterType
} from "~/types/catalog.types";
import {errorMessage} from "~/composables/useAlert";
import {overFlow, scrollTop} from "~/composables/mixins";

const populate = (): string => {
    return qs.stringify(
        {
            populate: "*",
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
};

const filterDeal = (value: string): string => {
    return qs.stringify({
        populate: "*",
        filters: {
            id: {
                $eq: value,
            },
        },
    }, {
        encodeValuesOnly: true, // prettify URL
    });
}
const filterCatalog = (value: responseFilterType): string => {
    return qs.stringify({
        filters: {
            $and: [
                {
                    weight: {
                        ...(value.weight && typeof value.weight === "string" && {
                            $between: [15, 30],
                        }),
                        ...(value.weight && typeof value.weight === "number" && value.weight <= 15 && {

                            $lt: value.weight,

                        }),
                        ...(value.weight && typeof value.weight === "number" && value.weight >= 30 && {
                            $gt: value.weight,
                        }),
                    }
                },
                {
                    type_product: {
                        Title: {$in: value.type_product}

                    }

                },
                {
                    user_type: {
                        Title: {$in: value.user_type}
                    }

                }
            ],

        },
    }, {
    });
}
const sortCatalog = (value: SelectFilterType): string => {

    return qs.stringify({
        sort: [value.sort],
    }, {
    });
}
const pagination = (page: string): string => {
    return qs.stringify({
        populate: "*",
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
    Detail: DetailItemType | {},
    Deals: CatalogItemType | {};
    categories: categoryType,
    type_product: commonFilterType | {},
    user_types: commonFilterType | {},
    Warranties: Settings | {},
    AdditionalServices: Settings | {},
    Packages: Settings | {}
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
            {label: 'По сумме скидки', sort: 'discount_percent:desc'}
        ],
        Detail: {},
        Deals: {},
        categories: {
            data: [],
            meta: {},
        },
        type_product: {},
        user_types: {},
        Warranties: {},
        AdditionalServices: {},
        Packages: {},
    }),
    getters: {
        // middleware существует ли slug путь
        routeExist: (state) => {
            return (query: string) =>
                state.categories.data.some(p => p.attributes.Slug === query)
        },
    },
    actions: {
        async clearDeals() {
            this.Detail = {}

            this.Deals = {}


        },
        async getFilters() {
            setLoading(true)


            const [{data: categories, error},
                {data: typeProduct},
                {data: user},
                {data: warranty},
                {data: AdditionalServices},
                {data: Packages}
            ] = await Promise.all([
                useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/categories?${populate()}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ), useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/type-products?${populate()}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ),
                useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/user-types?${populate()}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ),
                useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/warranties`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ),
                useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/additional-services`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ),
                useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/packages`,
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
                this.Packages = Packages.value as Settings
                this.AdditionalServices = AdditionalServices.value as Settings
                this.Warranties = warranty.value as Settings
                this.categories = categories.value as categoryType
                this.type_product = typeProduct.value as commonFilterType
                this.user_types = user.value as commonFilterType
            }
            setLoading(false)
        },
        async filteredDeal(type: string, id: string) {
            setLoading(true)
            let {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/${type}?${filterDeal(id)}`,
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
        async getDeals(type: string, filters?: responseFilterType, sort?: SelectFilterType) {
            setLoading(true)
            const sorting=sort?sortCatalog(sort):false
            const {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/${type}?${pagination('1')}&${filters && filterCatalog(filters)}&${sorting && sorting}`,
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
        async addFilters(type: string, page: string, filters?: responseFilterType, sort?: SelectFilterType) {
            setLoading(true)
            const {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/${type}?${pagination(page ? page : "1")}&${filters && filterCatalog(filters)}&${sort && sortCatalog(sort)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (error.value) {

            } else {
                this.Deals = data.value as CatalogItemType;
            }


            setLoading(false)
        },
        async loadMore(type: string, page: string, filters?: responseFilterType, sort?: SelectFilterType) {
            setLoading(true)

            const {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/${type}?${pagination(page)}&${filters && filterCatalog(filters)}&${sort && sortCatalog(sort)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            this.Deals = data.value as CatalogItemType
            scrollTop()


            setLoading(false)
        }
    },
});
