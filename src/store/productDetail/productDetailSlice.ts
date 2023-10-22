import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProductDetail, IProductDetailState } from "./productDetail.interface"

export const initialStateProductDetail: IProductDetailState = {
    productDetails: []
}


const productDetailSlice = createSlice({
    name: "productDetails",
    initialState: initialStateProductDetail,
    reducers: ({
        listProductDetailSlice: (state: IProductDetailState, actions: PayloadAction<IProductDetail[]>) => {
            state.productDetails = actions.payload
        },
        listProductDetailByProductId: (state: IProductDetailState, actions: PayloadAction<IProductDetail[]>) => {
            state.productDetails = actions.payload
        },
    })
})



export const { listProductDetailSlice } = productDetailSlice.actions
export default productDetailSlice.reducer

