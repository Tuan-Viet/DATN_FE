import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IProductDetail } from "./productDetail.interface"

const productDetailAPI = createApi({
    reducerPath: "productDetails",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api"
    }),
    tagTypes: ["productDetail"],
    endpoints: (builer) => ({
        listProductDetail: builer.query<IProductDetail[], void>({
            query: () => `/productDetails`,
            providesTags: ["productDetail"]
        }),
        getOneProductDetail: builer.query({
            query: (id) => `/productDetails/` + id,
            providesTags: ["productDetail"]
        }),
    })
})

export const { useListProductDetailQuery, useGetOneProductDetailQuery } = productDetailAPI
export default productDetailAPI