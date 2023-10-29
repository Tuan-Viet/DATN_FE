import { Link } from "react-router-dom";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { useListCartQuery } from "../../../store/cart/cart.service";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCartSlice } from "../../../store/cart/cartSlice";
import { RootState } from "../../../store";
import { useListProductDetailQuery } from "../../../store/productDetail/productDetail.service";
import { useFetchListProductQuery } from "../../../store/product/product.service";
import { listProductDetailSlice } from "../../../store/productDetail/productDetailSlice";
import { listProductSlice } from "../../../store/product/productSlice";

const CheckoutsPage = () => {
  const dispatch: Dispatch<any> = useDispatch()
  const { data: listCart, isSuccess: isSuccessCart } = useListCartQuery()
  const { data: listProductDetail, isSuccess: isSuccessProductDetail } = useListProductDetailQuery()
  const { data: listProduct, isSuccess: isSuccessListProduct } = useFetchListProductQuery()
  const cartState = useSelector((state: RootState) => state.cartSlice.carts)
  const productDetailState = useSelector((state: RootState) => state.productDetailSlice.productDetails)
  const productState = useSelector((state: RootState) => state.productSlice.products)
  const [totalCart, setTotalCart] = useState<number>(0)

  useEffect(() => {
    if (listCart) {
      dispatch(listCartSlice(listCart))
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
    let total = 0
    if (cartState) {
      cartState.map((cart) => {
        total += cart.totalMoney
      })
    }
    setTotalCart(total)
  }, [cartState])
  return (
    <>
      <Header></Header>
      <div className="container-2">
        <form className="flex gap-[28px]">
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
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      id="fullName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="Họ và tên"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      id="phoneNumber"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="Số điện thoại"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                      placeholder="Địa chỉ"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
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
                        <input
                          type="radio"
                          className="bg-gray-50 border border-gray-300 text-primary text-sm rounded-full focus:ring-primary focus:border-primary block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                          required
                        />
                        Giao hàng tận nơi
                      </div>
                      <span>40.000₫</span>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold">
                      Phương thức thanh toán
                    </h3>
                  </div>
                  <div>
                    <div className="flex w-[350px] justify-between mb-3 bg-gray-50 border border-gray-300 text-gray-900 p-3 text-sm rounded-lg focus:ring-primary focus:border-primary">
                      <div className="flex gap-3 items-center">
                        <input
                          type="radio"
                          className="bg-gray-50 border border-gray-300 text-primary text-sm rounded-full focus:ring-primary focus:border-primary block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                          required
                        />
                        Thanh toán khi giao hàng
                      </div>
                    </div>
                    <div className="flex w-[350px] justify-between mb-3 bg-gray-50 border border-gray-300 text-gray-900 p-3 text-sm rounded-lg focus:ring-primary focus:border-primary">
                      <div className="flex gap-3 items-center">
                        <input
                          type="radio"
                          className="bg-gray-50 border border-gray-300 text-primary text-sm rounded-full focus:ring-primary focus:border-primary block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                          required
                        />
                        Thanh toán bằng ví VN Pay
                      </div>
                    </div>
                    <div className="flex w-[350px] justify-between mb-3 bg-gray-50 border border-gray-300 text-gray-900 p-3 text-sm rounded-lg focus:ring-primary focus:border-primary">
                      <div className="flex gap-3 items-center">
                        <input
                          type="radio"
                          className="bg-gray-50 border border-gray-300 text-primary text-sm rounded-full focus:ring-primary focus:border-primary block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                          required
                        />
                        Thanh toán bằng PayPal
                      </div>
                    </div>
                    <div className="flex w-[350px] justify-between mb-3 bg-gray-50 border border-gray-300 text-gray-900 p-3 text-sm rounded-lg focus:ring-primary focus:border-primary">
                      <div className="flex gap-3 items-center">
                        <input
                          type="radio"
                          className="bg-gray-50 border border-gray-300 text-primary text-sm rounded-full focus:ring-primary focus:border-primary block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                          required
                        />
                        Thanh toán bằng MoMo
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-l-[1px] py-5 pl-5 w-full">
            <h1 className="text-xl font-bold mb-5">Đơn hàng ({cartState.length} sản phẩm)</h1>
            <div className="pt-7 border-t-[1px] border-b-[1px] h-[430px] overflow-auto pb-2">
              {cartState?.map((cart, index) => {
                return <div key={index}>
                  {
                    productDetailState?.filter((proDetail, index) => proDetail?._id === cart?.productDetailId).map((item) => {
                      return <div key={index}>
                        {productState?.filter((product, index) => product._id === item.product_id).map((pro) => {
                          return <div className="mb-6 flex relative gap-x-20">
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
                            <button className="absolute right-0 top-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        })}
                      </div>
                    })
                  }
                </div>
              })}
            </div>
            <div className="py-5 flex gap-3 border-b-[1px]">
              <input
                type="text"
                className="p-3 border rounded-lg w-full"
                placeholder="Nhập mã giảm giá"
              />
              <button className="p-3 rounded-lg bg-blue-500 text-white font-medium min-w-[102px]">
                Áp dụng
              </button>
            </div>
            <div className="pt-7 pb-5 border-b-[1px]">
              <div className="flex justify-between mb-4">
                <span>Tạm tính:</span>
                <span className="font-medium">{totalCart.toLocaleString("vi-VN")}₫</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span className="font-medium">40.000₫</span>
              </div>
            </div>
            <div className="flex justify-between mb-4 items-center pt-5">
              <span className="text-lg font-semibold">Tổng cộng: </span>
              <span className="text-black text-2xl font-bold">{(totalCart + 40000).toLocaleString("vi-VN")}₫</span>
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
                <span>Quay về giỏ hàng</span>
              </Link>
              <button className="text-white uppercase font-semibold bg-blue-500 py-4 px-10 rounded-lg min-w-[120px]">
                Đặt hàng
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CheckoutsPage;
