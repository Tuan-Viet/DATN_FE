import { IOrderDetail } from "../orderDetail/orderDetail.interface"

export interface IOrderReturn {
    _id: string
    userId: string
    orderId: string
    images: any
    fullName: string
    email: string
    phoneNumber: string
    address: string
    reason: string
    totalMoney: number
    orderDetailIds: IOrderDetail[]
    createdAt: any
}

export interface IOrderReturnState {
    orderReturns: IOrderReturn[]
}