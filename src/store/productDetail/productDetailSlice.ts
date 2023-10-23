import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProductDetail, IProductDetailFilterState, IProductDetailState } from "./productDetail.interface"

export const initialStateProductDetail: IProductDetailState = {
    productDetails: []
}
export const initalStateProductDetailFilter: IProductDetailFilterState = {
    _id: "",
    nameTerm: "",
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
const productDetailFilterSlice = createSlice({
    name: "productDetails",
    initialState: initalStateProductDetailFilter,
    reducers: ({
        listProductDetailFilter: (state: IProductDetailState, actions: PayloadAction<IProductDetail[]>) => {
            state.productDetails = actions.payload
        },
        listProductDetailFilterSlice: (state: IProductDetailFilterState, actions: PayloadAction<IProductDetailFilterState>) => {
            console.log(actions.payload);

            const _id = actions.payload._id.trim()
            const nameColor = actions.payload.nameTerm.trim().toLowerCase()
            if (nameColor) {
                const newListProductDetail = actions.payload.productDetails.filter((product) => product && product.nameColor.toLowerCase().includes(nameColor) && product.product_id.includes(_id))
                console.log(newListProductDetail);

                state.productDetails = newListProductDetail

            }
        },
    })
})


export const { listProductDetailFilter, listProductDetailFilterSlice } = productDetailFilterSlice.actions
export const { listProductDetailSlice } = productDetailSlice.actions
export const productDetailFilterSliceReducer = productDetailFilterSlice.reducer
export default productDetailSlice.reducer

