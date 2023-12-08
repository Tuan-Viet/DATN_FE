import { IOrderDetail } from "../orderDetail/orderDetail.interface"

export interface IOrderReturn {
    _id: string
    userId: string
    fullName: string
    email: string
    phoneNumber: string
    address: string
    reason: string
    images: any
    totalMoney: number
    orderDetailIds: IOrderDetail[]
    createdAt: any
    orderReturnDetails: any
    status: number
}

export interface IOrderReturnState {
    orderReturns: IOrderReturn[]
}