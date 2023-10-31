import { IProductDetail } from "../productDetail/productDetail.interface";

export interface ICart {
    _id?: string
    productDetailId: string
    quantity: number
    totalMoney: number
}

export interface ICartState {
    carts: ICart[]
}