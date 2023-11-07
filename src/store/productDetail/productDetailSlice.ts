import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IGetOneIdProductDetailState, IProductDetail, IProductDetailFilterState, IProductDetailState } from "./productDetail.interface"

export const initialStateProductDetail: IProductDetailState = {
    productDetails: []
}
export const initalStateProductDetailFilter: IProductDetailFilterState = {
    _id: "",
    nameTerm: "",
    productDetails: []
}
export const initialGetOneIdProductDetailState: IGetOneIdProductDetailState = {
    product_id: "",
    nameColor: "",
    sizeTerm: "",
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
            const _id = actions.payload._id.trim()
            const nameColor = actions?.payload?.nameTerm.trim().toLowerCase()
            if (nameColor) {
                const newListProductDetail = actions?.payload?.productDetails.filter((product) => product && product.nameColor.toLowerCase().includes(nameColor) && product.product_id.includes(_id))
                state.productDetails = newListProductDetail

            }
        },
    })
})
const productDetailIdSlice = createSlice({
    name: "productDetails",
    initialState: initialGetOneIdProductDetailState,
    reducers: ({
        listProductDetailIdFilter: (state: IProductDetailState, actions: PayloadAction<IProductDetail[]>) => {
            state.productDetails = actions.payload
        },
        getOneIdProductDetailSlice: (state: IGetOneIdProductDetailState, actions: PayloadAction<IGetOneIdProductDetailState>) => {
            const product_id = actions.payload.product_id.trim()
            const nameColor = actions.payload.nameColor.trim().toLowerCase()
            const sizeTerm = actions.payload.sizeTerm.trim().toLowerCase()
            if (nameColor) {
                const newListProductDetail = actions.payload.productDetails.filter((product) => product && product.nameColor.toLowerCase().includes(nameColor) && product.product_id.includes(product_id) && product.size.toLowerCase() === sizeTerm)
                state.productDetails = newListProductDetail

            }
        },
    })
})


export const { listProductDetailFilter, listProductDetailFilterSlice } = productDetailFilterSlice.actions
export const { listProductDetailSlice } = productDetailSlice.actions
export const { listProductDetailIdFilter, getOneIdProductDetailSlice } = productDetailIdSlice.actions
export const productDetailFilterSliceReducer = productDetailFilterSlice.reducer
export const productDetailIdReducer = productDetailIdSlice.reducer
export default productDetailSlice.reducer

