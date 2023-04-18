interface stateType {
    isLoading: boolean
}

export const useMain = defineStore("main", {
    state: (): stateType => ({
        isLoading: false
    }),
    getters: {},
    actions: {
        async setLoading(state: boolean) {
            this.isLoading = state
        }
    },
});
