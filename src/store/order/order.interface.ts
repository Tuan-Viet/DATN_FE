import { IOrderDetail } from "../orderDetail/orderDetail.interface"

export interface IOrder {
    fullName: string
    email: string
    phoneNumber: string
    address: string
    voucher_code: string
    note: string
    status: number
    pay_method: number
    totalMoney: number
    orderDetails: IOrderDetail[]
}

export interface IOrderState {
    orders: IOrder[]
}