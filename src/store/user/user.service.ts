import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "..";

interface IAuth {
    _id: string;
    fullname: string;
    email: string
}

interface IPassword {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string
}

const authApi = createApi({
    reducerPath: "auths",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api",
        prepareHeaders(headers, { getState }) {
            const token = (getState() as RootState).user.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ["auth"],
    endpoints: (builer) => ({

        updateAccount: builer.mutation<IAuth[], IAuth>({
            query: ({ _id, ...auth }) => ({
                url: `/auth/user/${_id}/update`,
                method: "PATCH",
                body: auth
            }),
            invalidatesTags: ["auth"]
        }),

        changePassword: builer.mutation<IPassword[], IPassword>({
            query: (auth) => ({
                url: "/auth/user/change/password",
                method: "POST",
                body: auth
            }),
            invalidatesTags: ["auth"]
        }),
    })
})

export const { useChangePasswordMutation, useUpdateAccountMutation } = authApi
export default authApi