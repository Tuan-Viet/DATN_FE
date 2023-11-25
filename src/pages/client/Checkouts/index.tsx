import { Link, useNavigate } from "react-router-dom";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { useDeleteCartMutation, useListCartQuery } from "../../../store/cart/cart.service";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCartSlice, removeCartSlice } from "../../../store/cart/cartSlice";
import { RootState } from "../../../store";
import { useListProductDetailQuery } from "../../../store/productDetail/productDetail.service";
import { useFetchListProductQuery } from "../../../store/product/product.service";
import { listProductDetailSlice } from "../../../store/productDetail/productDetailSlice";
import { listProductSlice } from "../../../store/product/productSlice";
import { useForm } from "react-hook-form";
import { orderForm, orderSchema } from "../../../Schemas/Order";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddOrderMutation } from "../../../store/order/order.service";
import { Spin, message } from 'antd';
import axios from "axios";
import { useGetOneVoucherQuery, useListVoucherQuery, useUpdateVoucherMutation } from "../../../store/vouchers/voucher.service";
import voucherSlice, { listVoucherSlice } from "../../../store/vouchers/voucherSlice";
import { IVoucher } from "../../../store/vouchers/voucher.interface";
import { toast } from "react-toastify";
const CheckoutsPage = () => {
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate()
  const { data: listCart, isSuccess: isSuccessCart } = useListCartQuery()
  const { data: listProductDetail, isSuccess: isSuccessProductDetail } = useListProductDetailQuery()
  const { data: listProduct, isSuccess: isSuccessListProduct } = useFetchListProductQuery()
  const { data: listVoucher, isSuccess: isSuccessVoucher } = useListVoucherQuery()
  const cartState = useSelector((state: RootState) => state.cartSlice.carts)
  const productDetailState = useSelector((state: RootState) => state.productDetailSlice.productDetails)

  const productState = useSelector((state: RootState) => state.productSlice.products)
  const voucherState = useSelector((state: RootState) => state.voucherSlice.vouchers)
  const [totalCart, setTotalCart] = useState<number>(0)
  const [onAddOrder] = useAddOrderMutation()
  const user = useSelector((state: any) => state?.user);
  const cartStore = JSON.parse(localStorage.getItem("carts")!)
  const [onUpdateVoucher] = useUpdateVoucherMutation()
  const [loading, setLoading] = useState(false);
  const [codeVoucher, setcodeVoucher] = useState<string>("")
  const [idVoucher, setIdVoucher] = useState<string>("")
  const { data: getOneVoucher } = useGetOneVoucherQuery(idVoucher!)

  useEffect(() => {
    if (listCart) {
      if (user?.current?._id) {
        dispatch(listCartSlice(listCart))
      } else {
        dispatch(listCartSlice(cartStore ? cartStore : [])!)
      }
    }
  }, [isSuccessCart])
  useEffect(() => {
    if (listProductDetail) {
      dispatch(listProductDetailSlice(listProductDetail))
    }
  }, [isSuccessProductDetail])
  useEffect(() => {
    if (listProduct) {
      dispatch(listProductSlice(listProduct))
    }
  }, [isSuccessListProduct])
  useEffect(() => {
    if (listVoucher) {
      dispatch(listVoucherSlice(listVoucher))
    }
  }, [isSuccessVoucher])
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<orderForm>({
    resolver: yupResolver(orderSchema)
  })

  const { current } = useSelector((state: any) => state.user);
  useEffect(() => {
    if (current) {
      setValue("status", 1)
      setValue("userId", current?._id)
    }
    if (getOneVoucher) {
      setValue("voucher_code", getOneVoucher?.code)
    }
  }, [setValue, current])
  const onSubmitOrder = async (data: orderForm) => {
    try {
      if (cartState?.length === 0) {
        toast.error("Hiện chưa có sản phẩm nào trong giỏ hàng!")
        navigate("/")
        return
      }
      setLoading(true);
      await onAddOrder(data).then(({ data }: any) => {
        console.log(data);

        if (data.pay_method === "COD") {
          setTimeout(async () => {
            setLoading(false);
            dispatch(listCartSlice([]))
            navigate(`/orders/${data?._id}`)
          }, 2500)
        } else if (data.pay_method === "VNBANK") {

          axios.post(`https://datn-be-gy1y.onrender.com/api/paymentMethod/create_payment_url`, data)
            .then(({ data }) => window.location.href = data)
        }
      }
      )

    } catch (error) {
      console.log(error);
    }
  }

  const handleVoucher = async (voucherId: string) => {
    if (voucherId) {

      await setIdVoucher(voucherId)
      if (getOneVoucher) {
        setValue("voucher_code", getOneVoucher.code)
        setcodeVoucher(getOneVoucher.code!)
      }
    }
  }
  const handleVoucherUpdate = (voucherId: string) => {
    if (voucherId) {
      setcodeVoucher("")
      setIdVoucher("")
      setValue("voucher_code", "")
    }
  }

  useEffect(() => {
    let total = 0
    if (cartState) {
      cartState.map((cart) => {
        total += cart.totalMoney
      })
    }
    if (getOneVoucher && getOneVoucher?.type === "percent") {
      total = total - (total * getOneVoucher?.discount) / 100
      if (total) {
        setValue("totalMoney", total)
        setTotalCart(total)
      }

    } else if (getOneVoucher && getOneVoucher?.type === "value") {
      total = total - getOneVoucher?.discount
      if (total) {
        setValue("totalMoney", total)
        setTotalCart(total)
      }
    } else {
      if (total) {
        setValue("totalMoney", total)
        setTotalCart(total)
      }
    }

  }, [cartState, getOneVoucher])

  const handleFindVoucher = () => {
    if (codeVoucher && voucherState) {
      const voucherByCode = voucherState?.find((voucher) => voucher.code === codeVoucher)
      if (voucherByCode && voucherByCode?._id) {
        setIdVoucher(voucherByCode._id)
        setValue("voucher_code", voucherByCode.code)
      } else {
        toast.error("Mã giảm giá không hợp lệ!")
        setcodeVoucher("")
        setIdVoucher("")
        setValue("voucher_code", "")
      }
    }
  }
  useEffect(() => {
    handleFindVoucher()
  }, [])
  return (
    <>
      {loading && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center flex-col justify-center ">
          <Spin size="large"></Spin>
          <p className="mt-2">Vui lòng đợi giây lát</p>
        </div>
      )}
      <Header></Header>
      <div className="container-2">
        <form onSubmit={handleSubmit(onSubmitOrder)} className="flex gap-[28px] mt-10 mb-10">
          <div className="">

            <div className="flex gap-[28px]">
              <div className="w-[400px]">
                <div className="mb-3">
                  <h3 className="text-lg mb-5 font-bold">
                    Thông tin giao hàng
                  </h3>
                  <p className="text-sm">
                    Bạn đã có tài khoản?{" "}
                    <Link
                      to=""
                      className="text-primary font-semibold text-blue-500"
                    >
                      Đăng nhập
                    </Link>
                  </p>
                </div>
                <div>
                  <div className="mb-3">
                    <input

                      {...register("email")}
                      defaultValue={current ? current?.email : ""}

                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="Email"

                    />
                    <p className="text-red-500 italic text-sm">{errors ? errors.email?.message : ""}</p>
                  </div>
                  <div className="mb-3">
                    <input
                      {...register("fullName")}
                      defaultValue={current ? current?.fullname : ""}

                      type="text"
                      id="fullName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="Họ và tên"

                    />
                    <p className="text-red-500 italic text-sm">{errors ? errors.fullName?.message : ""}</p>

                  </div>
                  <div className="mb-3">
                    <input
                      {...register("phoneNumber")}
                      defaultValue={current ? current?.phoneNumber : ""}

                      type="text"
                      id="phoneNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="Số điện thoại"

                    />
                    <p className="text-red-500 italic text-sm">{errors ? errors.phoneNumber?.message : ""}</p>

                  </div>
                  <div className="mb-3">
                    <input
                      {...register("address")}

                      type="text"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="Địa chỉ"

                    />
                    <p className="text-red-500 italic text-sm">{errors ? errors.address?.message : ""}</p>
                  </div>
                  <div className="mb-3">
                    <textarea
                      {...register("note")}

                      id="note"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
                      placeholder="Ghi chú ..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold">
                      Phương thức vận chuyển
                    </h3>
                  </div>
                  <div>
                    <div className="flex w-[350px] justify-between mb-3 bg-gray-50 border border-gray-300 text-gray-900 p-3 text-sm rounded-lg focus:ring-primary focus:border-primary">
                      <div className="flex gap-3 items-center">
                        Giao hàng tận nơi
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold">
                      Phương thức thanh toán
                    </h3>
                  </div>
                  <p className="text-red-500 italic text-[14px]">{errors ? errors.pay_method?.message : ""}</p>
                  <div>
                    <div className="flex w-[350px] justify-between mb-3 bg-gray-50 border border-gray-300 text-gray-900 p-3 text-sm rounded-lg focus:ring-primary focus:border-primary">
                      <div className="flex gap-3 items-center">
                        <input
                          type="radio"
                          id="cod"
                          {...register("pay_method")}
                          className="bg-gray-50 border border-gray-300 text-primary text-sm rounded-full focus:ring-primary focus:border-primary block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                          value="COD"
                        />
                        <label htmlFor="cod">Thanh toán khi nhận hàng</label>
                      </div>
                    </div>
                    <div className="flex w-[350px] justify-between mb-3 bg-gray-50 border border-gray-300 text-gray-900 p-3 text-sm rounded-lg focus:ring-primary focus:border-primary">
                      <div className="flex gap-3 items-center">
                        <input
                          id="vnbank"
                          {...register("pay_method")}
                          type="radio"
                          className="bg-gray-50 border border-gray-300 text-primary text-sm rounded-full focus:ring-primary focus:border-primary block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                          value="VNBANK"
                        />
                        <label htmlFor="vnbank">Thanh toán bằng ví VN Pay</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-l-[1px] pl-5 w-full">

            <h1 className="text-xl font-bold mb-5">Đơn hàng ({cartState.length} sản phẩm)</h1>
            <div className="pt-7 border-t-[1px] border-b-[1px] h-[250px] overflow-auto pb-2">
              {cartState?.map((cart, index) => {
                return <div key={index}>
                  <input type="text" value={cart.productDetailId} className="hidden" {...register(`carts.${index}.productDetailId`)} />
                  <input type="number" value={cart.quantity} className="hidden" {...register(`carts.${index}.quantity`)} />
                  <input type="text" value={cart.totalMoney} className="hidden" {...register(`carts.${index}.totalMoney`)} />
                  {
                    productDetailState?.filter((proDetail, index) => proDetail?._id === cart?.productDetailId).map((item) => {
                      return <div key={index}>
                        <input type="text" value={item.nameColor} className="hidden" {...register(`carts.${index}.color`)} />
                        <input type="text" value={item.size} className="hidden" {...register(`carts.${index}.size`)} />
                        {productState?.filter((product, index) => product._id === item.product_id).map((pro) => {
                          return <div className="mb-6 flex relative gap-x-20">
                            <input type="text" value={pro.discount} className="hidden" {...register(`carts.${index}.price`)} />
                            <div className="border rounded-lg relative w-[125px] h-[185px]">
                              <img
                                src={item.imageColor}
                                className="w-full h-full rounded-lg object-cover"
                              />
                              <p className="w-5 h-5 bg-primary absolute top-[-5px] right-[-5px] flex bg-black justify-center items-center text-sm text-white font-semibold rounded-full">
                                {cart.quantity}
                              </p>
                            </div>
                            <div>
                              <h3 className="font-bold mb-3">
                                {pro.title}
                              </h3>
                              <p className="text-[15px] font-semibold mb-3">{item.nameColor} / {item.size}</p>
                              <p className="text-[15px] font-semibold mb-3">Số lượng: {cart.quantity}</p>
                              <p className="font-medium">
                                Giá:{" "}
                                <span className="text-red-500 text-xl font-bold">
                                  {cart.totalMoney.toLocaleString("vi-VN")}₫
                                </span>
                              </p>
                            </div>
                          </div>
                        })}
                      </div>
                    })
                  }
                </div>
              })}
            </div>
            <div className="flex gap-[20px] mt-5 w-[700px] flex-nowrap overflow-x-auto">
              {voucherState?.map((voucher, index) => {
                return <div onClick={() => handleVoucher(voucher._id!)} className="border min-w-[300px] pl-6 h-[100px] cursor-pointer rounded-lg hover:text-white hover:bg-black transition-all ease-linear" key={index}>
                  {/* <input className="hidden" value={voucher.code} type="text"  /> */}
                  <div className="border-dashed border-l-2 h-full p-3">
                    <div className="text-[14px]">{voucher.code}<span className="ml-2">(Còn {voucher.quantity})</span></div>
                    <p>giảm {voucher && voucher.type == "percent" ? <>{(voucher.discount)}%</> : <>{(voucher.discount).toLocaleString("vi-VN")}k </>} ({voucher.title})</p>
                  </div>
                </div>
              })}
            </div>
            {/* <div className="flex gap-[20px] my-2 w-[700px] flex-nowrap overflow-x-scroll">
              {voucherState?.map((voucher, index) => {
                return <>
                  <div onClick={() => handleVoucher(voucher._id!)} className="border-2 w-[100%] p-3 overflow-hidden h-[120px] hover:border-2 hover:border-[#000] cursor-pointer transition-all ease-linear" key={index}>
                    <div className="text-[14px]">{voucher.code}<span className="ml-2">(Còn {voucher.quantity})</span></div>
                    <p>giảm {voucher && voucher.type == "percent" ? <>{(voucher.discount)}%</> : <>{(voucher.discount).toLocaleString("vi-VN")}k </>} ({voucher.title})</p>
                  </div>
                </>
              })}
            </div> */}
            <form className="py-5 flex gap-3 border-b-[1px]">
              <input
                type="text"
                className="p-3 border rounded-lg w-full"
                placeholder="Nhập mã giảm giá"
                value={getOneVoucher && !Array.isArray(getOneVoucher) ? getOneVoucher?.code : codeVoucher}
                onChange={(e) => setcodeVoucher(e.target.value)}
              />
              <div onClick={() => handleFindVoucher()} className="p-3 cursor-pointer flex items-center justify-center rounded-lg bg-blue-500 text-white font-medium min-w-[102px]">
                Áp dụng
              </div>
            </form>
            <div className="pt-7 pb-5 border-b-[1px]">
              <div className="flex justify-between mb-4">
                <span>Tạm tính:</span>

                <span className="font-medium">{(totalCart).toLocaleString("vi-VN")}₫</span>
                {/* <span className="font-medium">{(getOneVoucher?.data && getOneVoucher?.!percent ? (totalCart - (totalCart * getOneVoucher?.discount) / 100).toLocaleString("vi-VN") : totalCart).toLocaleString("vi-VN")}₫</span> */}

              </div>
              <div className="flex justify-between">
                <span>Giao hàng tận nơi</span>
                <span className="font-medium">Miễn phí</span>
                {/* <span className="font-medium">40.000₫</span> */}
              </div>
            </div>
            {getOneVoucher?.code ? <p onClick={() => handleVoucherUpdate(getOneVoucher?._id!)} className="text-red-600 text-[14px] text-right mt-2 font-semibold cursor-pointer hover:font-bold">Xóa mã giảm giá {getOneVoucher?.code}?</p> : ""}
            <div className="flex justify-between mb-4 items-center pt-5">
              <span className="text-lg font-semibold">Tổng cộng: </span>
              <span className="text-black text-2xl font-bold">{(totalCart).toLocaleString("vi-VN")}₫</span>

            </div>
            <div className="flex justify-between">
              <Link
                to="/cart"
                className="text-primary font-medium text-sm flex items-center"
              >
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
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                <Link to="/cart">Quay về giỏ hàng</Link>

              </Link>

              <div className="flex flex-col">
                <button className="text-white uppercase font-semibold bg-blue-500 py-4 px-10 rounded-lg min-w-[120px]">
                  Đặt hàng
                </button>
                <Link to={"/signin"} className="italic text-red-500 text-[14px] hover:border-b-2 hover:border-red-300 transition-all ease-linear">{errors ? errors?.userId?.message : ""}</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CheckoutsPage;