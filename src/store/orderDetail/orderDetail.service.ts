import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IOrderDetail } from "./orderDetail.interface"

const orderDetailAPI = createApi({
    reducerPath: "orderDetails",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://datn-be-gy1y.onrender.com/api"
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
        updateOrderDetail: builer.mutation({
            query: ({ _id, order }) => ({
                url: `/orderDetails/${_id}/update`,
                body: order,
                method: "PATCH"
            }),
            invalidatesTags: ["orderDetail"]
        }),
        deleteOrderDetail: builer.mutation({
            query: (id) => ({
                method: "DELETE",
                url: `/orderDetails/${id}`
            }),
            invalidatesTags: ["orderDetail"]
        }),
    })
})

export const { useListOrderDetailQuery, useGetOneOrderDetailQuery, useUpdateOrderDetailMutation, useDeleteOrderDetailMutation } = orderDetailAPI
export default orderDetailAPI