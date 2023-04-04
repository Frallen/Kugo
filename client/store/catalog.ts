import { useMain } from "~/store/main";
import qs from "qs";
import { CatalogItem } from "~/types/catalogTypes";
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
  samokats: CatalogItem[];
  /*scooters: [],
  bicycles: [],
  RobotVacuum: [],
  Scales: [],*/
}
// пример ответа сервака
interface responseType {
  data: [];
  meta: {};
}
export const useCatalog = defineStore("catalog", {
  state: (): stateType => ({
    samokats: [],
  }),
  getters: {},
  actions: {
    async getDeals() {
      useMain().$state.isLoading = true;

      const [{ data: samokat } /*{ data: scooters }*/] = await Promise.all([
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

      console.log(samokat);
      this.samokats = (samokat.value as responseType).data as CatalogItem[];
      useMain().$state.isLoading = false;
    },
  },
});
