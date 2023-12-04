import IProduct from "../product/product.interface"

export interface IReview {
    productId: IProduct| string;
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