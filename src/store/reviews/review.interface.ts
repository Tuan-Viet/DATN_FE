export interface IReview {
    productId: string
    userId: string
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