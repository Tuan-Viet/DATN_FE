import IProduct from "../product/product.interface"

export interface IReview {
    productId: string
    userId: {
        _id: string
        fullname: string
    }
    color: string
    size: string
    rating: number
    comment: string
    images: Types[]
    createdAt: string
}


export interface Types {
    url: string
}
export interface IReviewState {
    reviews: IReview[]
}
export interface IReviewDashboard {
    productId: IProduct;
    userId: {
        _id: string
        fullname: string
    }
    color: string
    size: string
    rating: number
    comment: string
    images: Types[]
    createdAt: string
}
export interface IReviewByRateState {
    rating: number | null
    reviews: IReview[]
}
export interface IReviewByUserState {
    userId: string
    reviews: IReview[]
}