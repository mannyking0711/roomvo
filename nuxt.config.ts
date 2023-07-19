// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: false},
    modules: [
        'nuxt-quasar-ui',
        '@pinia/nuxt'
    ],
    quasar: {},
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
})
