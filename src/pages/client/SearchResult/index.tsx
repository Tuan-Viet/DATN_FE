import Header from "../../../layout/Header";
import Footer from "../../../layout/Footer";
import { Link } from "react-router-dom";
import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchListProductQuery, useSearchProductQuery } from "../../../store/product/product.service";
import { listProductSearchSlice } from "../../../store/product/productSlice";
import { RootState } from "../../../store";
import { listProductDetailSlice } from "../../../store/productDetail/productDetailSlice";
import { useListProductDetailQuery } from "../../../store/productDetail/productDetail.service";

const SearchResult = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const { data: listProduct, isSuccess: isSuccessProduct } = useFetchListProductQuery()
    const { data: listProductDetail, isSuccess: isSuccessProductDetail } = useListProductDetailQuery()
    const productSearch = useSelector((state: RootState) => state.productSearchReducer.products)

    // const productState = useSelector((state: RootState) => state.productSlice.products)
    const productDetailState = useSelector((state: RootState) => state.productDetailSlice.productDetails)
    const searchStore = JSON.parse(localStorage.getItem("searchTerm")!)
    // const { data: searchAPI } = useSearchProductQuery(searchStore && searchStore)
    useEffect(() => {
        if (listProductDetail) {
            dispatch(listProductDetailSlice(listProductDetail))
        }
    }, [isSuccessProductDetail])
    useEffect(() => {
        if (listProduct && searchStore) {
            dispatch(listProductSearchSlice({ searchTerm: searchStore, products: listProduct }))
        }
    }, [isSuccessProduct])
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);
    return <>
        <Header></Header>
        <div className="container">
            <div className="text-center mt-[35px] relative mb-[30px] pb-5">
                <h1 className="text-[30px] font-bold mb-2">Tìm kiếm</h1>
                <p>
                    Có <span className="font-bold">{productSearch ? productSearch?.length : 0} sản phẩm</span> cho tìm kiếm
                </p>
                <div className="absolute w-[60px] h-1 bg-black bottom-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <p className="mb-5">Kết quả tìm kiếm cho "{searchStore ? searchStore : ""}"</p>
            <div className="outstanding-product mb-12 grid grid-cols-5 gap-5">
                {productSearch && productSearch?.length > 0 ? productSearch?.map((product, index) => {
                    return <div key={index} className={`relative overflow-hidden group ${[...new Set(productDetailState?.filter((item) => item.product_id === product?._id).filter((pro) => pro.quantity !== 0))].length === 0 && "opacity-60"}`}>
                        {[...new Set(productDetailState?.filter((item) => item.product_id === product?._id).filter((pro) => pro.quantity !== 0))].length === 0 && <div className="absolute z-10 bg-red-500 font-semibold top-[50%] left-0 right-0 text-center text-white py-2">Hết hàng</div>}
                        <Link to={`/products/${product._id}`}>
                            <div className="min-h-[375px] max-h-[395px] overflow-hidden">
                                <img
                                    src={product.images?.[0]}
                                    className="mx-auto max-h-[395px] min-h-[375px] w-full group-hover:opacity-0 group-hover:scale-100 absolute transition-all ease-linear duration-200"
                                    alt=""
                                />

                                <img
                                    src={product.images?.[1] ? product.images?.[1] : productDetailState?.find((proDetail) => proDetail.product_id && proDetail?.product_id?.includes(product._id!))?.imageColor
                                    }
                                    className="mx-auto max-h-[375px] min-h-[375px] w-full duration-999 absolute opacity-0 group-hover:opacity-100 transition-all ease-linear"
                                    alt=""
                                />
                            </div>
                        </Link>
                        <div className="product-info p-[8px] bg-white">
                            <div className="text-sm flex justify-between mb-3">
                                <span>+{productDetailState ? [...new Set(productDetailState?.filter((item) => item.product_id === product._id).map((pro) => pro.nameColor))].length : 0} màu sắc</span>
                                <div className="flex">+{productDetailState ? [...new Set(productDetailState?.filter((item) => item.product_id === product._id).map((pro) => pro.size))].length : 0}
                                    <p className="ml-1">Kích thước</p>
                                </div>
                            </div>
                            <Link to="" className="block font-medium h-12">
                                {product.title}
                            </Link>
                            <div className="price flex gap-x-[8px] items-baseline">
                                <span className="text-sm text-[#FF2C26] font-semibold">
                                    {(product?.price - product.discount).toLocaleString("vi-VN")}đ
                                </span>
                                {product.discount !== 0 && <span className="text-[13px] text-[#878C8F]">
                                    <del>{product.price?.toLocaleString("vi-VN")}đ</del>
                                </span>}
                            </div>
                        </div>
                        <div>
                            {product.discount > 0 && <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
                                -{`${((product?.price - (product?.price - product?.discount)) / product?.price * 100).toFixed(0)}`}%
                            </span>}
                        </div>
                    </div>
                }) : <div className="text-center w-full">Hiện chưa có sản phẩm nào</div>}
            </div>
        </div>
        <Footer></Footer>
    </>
};

export default SearchResult;
