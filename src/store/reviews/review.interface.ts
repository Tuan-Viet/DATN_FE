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
    createdAt: String
}


export interface Types {
    url: string
}
export interface IReviewState {
    reviews: IReview[]
}