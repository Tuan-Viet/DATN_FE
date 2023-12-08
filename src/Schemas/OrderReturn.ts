import * as yup from "yup"

export const orderReturnSchema = yup.object({
    _id: yup.string(),
    userId: yup.string().required("Bạn cần phải đăng nhập"),
    images: yup.array().of(
        yup.object().shape({
            url: yup.string()
        })
    ),
    fullName: yup.string().trim("Hãy nhập tên người gửi ").required("Trường tên người gửi bắt buộc nhập"),
    phoneNumber: yup.string().trim("Hãy nhập số điện thoại người gửi").required("Trường số điện thoại người gửi bắt buộc nhập"),
    orderDetailIds: yup.array().of(
        yup.object().shape({
            productDetailId: yup.string(),
            orderDetailId: yup.string(),
            quantity: yup.number().min(0),
            color: yup.string(),
            size: yup.string(),
            price: yup.number(),
            // totalMoney: yup.number().required("truong totalMoney bat buoc")
        })
    ),
    orderId: yup.string().required(),
    address: yup.string().trim("Hãy nhập địa chỉ của bạn").required("Trường địa chỉ bắt buộc nhập"),
    reason: yup.string().required(),
    // totalMoney: yup.number().required(),
    createdAt: yup.date()
})

export type orderReturnForm = yup.InferType<typeof orderReturnSchema>