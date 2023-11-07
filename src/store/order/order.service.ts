import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IOrder } from "./order.interface"
import { orderForm } from "../../Schemas/Order"

const orderAPI = createApi({
    reducerPath: "orders",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api"
    }),
    tagTypes: ["order"],
    endpoints: (builer) => ({
        listOrder: builer.query<IOrder[], void>({
            query: () => `/orders`,
            providesTags: ["order"]
        }),
        addOrder: builer.mutation<orderForm[], orderForm>({
            query: (order) => ({
                url: "/orders/add",
                method: "POST",
                body: order
            }),
            invalidatesTags: ["order"]
        }),
        getOneOrder: builer.query<IOrder, string>({
            query: (id) => `/orders/` + id,
            providesTags: ["order"]
        }),
        cancelOrder: builer.mutation({
            query: ({id, ...order}) => ({
                url: `/orders/${id}`,
                method: "PATCH",
                body: order
            }),
            invalidatesTags: ["order"],
        }),
    })
})

export const { useListOrderQuery, useAddOrderMutation, useGetOneOrderQuery, useCancelOrderMutation} = orderAPI
export default orderAPI