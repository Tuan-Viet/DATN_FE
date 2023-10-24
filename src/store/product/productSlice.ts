import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import IProduct, { IProductFilterState, IProductSearchState, IProductState } from "./product.interface"

export const initialStateProduct: IProductState = {
    products: []
}

export const initialProductFilter: IProductFilterState = {
    nameTerm: "",
    products: []
}

const productSlice = createSlice({
    name: "products",
    initialState: initialStateProduct,
    reducers: ({
        listProductSlice: (state: IProductState, actions: PayloadAction<IProduct[]>) => {
            state.products = actions.payload
        },
        deleteProductSlice: (state: IProductState, actions: PayloadAction<string>) => {
            state.products = state.products.filter((product) => product._id !== actions.payload)
        },
        // listProductSaleSlice: (state: IProductState, actions: PayloadAction<IProduct[]>) => {
        //     const productSales = actions.payload.filter((product) => product.discount < product.price)
        //     state.products = productSales
        // },
        // listProductOutStandSlice: (state: IProductState, actions: PayloadAction<IProduct[]>) => {
        // const productOutstand = actions.payload.filter((product) => product && product.variants)
        // state.products = productOutstand
        // }
    })
})

const productFilterSlice = createSlice({
    name: "products",
    initialState: initialProductFilter,
    reducers: ({
        listProductFilterSlice: (state: IProductFilterState, actions: PayloadAction<IProduct[]>) => {
            state.products = actions.payload
        },

        listProductCategorySlice: (state: IProductFilterState, actions: PayloadAction<IProductFilterState>) => {
            const nameTerm = actions.payload.nameTerm.trim()
            const listProductFilter = actions.payload?.products?.filter((product) => product.categoryId?._id && product.categoryId._id.includes(nameTerm))
            state.products = listProductFilter
        },
    })
})
const productSaleSlice = createSlice({
    name: "products",
    initialState: initialStateProduct,
    reducers: ({
        listProductSale: (state: IProductState, actions: PayloadAction<IProduct[]>) => {
            state.products = actions.payload
        },
        listProductSaleSlice: (state: IProductState, actions: PayloadAction<IProduct[]>) => {
            const productSales = actions.payload.filter((product) => product.discount < product.price)
            state.products = productSales
        },
    })
})
const productSearchSlice = createSlice({
    name: "products",
    initialState: initialProductFilter,
    reducers: ({
        listProductSearch: (state: IProductFilterState, actions: PayloadAction<IProduct[]>) => {
            state.products = actions.payload
        },
        listProductSearchSlice: (state: IProductFilterState, actions: PayloadAction<IProductSearchState>) => {
            const nameTerm = actions.payload.searchTerm.trim()
            if (nameTerm) {
                const listProductFilter = actions.payload?.products?.filter((product) => product.title && product.title.toLowerCase().includes(nameTerm))
                state.products = listProductFilter
            }
        },
        deleteProductSearchSlice: (state: IProductState, actions: PayloadAction<string>) => {
            state.products = state.products.filter((product) => product._id !== actions.payload)
        },
    })
})
const productOutstandSlice = createSlice({
    name: "products",
    initialState: initialStateProduct,
    reducers: ({
        listProductOutStand: (state: IProductState, actions: PayloadAction<IProduct[]>) => {
            state.products = actions.payload
        },
        listProductOutStandSlice: (state: IProductState, actions: PayloadAction<IProduct[]>) => {
            const productOutStand = actions.payload.filter((product) => product && product.variants)
            state.products = productOutStand
        },
    })
})
const productRelatedSlice = createSlice({
    name: "products",
    initialState: initialStateProduct,
    reducers: ({
        listProductRelated: (state: IProductState, actions: PayloadAction<IProduct[]>) => {
            state.products = actions.payload
        },
        listProductRelatedSlice: (state: IProductState, actions: PayloadAction<IProduct[]>) => {
            const productOutStand = actions.payload.filter((product) => product && product.variants)
            state.products = productOutStand
        },
    })
})
// product
export const { listProductSlice, deleteProductSlice } = productSlice.actions
// productbyCategory
export const { listProductFilterSlice, listProductCategorySlice } = productFilterSlice.actions
// productBySale
export const { listProductSale, listProductSaleSlice } = productSaleSlice.actions
// productSearch By name
export const { listProductSearch, listProductSearchSlice, deleteProductSearchSlice } = productSearchSlice.actions
// productOutStand
export const { listProductOutStand, listProductOutStandSlice } = productOutstandSlice.actions
// productRelated

export const { listProductRelated, listProductRelatedSlice } = productRelatedSlice.actions
// reducer
export const productSliceReducer = productSlice.reducer
export const productFilterSliceReducer = productFilterSlice.reducer
export const productSaleSliceReducer = productSaleSlice.reducer
export const productSearchReducer = productSearchSlice.reducer
export const productOutstandReducer = productOutstandSlice.reducer
export const productRelatedSliceReducer = productRelatedSlice.reducer

