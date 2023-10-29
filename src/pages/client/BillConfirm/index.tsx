import React from "react";
import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { Link } from "react-router-dom";

const BillConfirm = () => {
  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="mt-16 px-32 mb-16">
          <div className="text-center mb-14">
            <h1 className="uppercase text-[35px] font-bold mb-6">
              Đặt hàng thành công!
            </h1>
            <div className="max-w-[950px] mb-7 font-medium mx-auto">
              <p className="mb-3">
                Trên thị trường có quá nhiều sự lựa chọn, cảm ơn bạn đã lựa chọn
                mua sắm tại <b>Hustle</b>
              </p>
              <p>
                Đơn hàng của bạn CHẮC CHẮN đã được chuyển tới hệ thống xử lý đơn
                hàng của Hustle. Trong quá trình xử lý Hustle sẽ liên hệ lại nếu
                như cần thêm thông tin từ bạn. Ngoài ra Hustle cũng sẽ có gửi
                xác nhận đơn hàng bằng Email.
              </p>
            </div>
            <Link
              to="/"
              className="py-4 px-10 rounded-full bg-black text-white inline-block"
            >
              Khám phá thêm các sản phẩm khác tại đây
            </Link>
          </div>
          <div className="mb-5">
            <h1 className="text-[30px] text-center font-semibold mb-5">
              Thông tin đơn hàng #28441184018
            </h1>
            <div className="relative overflow-x-auto border sm:rounded-xl">
              <table className="w-full text-sm text-left">
                <thead className="">
                  <tr className="bg-[#2f5acf] text-white">
                    <th scope="col" className="px-6 py-3">
                      Tên sản phẩm
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Số lượng
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Giá niêm yết
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Biến thể
                    </th>
                    <th scope="col" className="px-6 py-3 text-right">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4 flex gap-x-3 items-center">
                      <img
                        src="/images/img-product/polo-hoa-tiet.jpg"
                        alt="Apple Watch"
                        className="rounded-lg w-[70px] h-[100px] object-cover"
                      />
                      <span className="font-bold">
                        Áo khoác thể thao Pro Active
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">1</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      499.000đ
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      Xám / L
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-right">
                      499.000đ
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      Tổng giá trị sản phẩm
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-right">
                      499.000đ
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      Mã giảm giá
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-right"></td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      Tổng khuyến mãi
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-right">
                      0đ
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      Phí giao hàng
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900"></td>
                    <td className="px-6 py-4 font-semibold text-gray-900 text-right">
                      40.000đ
                    </td>
                  </tr>
                  <tr className="border-b text-xl bg-black">
                    <td className="px-6 py-4 font-bold text-white">
                      Tổng thanh toán
                    </td>
                    <td className="px-6 py-4 font-bold text-white"></td>
                    <td className="px-6 py-4 font-bold text-white"></td>
                    <td className="px-6 py-4 font-bold text-white"></td>
                    <td className="px-6 py-4 font-bold text-white text-right">
                      1.250.000đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h1 className="text-[30px] text-center font-semibold mb-5">
              Thông tin nhận hàng
            </h1>
            <div className="bg-[#f1f1f1] rounded-xl p-7 text-sm font-semibold">
              <div className="flex">
                <div className="w-[20%]">
                  <p className="mb-3">Tên người nhận:</p>
                  <p className="mb-3">Email:</p>
                  <p className="mb-3">Số điện thoại:</p>
                  <p className="mb-3">Hình thức thanh toán:</p>
                  <p className="">Địa chỉ nhận hàng:</p>
                </div>
                <div>
                  <p className="mb-3">Sdfsdfsdf</p>
                  <p className="mb-3">binhbo@gmail.com</p>
                  <p className="mb-3">0867717004</p>
                  <p className="mb-3">Thanh toán khi nhận hàng (COD)</p>
                  <p className="">
                    fdsfsdfdsfsdfsdf, Xã An Thới Đông, Huyện Cần Giờ, Hồ Chí
                    Minh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default BillConfirm;
