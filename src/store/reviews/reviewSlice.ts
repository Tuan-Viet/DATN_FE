import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IReview, IReviewState } from "./review.interface"

export const initalReviewState: IReviewState = {
    reviews: []
}

const reviewSlice = createSlice({
    name: "reviews",
    initialState: initalReviewState,
    reducers: ({
        listReviewSlice: (state: IReviewState, actions: PayloadAction<IReview[]>) => {
            state.reviews = actions.payload
        },
        // listReviewByProductId: (state: IReviewState, actions: PayloadAction<IReview[]>) => {
        //     state.reviews = actions.payload
        // },
        deleteReviewSlice: (state: IReviewState, actions: PayloadAction<string>) => {
            // state.reviews = state.categories.filter((cate) => cate._id !== actions.payload)
        }
    })
})

export const { listReviewSlice, deleteReviewSlice } = reviewSlice.actions
export default reviewSlice.reducer

