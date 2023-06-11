import {overFlow, setLoading} from "~/composables/mixins";
import {populate} from "~/composables/qsMixins";
import {errorMessage, successMessage} from "~/composables/useAlert";
import {answersType} from "~/types/global.types";
import {SelectFilterType} from "~/types/catalog.types";

interface stateType {
    isLoading: boolean
    authModalState: boolean
    serviceModalState: boolean
    Answers: answersType | null
    CallBackOptions: SelectFilterType[]
}

export const useMain = defineStore("main", {
    state: (): stateType => ({
        isLoading: false,
        authModalState: false,
        serviceModalState: false,
        Answers: null,
        CallBackOptions: [
            {
                label: "Ремонт",
                sort: "Ремонт"
            },
            {
                label: "Диагностика",
                sort: "Диагностика"
            },
            {
                label: "Услуги",
                sort: "Услуги"
            },
            {
                label: "Вопрос",
                sort: "Вопрос"
            }
        ]
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
        },
        async getAnswers() {
            setLoading(true)
            let {data, error} = await useFetch(
                `${useRuntimeConfig().public.strapi.url}/api/answers?${populate()}}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (error.value) {

            } else {
                this.Answers = data.value as answersType
            }
            setLoading(false)
        }
    },
});
