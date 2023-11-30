import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store"
import { useEffect } from "react"
import { Dispatch } from "@reduxjs/toolkit"
import { listVoucherSlice } from "../../../store/vouchers/voucherSlice"
import { useListVoucherQuery } from "../../../store/vouchers/voucher.service"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios"
import { toast } from "react-toastify"

const Vourcher = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const { data: listVoucher, isSuccess: isSuccessVoucher } = useListVoucherQuery()
    const voucherState = useSelector((state: RootState) => state.voucherSlice.vouchers)

    const user = useSelector((state: any) => state?.user);
    console.log(user);

    const addVoucher = async (userId: string, voucherId: string) => {
        if (user.current._id) {
            await axios.put("http://localhost:8080/api/auth/add-vourcher", {
                userId: userId,
                voucherId: voucherId
            });
            //   message.success("Successfully registered");
            toast.success("Lưu mã thành công")
        } else {
            toast.success("Bạn cần đăng nhập để lưu mã")
        }
    }

    useEffect(() => {
        if (listVoucher) {
            dispatch(listVoucherSlice(listVoucher))
        }
    }, [isSuccessVoucher])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    return <>
        <div className="container px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <h1 className="text-[37px] font-semibold uppercase mb-8">
                Voucher dành cho bạn
            </h1>
            {/* <div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-4 md:gap-8"
            > */}
            <Slider {...settings} className=" gap-4 sm:items-stretch md:gap-8">

                {voucherState?.map((voucher, index) => {

                    const currentDate = new Date();
                    const validTo = new Date(voucher.validTo);

                    if (validTo > currentDate && voucher.quantity > 0) {
                        return (
                            <div
                                className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm"
                                key={index}
                            >
                                <div className="p-6 sm:px-8">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Giảm {voucher.discount}
                                        <span className="sr-only">Plan</span>
                                    </h2>

                                    <p className="mt-2 text-gray-700">{voucher.title}</p>
                                </div>

                                <div className="p-2 sm:px-8 ">
                                    <ul className="mt-2 space-y-2 flex justify-between">
                                        <p className="mt-2 text-gray-700">{voucher.code}</p>

                                        <button
                                            className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                                            type="button"
                                            onClick={() => addVoucher(user.current._id, voucher._id)}
                                        >
                                            Lưu mã
                                        </button>
                                    </ul>
                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </Slider>
            {/* </div> */}
        </div >
    </>
}

export default Vourcher