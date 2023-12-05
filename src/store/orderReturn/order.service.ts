import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IOrderReturn } from "./order.interface"
import { orderReturnForm } from "../../Schemas/OrderReturn"

const orderReturnAPI = createApi({
    reducerPath: "orderReturns",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api"
    }),
    tagTypes: ["orderReturn"],
    endpoints: (builer) => ({
        listOrder: builer.query<IOrderReturn[], void>({
            query: () => `/orderReturns`,
            providesTags: ["orderReturn"]
        }),
        addOrder: builer.mutation<orderReturnForm[], orderReturnForm>({
            query: (orderReturn) => ({
                url: "/orderReturns/add",
                method: "POST",
                body: orderReturn
            }),
            invalidatesTags: ["orderReturn"]
        }),
        getOneOrder: builer.query<IOrderReturn, string>({
            query: (id) => `/orderReturns/` + id,
            providesTags: ["orderReturn"]
        }),
        updateOrder: builer.mutation({
            query: ({ id, ...orderReturn }) => ({
                url: `/orderReturns/${id}`,
                method: "PATCH",
                body: orderReturn
            }),
            invalidatesTags: ["orderReturn"]
        }),
    })
})

export const { useListOrderQuery, useAddOrderMutation, useGetOneOrderQuery, useUpdateOrderMutation } = orderReturnAPI
export default orderReturnAPI