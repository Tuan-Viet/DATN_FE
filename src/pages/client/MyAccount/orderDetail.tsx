import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import {
  useGetOneOrderQuery,
  useUpdateOrderMutation,
} from "../../../store/order/order.service";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, useEffect, useState } from "react";
import { useListOrderDetailQuery, useUpdateOrderDetailMutation } from "../../../store/orderDetail/orderDetail.service";
import { listOrderDetailSlice } from "../../../store/orderDetail/orderDetailSlice";
import { RootState } from "@reduxjs/toolkit/query";
import { useGetOneProductDetailQuery, useListProductDetailQuery } from "../../../store/productDetail/productDetail.service";
import { useFetchListProductQuery, useFetchOneProductQuery } from "../../../store/product/product.service";
import { listProductDetailSlice } from "../../../store/productDetail/productDetailSlice";
import { listProductSlice } from "../../../store/product/productSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { orderReturnForm, orderReturnSchema } from "../../../Schemas/OrderReturn";
import { useAddOrderMutation } from "../../../store/orderReturn/order.service";
import { current } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { ReviewForm, ReviewSchema } from "../../../Schemas/Review";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Modal, Rate, Upload, UploadFile, UploadProps, message, notification } from "antd";
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useAddReviewMutation } from "../../../store/reviews/review.service";

function formatDateStringToDisplayDate(dateString) {
  const originalDate = new Date(dateString);

  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1;
  const year = originalDate.getFullYear();
  const hours = originalDate.getHours();
  const minutes = originalDate.getMinutes();

  let amPm = "SA";
  if (hours >= 12) {
    amPm = "CH";
  }

  const formattedDate = `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""
    }${month}/${year}, ${hours > 12 ? hours - 12 : hours}:${minutes < 10 ? "0" : ""
    }${minutes}${amPm}`;
  return formattedDate;
}

function mapStatusToText(statusCode) {
  switch (statusCode) {
    case 0:
      return "Bạn đã hủy đơn hàng này";
    case 1:
      return "Chờ xử lý";
    case 2:
      return "Đã chuẩn bị hàng";
    case 3:
      return "Đơn hàng đang được giao đến bạn";
    case 4:
      return "Đã nhận hàng";
    default:
      return "Trạng thái không xác định";
  }
}

function mapStatusPaymentToText(statusCode) {
  switch (statusCode) {
    case "0":
      return "Chưa thanh toán";
    case "1":
      return "Đã thanh toán";
    default:
      return "Trạng thái không xác định";
  }
}

