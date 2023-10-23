import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import IProduct from "./product.interface"

const productAPI = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api"
    }),
    tagTypes: ["products"],
    endpoints: (builer) => ({
        fetchListProduct: builer.query<IProduct[], void>({
            query: () => `/products`,
            providesTags: ["products"]
        }),
        fetchOneProduct: builer.query({
            query: (id) => `/products/` + id,
            providesTags: ["products"]
        }),
        removeProduct: builer.mutation({
            query: (id) => ({
                url: "/products/" + id,
                method: "DELETE"
            }),
            invalidatesTags: ["products"]
        }),
        addProduct: builer.mutation<IProduct[], IProduct>({
            query: (product) => ({
                url: "/products/add",
                method: "POST",
                body: product
            }),
            invalidatesTags: ["products"]
        }),
        updateProduct: builer.mutation({
            query: ({ id, ...product }) => ({
                url: "/products/" + id,
                method: "PATCH",
                body: product
            }),
            invalidatesTags: ["products"]
        }),
    })
})

export const { useFetchListProductQuery, useFetchOneProductQuery, useRemoveProductMutation, useAddProductMutation, useUpdateProductMutation } = productAPI
export default productAPI