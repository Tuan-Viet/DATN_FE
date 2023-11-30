import * as yup from "yup"

export const ForgotAccountSchema = yup.object({
    email: yup.string().required("Email bat buoc"),
})

export type ForgotAccountForm = yup.InferType<typeof ForgotAccountSchema>

