import {useMain} from "~/store/main";
import qs from "qs";
import {
    CatalogItemType,
    categoryType,
    productType,
    userType,
    Settings
} from "~/types/catalog.types";
import {errorMessage} from "~/composables/useAlert";
import {scrollTop} from "~/composables/mixins";

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
    isLoading: boolean;
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
    data: CatalogItemType[]
    meta: {};
}

export const useCatalog = defineStore("catalog", {
    state: (): stateType => ({
        isLoading:false,
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
        filteredItem: (state) => {
            return (query: string, id: number) => {
                switch (query) {
                    case "scooters":
                        return state.samokats.data.find(p => p.id === id)
                    /*case "scooters":
                        return state.scooters*/
                    case "bicycles":
                        return state.bicycles.data.find(p => p.id === id)
                    case "robots":
                        return state.RobotVacuum.data.find(p => p.id === id)
                    case "scales":
                        return state.Scales.data.find(p => p.id === id)
                    default:
                        return false
                }
            }
        }

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
        async getFilters() {    this.isLoading = true;
            interface responseType {
                data: categoryType[] | productType[] | userType[] | Settings[]
                meta: []
            }

           // useMain().$state.isLoading = true;

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
            this.isLoading = false;
        },
        async getDeals(type: string) {
            this.isLoading = true;

            const [{data: samokat} /*{ data: scooters }*/] = await Promise.all([
                useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/${type}?${pagination('1')}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                ) /* useFetch(
          `${useRuntimeConfig().public.strapi.url}/api/scooters/?${populate()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )*/,
            ]);
            this.samokats = samokat.value as CatalogItemType;
           this.isLoading = false;
        },
        async loadMore(type: string | null | undefined, page: string) {
             this.isLoading =  true;

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


            this.isLoading = false;
        }
    },
});
