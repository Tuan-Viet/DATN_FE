import * as yup from "yup"

export const orderReturnSchema = yup.object({
    _id: yup.string(),
    userId: yup.string().required("Bạn cần phải đăng nhập"),
    fullName: yup.string().trim("Hãy nhập tên của bạn").required("Trường tên bắt buộc nhập"),
    phoneNumber: yup.string().trim("Hãy nhập số điện thoại của bạn").required("Trường số điện thoại bắt buộc nhập"),
    orderDetailIds: yup.array().of(
        yup.object().shape({
            productDetailId: yup.string().required("truong productDetailId bat buoc"),
            quantity: yup.number().required("truong quantity bat buoc"),
            color: yup.string().required("truong color bat buoc"),
            size: yup.string().required("truong size bat buoc"),
            price: yup.number().required("truong price bat buoc"),
            // totalMoney: yup.number().required("truong totalMoney bat buoc")
        })
    ),
    address: yup.string().trim("Hãy nhập địa chỉ của bạn").required("Trường địa chỉ bắt buộc nhập"),
    reason: yup.string().required(),
    // totalMoney: yup.number().required(),
    createdAt: yup.date()
})

export type orderReturnForm = yup.InferType<typeof orderReturnSchema>