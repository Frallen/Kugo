import {overFlow, setLoading} from "~/composables/mixins";
import {populate} from "~/composables/qsMixins";
import {errorMessage, successMessage} from "~/composables/useAlert";

interface stateType {
    isLoading: boolean
    authModalState: boolean
    serviceModalState: boolean
}

export const useMain = defineStore("main", {
    state: (): stateType => ({
        isLoading: false,
        authModalState: false,
        serviceModalState: false
    }),
    getters: {},
    actions: {
        //Закрыть все кастомные модальные окна
        async hideAllModals() {
            this.authModalState = false
            this.serviceModalState = false
            overFlow(false)
        },
        async AuthModalChanger(state: boolean) {
            this.authModalState = state
            overFlow(state)
        },
        async ServiceModalChanger(state: boolean) {
            this.serviceModalState = state
            overFlow(state)
        },
        async ServiceRequest(values: { Option: string, Phone: string }) {
            setLoading(true)
            let {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/service-call-backs`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: {
                        data: {
                            Phone: values.Phone,
                            Option: values.Option

                        }
                    },
                }
            )
            if (error.value) {
                errorMessage("Повторите попытку позже");
            } else {
                successMessage("Ожидайте звонка!", "Скоро Вам перезвонит наш специалист.")
            }
            this.hideAllModals()
            setLoading(false)
        }
    },
});
