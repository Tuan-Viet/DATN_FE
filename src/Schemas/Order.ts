import * as yup from "yup"

export const orderSchema = yup.object({
    fullName: yup.string().trim("Hãy nhập tên của bạn").required("Trường tên bắt buộc nhập"),
    email: yup.string().trim("Hãy nhập email của bạn").required("Trường email bắt buộc nhập"),
    phoneNumber: yup.string().trim("Hãy nhập số điện thoại của bạn").required("Trường số điện thoại bắt buộc nhập"),
    carts: yup.array().of(
        yup.object().shape({
            productDetailId: yup.string().required("truong productDetailId bat buoc"),
            quantity: yup.number().required("truong quantity bat buoc"),
            color: yup.string().required("truong color bat buoc"),
            size: yup.string().required("truong size bat buoc"),
            price: yup.number().required("truong price bat buoc"),
            totalMoney: yup.number().required("truong totalMoney bat buoc")
        })
    ),
    address: yup.string().trim("Hãy nhập số điện thoại của bạn").required("Trường địa chỉ bắt buộc nhập"),
    voucher_code: yup.string(),
    note: yup.string(),
    status: yup.number().required(),
    pay_method: yup.number().required(),
    totalMoney: yup.number().required()
})

export type orderForm = yup.InferType<typeof orderSchema>