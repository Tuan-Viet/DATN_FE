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
        }
    })
})

const productFilterSlice = createSlice({
    name: "products",
    initialState: initialProductFilter,
    reducers: ({
        listProductFilterSlice: (state: IProductFilterState, actions: PayloadAction<IProduct[]>) => {
            console.log(actions.payload);

            state.products = actions.payload
        },
        listProductCategorySlice: (state: IProductFilterState, actions: PayloadAction<IProductFilterState>) => {
            const nameTerm = actions.payload.nameTerm.trim()
            const listProductFilter = actions.payload?.products?.filter((product) => product.categoryId && product.categoryId.includes(nameTerm))
            state.products = listProductFilter
        },
        listProductSearchSlice: (state: IProductFilterState, actions: PayloadAction<IProductSearchState>) => {
            const nameTerm = actions.payload.searchTerm.trim()
            const listProductFilter = actions.payload?.products?.filter((product) => product.title && product.title.toLowerCase().includes(nameTerm))
            state.products = listProductFilter
        }
    })
})

export const { listProductFilterSlice, listProductCategorySlice, listProductSearchSlice } = productFilterSlice.actions
export const { listProductSlice, deleteProductSlice } = productSlice.actions
export const productFilterSliceReducer = productFilterSlice.reducer
export default productSlice.reducer

