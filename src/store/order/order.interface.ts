import { IOrderDetail } from "../orderDetail/orderDetail.interface"

export interface IOrder {
    _id: string
    fullName: string
    email: string
    phoneNumber: string
    address: {
        myProvince: string,
        myDistrict: string,
        myWard: string,
        detailAddress: string
    }
    note: string
    status: number
    voucher_code: string
    paymentStatus: number
    pay_method: string
    orderDetails: IOrderDetail[]
    orderReturn: any
    createdAt: any
    totalMoney: number


}

export interface IOrderState {
    orders: Partial<IOrder[]>
}

export interface IOrderSearchState {
    searchTerm: string
    orders: IOrder[]
}
