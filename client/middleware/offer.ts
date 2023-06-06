export default defineNuxtRouteMiddleware(async (to, from) => {

    const {Detail, filteredDeal} = useCatalog()


    await filteredDeal(to.params.id as string)

    if (Object.keys(Detail).length < 1) {
     return abortNavigation()
    }

})