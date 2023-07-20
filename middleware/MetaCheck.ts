import {useStore} from "~/stores/store";

export default defineNuxtRouteMiddleware((to, from) => {
    const store = useStore();
    if (to.matched[0].name === 'floor-id' && !store.isFloorLoaded) {
        return navigateTo('/floor', {redirectCode: 301})
    }
    if (to.matched[0].name === 'wall-id' && !store.isWallLoaded) {
        return navigateTo('/wall', {redirectCode: 301})
    }
    if (to.matched[0].name === 'ext-id' && !store.isExtLoaded) {
        return navigateTo('/ext', {redirectCode: 301})
    }
    if (to.matched[0].name === 'multi-id' && !store.isMultiLoaded) {
        return navigateTo('/multi', {redirectCode: 301})
    }
})