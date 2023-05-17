import {AdditionalType, CatalogItemType, cookieOrderType, sessionType} from "~/types/catalog.types";
import {setLoading} from "~/composables/mixins";
import {filterDeal} from "~/composables/qsMixins";


// интерфейс для катлога pinia
interface stateType {
    Cart: CatalogItemType,
    ServiceToOrder: AdditionalType[]
    sessionCart: sessionType[]
    sessionDiscount: sessionType[]
}

export const useCart = defineStore("cart", {
    state: (): stateType => ({
        Cart: {},
        ServiceToOrder: [],
        sessionCart: [],
        sessionDiscount: []
    }),
    getters: {
        calculatedCart: (state): number => {
            return state.sessionCart.reduce(
                (total, item) => item.Price + total,
                0
            )
        },
        calculatedDiscount: (state): number => {
            return state.sessionDiscount.reduce(
                (total, item) => item.Price + total,
                0
            )
        },

    },
    actions: {
        async clearSessionCart(id: number) {
            this.sessionCart = this.sessionCart.filter(p => p.id !== id)

        },
        async clearSessionDiscount(id: number) {
            this.sessionDiscount = this.sessionDiscount.filter(p => p.id !== id)
        },
        // Подготовка элементов корзины
        async cartOrders() {
            const cookie = useCookie<cookieOrderType[]>("order");
            let order = [...(cookie.value ?? "")] as cookieOrderType[];
            const searchedItems: [number] = []

            order.map(p => searchedItems.push(p.id))
            if (searchedItems.length > 0) {
                setLoading(true)
                let {data, error} = await useFetch(
                    `${useRuntimeConfig().public.strapi.url}/api/catalog-items?${filterDeal(searchedItems)}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                if (error.value) {

                } else {
                    (data.value as CatalogItemType).data.map(i => {
                        order.map(p => {
                            if (p.id === i.id) {
                                i.attributes.OrderPrice = p.OrderPrice
                                i.attributes.OrderService = p.OrderService
                            }
                        })
                    })
                    this.Cart = data.value as CatalogItemType;
                }
                setLoading(false)

            } else {
                this.Cart = {}
            }


        },
        async DeleteService(id: number, basePrice: number, Name: string) {
            const cookie = useCookie<cookieOrderType[]>("order");
            let order = [...(cookie.value ?? "")] as cookieOrderType[];
            order.map(p => {
                if (p.id === id && p.OrderService) {
                    p.OrderService = p.OrderService.filter(p => p.Name !== Name)

                    p.OrderPrice = p.OrderService.reduce(
                        (total, item) => item.Price + total,
                        0
                    ) + basePrice
                }
            })
            cookie.value = order
        },
        async deleteFromCookie(id: number) {
            const cookie = useCookie<cookieOrderType[]>("order");
            let order = [...(cookie.value ?? "")] as cookieOrderType[];
            cookie.value = order.filter(p => p.id !== id)

        },
        async clearCart() {
            const cookie = useCookie<cookieOrderType[]>("order");
            cookie.value = []
            this.Cart = {}
            this.sessionCart = {}
            this.sessionDiscount = {}
        },
        async fillCartStorage(data: sessionType) {
            if (this.sessionCart.some(p => p.id === data.id)) {
                this.sessionCart.map(p => {
                    if (p.id === data.id) {
                        p.Price = data.Price
                    }
                })

            } else {
                this.sessionCart.push({
                    id: data.id,
                    Price: data.Price
                })
            }
        },
        async fillDiscountStorage(data: sessionType) {
            if (this.sessionDiscount.some(p => p.id === data.id)) {

                this.sessionDiscount.map(p => {
                    if (p.id === data.id) {
                        p.Price = data.Price
                    }
                })
            } else {
                this.sessionDiscount.push({
                    id: data.id,
                    Price: data.Price
                })

            }

        }
    },

})