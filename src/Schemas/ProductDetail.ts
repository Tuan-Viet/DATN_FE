import * as yup from "yup"

export const productDetailSchema = yup.object({
    product_id: yup.string().required("thieu id"),
    nameColor: yup.string(),
    size: yup.string().required("thieu size"),
    quantity: yup.number().min(0).required("thieu quantity"),
})

export type productDetailForm = yup.InferType<typeof productDetailSchema>

