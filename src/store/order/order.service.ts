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
        getOneOrder: builer.query({
            query: (id) => `/orders/` + id,
            providesTags: ["order"]
        }),
    })
})

export const { useListOrderQuery, useAddOrderMutation, useGetOneOrderQuery } = orderAPI
export default orderAPI