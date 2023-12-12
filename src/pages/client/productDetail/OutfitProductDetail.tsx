import React, { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAddCartMutation } from '../../../store/cart/cart.service'
import { addCartSlice } from '../../../store/cart/cartSlice'
import { RootState } from '../../../store'


const OutfitProductDetail = (props: any) => {
    const dispatch: Dispatch<any> = useDispatch()
    const [buttonOutfit, setButtonOutfit] = useState<boolean>(false)
    const [totalOutfit, setTotalOutfit] = useState<number>(0)
    const userStore = useSelector((state: any) => state.user)
    const [onAddCart] = useAddCartMutation()
    useEffect(() => {
        if (props?.listOutfitByProductIdState) {
            let total = 0
            props?.listOutfitByProductIdState[0]?.items?.map((item: any) => {
                props?.productState?.filter((pro: any) => pro._id === item.product_id).map((product: any) => {
                    return total += (product.price - product.discount)
                })
            })
            setTotalOutfit(total)
        }
    }, [props?.listOutfitByProductIdState, props?.id, props?.productState])

    const handleAddtoCartOutfit = async (id: string) => {
        try {
            if (id) {
                setIdOutfit(id)
                setButtonOutfit(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const [idOutfit, setIdOutfit] = useState<string>("")
    const getOneOutfit = props?.listOutfitState.find((outfit: any) => outfit._id && outfit._id.includes(idOutfit && idOutfit))

    const onAddCartFunc = async () => {
        if (getOneOutfit && props?.productState) {
            const { title, items, description, sku } = getOneOutfit;
            items?.forEach((productDetail: any) => {
                props.productState?.filter((product: any) => product._id && product._id.includes(productDetail.product_id)).map(async (pro: any) => {
                    const cartId = props?.listCartState?.filter((cart: any) =>
                        cart.productDetailId._id === productDetail._id
                    )
                    if (cartId?.[0]?.quantity + 1 > productDetail.quantity) {
                        return
                    }
                    if (productDetail) {
                        if (userStore?.current?._id) {
                            await onAddCart({
                                userId: userStore?.current?._id,
                                productDetailId: productDetail,
                                quantity: 1,
                                totalMoney: (pro?.price - pro?.discount) * 1
                            }).then(() => dispatch(addCartSlice({
                                userId: userStore?.current?._id,
                                productDetailId: productDetail,
                                quantity: 1,
                                totalMoney: (pro?.price - pro?.discount) * 1
                            }))).then(() => {
                                const overlayCart = document.querySelector(".overlay-cart")
                                const overlay = document.querySelector(".overlay")
                                overlay?.classList.remove("hidden")
                                overlayCart?.classList.remove("translate-x-[100%]", "opacity-0")
                                const dropdown = document.querySelector(".dropdown-user")
                                if (!dropdown?.classList.contains("opacity-0")) {
                                    dropdown?.classList.add("opacity-0")
                                    dropdown?.classList.add("pointer-events-none")
                                }
                            })
                        } else {
                            dispatch(addCartSlice({
                                productDetailId: productDetail,
                                quantity: 1,
                                totalMoney: (pro.price - pro.discount) * 1
                            }))
                            const overlayCart = document.querySelector(".overlay-cart")
                            const overlay = document.querySelector(".overlay")
                            overlay?.classList.remove("hidden")
                            overlayCart?.classList.remove("translate-x-[100%]", "opacity-0")
                            const dropdown = document.querySelector(".dropdown-user")
                            if (!dropdown?.classList.contains("opacity-0")) {
                                dropdown?.classList.add("opacity-0")
                                dropdown?.classList.add("pointer-events-none")
                            }
                        }

                    }
                })
            });
        }
    };

    useEffect(() => {
        if (buttonOutfit && getOneOutfit) {
            onAddCartFunc();
            setButtonOutfit(false);
        }
    }, [buttonOutfit, getOneOutfit]);
    return (
        <div className="w-[650px] min-h-[250px] my-4 border-2 border-dashed border-red-500 p-5">
            {props && <>
                <h1 className="font-semibold">{props.listOutfitByProductIdState?.[0]?.title}: {props.listOutfitByProductIdState?.[0]?.sku}</h1>
                <div className="flex justify-between p-5 gap-x-[20px]">
                    {props.listOutfitByProductIdState?.[0]?.items?.map((item: any, index: any) => (
                        <div key={index}>
                            {/* productDetailRelatedState */}
                            {props.productState?.filter((product: any) => product._id && product._id === item.product_id).map((pro: any, indexPro: any) => (
                                <div key={indexPro} className="flex flex-col">
                                    <input type="text" className='hidden' value={pro._id} />
                                    <Link to={`/products/${pro._id}`}>
                                        <img className="w-[130px]" src={item.imageColor} alt="" />
                                    </Link>
                                    <div className="py-5">
                                        <p className="text-sm">{item.product_id === props.id && props.id ? <span className="font-bold text-sm">Bạn đang xem:</span> : ""}<span className="ml-2">x1 {pro.title}</span></p>
                                        <p className="opacity-70 text-[14px] my-3">Vui lòng chọn:</p>
                                        <div className="text-[14px]">
                                            {/* color */}
                                            <select className="border border-1 px-2 text-sm">
                                                {
                                                    [...new Set(props?.productDetailRelatedState?.filter((item: any) => item?.product_id === pro._id).map((proDetail: any) => proDetail.nameColor))
                                                    ].map((color: any, index) => (
                                                        <option selected key={index} value={color}>{color}</option>
                                                    ))
                                                }
                                            </select>
                                            {/* size */}
                                            <select className="border border-1 ml-2 px-2 text-sm">
                                                {
                                                    [...new Set(props.productDetailRelatedState?.filter((item: any) => item?.product_id === pro._id).map((proDetail: any) => proDetail.size))
                                                    ].map((size: any, index) => (
                                                        <option selected key={index} value={size}>{size}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <p className="font-bold text-[14px] pt-10">{(pro.price - pro.discount).toLocaleString("vi-VN")}₫</p>
                                        {/* <div className="flex text-[12px] items-center">Giảm còn: <strong className="text-[16px] text-red-500 ml-3">450,000₫</strong><del className="ml-2">500,000₫</del></div> */}
                                    </div>
                                </div>

                            ))}
                        </div>
                    ))}
                </div>
                <div className="border-t-2 flex py-3">
                    <div className="flex flex-col">
                        <p className="flex text-sm font-bold"><span>Tổng tiền:</span> <span className="text-red-500 ml-1">{totalOutfit.toLocaleString("vi-VN")}đ</span></p>
                        {/* <p className="flex text-sm mt-2"><span>Tiết kiệm:</span> <strong className="ml-1">92.000đ</strong></p> */}
                    </div>
                    <button onClick={() => handleAddtoCartOutfit(props.listOutfitByProductIdState?.[0]?._id!)} className="bg-red-500 hover:bg-red-600 transition-all ease-linear text-white px-3 py-1 uppercase ml-3 text-[12px]">Thêm 2 vào giỏ hàng</button>
                </div>
            </>}

        </div>
    )
}

export default OutfitProductDetail
