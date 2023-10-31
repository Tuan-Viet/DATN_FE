export interface IOrderDetail {
    orderId: string
    productDetailId: string
    price: number
    quantity: number
    color: string
    size: string
    totalMoney: number
}

export interface IOrderDetailState {
    orderDetails: IOrderDetail[]
}