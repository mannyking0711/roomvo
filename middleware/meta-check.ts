import {useStore} from "~/stores/store";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useStore();
    if (store.floorMeta.metadata === null) {
        return navigateTo('/floor', {redirectCode: 301})
    }
})