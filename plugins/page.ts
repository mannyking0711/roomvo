import {useStore} from "~/stores/store";

export default defineNuxtPlugin(nuxtApp => {
    const store = useStore();
    nuxtApp.hook('page:start', () => {
        store.setLoading(true);
    })
    nuxtApp.hook('page:finish', () => {
        store.setLoading(false);
    })
})