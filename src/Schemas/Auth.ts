import * as yup from "yup"

export const PasswordSchema = yup.object({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmNewPassword: yup.string().oneOf([yup.ref("newPassword")]).required(),
})

export type PasswordForm = yup.InferType<typeof PasswordSchema>

export const AccountSchema = yup.object({
    _id: yup.string().required(),
    fullname: yup.string().required(),
    email: yup.string().required(),
})

export type AccountForm = yup.InferType<typeof AccountSchema>

export const AddressSchema = yup.object({
    fullname: yup.string().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
})

export type AddressForm = yup.InferType<typeof AddressSchema>

