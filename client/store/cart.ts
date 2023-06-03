import {AdditionalType, CatalogItemType, cookieOrderType, DetailItemType, sessionType} from "~/types/catalog.types";
import {setLoading} from "~/composables/mixins";
import {filterDeal} from "~/composables/qsMixins";


// интерфейс для катлога pinia
interface stateType {
    Cart: CatalogItemType | null,
    ServiceToOrder: AdditionalType[]
    sessionCart: sessionType[]
    sessionDiscount: sessionType[]
}

export const useCart = defineStore("cart", {
    state: (): stateType => ({
        Cart: null,
        ServiceToOrder: [],
        sessionCart: [],
        sessionDiscount: []
    }),
    getters: {},
    actions: {
        async prepareSession(id: number, count: number) {

            let CartItem = this.Cart?.data.find(p => p.id === id) as DetailItemType
            const calculatedService =
                CartItem.attributes.OrderService ? CartItem.attributes.OrderService.reduce(
                    (total, item) => item.Price + total,
                    0
                ) : 0

            if (this.sessionCart.some(p => p.id === id)) {
                this.sessionCart.map(item => {
                        if (item.id === id) {
                            item.id = id
                            item.Price = CartItem.attributes.Price * count + calculatedService
                        }

                    }
                )

                if (CartItem.attributes.oldPrice) {
                    this.sessionDiscount.map(item => {
                            if (item.id === id) {
                                item.id = id
                                item.Price = CartItem.attributes.oldPrice - CartItem.attributes.Price
                            }

                        }
                    )
                }
            } else {


                this.sessionCart.push({
                    id: CartItem.id,
                    Price: CartItem.attributes.Price * count + calculatedService
                })

                if (CartItem.attributes.oldPrice) {
                    this.sessionDiscount.push({
                        id: CartItem.id,
                        Price: CartItem.attributes.oldPrice - CartItem.attributes.Price
                    })
                }
            }

        },

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
            const searchedItems: Array<number> = []

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
                                i.attributes.OrderPrice = p.OrderPrice;
                                i.attributes.OrderService = p.OrderService as AdditionalType[]
                            }
                        })
                    })
                    this.Cart = data.value as CatalogItemType;
                }
                setLoading(false)

            } else {
                this.Cart = null
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
            this.Cart = null
            this.sessionCart = []
            this.sessionDiscount = []
        },
    },

})