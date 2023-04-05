import {useMain} from "~/store/main";
import qs from "qs";
import { CatalogItemType} from "~/types/catalog.types";

let populate = (): string => {
    return qs.stringify(
        {
            populate: "*",
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );
};

// интерфейс для катлога pinia
interface stateType {
    samokats: CatalogItemType[];
    scooters: [],
    bicycles: [],
    RobotVacuum: [],
    Scales: [],
}

// пример ответа сервака
interface responseType {
    data: [];
    meta: {};
}

export const useCatalog = defineStore("catalog", {
    state: (): stateType => ({
        samokats: [], scooters: [],
        bicycles: [],
        RobotVacuum: [],
        Scales: [],
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
        async getDeals() {
            useMain().$state.isLoading = true;

            const [{data: samokat} /*{ data: scooters }*/] = await Promise.all([
                useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/scooters/?${populate()}`,
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
    },
});
