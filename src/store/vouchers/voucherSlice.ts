import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IVoucher, IVoucherState } from "./voucher.interface"

export const initialVoucherState: IVoucherState = {
    vouchers: []
}

const categorySlice = createSlice({
    name: "vouchers",
    initialState: initialVoucherState,
    reducers: ({
        listVoucherSlice: (state: IVoucherState, actions: PayloadAction<IVoucher[]>) => {
            state.vouchers = actions.payload
        },
        deleteVoucherSlice: (state: IVoucherState, actions: PayloadAction<string>) => {
            state.vouchers = state.vouchers.filter((voucher) => voucher._id !== actions.payload)
        }
    })
})

export const { listVoucherSlice, deleteVoucherSlice } = categorySlice.actions
export default categorySlice.reducer
