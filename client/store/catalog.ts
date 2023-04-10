import {useMain} from "~/store/main";
import qs from "qs";
import {CatalogItemType, categoryType} from "~/types/catalog.types";
import {errorMessage} from "~/composables/useAlert";

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
    samokats: CatalogItemType[];
    scooters: [],
    bicycles: [],
    RobotVacuum: [],
    Scales: [],
    categories: categoryType[],
}

// пример ответа сервака
interface responseType {
    data: CatalogItemType[]
    meta: {};
}

export const useCatalog = defineStore("catalog", {
    state: (): stateType => ({
        samokats: [],
        scooters: [],
        bicycles: [],
        RobotVacuum: [],
        Scales: [],
        categories: []
    }),
    getters: {
        filteredOffer: (state) => {
            return (query: string) => {
                switch (query) {
                    case "samokats":
                        return state.samokats
                    case "scooters":
                        return state.scooters
                    case "bicycles":
                        return state.bicycles
                    case "RobotVacuum":
                        return state.RobotVacuum
                    case "Scales":
                        return state.Scales
                    default:
                        return false
                }
            }
        }
    },
    actions: {
        async getCategories() {
            interface responseType {
                data: categoryType[],
                meta: []
            }

            useMain().$state.isLoading = true;
            const {data, error} = await useFetch(`${useRuntimeConfig().public.strapi.url}/api/categories`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            if (error.value) {
                switch (error.value.data.error.message) {
                    default:
                        errorMessage("Повторите попытку позже");
                }
            } else {

              this.categories = (data.value as responseType).data
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

            this.samokats = (samokat.value as responseType).data as CatalogItemType[];
            useMain().$state.isLoading = false;
        },
        async loadMore(type: string | null | undefined) {
            useMain().$state.isLoading = true;

            switch (true) {
                case type === "samokat": {
                    const {data, error} = useFetch(
                        `${useRuntimeConfig().public.strapi.url}/api/scooters?${pagination(2)}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                    console.log(data.value as responseType)
                    this.samokats.push(...(data.value as responseType).data as CatalogItemType[]);
                    break
                }
                default : {
                    const [{data: samokat} /*{ data: scooters }*/] = await Promise.all([
                        useFetch(
                            `${useRuntimeConfig().public.strapi.url}/api/scooters?${pagination(2)}`,
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
                }
            }

            useMain().$state.isLoading = false;
        }
    },
});
