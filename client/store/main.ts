import {overFlow} from "~/composables/mixins";

interface stateType {
    isLoading: boolean
    authModalState: boolean

}

export const useMain = defineStore("main", {
    state: (): stateType => ({
        isLoading: false,
        authModalState: false
    }),
    getters: {},
    actions: {
        //Закрыть все кастомные модальные окна
        async hideAllModals() {
            this.authModalState = false
            overFlow(false)
        }
        ,
        async AuthModalChanger(state: boolean) {
            this.authModalState = state
            overFlow(state)
        }
    },
});
