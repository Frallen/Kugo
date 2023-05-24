import {useUser} from "~/store/user";

export default defineNuxtRouteMiddleware(async (from, to) => {
    await useUser().userStatus()
    if (!storeToRefs(useUser()).isAuth.value) {
        return abortNavigation()
    }
})