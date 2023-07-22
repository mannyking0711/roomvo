import { defineMongooseModel } from '#nuxt/mongoose'

export const Room = defineMongooseModel('roomvo', {
    picture_id: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
})