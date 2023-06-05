// Гайд - https://mayashavin.com/articles/breadcrumbs-storefrontui-nuxt-router


const isMathPatternPath = (pathA: string, pathB: string) => {
    const partsA = pathA.split('/');
    const partsB = pathB.split('/');

    if (partsA.length !== partsB.length) return false;

    return partsA.every((part: string, i: number) => {
        return part === partsB[i] || part.startsWith(':');
    });
}
// Хлебные крошки
export const useBreadcrumbs = () => {

    const router = useRouter();
    const route = useRoute()
    const routes = router.getRoutes();

    const HOMEPAGE = {name: 'Главная', path: '/'};
    const breadcrumbs: Ref<Array<{ name: string; path: string; }>> = ref([HOMEPAGE])
    const Title = ref<string>(route.meta.Title as string)
    const getBreadcrumbs = (currRoute: string): any[] => {
        if (currRoute === '') return [HOMEPAGE];

        const paths = getBreadcrumbs(currRoute.slice(0, currRoute.lastIndexOf('/')));

        const founds = routes.filter(r => isMathPatternPath(r.path, currRoute));

        const matchRoute = founds.length > 1 ? founds.find(r => r.path === currRoute) : founds[0];

        return [
            ...paths,
            {
                path: currRoute,
                name: matchRoute?.meta?.breadcrumb || matchRoute?.name || matchRoute?.path || currRoute,
            }
        ]
    }

    watch(() => ({
        path: route.path,
        name: route.name,
        params: route.params,
        meta: route.meta,
        matched: route.matched,
    }), (route) => {
        if (route.path === '/') return;

        breadcrumbs.value = getBreadcrumbs(route.path);
    }, {
        immediate: true,
    })

    return {
        breadcrumbs, Title
    }
}

