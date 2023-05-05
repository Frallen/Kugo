import {useMain} from "~/store/main";
import qs from "qs";
import {
    CatalogItemType,
    categoryType,
    Settings, DetailItemType, responseFilterType, SelectFilterType, weightType, filterType
} from "~/types/catalog.types";
import {errorMessage} from "~/composables/useAlert";
import {checkQueryPrice} from "~/composables/mixins";

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
const filterCatalog = (value?: responseFilterType, sort?: string): string => {

    return qs.stringify({
        sort:[sort],

        filters: {
            $and: [
                {
                    Basic: {


                        ...(value && value.price && {
                            Price: {

                                $between: checkQueryPrice(value.price as string),

                            }
                        }),
                        weight: {
                            ...(value && value.weight?.includes("-") && {
                                $between: checkQueryPrice(value.weight as string),
                            }),
                            ...(value && value.weight && parseInt(value.weight as string) <= 15 && {

                                $lt: value.weight,

                            }),
                            ...(value && value.weight && parseInt(value.weight as string) >= 30 && {
                                $gt: value.weight,
                            }),
                        }


                    }
                },

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
    Deals: CatalogItemType | {};
    categories: categoryType,
    Filter: filterType,
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
            {label: 'Сначала дешевле', sort: 'Basic:Price:asc'},
            {label: 'Сначала дороже', sort: 'Basic:Price:desc'},
            {label: 'По сумме скидки', sort: 'Basic:oldPrice:desc'}
        ],
        Detail: {},
        Deals: {},
        Filter: {},
        categories: {
            data: [],
            meta: {},
        },
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
            }
            setLoading(false)
        },
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
        async getDeals(type: string, page: string, filters?: responseFilterType, sort?: string) {
            setLoading(true)


            const {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/${type}?${pagination(page ?? "1")}&${filterCatalog(filters, sort)}`,
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
