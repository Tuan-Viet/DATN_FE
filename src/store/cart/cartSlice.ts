import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ICart, ICartLocal, ICartLocalState, ICartState } from "./cart.interface"
export const initialCartState: ICartState = {
    carts: []
}
export const initialCartLocalState: ICartLocalState = {
    cartLocals: []
}
const { current: userStore } = JSON.parse(localStorage.getItem("persist:user")!);

const cartSlice = createSlice({
    name: "carts",
    initialState: initialCartState,
    reducers: ({
        listCartSlice: (state: ICartState, actions: PayloadAction<ICart[]>) => {
            if (JSON.parse(userStore)?._id) {
                const listCartByUser = actions.payload.filter((cart) => cart.userId === JSON.parse(userStore)._id)
                state.carts = listCartByUser
            } else {
                state.carts = actions.payload
            }
        },
        removeCartSlice: (state: ICartState, actions: PayloadAction<string>) => {
            state.carts = state.carts.filter((cart) => cart._id !== actions.payload)
        },
        addCartSlice: (state: ICartState, actions: PayloadAction<ICart>) => {
            const cartExistIndex = state.carts.findIndex((cart) => cart.productDetailId === actions.payload.productDetailId)
            const { current: userStore } = JSON.parse(localStorage.getItem("persist:user")!);
            if (JSON.parse(userStore)?._id) {
                if (cartExistIndex !== -1) {
                    state.carts[cartExistIndex].quantity += actions.payload.quantity
                } else {
                    state.carts = [
                        ...state.carts,
                        {
                            userId: actions?.payload?.userId,
                            productDetailId: actions.payload.productDetailId,
                            quantity: actions.payload.quantity,
                            totalMoney: actions.payload.totalMoney
                        }
                    ]
                }
            } else {
                if (cartExistIndex !== -1) {
                    state.carts[cartExistIndex].quantity += actions.payload.quantity
                } else {
                    state.carts = [
                        ...state.carts,
                        {
                            productDetailId: actions.payload.productDetailId,
                            quantity: actions.payload.quantity,
                            totalMoney: actions.payload.totalMoney
                        }
                    ]
                }
                localStorage.setItem("carts", JSON.stringify(state.carts))
            }
        },
        increaseCartSlice: (state: ICartState, actions: PayloadAction<{ _id: string, discount: number }>) => {
            const cartIndex = state.carts.findIndex((state) => state._id === actions.payload._id)
            if (cartIndex !== -1) {
                state.carts[cartIndex].quantity++;
                state.carts[cartIndex].totalMoney += actions.payload.discount
                localStorage.setItem("cartIndex", JSON.stringify(state.carts[cartIndex]));
            }
        },
        decreaseCartSlice: (state: ICartState, actions: PayloadAction<{ _id: string, discount: number }>) => {
            const cartIndex = state.carts.findIndex((state) => state._id === actions.payload._id)
            if (state.carts[cartIndex].quantity > 1) {
                state.carts[cartIndex].quantity -= 1
                state.carts[cartIndex].totalMoney -= actions.payload.discount
                localStorage.setItem("cartIndex", JSON.stringify(state.carts[cartIndex]))
            } else {
                state.carts[cartIndex].quantity == 1
                localStorage.setItem("cartIndex", JSON.stringify(state.carts[cartIndex]))
            }
        },
    })
})
const cartLocalSlice = createSlice({
    name: "carts",
    initialState: initialCartLocalState,
    reducers: ({
        listCartLocalSlice: (state: ICartLocalState, actions: PayloadAction<ICartLocal[]>) => {
            state.cartLocals = actions.payload
        },
        removeCartLocalSlice: (state: ICartLocalState, actions: PayloadAction<string>) => {
            if (JSON.parse(userStore)?._id) {
                state.cartLocals = state.cartLocals.filter((cart) => cart._id !== actions.payload)
            } else {
                state.cartLocals = state.cartLocals.filter((cart) => cart.productDetailId !== actions.payload)
            }
        },
        addCartLocalSlice: (state: ICartLocalState, actions: PayloadAction<ICart>) => {
            const cartExistIndex = state.cartLocals.findIndex((cart) => cart.productDetailId === actions.payload.productDetailId)
            if (cartExistIndex !== -1) {
                state.cartLocals[cartExistIndex].quantity += actions.payload.quantity
            } else {
                state.cartLocals = [
                    ...state.cartLocals,
                    {
                        productDetailId: actions.payload.productDetailId,
                        quantity: actions.payload.quantity,
                        totalMoney: actions.payload.totalMoney
                    }
                ]
            }
            localStorage.setItem("carts", JSON.stringify(state.cartLocals))
        }
    })
})


export const { listCartSlice, addCartSlice, removeCartSlice, increaseCartSlice, decreaseCartSlice } = cartSlice.actions
export const { listCartLocalSlice, removeCartLocalSlice, addCartLocalSlice } = cartLocalSlice.actions
export const cartLocalReducer = cartLocalSlice.reducer
export default cartSlice.reducer