import { defineStore } from 'pinia'

interface IData {
    vendorId: string,
    metadata: any,
    products: {id: string, type: number}[]
}

interface IState {
    loading: boolean,

    floorMeta: IData,
}

export const useStore = defineStore('store', {
    state: (): IState => ({
        loading: false,

        floorMeta: {
            vendorId: '',
            products: [],
            metadata: null,
        }
    }),
    actions: {
        setFloorMeta(metadata: any) {
            this.floorMeta.vendorId = metadata.props.pageProps.initialServerValues.vendorId
            this.floorMeta.products = metadata.props.pageProps.initialServerValues.products
                .map((p: any) => ({id: p.id, type: p.productType}))
            this.floorMeta.metadata = metadata
        },
        setLoading(loading: boolean) {
            this.loading = loading;
        }
    }
})