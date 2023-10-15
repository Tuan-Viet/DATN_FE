import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import IProduct, { IProductState } from "./product.interface"

export const initialStateProduct: IProductState = {
    products: []
}

const productSlice = createSlice({
    name: "categories",
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

export const { listProductSlice, deleteProductSlice } = productSlice.actions
export default productSlice.reducer

