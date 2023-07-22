// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
    devtools: {enabled: false},
    modules: [
        'nuxt-quasar-ui',
        '@pinia/nuxt',
        '@nuxt/image',
        'nuxt-mongoose',
    ],
    image: {},
    quasar: {},
    mongoose: {
        uri: 'mongodb+srv://onegoal711:nqMGFdnhDp92cbK5@cluster0.7dr9kby.mongodb.net/roomvo?retryWrites=true&w=majority',
        options: {},
        modelsDir: 'models',
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
}
