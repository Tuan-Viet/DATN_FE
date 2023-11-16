import { Link } from "react-router-dom";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";

const SearchResult = () => {
  return (
    <>
      <Header></Header>
      <div className="container">
        <div className="text-center mt-[35px] relative mb-[30px] pb-5">
          <h1 className="text-[30px] font-bold mb-2">Tìm kiếm</h1>
          <p>
            Có <span className="font-bold">28 sản phẩm</span> cho tìm kiếm
          </p>
          <div className="absolute w-[60px] h-1 bg-black bottom-0 left-1/2 transform -translate-x-1/2"></div>
        </div>
        <p className="mb-5">Kết quả tìm kiếm cho "áo polo"</p>
        <div className="outstanding-product mb-12 flex gap-x-[25px] flex-wrap gap-y-[30px]">
          <div className="relative group w-[280px] flex flex-col">
            <div className="relative group flex flex-col">
              <Link to="">
                <img
                  src="/images/img-product/polo-hoa-tiet.jpg"
                  className="mx-auto h-[360px] w-full object-cover"
                  alt=""
                />
              </Link>
              <div className="product-info p-[8px] flex-1 bg-white flex flex-col">
                <div>
                  <div className="text-sm flex justify-between mb-3">
                    <span>+ 3 màu sắc</span>
                    <div className="flex">
                      + 3<p className="ml-1">Kích thước</p>
                    </div>
                  </div>
                  <Link to="" className="font-medium h-[50px] block">
                    sdfsdfd sdfwe dsgd
                  </Link>
                </div>
                <div className="price mt-auto flex gap-x-[8px] items-baseline">
                  <span className="text-sm text-[#FF2C26] font-semibold">
                    2345.43587đ
                  </span>
                  <span className="text-[13px] text-[#878C8F]">
                    <del>123.8457đ</del>
                  </span>
                </div>
              </div>
              <div>
                <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
                  - 60 %
                </span>
              </div>
              <Link
                to=""
                className="rounded-lg opacity-0 absolute bottom-[140px] left-2/4 -translate-x-2/4 bg-white flex gap-x-[5px] items-center p-3 w-[175px] justify-center group-hover:opacity-100 hover:bg-black hover:text-white transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span className="uppercase text-xs font-semibold">
                  Thêm vào giỏ
                </span>
              </Link>
            </div>
          </div>
          <div className="relative group w-[280px]">
            <div className="relative group">
              <Link to="">
                <img
                  src="/images/img-product/polo-hoa-tiet.jpg"
                  className="mx-auto h-[360px] w-full"
                  alt=""
                />
              </Link>
              <div className="product-info p-[8px] flex-1 bg-white flex flex-col">
                <div>
                  <div className="text-sm flex justify-between mb-3">
                    <span>+ 3 màu sắc</span>
                    <div className="flex">
                      + 3<p className="ml-1">Kích thước</p>
                    </div>
                  </div>
                  <Link to="" className="font-medium h-[50px] block">
                    sdfsdfd sdfwe dsgd jksdfh iweur sdflkj alfjl iowru
                  </Link>
                </div>
                <div className="price mt-auto flex gap-x-[8px] items-baseline">
                  <span className="text-sm text-[#FF2C26] font-semibold">
                    2345.43587đ
                  </span>
                  <span className="text-[13px] text-[#878C8F]">
                    <del>123.8457đ</del>
                  </span>
                </div>
              </div>
              <div>
                <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
                  - 60 %
                </span>
              </div>
              <Link
                to=""
                className="rounded-lg opacity-0 absolute bottom-[140px] left-2/4 -translate-x-2/4 bg-white flex gap-x-[5px] items-center p-3 w-[175px] justify-center group-hover:opacity-100 hover:bg-black hover:text-white transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span className="uppercase text-xs font-semibold">
                  Thêm vào giỏ
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default SearchResult;
