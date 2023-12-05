import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IReview } from "./review.interface"
const ReviewApi = createApi({
    reducerPath: "reviews",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/auth"
    }),
    tagTypes: ["reviews"],
    endpoints: (builer) => ({
        fetchListReviews: builer.query<IReview[], void>({
            query: () => `/reviews`,
            providesTags: ["reviews"]
        }),
        fetchOneReview: builer.query({
            query: (id) => `/review/` + id,
            providesTags: ["reviews"]
        }),
        removeReview: builer.mutation<IReview, string>({
            query: (id) => ({
                url: "/review/" + id,
                method: "DELETE"
            }),
            invalidatesTags: ["reviews"]
        }),
        addReview: builer.mutation<IReview[], IReview>({
            query: (review) => ({
                url: "/review",
                method: "POST",
                body: review
            }),
            invalidatesTags: ["reviews"]
        }),
        updateReview: builer.mutation({
            query: ({ id, ...review }) => ({
                url: `/review/${id}/edit`,
                method: "PATCH",
                body: review
            }),
            invalidatesTags: ["reviews"]
        }),
    })
})

export const { useFetchListReviewsQuery, useFetchOneReviewQuery, useRemoveReviewMutation, useUpdateReviewMutation, useAddReviewMutation } = ReviewApi
export default ReviewApi