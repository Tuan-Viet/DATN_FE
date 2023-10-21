import React from "react";
import { Link } from "react-router-dom";

const Product_Collection = () => {
  return (
    <div className="bg-[#faefec] py-[60px] mb-[60px]">
      <div className="max-w-[1500px] mx-auto">
        <div className="tabs flex justify-center items-center gap-[40px] mb-[50px]">
          <Link
            to=""
            className="tab-item text-[30px] font-medium hover:text-black hover:underline transition-all"
          >
            Áo polo
          </Link>
          <Link
            to=""
            className="tab-item text-[30px] font-medium hover:text-black hover:underline transition-all"
          >
            Áo thun
          </Link>
          <Link
            to=""
            className="tab-item text-[30px] font-medium hover:text-black hover:underline transition-all"
          >
            Quần short
          </Link>
          <Link
            to=""
            className="tab-item text-[30px] font-medium hover:text-black hover:underline transition-all"
          >
            Quần dài
          </Link>
        </div>
        <div className="outstanding-product mb-12 flex gap-x-[25px] items-stretch flex-wrap gap-y-[30px]">
          <div className="relative group w-[280px]">
            <Link to="">
              <img
                src="/images/img-product/home_category_1_img.png"
                className="mx-auto h-[360px] w-full"
                alt=""
              />
            </Link>
            <div className="product-info p-[8px] bg-white">
              <div className="text-sm flex justify-between mb-3">
                <span>+3 Màu sắc</span>
                <span>+4 Kích thước</span>
              </div>
              <Link to="" className="font-medium">
                Áo khoác liền EWCW007
              </Link>
              <div className="price flex gap-x-[8px] items-baseline">
                <span className="text-sm text-[#FF2C26] font-semibold">
                  299,000₫
                </span>
                <span className="text-[13px] text-[#878C8F]">
                  <del>500,000₫</del>
                </span>
              </div>
            </div>
            <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
              -40%
            </span>
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
          <div className="relative group w-[280px]">
            <Link to="">
              <img
                src="/images/img-product/home_category_1_img.png"
                className="mx-auto h-[360px] w-full"
                alt=""
              />
            </Link>
            <div className="product-info p-[8px] bg-white">
              <div className="text-sm flex justify-between mb-3">
                <span>+3 Màu sắc</span>
                <span>+4 Kích thước</span>
              </div>
              <Link to="" className="font-medium">
                Áo khoác gió 1 lớp mũ liền EWCW007
              </Link>
              <div className="price flex gap-x-[8px] items-baseline">
                <span className="text-sm text-[#FF2C26] font-semibold">
                  299,000₫
                </span>
                <span className="text-[13px] text-[#878C8F]">
                  <del>500,000₫</del>
                </span>
              </div>
            </div>
            <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
              -40%
            </span>
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
          <div className="relative group w-[280px]">
            <Link to="">
              <img
                src="/images/img-product/home_category_1_img.png"
                className="mx-auto h-[360px] w-full"
                alt=""
              />
            </Link>
            <div className="product-info p-[8px] bg-white">
              <div className="text-sm flex justify-between mb-3">
                <span>+3 Màu sắc</span>
                <span>+4 Kích thước</span>
              </div>
              <Link to="" className="font-medium">
                Áo khoác gió 1 lớp mũ liền EWCW007
              </Link>
              <div className="price flex gap-x-[8px] items-baseline">
                <span className="text-sm text-[#FF2C26] font-semibold">
                  299,000₫
                </span>
                <span className="text-[13px] text-[#878C8F]">
                  <del>500,000₫</del>
                </span>
              </div>
            </div>
            <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
              -40%
            </span>
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
          <div className="relative group w-[280px]">
            <Link to="">
              <img
                src="/images/img-product/home_category_1_img.png"
                className="mx-auto h-[360px] w-full"
                alt=""
              />
            </Link>
            <div className="product-info p-[8px] bg-white">
              <div className="text-sm flex justify-between mb-3">
                <span>+3 Màu sắc</span>
                <span>+4 Kích thước</span>
              </div>
              <Link to="" className="font-medium">
                Áo khoác gió 1 lớp mũ liền EWCW007
              </Link>
              <div className="price flex gap-x-[8px] items-baseline">
                <span className="text-sm text-[#FF2C26] font-semibold">
                  299,000₫
                </span>
                <span className="text-[13px] text-[#878C8F]">
                  <del>500,000₫</del>
                </span>
              </div>
            </div>
            <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
              -40%
            </span>
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
          <div className="relative group w-[280px]">
            <Link to="">
              <img
                src="/images/img-product/home_category_1_img.png"
                className="mx-auto h-[360px] w-full"
                alt=""
              />
            </Link>
            <div className="product-info p-[8px] bg-white">
              <div className="text-sm flex justify-between mb-3">
                <span>+3 Màu sắc</span>
                <span>+4 Kích thước</span>
              </div>
              <Link to="" className="font-medium">
                Áo khoác gió 1 lớp mũ liền EWCW007
              </Link>
              <div className="price flex gap-x-[8px] items-baseline">
                <span className="text-sm text-[#FF2C26] font-semibold">
                  299,000₫
                </span>
                <span className="text-[13px] text-[#878C8F]">
                  <del>500,000₫</del>
                </span>
              </div>
            </div>
            <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
              -40%
            </span>
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
          <div className="relative group w-[280px]">
            <Link to="">
              <img
                src="/images/img-product/home_category_1_img.png"
                className="mx-auto h-[360px] w-full"
                alt=""
              />
            </Link>
            <div className="product-info p-[8px] bg-white">
              <div className="text-sm flex justify-between mb-3">
                <span>+3 Màu sắc</span>
                <span>+4 Kích thước</span>
              </div>
              <Link to="" className="font-medium">
                Áo khoác gió 1 lớp mũ liền EWCW007
              </Link>
              <div className="price flex gap-x-[8px] items-baseline">
                <span className="text-sm text-[#FF2C26] font-semibold">
                  299,000₫
                </span>
                <span className="text-[13px] text-[#878C8F]">
                  <del>500,000₫</del>
                </span>
              </div>
            </div>
            <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
              -40%
            </span>
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
          <div className="relative group w-[280px]">
            <Link to="">
              <img
                src="/images/img-product/home_category_1_img.png"
                className="mx-auto h-[360px] w-full"
                alt=""
              />
            </Link>
            <div className="product-info p-[8px] bg-white">
              <div className="text-sm flex justify-between mb-3">
                <span>+3 Màu sắc</span>
                <span>+4 Kích thước</span>
              </div>
              <Link to="" className="font-medium">
                Áo khoác gió 1 lớp mũ liền EWCW007
              </Link>
              <div className="price flex gap-x-[8px] items-baseline">
                <span className="text-sm text-[#FF2C26] font-semibold">
                  299,000₫
                </span>
                <span className="text-[13px] text-[#878C8F]">
                  <del>500,000₫</del>
                </span>
              </div>
            </div>
            <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
              -40%
            </span>
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
          <div className="relative group w-[280px]">
            <Link to="">
              <img
                src="/images/img-product/home_category_1_img.png"
                className="mx-auto h-[360px] w-full"
                alt=""
              />
            </Link>
            <div className="product-info p-[8px] bg-white">
              <div className="text-sm flex justify-between mb-3">
                <span>+3 Màu sắc</span>
                <span>+4 Kích thước</span>
              </div>
              <Link to="" className="font-medium">
                Áo khoác gió 1 lớp mũ liền EWCW007
              </Link>
              <div className="price flex gap-x-[8px] items-baseline">
                <span className="text-sm text-[#FF2C26] font-semibold">
                  299,000₫
                </span>
                <span className="text-[13px] text-[#878C8F]">
                  <del>500,000₫</del>
                </span>
              </div>
            </div>
            <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
              -40%
            </span>
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
          <div className="relative group w-[280px]">
            <Link to="">
              <img
                src="/images/img-product/home_category_1_img.png"
                className="mx-auto h-[360px] w-full"
                alt=""
              />
            </Link>
            <div className="product-info p-[8px] bg-white">
              <div className="text-sm flex justify-between mb-3">
                <span>+3 Màu sắc</span>
                <span>+4 Kích thước</span>
              </div>
              <Link to="" className="font-medium">
                Áo khoác gió 1 lớp mũ liền EWCW007
              </Link>
              <div className="price flex gap-x-[8px] items-baseline">
                <span className="text-sm text-[#FF2C26] font-semibold">
                  299,000₫
                </span>
                <span className="text-[13px] text-[#878C8F]">
                  <del>500,000₫</del>
                </span>
              </div>
            </div>
            <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
              -40%
            </span>
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
          <div className="relative group w-[280px]">
            <Link to="">
              <img
                src="/images/img-product/home_category_1_img.png"
                className="mx-auto h-[360px] w-full"
                alt=""
              />
            </Link>
            <div className="product-info p-[8px] bg-white">
              <div className="text-sm flex justify-between mb-3">
                <span>+3 Màu sắc</span>
                <span>+4 Kích thước</span>
              </div>
              <Link to="" className="font-medium">
                Áo khoác gió 1 lớp mũ liền EWCW007
              </Link>
              <div className="price flex gap-x-[8px] items-baseline">
                <span className="text-sm text-[#FF2C26] font-semibold">
                  299,000₫
                </span>
                <span className="text-[13px] text-[#878C8F]">
                  <del>500,000₫</del>
                </span>
              </div>
            </div>
            <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
              -40%
            </span>
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
        <div className="text-center">
          <Link
            to=""
            className="py-[15px] text-center inline-block w-[400px] rounded border border-black uppercase hover:bg-black hover:text-white transition-all"
          >
            Xem tất cả <span className="font-bold"> áo polo</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product_Collection;
