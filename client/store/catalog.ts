import {useMain} from "~/store/main";
import qs from "qs";
import {
    CatalogItemType,
    categoryType,
    productType,
    userType,
    Settings, DetailItemType
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

const filterPopulate = (value: string): string => {
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
    Detail:DetailItemType,
    samokats: CatalogItemType;
    //scooters: [],
    bicycles: CatalogItemType,
    RobotVacuum: CatalogItemType,
    Scales: CatalogItemType,
    categories: categoryType[],
    type_product: productType[],
    user_types: userType[],
    Warranties: Settings[],
    AdditionalServices: Settings[],
    Packages: Settings[]
}

// пример ответа сервака
interface responseType {
    data: categoryType[] | productType[] | userType[] | Settings[]
    meta: []
}

const setLoading = (loading: boolean): void => {
    useMain().isLoading = loading;
    overFlow(loading)
}

export const useCatalog = defineStore("catalog", {
    state: (): stateType => ({
        Detail:[],
        samokats: {
            data: [],
        },
        //   scooters: [],
        bicycles: {
            data: [],
        },
        RobotVacuum: {
            data: [],
        },
        Scales: {
            data: [],
        },
        categories: [],
        type_product: [],
        user_types: [],
        Warranties: [],
        AdditionalServices: [],
        Packages: []
    }),
    getters: {
        // middleware существует ли slug путь
        routeExist: (state) => {
            return (query: string) =>
                state.categories.some(p => p.attributes.Slug === query)
        },
        filteredOffers: (state) => {
            return (query: string) => {
                switch (query) {
                    case "scooters":
                        return state.samokats
                    /*case "scooters":
                        return state.scooters*/
                    case "bicycles":
                        return state.bicycles
                    case "robots":
                        return state.RobotVacuum
                    case "scales":
                        return state.Scales
                    default:
                        return false
                }
            }
        },
    },
    actions: {
        async clearDeals() {
            this.samokats = {}
            //   scooters: [],
            this.bicycles = []
            this.RobotVacuum = []

            this.Scales = []

            this.categories = []

            this.type_product = []

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
                this.Packages = (Packages.value as responseType).data
                this.AdditionalServices = (AdditionalServices.value as responseType).data
                this.Warranties = (warranty.value as responseType).data
                this.categories = (categories.value as responseType).data
                this.type_product = (typeProduct.value as responseType).data
                this.user_types = (user.value as responseType).data
            }
            setLoading(false)
        },
        async filteredDeal(type: string, id: string) {
            setLoading(true)
            let {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/${type}?${filterPopulate(id)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (error.value) {

            } else {
                this.Detail= data.value.data[0]
            }

            setLoading(false)
        },
        async getDeals(type: string) {
            setLoading(true)

            const [{data: samokat} /*{ data: scooters }*/] = await Promise.all([
                useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/${type}?${pagination('1')}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
            ]);
            this.samokats = samokat.value as CatalogItemType;
            setLoading(false)
        },
        async loadMore(type: string | null | undefined, page: string) {
            setLoading(true)

            const {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/${type}?${pagination(page)}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            this.samokats = data.value as CatalogItemType
            scrollTop()


            setLoading(false)
        }
    },
});