const OrderDetail = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { handleSubmit, register, setValue, formState: { errors } } = useForm<ReviewForm>({
    resolver: yupResolver(ReviewSchema)
  })
  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    if (user) {
      setValue("user_id", user?.current?._id)
    }
  }, [user])
  const isLoggedIn = user?.isLoggedIn;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/");
    }
  }, [navigate]);

  const { id } = useParams();
  const { data: order } = useGetOneOrderQuery(id!);
  const { data: listOrderDetail, isSuccess: isSuccessListOrder } = useListOrderDetailQuery();
  const { data: listProductDetail, isSuccess: isSuccessListProductDetail } = useListProductDetailQuery();
  const { data: listProduct, isSuccess: isSuccessProduct } = useFetchListProductQuery();
  // const [productsInOrderState, setProductsInOrder] = useState<any>([])
  const [onaddReviews] = useAddReviewMutation()
  useEffect(() => {
    if (listOrderDetail) {
      dispatch(listOrderDetailSlice(listOrderDetail));
    }
  }, [isSuccessListOrder, isModalOpen])
  useEffect(() => {
    if (listProductDetail) {
      dispatch(listProductDetailSlice(listProductDetail));
    }
  }, [isSuccessListProductDetail])
  useEffect(() => {
    if (listProduct) {
      dispatch(listProductSlice(listProduct));
    }
  }, [isSuccessProduct])

  const [updateOrder] = useUpdateOrderMutation();

  const productDetailState = useSelector(
    (state: RootState) => state.productDetailSlice.productDetails
  );
  const productState = useSelector(
    (state: RootState) => state.productSlice.products
  );
  const listOrderDetailState = useSelector(
    (state: RootState) => state.orderDetailSlice.orderDetails
  );

  const orderDetailIds = order?.orderDetails.map(
    (orderDetail: any) => orderDetail?._id
  );
  const productsInOrder = listOrderDetailState?.filter((orderDetail: any) =>
    orderDetailIds?.includes(orderDetail._id)
  );

  let totalProductPrice = 0;
  productsInOrder?.forEach((product: any) => {
    totalProductPrice += product.totalMoney;
  });
  const handleCancelOrder = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này")) {
      try {
        const updatedOrder = { ...order, status: 0 };
        await updateOrder({ id: id, ...updatedOrder });
        toast.success("Hủy đơn hàng thành công");
      } catch (error) {
        console.error("Lỗi khi thực hiện hủy đơn hàng: ", error);
      }
    }
  };

  const handleConfirmReceived = async () => {
    Swal.fire({
      title: "Bạn đã nhận được hàng chưa?",
      showCancelButton: true,
      confirmButtonText: "Đã nhận hàng",
      cancelButtonText: "Chưa nhận hàng",
      icon: "question",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const updatedOrder = { ...order, status: 4 };
          await updateOrder({ id: id, ...updatedOrder });
          toast.success("Xác thực đơn hàng thành công");
        } catch (error) {
          console.error("Lỗi khi xác thực đơn hàng: ", error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        try {
          const updatedOrder = { ...order, status: 3 };
          await updateOrder({ id: id, ...updatedOrder });
        } catch (error) {
          console.error("Lỗi khi chuyển trạng thái về chưa nhận hàng: ", error);
        }
      }
    });
  };
  const [idProduct, setIdProduct] = useState<string>("")
  const [idProductDetail, setIdProductDetail] = useState<string>("")
  const { data: getOneProduct } = useFetchOneProductQuery(idProduct!)
  const { data: getOneProductDetail } = useGetOneProductDetailQuery(idProductDetail!)
  const [orderDetailId, setOrderDetailId] = useState<string>("")
  const showModal = (id: string, idProDetail: string, orderDetailId: string) => {
    if (id) {
      setIdProduct(id)
      if (orderDetailId) {
        setOrderDetailId(orderDetailId)
      }
      setIdProductDetail(idProDetail)
      setValue("product_id", id)
    }
    setIsModalOpen(true);
  };

  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const showOrderModal = () => {
    setIsModalOpen(true);
  };
  const handleOrderCancel = () => {
    setIsModalOpen(false);
  };

  const {
    register: registerOrder,
    setValue: setOrderValue,
    handleSubmit: handleOrderSubmit,
    formState: { errors: OrderErrors }
  } = useForm<orderReturnForm>({
    resolver: yupResolver(orderReturnSchema)
  })

  const [addOrderreturn] = useAddOrderMutation()
  const [updatedOrder] = useUpdateOrderMutation()

  const onAddOrderReturn = async (data: orderReturnForm) => {
    await addOrderreturn(data)
    await updateOrder({ id: id, status: 5 })
    toast.success('Trả hàng thành công vui lòng đợi xác nhận')
    setIsModalOpen(false);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [onupdateOrderDetail] = useUpdateOrderDetailMutation()

  const onFinish = async (values: any) => {
    // console.log('Uploaded files:', fileList);
    const imageObjects = fileList.map(file => ({
      url: file.response[0].url,
      publicId: file.response[0].publicId
    }));
    values.images = imageObjects;
    if (idProduct && user?.current?._id && getOneProductDetail) {
      const valuesData = { ...values, color: getOneProductDetail.nameColor, size: getOneProductDetail.size, userId: user.current._id, productId: idProduct }
      await onaddReviews(valuesData)
      if (orderDetailId) {
        await onupdateOrderDetail({ _id: orderDetailId, order: { isReviewed: true } })
      }
      navigate(`/products/${idProduct}`)
      message.success("Cảm ơn bạn đã đánh giá!")
      setIsModalOpen(false);
    }
  };
  // useEffect(() => {
  //   if (productsInOrder) {
  //     setProductsInOrder(productsInOrder)
  //   }
  // }, [listOrderDetailState, isModalOpen])
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const handleRemoveImage = async (file: UploadFile) => {
    console.log(file);
    try {
      await axios.delete(`http://localhost:8080/api/images/remove/${file.response[0].publicId}`);
      notification.success({
        message: "Xóa ảnh thành công",
        duration: 5,
        closeIcon: true
      });
    } catch (error) {
      // console.error("Lỗi khi xóa ảnh", error);
    }
  };
  return (
    <>
      <Header></Header>
      <div className="container">
        {/* <Rate /> */}
        <div className="mt-14">
          <h1 className="text-[25px] mb-7 font-bold text-center pb-5 relative">
            Chi tiết đơn hàng
            <div className="absolute w-[60px] h-1 bg-black bottom-0 left-1/2 transform -translate-x-1/2"></div>
          </h1>
          <div className="flex">
            <div className="w-[380px]">
              <h2 className="font-bold uppercase mb-3 text-lg">Tài khoản</h2>
              <div className="flex items-center gap-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <Link to="/account">Thông tin tài khoản</Link>
              </div>
              <div className="flex items-center gap-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <Link to="/account/orders">Đơn hàng đã đặt</Link>
              </div>
              <div className="flex items-center gap-x-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <Link to="/account/addresses">Danh sách địa chỉ</Link>
              </div>
            </div>
            <div className="w-[1130px]">
              <div className="mb-[140px]">
                <div className="mb-7 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      ĐƠN HÀNG: #{id}
                    </h3>
                    <p className="text-sm cursor-pointer mb-3">
                      Đặt lúc —{" "}
                      {formatDateStringToDisplayDate(order?.createdAt)}
                    </p>
                    <h1 className="mb-3">
                      Trạng thái đơn hàng:{" "}
                      <span className="text-lg font-bold">
                        {mapStatusToText(order?.status)}
                      </span>
                    </h1>
                    {order?.status !== 0 && order?.status !== 1 && order?.status !== 2 && (
                      <>
                        <p>
                          Nếu bạn đã nhận được hàng, vui lòng ấn vào{" "}
                          <button
                            onClick={handleConfirmReceived}
                            className="text-blue-500 underline"
                          >
                            xác thực đơn hàng
                          </button>
                        </p>

                      </>
                    )}
                    {order?.status == 3 && (
                      <Button type="primary" onClick={showOrderModal} className="text-white bg-blue-700"  >
                        Trả hàng
                      </Button>
                    )}
                  </div>
                  <Modal
                    title="Trả hàng"
                    centered
                    open={isModalOrderOpen}
                    onOk={handleSubmit(onAddOrderReturn)}
                    onCancel={(handleOrderCancel)}
                    width={1000}
                  >

                    <form className=" mx-auto" onSubmit={handleSubmit(onAddOrderReturn)}>
                      <input type="hidden" value={user.current._id} {...registerOrder("userId")} id="userId" />
                      <div className="mb-5">
                        <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Họ tên người gửi</label>
                        <input {...registerOrder("fullName")} type="text" id="fullName" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Số điện thoại người gửi</label>
                        <input type="text" {...registerOrder("phoneNumber")} id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Địa chỉ gửi</label>
                        <input type="text" {...registerOrder("address")} id="address" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Lý do trả hàng</label>
                        <input type="text" {...registerOrder("reason")} id="reason" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Sản phẩm trả hàng</label>
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-sm uppercase border-b-2 border-black bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Sản phẩm
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Đơn giá
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Số lượng
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Thành tiền
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {productsInOrder?.map((product, index) => {
                                return (
                                  <>
                                    {productDetailState
                                      ?.filter(
                                        (proDetail) =>
                                          proDetail._id === product.productDetailId
                                      )
                                      .map((item) => {
                                        return (
                                          <>
                                            {productState
                                              ?.filter(
                                                (prod) => prod._id === item.product_id
                                              )
                                              .map((pro) => (

                                                <tr className="bg-white ">
                                                  <input type="hidden" {...registerOrder(`orderDetailIds.${index}.productDetailId`)} value={item._id} className="" />
                                                  <input type="hidden" {...registerOrder(`orderDetailIds.${index}.color`)} value={product.color} className="" />
                                                  <input type="hidden" {...registerOrder(`orderDetailIds.${index}.size`)} value={product.size} className="" />
                                                  <input type="hidden" {...registerOrder(`orderDetailIds.${index}.price`)} value={product.price} className="" />
                                                  <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-x-5"
                                                  >
                                                    <img
                                                      src={item.imageColor}
                                                      alt={pro.title}
                                                      className="w-[58px] h-[78px] object-cover"
                                                    />
                                                    <div>
                                                      <p className="mb-4 max-w-[340px]">
                                                        {pro.title}
                                                      </p>
                                                      <p>
                                                        {product.color} / {product.size}
                                                      </p>
                                                    </div>
                                                  </th>
                                                  <td className="px-6 py-4">
                                                    {product.price.toLocaleString(
                                                      "vi-VN"
                                                    )}
                                                    ₫
                                                  </td>
                                                  <td className="px-6 py-4">

                                                    <div className="relative flex items-center max-w-[8rem]">
                                                      <input type="number" {...registerOrder(`orderDetailIds.${index}.quantity`)} className="border-x-0 border-gray-300" onChange={(e) => e.target.value} placeholder="0" required min={0} max={product.quantity} />
                                                      /{product.quantity}
                                                    </div>
                                                  </td>
                                                  <td className="px-6 py-4">
                                                    {product.totalMoney.toLocaleString(
                                                      "vi-VN"
                                                    )}
                                                    ₫
                                                  </td>
                                                </tr>
                                              ))}
                                          </>
                                        );
                                      })}
                                  </>
                                );
                              })}
                            </tbody>
                            <tfoot>
                              <tr className="font-semibold text-gray-900 dark:text-gray">
                                <th scope="row" className="px-6 py-3 text-base">Total</th>
                                <td className="px-6 py-3">3</td>
                                <td className="px-6 py-3">21,000</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                      </div>
                    </form>


                  </Modal>
                  <div className="text-right">
                    {order?.status !== 4 && order?.status !== 3 && order?.status !== 0 && (
                      <button
                        onClick={() => handleCancelOrder(id!)}
                        className="text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm cursor-pointer px-5 py-2.5 mr-2 mb-2"
                      >
                        Hủy đơn hàng
                      </button>
                    )}
                    <Link
                      to="/account"
                      className="text-white block bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm cursor-pointer px-5 py-2.5 mr-2 mb-2"
                    >
                      Quay lại trang tài khoản
                    </Link>
                  </div>
                </div>
                <div className="relative overflow-x-auto mb-9 shadow-md sm:rounded-lg">
                  <table className="w-full text-[15px] text-left border-8 border-[#d9edf7]">
                    <thead className="text-sm cursor-pointer uppercase border-b-2 border-black bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Sản phẩm
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Mã sản phẩm
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Đơn giá
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Số lượng
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Thành tiền
                        </th>
                        {order && order.status === 4 && <th scope="col" className="px-6 py-3">
                          Đánh giá
                        </th>}
                      </tr>
                    </thead>
                    <tbody>
                      {productsInOrder?.map((product: any) => {
                        return (
                          <>
                            {productDetailState
                              ?.filter(
                                (proDetail: any) =>
                                  proDetail._id === product.productDetailId
                              )
                              .map((item: any) => {
                                return (
                                  <>
                                    {productState
                                      ?.filter(
                                        (prod: any) => prod._id === item.product_id
                                      )
                                      .map((pro: any) => (
                                        <tr className="bg-white">
                                          <th
                                            scope="row"
                                            className="font-medium text-gray-900 whitespace-nowrap flex items-center gap-x-5"
                                          >
                                            <Link to={`/products/${pro._id!}`} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-x-5">
                                              <img
                                                src={item.imageColor}
                                                alt={pro.title}
                                                className="w-[58px] h-[78px] object-cover"
                                              />
                                              <div>
                                                <p className="mb-4 max-w-[340px]">
                                                  {pro.title}
                                                </p>
                                                <p>
                                                  {product.color} / {product.size}
                                                </p>
                                              </div>
                                            </Link>
                                          </th>
                                          <td className="px-6 py-4">
                                            ESTP03872PE00SB_BL-XXL
                                          </td>
                                          <td className="px-6 py-4">
                                            {product.price.toLocaleString(
                                              "vi-VN"
                                            )}
                                            ₫
                                          </td>
                                          <td className="px-6 py-4">
                                            {product.quantity}
                                          </td>
                                          <td className="px-6 py-4">
                                            {product.totalMoney.toLocaleString(
                                              "vi-VN"
                                            )}
                                            ₫
                                          </td>
                                          <td>
                                            {order && order.status === 4 && product.isReviewed === false && <div onClick={() => showModal(pro._id!, product.productDetailId!, product._id!)} className="bg-black flex item-center justify-center text-white py-2 mx-3 rounded-[30px] cursor-pointer">Đánh giá</div>}
                                            {order && order.status === 4 && product.isReviewed === true && <div className="bg-gray-300 flex item-center justify-center text-white py-2 mx-3 rounded-[30px] cursor-pointer">Đã đánh giá</div>}
                                          </td>
                                        </tr>
                                      ))}
                                  </>
                                );
                              })}
                          </>
                        );
                      })}
                    </tbody>
                    <tbody>
                      <tr className="bg-white border-t">
                        <th
                          scope="row"
                          className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap flex items-center gap-x-5"
                        >
                          Giá sản phẩm
                        </th>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4 font-bold">
                          {totalProductPrice.toLocaleString("vi-VN")}₫
                        </td>
                      </tr>
                      <tr className="bg-white">
                        <th
                          scope="row"
                          className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap flex items-center gap-x-5"
                        >
                          Giao hàng tận nơi
                        </th>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4 font-bold">40,000₫</td>
                      </tr>
                      <tr className="bg-white">
                        <th
                          scope="row"
                          className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap flex items-center gap-x-5"
                        >
                          Tổng tiền
                        </th>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4"></td>
                        <td className="px-6 py-4 font-bold">
                          {(totalProductPrice + 40000).toLocaleString("vi-VN")}₫
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h2 className="font-bold text-lg uppercase mb-5">
                    Địa chỉ nhận hàng
                  </h2>
                  <div className="bg-[#d9edf7] text-[#31708f] border border-[#bce8f1] p-3 mb-5 rounded-lg">
                    <p className="mb-2">
                      Tình trạng thanh toán:{" "}
                      {mapStatusPaymentToText(order?.paymentStatus)}
                    </p>
                    <p>Vận chuyển: Chờ xử lý</p>
                  </div>
                  <div>
                    <p className="mb-2">
                      Họ tên:{" "}
                      <span className="font-bold">{order?.fullName}</span>
                    </p>
                    <p className="mb-2">
                      Địa chỉ:{" "}
                      <span className="font-bold">{order?.address}</span>
                    </p>
                    <p className="mb-2">
                      Số điện thoại:{" "}
                      <span className="font-bold">{order?.phoneNumber}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* overlayProduct-reviewed */}
          {order && order.status === 4 &&
            <>
              {/* <Button ghost type="primary" onClick={showModal}>
                Open Modal
              </Button> */}
              <Modal
                cancelButtonProps={{ style: { display: 'none' } }}
                title="Đánh giá của bạn" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                  name="basic"
                  layout="vertical"
                  style={{ maxWidth: 600 }}
                  onFinish={onFinish}
                >
                  {getOneProduct && getOneProductDetail &&
                    <div className="">
                      <div className="flex pb-3">
                        <img className="" width={80} src={getOneProduct.images?.[0]} alt="" />
                        <div className="flex flex-col p-2">
                          <p>{getOneProduct?.title}</p>
                          <div className="bg-gray-300 px-2 flex items-center w-auto rounded-sm text-sm my-1">
                            {getOneProductDetail.nameColor} / {getOneProductDetail.size}
                          </div>
                          <div className="flex ">
                            <del className="text-gray-400">{getOneProduct?.price?.toLocaleString("vi-VN")}đ</del>
                            <p className="ml-2">{getOneProduct?.discount?.toLocaleString("vi-VN")}đ</p>
                          </div>
                        </div>
                      </div>
                      <Form.Item
                        label="Đánh giá"
                        name="rating"
                        className="text-xl"
                        rules={[{ required: true, message: 'Hãy đánh giá sao' }]}
                      >
                        <Rate className="text-2xl" />
                      </Form.Item>
                    </div>
                  }

                  <Form.Item
                    label="Bình luận"
                    name="comment"
                    rules={[{ required: true, message: 'Hãy nhập tối thiểu 10 kí tự bạn nhé!' }]}
                  >
                    <TextArea />
                  </Form.Item>
                  <Form.Item name="images"
                    label="Ảnh đánh giá"
                    rules={[{ required: true, message: 'Hãy nhập ảnh của bạn để đánh giá' }]}

                  >

                    <Upload name='images'
                      multiple
                      action={'http://localhost:8080/api/images/upload'}
                      fileList={fileList}
                      onChange={handleChange}
                      listType="picture-card"
                      iconRender={() => <LoadingOutlined />}
                      onRemove={(file) => handleRemoveImage(file)}
                    >
                      {fileList.length >= 5 ? null : <Button className="text-sm" icon={<UploadOutlined />}>Tải ảnh lên</Button>}
                    </Upload>
                  </Form.Item>

                  <Form.Item >
                    <Button type="primary" className="bg-black w-full py-3 flex items-center justify-center" htmlType="submit">
                      Viết đánh giá
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </>}
        </div>
      </div >
      <Footer></Footer>
    </>
  );
};

export default OrderDetail;
