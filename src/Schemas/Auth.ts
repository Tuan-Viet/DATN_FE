import * as yup from "yup"

export const PasswordSchema = yup.object({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmNewPassword: yup.string().oneOf([yup.ref("newPassword")]).required(),
})

export type PasswordForm = yup.InferType<typeof PasswordSchema>

