import { defineStore } from 'pinia'

interface IData {
    vendorId: string,
    metadata: any,
    products: {id: string, type: number}[]
}

interface IState {
    loading: boolean,

    rooms: any[]

    floorMeta: IData,
    wallMeta: IData,
    extMeta: IData,
    multiMeta: IData,
}

export const useStore = defineStore('store', {
    state: (): IState => ({
        loading: false,

        rooms: [],

        floorMeta: {
            vendorId: '',
            products: [],
            metadata: null,
        },
        wallMeta: {
            vendorId: '',
            products: [],
            metadata: null,
        },
        extMeta: {
            vendorId: '',
            products: [],
            metadata: null,
        },
        multiMeta: {
            vendorId: '',
            products: [],
            metadata: null,
        },
    }),
    getters: {
        getRooms(state) {
            return state.rooms;
        },
        isFloorLoaded(state) {
            return state.floorMeta.metadata != null;
        },
        isWallLoaded(state) {
            return state.wallMeta.metadata != null;
        },
        isExtLoaded(state) {
            return state.extMeta.metadata != null;
        },
        isMultiLoaded(state) {
            return state.multiMeta.metadata != null;
        },
    },
    actions: {
        setRooms(rooms: any[]) {
            this.rooms = rooms;
        },

        setFloorMeta(metadata: any) {
            this.floorMeta.vendorId = metadata.props.pageProps.initialServerValues.vendorId
            this.floorMeta.products = metadata.props.pageProps.initialServerValues.products
                .map((p: any) => ({id: p.id, type: p.productType}))
            this.floorMeta.metadata = metadata
        },
        setWallMeta(metadata: any) {
            this.wallMeta.vendorId = metadata.props.pageProps.initialServerValues.vendorId
            this.wallMeta.products = metadata.props.pageProps.initialServerValues.products
                .map((p: any) => ({id: p.id, type: p.productType}))
            this.wallMeta.metadata = metadata
        },
        setExtMeta(metadata: any) {
            this.extMeta.vendorId = metadata.props.pageProps.initialServerValues.vendorId
            this.extMeta.products = metadata.props.pageProps.initialServerValues.products
                .map((p: any) => ({id: p.id, type: p.productType}))
            this.extMeta.metadata = metadata
        },
        setMultiMeta(metadata: any) {
            this.multiMeta.vendorId = metadata.props.pageProps.initialServerValues.vendorId
            this.multiMeta.products = metadata.props.pageProps.initialServerValues.products
                .map((p: any) => ({id: p.id, type: p.productType}))
            this.multiMeta.metadata = metadata
        },
        setLoading(loading: boolean) {
            this.loading = loading;
        },
        setLoadingCallback(callback: Function) {
            this.loading = true;
            callback.apply(null);
            this.loading = false;
        }
    }
})