export interface IProductDetail {
    _id?: string
    product_id: string
    nameColor: string
    size: string
    sold: number
    imageColor: string
}
export interface IProductDetailState {
    productDetails: IProductDetail[]
}