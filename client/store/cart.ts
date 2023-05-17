import {useCatalog} from "~/store/catalog";
import {AdditionalType, CatalogItemType, cookieOrderType} from "~/types/catalog.types";
import {setLoading} from "~/composables/mixins";
import {filterDeal} from "~/composables/qsMixins";


// интерфейс для катлога pinia
interface stateType {
    Cart: CatalogItemType,
    ServiceToOrder: AdditionalType[]
}

export  const useCart=defineStore("cart",{
    state:():stateType=>({
        Cart: {},
        ServiceToOrder: []

    }),
    getters:{

    },
    actions:{
        async DeleteService(id: number,basePrice:number, Name: string) {
            const cookie = useCookie<cookieOrderType[]>("order");
            let order = [...(cookie.value ?? "")] as cookieOrderType[];
            order.map(p => {
                if (p.id === id&&p.OrderService) {
                    p.OrderService = p.OrderService.filter(p => p.Name !== Name)

                    p.OrderPrice=p.OrderService.reduce(
                        (total, item) => item.Price + total,
                        0
                    )+basePrice
                }
            })
            cookie.value=order
        },
        // Подготовка элементов корзины
        async cartOrders() {
            const cookie = useCookie<cookieOrderType[]>("order");
            let order = [...(cookie.value ?? "")] as cookieOrderType[];
            const searchedItems: [number] = []
            if (order) {
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

                }else{
                    useCatalog().Cart = []
                }

            }

        },
        async deleteFromCookie(id: number) {
            const cookie = useCookie<cookieOrderType[]>("order");
            let order = [...(cookie.value ?? "")] as cookieOrderType[];
            cookie.value = order.filter(p => p.id !== id)

        },
        async clearCart() {
            const cookie = useCookie<cookieOrderType[]>("order");
            cookie.value = []
            useCatalog().Cart = []
        },
    }
})