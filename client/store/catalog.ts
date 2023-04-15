import {useMain} from "~/store/main";
import qs from "qs";
import {CatalogItemType, categoryType, productType, userType} from "~/types/catalog.types";
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

const pagination = (page: number): string => {
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
    samokats: CatalogItemType;
    //scooters: [],
    bicycles: [],
    RobotVacuum: [],
    Scales: [],
    categories: categoryType[],
    type_product: productType[],
    user_types: userType[]
}

// пример ответа сервака
interface responseType {
    data: CatalogItemType[]
    meta: {};
}

export const useCatalog = defineStore("catalog", {
    state: (): stateType => ({
        samokats: {
            data: [],

        },
        //   scooters: [],
        bicycles: [],
        RobotVacuum: [],
        Scales: [],
        categories: [],
        type_product: [],
        user_types: []
    }),
    getters: {
        // middleware существует ли slug путь
        routeExist: (state) => {
            return (query: string) =>
                state.categories.some(p => p.attributes.Slug === query)
        },
        filteredOffer: (state) => {
            return (query: string) => {
                switch (query) {
                    case "elektrosamokaty":
                        return state.samokats
                    /*case "scooters":
                        return state.scooters*/
                    case "elektrovelosipedy":
                        return state.bicycles
                    case "robot-pylesosy":
                        return state.RobotVacuum
                    case "vesy":
                        return state.Scales
                    default:
                        return false
                }
            }
        }
    },
    actions: {
        async getFilters() {
            interface responseType {
                data: categoryType[] | productType[] | userType[],
                meta: []
            }

            useMain().$state.isLoading = true;

            const [{data: categories, error}, {data: typeProduct}, {data: user}] = await Promise.all([
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

            ]);

            if (error.value) {
                switch (error.value.data.error.message) {
                    default:
                        errorMessage("Повторите попытку позже");
                }
            } else {
                this.categories = (categories.value as responseType).data
                this.type_product = (typeProduct.value as responseType).data
                this.user_types = (user.value as responseType).data
            }
            useMain().$state.isLoading = false;
        },
        async getDeals() {
            useMain().$state.isLoading = true;

            const [{data: samokat} /*{ data: scooters }*/] = await Promise.all([
                useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/scooters?${pagination(1)}`,
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
            useMain().$state.isLoading = false;
        },
        async loadMore(type: string | null | undefined, page: number) {
            useMain().$state.isLoading = true;

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


            useMain().$state.isLoading = false;
        }
    },
});
