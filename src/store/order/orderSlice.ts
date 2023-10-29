import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IOrder, IOrderState } from "./order.interface"
export const initialOrderState: IOrderState = {
    orders: []
}
const orderSlice = createSlice({
    name: "orders",
    initialState: initialOrderState,
    reducers: ({
        listOrderSlice: (state: IOrderState, actions: PayloadAction<IOrder[]>) => {
            state.orders = actions.payload
        },
        // addCartSlice: (state: IOrderState, actions: PayloadAction<IOrder>) => {

        // },
    })
})



export const { listOrderSlice } = orderSlice.actions
export default orderSlice.reducer