import * as yup from "yup"

export const CartSchema = yup.object({
    user_id: yup.string(),
    productDetail_id: yup.string().required(),
    price: yup.string().required(),
    quantity: yup.number().required(),
    totalMoney: yup.number().required()
})

export type cartForm = yup.InferType<typeof CartSchema>

