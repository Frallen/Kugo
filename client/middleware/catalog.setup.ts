export default defineNuxtRouteMiddleware(async (to, from) => {

    const {categories} = useCatalog()
    if (!categories.some(p => p.attributes.Slug === to.params.slug)) {
        return abortNavigation()
    }

})