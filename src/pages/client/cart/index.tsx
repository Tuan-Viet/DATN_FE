import { useDispatch, useSelector } from "react-redux";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import { Dispatch, useEffect, useState } from "react";
import { RootState } from "../../../store";
import { decreaseCartSlice, increaseCartSlice, listCartSlice, removeCartSlice } from "../../../store/cart/cartSlice";
import { listProductDetailSlice } from "../../../store/productDetail/productDetailSlice";
import { listProductSlice } from "../../../store/product/productSlice";
import { useDeleteCartMutation, useListCartQuery, useUpdateCartMutation } from "../../../store/cart/cart.service";
import { useListProductDetailQuery } from "../../../store/productDetail/productDetail.service";
import { useFetchListProductQuery } from "../../../store/product/product.service";

const cartPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const { data: listCart, isSuccess: isSuccessCart } = useListCartQuery()
    const { data: listProductDetail, isSuccess: isSuccessProductDetail } = useListProductDetailQuery()
    const { data: listProduct, isSuccess: isSuccessListProduct } = useFetchListProductQuery()
    const cartState = useSelector((state: RootState) => state.cartSlice.carts)
    const productDetailState = useSelector((state: RootState) => state.productDetailSlice.productDetails)
    const productState = useSelector((state: RootState) => state.productSlice.products)
    const [onUpdateCart] = useUpdateCartMutation()
    const [onRemoveCart] = useDeleteCartMutation()
    const [totalCart, setTotalCart] = useState<number>(0)
    const removeCart = async (id: string) => {
        try {
            const isConfirm = window.confirm("Ban co chac chan muon xoa khong?")
            if (isConfirm) {
                await onRemoveCart(id).then(() => dispatch(removeCartSlice(id)))
                alert("xoa thanh cong!")
            }
        } catch (error) {
            console.log(error);

        }
    }
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
    const decreaseCart = async (_id: string) => {
        try {
            if (_id) {
                dispatch(decreaseCartSlice(_id))
            }
            const cartIndex = JSON.parse(localStorage.getItem("cartIndex")!)
            if (cartIndex) {
                await onUpdateCart({ _id, ...cartIndex })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const increaseCart = async (_id: string) => {
        try {
            if (_id) {
                dispatch(increaseCartSlice(_id))
            }
            const cartIndex = JSON.parse(localStorage.getItem("cartIndex")!)
            if (cartIndex) {
                await onUpdateCart({ _id, ...cartIndex })
            }
        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        let total = 0
        if (cartState) {
            cartState.map((cart) => {
                total += cart.totalMoney
            })
        }
        setTotalCart(total)
    }, [cartState])
    return <>
        <Header></Header>
        <div className="py-2 px-[40px] text-[14px] flex bg-gray-100">
            Trang chủ <p className="px-[14px]">/</p>cart
        </div>
        <div className="container px-[50px] bg-white py-20">
            <div className="md:flex md:space-x-6 ">
                <div className="rounded-lg md:w-2/3">
                    <div className="flex justify-between py-4">
                        <h1 className="text-2xl font-bold">Giỏ hàng của bạn</h1>
                        <p className="text-[14px]">Bạn đang có <strong>1 sản phẩm </strong>trong giỏ hàng</p>
                    </div>
                    <hr className="py-4" />
                    <div className="py-4">
                        <h1 className="tracking-wide">Bạn cần mua thêm <strong className="text-red-400">50.000đ</strong> để có thể <strong className="uppercase">miễn phí vận chuyển</strong></h1>
                    </div>
                    {cartState?.map((cart, index) => {
                        return <div key={index}>
                            {
                                productDetailState?.filter((proDetail, index) => proDetail?._id === cart?.productDetailId).map((item) => {
                                    return <>
                                        {productState.filter((product) => product._id === item.product_id).map((pro) => {
                                            return <div className="justify-between mb-6 rounded-lg border-2 bg-white p-6 max-h-[140px] shadow-md sm:flex sm:justify-start relative">
                                                <img src={item.imageColor} alt="product-image" className="w-[80px] rounded-lg sm:w-[80px] h-[90px]" />
                                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                    <div className="mt-5 sm:mt-0">
                                                        {/* name */}
                                                        <h2 className="text-lg font-bold text-gray-900">{pro.title}</h2>
                                                        {/* color and size */}
                                                        <p className="mt-1 text-xs text-gray-700">{item.nameColor} / {item.size}</p>
                                                        {/* price product */}
                                                        <p className="mt-1 text-[14px] text-[#8f9bb3] font-semibold tracking-wide">{pro.price.toLocaleString("vi-VN")}đ</p>
                                                    </div>
                                                    <div className="absolute right-[10px] top-[10px]" onClick={() => removeCart(cart._id!)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block">
                                                        <div className="flex items-center">
                                                            <p className="font-bold tracking-wide text-[15px]">{cart.totalMoney.toLocaleString("vi-VN")}đ</p>
                                                        </div>
                                                        <div className="flex items-center border-gray-100">
                                                            <span onClick={() => decreaseCart(cart._id!)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                                            <input className="appearance-none h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={cart.quantity} min="1" />
                                                            <span onClick={() => increaseCart(cart._id!)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </>
                                })
                            }
                        </div>
                    })}

                    {/* <div className="justify-between mb-6 rounded-lg border-2 bg-white p-6 max-h-[140px] shadow-md sm:flex sm:justify-start relative">
                        <img src="https://product.hstatic.net/200000690725/product/estp041-3_83014782b53841358a80703e3de20b49_medium.jpg" alt="product-image" className="w-[80px] rounded-lg sm:w-[80px] h-[90px]" />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                            <div className="mt-5 sm:mt-0">
                                <h2 className="text-lg font-bold text-gray-900">Áo Polo trơn hiệu ứng ESTP041</h2>
                                <p className="mt-1 text-xs text-gray-700">Trắng - kem đậm / S</p>
                                <p className="mt-1 text-[14px] text-[#8f9bb3] font-semibold tracking-wide">400.000đ</p>
                            </div>
                            <div className="absolute right-[10px] top-[10px]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block">
                                <div className="flex items-center">
                                    <p className="font-bold tracking-wide text-[15px]">400.000đ</p>
                                </div>
                                <div className="flex items-center border-gray-100">
                                    <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                    <input className="appearance-none h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                                    <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="bg-gray-100 w-full p-4">
                        <p className="font-bold text-[14px]">Ghi chú đơn hàng</p>
                        <textarea name="" id="" className="w-full mt-4 focus:outline-none p-4 text-[14px] min-h-[150px]" ></textarea>
                    </div>
                </div >
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <h1 className="font-bold text-[20px] tracking-wide pb-3 border-b-2">Thông tin đơn hàng</h1>
                    <ul className="py-4 text-[14px] text-[#333333] list-disc pl-6">
                        <li className="">Phí vận chuyển sẽ được tính ở trang thanh toán</li>
                        <li className=" mt-2">Bạn cũng có thể nhập mã ở trang thanh toán</li>
                    </ul>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Tổng tiền:</p>
                        <div className="">
                            <p className="mb-1 text-[20px] font-bold text-red-500 tracking-wide">{totalCart.toLocaleString("vi-VN")}đ</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full uppercase rounded-md bg-red-500 py-1.5 font-medium text-red-50 hover:bg-red-600">Thanh toán</button>
                </div>
            </div >
        </div >
        <Footer></Footer>
    </>
}
export default cartPage;