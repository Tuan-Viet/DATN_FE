import * as yup from "yup"

export const orderSchema = yup.object({
    fullName: yup.string().required(),
    email: yup.string().required(),
    phoneNumber: yup.string().required(),
    address: yup.string().required(),
    voucher_code: yup.string(),
    note: yup.string(),
    status: yup.string().required(),
    pay_method: yup.number().required(),
    totalMoney: yup.number().required()
})

export type orderForm = yup.InferType<typeof orderSchema>