import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IOrderDetail } from "./orderDetail.interface"

const orderDetailAPI = createApi({
    reducerPath: "orderDetails",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api"
    }),
    tagTypes: ["orderDetail"],
    endpoints: (builer) => ({
        listOrderDetail: builer.query<IOrderDetail[], void>({
            query: () => `/orderDetails`,
            providesTags: ["orderDetail"]
        }),
        getOneOrderDetail: builer.query<IOrderDetail[], IOrderDetail>({
            query: (id) => `/orderDetails/` + id,
            providesTags: ["orderDetail"]
        }),
    })
})

export const { useListOrderDetailQuery, useGetOneOrderDetailQuery } = orderDetailAPI
export default orderDetailAPI