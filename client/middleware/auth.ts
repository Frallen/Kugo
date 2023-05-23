import {useUser} from "~/store/user";

export default defineNuxtRouteMiddleware((from, to) => {
    if (!storeToRefs(useUser()).isAuth.value) {
      return   abortNavigation()
    }
})