export default defineNuxtRouteMiddleware(async (to, from) => {

    const {routeExist, getFilters} = useCatalog()
    await getFilters()

    if (!routeExist(to.params.slug as string)) {
        return abortNavigation()
    }

})