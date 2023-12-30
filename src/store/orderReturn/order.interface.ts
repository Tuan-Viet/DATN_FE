import { IOrder } from "../order/order.interface"
import { IOrderDetail } from "../orderDetail/orderDetail.interface"

export interface IOrderReturn {
    _id: string
    userId: string
    orderId: string
    images: any
    fullName: string
    email: string
    phoneNumber: string
    address: {
        myProvince: string,
        myDistrict: string,
        myWard: string,
        detailAddress: string
    }
    reason: string
    note: string
    totalMoney: number
    orderDetailIds: IOrderDetail[]
    createdAt: any
    orderReturnDetails: any
    status: number
    newOrder: IOrder,
    voucher_code: string
    paymentStatus: number
    pay_method: string
    orderDetails: IOrderDetail[]
    orderReturn: any
}

export interface IOrderReturnState {
    orderReturns: IOrderReturn[]
}