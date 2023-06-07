export default defineNuxtRouteMiddleware(async (to, from) => {

    const {filteredDeal} = useCatalog()
    const {Detail} = storeToRefs(useCatalog())

    await filteredDeal(to.params.id as string)

    if (Object.keys(Detail).length < 1) {
        return abortNavigation()
    }

})