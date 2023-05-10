import {useMain} from "~/store/main";
import qs from "qs";
import Localbase from "localbase";
import {
    CatalogItemType,
    categoryType,
    DetailItemType,
    responseFilterType,
    SelectFilterType,
    filterType,
    ServicesType,
    AdditionalType,
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
const filterCatalog = (value?: responseFilterType, sort?: string): string => {

    return qs.stringify({
        sort: [sort],

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
        async setDetailData(data: AdditionalType) {

            if (!this.ServiceToOrder.some(p => p.Uid === data.Uid)) {
                this.ServiceToOrder.push(data)
            } else {
                let detail = this.ServiceToOrder.filter(p => p.Uid !== data.Uid)
                detail.push(data)
                this.ServiceToOrder = detail
            }
        },
        async clearDeals() {
            this.Detail = {}
            this.Deals = {}


        },
        async orderToCookie(values: { OrderPrice: number }) {

            const cookie = useCookie<DetailItemType[]>("order");
            let order = [...(cookie.value ?? "")] as DetailItemType[];
            if (order && order.some(p => p.id === this.Detail.id)) {
                order.map(p => {
                    if (p.id === this.Detail.id) {

                        p.attributes.OrderPrice = values.OrderPrice
                        p.attributes.OrderService = this.ServiceToOrder
                    }
                })

                cookie.value = order
            } else {
                const Detail = this.Detail
                Detail.attributes.OrderPrice = values.OrderPrice
                Detail.attributes.OrderService = this.ServiceToOrder
                order.push(
                    Detail
                )

                cookie.value = order
                console.log(cookie.value)
            }

        },
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
