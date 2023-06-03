import {
    CatalogItemType,
    categoryType,
    DetailItemType,
    responseFilterType,
    SelectFilterType,
    filterType,
    AdditionalType,
    cookieOrderType, filterPayloadType,
} from "~/types/catalog.types";
import {AddedToBasket, errorMessage} from "~/composables/useAlert";
import {setLoading} from "~/composables/mixins";
import {filterDeal, pagination, populate, filterCatalog, chooseFilter} from "~/composables/qsMixins";
import {metaType} from "~/types/global.types";


// интерфейс для катлога pinia
interface stateType {
    SortOptions: SelectFilterType[],
    Detail: DetailItemType,
    Deals: CatalogItemType | null,
    categories: categoryType | null,
    Filter: filterType ,
    ServiceToOrder: AdditionalType[]
}

export const useCatalog = defineStore("catalog", {
    state: (): stateType => ({
        // объект для сортировки
        SortOptions: [
            {label: 'Сначала дешевле', sort: 'Price:asc'},
            {label: 'Сначала дороже', sort: 'Price:desc'},
            {label: 'По сумме скидки', sort: 'oldPrice:desc'}
        ],
        Detail: {} as DetailItemType,
        Deals: null,
        Filter: {} as filterType,
        categories: null,
        ServiceToOrder: []
    }),
    getters: {
        // middleware существует ли slug путь
        routeExist: (state) => {
            return (query: string) =>
                state.categories?.data.some(p => p.attributes.Slug === query)
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
       /* async clearDeals() {
            this.Detail = null
            this.Deals = null
        },*/
        //Добавление заказа в куки
        async orderToCookie(OrderPrice: number, id: number) {

            const cookie = useCookie<cookieOrderType[]>("order");
            let order = [...(cookie.value ?? "")] as cookieOrderType[];
            if (order && order.some(p => p.id === id)) {
                order.map(p => {
                    if (p.id === id) {

                        p.OrderPrice = OrderPrice
                        p.OrderService = this.ServiceToOrder
                    }
                })

                cookie.value = order
            } else {

                order.push({
                        id: id,
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

                this.Filter = (data.value as filterPayloadType).data[0] as filterType
            }
            setLoading(false)
        },
        // делальная страница товара
        async filteredDeal(id: string) {
            interface detailResponse extends metaType{
                data: DetailItemType
            }
            setLoading(true)
            let {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/catalog-items/${id}?${populate()}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (error.value) {

            } else {

               this.Detail = (data.value as detailResponse).data
            }

            setLoading(false)
        },
        // каталог с пагинацией
        async getDeals(type: string, page: string, filters?: responseFilterType, sort?: string) {
            setLoading(true)

            const {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/catalog-items?${pagination(page)}&${filterCatalog(type, filters, sort)}`,
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
