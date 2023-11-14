import React, { Dispatch, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFetchListProductQuery } from "../../../store/product/product.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useListProductDetailQuery } from "../../../store/productDetail/productDetail.service";
import { listProductDetailSlice } from "../../../store/productDetail/productDetailSlice";
import { listProductSaleSlice } from "../../../store/product/productSlice";

const Sale = () => {
  const dispatch: Dispatch<any> = useDispatch()
  const { data: listProduct, isSuccess: isSuccessProduct } = useFetchListProductQuery()
  const { data: listProductDetail, isSuccess: isSuccessProductDetail } = useListProductDetailQuery()
  const productDetailState = useSelector((state: RootState) => state.productDetailSlice.productDetails)
  const productSaleState = useSelector((state: RootState) => state.productSaleSlice.products)
  useEffect(() => {
    if (isSuccessProductDetail) {
      dispatch(listProductDetailSlice(listProductDetail))
    }
  }, [isSuccessProductDetail])
  useEffect(() => {
    if (isSuccessProduct) {
      dispatch(listProductSaleSlice(listProduct))
    }
  }, [isSuccessProduct])
  return (
    <div className="bg-[#faefec] py-[60px] mb-[60px]">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex items-center gap-x-5 mb-8">
          <div className="w-3 h-3 rounded-full animate-ping bg-red-500"></div>
          <h1 className="text-[37px] font-semibold uppercase">Sale vô cực</h1>
        </div>
        <div className="product-sale mb-12">
          <Swiper
            grabCursor={"true"}
            spaceBetween={25}
            slidesPerView={"auto"}
            pagination={{ clickable: true, dynamicBullets: true }}
          >
            {productSaleState?.map((product, index) => {
              return <SwiperSlide key={index}>
                {productDetailState ? [...new Set(productDetailState?.filter((item) => item.product_id === product?._id).filter((pro) => pro.quantity !== 0))].length != 0 ? <div className="relative group">
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.images?.[0]}
                      className="mx-auto h-[295px] w-full"
                      alt=""
                    />
                  </Link>
                  <div className="product-info p-[8px] bg-white">
                    <div className="text-sm flex justify-between mb-3">
                      <span>+{productDetailState ? [...new Set(productDetailState?.filter((item) => item.product_id === product._id).map((pro) => pro.nameColor))].length : 0} màu sắc</span>
                      <div className="flex">+{productDetailState ? [...new Set(productDetailState?.filter((item) => item.product_id === product._id).map((pro) => pro.size))].length : 0}
                        <p className="ml-1">Kích thước</p>
                      </div>
                    </div>
                    <Link to="" className="font-medium">
                      {product.title}
                    </Link>
                    <div className="price flex gap-x-[8px] items-baseline">
                      <span className="text-sm text-[#FF2C26] font-semibold">
                        {product.discount.toLocaleString("vi-VN")}đ
                      </span>
                      <span className="text-[13px] text-[#878C8F]">
                        <del>{product.price.toLocaleString("vi-VN")}đ</del>
                      </span>
                    </div>
                  </div>
                  <div>
                    {product?.price > product?.discount ? <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
                      -{`${((product?.price - product?.discount) / product?.price * 100).toFixed(0)}`}%
                    </span> : ""}
                  </div>
                  <Link to="" className="rounded-lg opacity-0 absolute bottom-[140px] left-2/4 -translate-x-2/4 bg-white flex gap-x-[5px] items-center p-3 w-[175px] justify-center group-hover:opacity-100 hover:bg-black hover:text-white transition-all">
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
                    <span className="uppercase text-xs font-semibold">Thêm vào giỏ</span>
                  </Link>
                </div> :
                  <div>
                    {/* soldOut */}
                    <div className="absolute z-10 bg-red-500 font-semibold top-[50%] left-0 right-0 text-center text-white py-2">Hết hàng</div>
                    <div className="relative group opacity-60">
                      <Link to={`/products/${product._id}`}>
                        <img
                          src={product.images?.[0]}
                          className="mx-auto h-[295px] w-full"
                          alt=""
                        />
                      </Link>
                      <div className="product-info p-[8px] bg-white">
                        <div className="text-sm flex justify-between mb-3">
                          <span>+{productDetailState ? [...new Set(productDetailState?.filter((item) => item.product_id === product._id).map((pro) => pro.nameColor))].length : 0} màu sắc</span>
                          <div className="flex">+{productDetailState ? [...new Set(productDetailState?.filter((item) => item.product_id === product._id).map((pro) => pro.size))].length : 0}
                            <p className="ml-1">Kích thước</p>
                          </div>
                        </div>
                        <Link to="" className="font-medium">
                          {product.title}
                        </Link>
                        <div className="price flex gap-x-[8px] items-baseline">
                          <span className="text-sm text-[#FF2C26] font-semibold">
                            {product.discount.toLocaleString("vi-VN")}đ
                          </span>
                          <span className="text-[13px] text-[#878C8F]">
                            <del>{product.price.toLocaleString("vi-VN")}đ</del>
                          </span>
                        </div>
                      </div>
                      <div>
                        {product?.price > product?.discount ? <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
                          -{`${((product?.price - product?.discount) / product?.price * 100).toFixed(0)}`}%
                        </span> : ""}
                      </div>
                      {/* <Link to="" className="rounded-lg opacity-0 absolute bottom-[140px] left-2/4 -translate-x-2/4 bg-white flex gap-x-[5px] items-center p-3 w-[175px] justify-center group-hover:opacity-100 hover:bg-black hover:text-white transition-all">
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
                        <span className="uppercase text-xs font-semibold">Thêm vào giỏ</span>
                      </Link> */}
                    </div>
                  </div> : ""
                }

              </SwiperSlide>
            })}

          </Swiper>
        </div>
        <div className="text-center"><Link to="" className="py-[15px] text-center inline-block w-[400px] rounded border border-black uppercase hover:bg-black hover:text-white transition-all">Xem tất cả <span className="font-bold"> SALE VÔ CỰC</span></Link></div>
      </div>
    </div >
  );
};

export default Sale;
