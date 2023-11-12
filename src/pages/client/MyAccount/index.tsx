import { useEffect } from "react";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const myAccount = () => {
  const user = useSelector((state: any) => state.user);
  const isLoggedIn = user?.isLoggedIn;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="mt-14">
          <h1 className="text-[25px] mb-7 font-bold text-center pb-5 relative">
            Tài khoản của bạn
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
                <Link to="/account" className="font-bold">
                  Thông tin tài khoản
                </Link>
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
                <h2 className="uppercase text-lg font-bold mb-2">
                  Thông tin tài khoản
                </h2>
                <div className="border-t border-gray-200 py-3">
                  <h2 className="font-semibold mb-2">Họ tên: {user?.current?.fullname}</h2>
                  <p className="text-[15px] mb-2">
                    Email: {user?.current?.email}
                  </p>
                  <p className="text-[15px] mb-2">
                    Địa chỉ: 64 Phú Diễn, Bắc Từ Liêm, Hà Nội
                  </p>
                  <p className="text-[15px] mb-2">Số diện thoại: {user?.current?.phone}</p>
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

export default myAccount;