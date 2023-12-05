import {
    Breadcrumb,
    Button, Collapse, CollapseProps, Empty, Image, List, Progress, Rate, Skeleton, Space, Spin, Tag, Tooltip
} from "antd";
import {
    EditFilled,
    StarFilled,
    LoadingOutlined
} from '@ant-design/icons';
import { Link, useParams } from "react-router-dom";
import { useFetchOneProductByAdminQuery, useFetchOneProductQuery } from "../../../store/product/product.service";
import { Dispatch, useEffect, useState } from "react";
import axios from "axios";
import { useGetOneProductDetailQuery } from "../../../store/productDetail/productDetail.service";
import { useFetchListReviewsQuery } from "../../../store/reviews/review.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { listReviewSlice } from "../../../store/reviews/reviewSlice";
import moment from 'moment';
import { useGetProductRevenueQuery } from "../../../store/statistic/statistic.service";

interface ProductDetail {
    _id: string;
    product_id: string;
    nameColor: string;
    imageColor: string;
    quantity: number;
    size: string;
    sold: number;
    deleted: boolean;
}

const productById = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const { id } = useParams();
    // const { data: product, isSuccess: isSuccessProduct } = useFetchOneProductQuery(id || '')
    const { data: product, isSuccess: isSuccessProduct } = useFetchOneProductByAdminQuery(id || '')
    const { data: productRevanue, isSuccess: isSuccessProductStatistic } = useGetProductRevenueQuery();
    const productStatistic = productRevanue?.filter(pro => pro.productId === id);

    const { data: listReview, isSuccess: isSuccessReview } = useFetchListReviewsQuery()
    const reviewState = useSelector((state: RootState) => state.reviewSlice.reviews)

    const reviewStateVer = reviewState?.slice().reverse()

    useEffect(() => {
        if (listReview && id) {
            const listReviewByProductId = listReview?.filter((review) => review?.productId && review?.productId?.includes(id))
            dispatch(listReviewSlice(listReviewByProductId))
        }
    }, [isSuccessReview, id])
    const [rateAver, setRateAver] = useState<number>(0)
    useEffect(() => {
        if (reviewState) {
            const rates = reviewState?.map((review) => review.rating)
            let totalRating = 0
            rates.forEach(rating => {
                totalRating += rating
            });
            let rateAverage = totalRating / rates.length
            setRateAver(rateAverage)
        }
    }, [reviewState, rateAver])
    console.log(reviewState);
    let oneStarCount = 0;
    let twoStarCount = 0;
    let threeStarCount = 0;
    let fourStarCount = 0;
    let fiveStarCount = 0;

    for (const review of reviewState) {
        switch (review.rating) {
            case 1:
                oneStarCount++;
                break;
            case 2:
                twoStarCount++;
                break;
            case 3:
                threeStarCount++;
                break;
            case 4:
                fourStarCount++;
                break;
            case 5:
                fiveStarCount++;
                break;
            default:
                break;
        }
    }

    const totalReviews = reviewState.length;

    // Tính phần trăm cho mỗi số sao
    const percentOneStar = Math.round((oneStarCount / totalReviews) * 100);
    const percentTwoStar = Math.round((twoStarCount / totalReviews) * 100);
    const percentThreeStar = Math.round((threeStarCount / totalReviews) * 100);
    const percentFourStar = Math.round((fourStarCount / totalReviews) * 100);
    const percentFiveStar = Math.round((fiveStarCount / totalReviews) * 100);

    function filterAndTransformVariants(inputVariants: any) {
        const resultVariants = [];

        const colorMap: any = {};

        (inputVariants ?? []).forEach((variant: any) => {
            const { product_id, nameColor, size, quantity, imageColor, sold, deleted, _id } = variant;

            if (!colorMap[nameColor]) {
                colorMap[nameColor] = {
                    product_id,
                    imageColor,
                    nameColor,
                    items: [],
                    sold,
                    deleted,
                };
            }

            const existingSize = colorMap[nameColor].items.find((item: any) => item.size === size);
            if (existingSize) {
                existingSize.quantity += quantity;
            } else {
                colorMap[nameColor].items.push({
                    _id,
                    size,
                    quantity,
                });
            }
        });

        for (const colorKey in colorMap) {
            resultVariants.push(colorMap[colorKey]);
        }
        console.log(resultVariants);
        return resultVariants;
    }

    // const [productDetails, setProductDetails] = useState<any[]>([]);
    const productDetails = filterAndTransformVariants(product?.variants)
    const colorProduct = productDetails.map((product: any) => product.nameColor)

    let sizeProduct: any = [];
    productDetails.forEach((item) => {
        item.items.forEach((sizeObj: any) => {
            if (!sizeProduct.includes(sizeObj.size)) {
                sizeProduct.push(sizeObj.size);
            }
        });
    });

    const imagesProduct = productDetails.map((product: any) => product.imageColor)
    const listImages = [...product?.images ?? [], ...imagesProduct];

    const [selectedImage, setSelectedImage] = useState(0);
    const handleImageClick = (index: any) => {
        setSelectedImage(index);
    };

    const handlePrevClick = () => {
        setSelectedImage((prev) => (prev > 0 ? prev - 1 : listImages.length - 1));
    };

    const handleNextClick = () => {
        setSelectedImage((prev) => (prev < listImages.length - 1 ? prev + 1 : 0));
    };


    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <span className="text-blue-500">Mô tả sản phẩm</span>,
            children: product?.description
        }
    ];

    const data = reviewState.map((item, index) => ({
        color: item.color,
        size: item.size,
        date: moment(item.createdAt as string, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("HH:mm DD/MM/YYYY"),
        images: item.images,
        rate: item.rating,
        fullname: item.userId ? item.userId?.fullname : null,
        comment: item.comment,
        useId: item.userId ? item.userId._id : null
    }));

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);
    return <>
        <Breadcrumb className='pb-3 fixed'
            items={[

                {
                    title: <Link to={`/admin/order`}>Sản phẩm</Link>,
                },
                {
                    title: 'Chi tiết',
                    className: 'uppercase',
                },
            ]}
        />
        <div className="flex space-x-10 justify-between">
            <div className="w-1/3">
                {!isSuccessProduct ? (
                    <div className="flex justify-start space-x-5 mt-10">
                        <Skeleton.Image active={true} style={{ width: '80px', height: '80px' }} />
                        <Skeleton.Image active={true} style={{ width: '280px', height: '400px' }} />
                    </div>
                ) : (
                    <div className="flex fixed top-16">
                        <div className="h-[300px] mr-10">
                            {listImages.map((imageUrl, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleImageClick(index)}
                                    className={`h-20 w-20 overflow-hidden mb-3 relative group transform transition-transform hover:scale-110 
                        }`}
                                >
                                    <div className="h-full w-full flex items-center justify-center">
                                        <img
                                            src={imageUrl}
                                            alt=""
                                            className="h-full w-auto object-cover "
                                        />
                                    </div>
                                    <div
                                        className={`absolute rounded-md inset-0 border-2 border-transparent group-hover:border-blue-500  ${index === selectedImage ? "border-blue-500" : ""
                                            }`}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="w-[280px] h-[400px] relative">
                                <img
                                    src={listImages[selectedImage]}
                                    alt=""
                                    className="object-cover border"
                                />
                                <button
                                    onClick={handlePrevClick}
                                    className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 text-gray-700"
                                >
                                    &lt;
                                </button>
                                <button
                                    onClick={handleNextClick}
                                    className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-gray-300 hover:bg-gray-400 text-gray-700"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="space-y-5 w-2/3 mt-10">
                <div className="flex justify-between">
                    {!isSuccessProduct ? (
                        <div className="pt-3">
                            <div className="">
                                <Skeleton.Input active={true} style={{ width: '280px', height: '24px' }} />
                            </div>
                            <div className="mt-1">
                                <Skeleton.Input active={true} style={{ width: '150px', height: '20px' }} />
                            </div>
                        </div>
                    ) : (
                        <div className="">
                            <h2
                                className="text-xl font-medium"
                            >
                                {product?.title}
                            </h2>
                            <span className="text-xs text-gray-400">
                                {product?.createdAt && (
                                    <>
                                        Ngày khởi tạo: {new Date(product.createdAt).toLocaleDateString()}
                                    </>
                                )}
                            </span>
                        </div>
                    )}
                    <Tooltip title="Chỉnh sửa" color={"blue"} >
                        <Link to={`/admin/product/update/${product?._id}`} >
                            <Button type="primary" className="bg-blue-500"
                                icon={<EditFilled className="text-white" />}
                            >
                            </Button>
                        </Link>
                    </Tooltip>
                </div>
                <div className="flex justify-between">
                    <div className="border p-3 text-center w-1/5 rounded-lg">
                        <span className="block text-sm text-gray-400">GIÁ BÁN:</span>
                        {!isSuccessProduct ? (
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                        ) : (
                            <span className="text-lg font-medium text-gray-500">
                                {product?.discount === 0
                                    ? (product?.price ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    : (product?.discount ?? 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                        )}
                    </div>
                    <div className="border p-3 text-center w-1/5 rounded-lg">
                        <span className="block text-sm text-gray-400">ĐƠN HÀNG:</span>
                        {!isSuccessProductStatistic ? (
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                        ) : (
                            <span className="text-lg font-medium text-gray-500">
                                {productStatistic?.length
                                    ? productStatistic[0]?.totalOrders.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    : '0'}
                            </span>
                        )}
                    </div>
                    <div className="border p-3 text-center w-1/5 rounded-lg">
                        <span className="block text-sm text-gray-400">HÀNG CÓ SẴN:</span>
                        {!isSuccessProductStatistic ? (
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                        ) : (
                            <span className="text-lg font-medium text-gray-500">
                                {productStatistic?.length
                                    ? productStatistic[0]?.quantitySold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    : '0'}
                            </span>
                        )}
                    </div>
                    <div className="border p-3 text-center w-1/5 rounded-lg">
                        <span className="block text-sm text-gray-400">TỔNG DOANH THU:</span>
                        {!isSuccessProductStatistic ? (
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                        ) : (
                            <span className="text-lg font-medium text-gray-500">
                                {productStatistic?.length
                                    ? productStatistic[0]?.totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    : '0'}
                            </span>
                        )}

                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2">
                        <span className="block mb-2 font-medium text-gray-800">Màu sắc</span>
                        {!isSuccessProduct ? (
                            <Skeleton.Input active={true} style={{ width: '50px', height: '24px' }} />
                        ) : (
                            <div className="">
                                {
                                    colorProduct.map((color, index) => (
                                        <Tag onClick={() => handleImageClick(index + (product?.images.length ?? 0))}>{color}</Tag>
                                    ))
                                }
                            </div>
                        )}

                    </div>
                    <div className="w-1/2">
                        <span className="block mb-2 font-medium text-gray-800">Kích thước</span>

                        {!isSuccessProduct ? (
                            <Skeleton.Input active={true} style={{ width: '50px', height: '24px' }} />
                        ) : (
                            <div className="">
                                {sizeProduct.map((size: any) => (
                                    <Tag>{size}</Tag>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
                <div className="">
                    <Collapse ghost items={items} />
                </div>
                <div className="flex justify-between">
                    <div className="w-1/4 ">
                        <span className="block font-medium text-lg text-gray-700 mb-1">Lượt đánh giá</span>
                        {!isSuccessReview ? (
                            <div className="mt-3">
                                <Skeleton.Input active={true} style={{ width: '80px', height: '24px' }} />
                            </div>
                        ) : (
                            <div className="">
                                <span className="text-2xl  text-blue-500">
                                    {reviewState.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </span>
                                <span className="text-blue-500">
                                    (đánh giá)
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="border-r-2 border-gray-400"></div>
                    <div className="w-1/4">
                        <span className="block font-medium text-lg text-gray-700 mb-1">Đánh giá trung bình</span>
                        {!isSuccessReview ? (
                            <div className="mt-3">
                                <Skeleton.Input active={true} style={{ width: '80px', height: '24px' }} />

                            </div>
                        ) : (
                            <div className="flex items-center text-yellow-500">
                                <span className="text-2xl mr-3"> {!rateAver ? "0.0" : rateAver.toFixed(1)}</span>
                                <Rate value={rateAver} allowHalf disabled className="text-lg " />
                            </div>
                        )}

                    </div>
                    <div className="border-r-2 border-gray-400"></div>
                    <div className="w-1/4">
                        <div className="flex space-x-2 items-center">
                            <span className="flex">5 <StarFilled className="text-yellow-400 text-xs" /></span>
                            <Progress percent={percentFiveStar} showInfo={false} size="small" className="mb-0" strokeColor={{ '0%': '#3B82F6', '100%': '#3B82F6' }} />
                            <span className="text-blue-500">({fiveStarCount})</span>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <span className="flex">4 <StarFilled className="text-yellow-400 text-xs" /></span>
                            <Progress percent={percentFourStar} showInfo={false} size="small" className="mb-0" strokeColor={{ '0%': '#3B82F6', '100%': '#3B82F6' }} />
                            <span className="text-blue-500">({fourStarCount})</span>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <span className="flex">3 <StarFilled className="text-yellow-400 text-xs" /></span>
                            <Progress percent={percentThreeStar} showInfo={false} size="small" className="mb-0" strokeColor={{ '0%': '#3B82F6', '100%': '#3B82F6' }} />
                            <span className="text-blue-500">({threeStarCount})</span>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <span className="flex">2 <StarFilled className="text-yellow-400 text-xs" /></span>
                            <Progress percent={percentTwoStar} showInfo={false} size="small" className="mb-0" strokeColor={{ '0%': '#3B82F6', '100%': '#3B82F6' }} />
                            <span className="text-blue-500">({twoStarCount})</span>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <span className="flex">1 <StarFilled className="text-yellow-400 text-xs" /></span>
                            <Progress percent={percentOneStar} showInfo={false} size="small" className="mb-0" strokeColor={{ '0%': '#3B82F6', '100%': '#3B82F6' }} />
                            <span className="text-blue-500">({oneStarCount})</span>
                        </div>
                    </div>

                </div>
                <div className="">
                    {reviewState.length > 0 ? (
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 10,
                            }}
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item
                                    extra={
                                        <Image.PreviewGroup
                                            preview={{
                                                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                            }}
                                        >
                                            {item.images.map((image) => (
                                                <Image height={70} src={image.url} alt="" className="pr-1" />

                                            ))}
                                        </Image.PreviewGroup>
                                    }
                                >
                                    <div className="">
                                        <div className="flex items-center space-x-2">
                                            <span className=""><Link to={``}>{item.fullname}</Link></span>
                                            <span className="block"><Rate value={item.rate} disabled className="text-xs mb-0"></Rate></span>
                                        </div>
                                        <div className="flex mt-0 items-center ">
                                            <span className="block text-end text-xs text-gray-400  border-r border-gray-300 pr-1">{item.date}</span>
                                            <div className="px-1">
                                                <span className="text-xs text-gray-400 ">Phân loại: </span><span className="text-xs text-blue-500">{item.size}</span> - <span className="text-xs text-blue-500"> {item.color}</span>
                                            </div>
                                        </div>
                                        <span className="block my-2">{item.comment}</span>
                                    </div>
                                </List.Item>
                            )}
                        />
                    ) : (
                        <div className="py-14">
                            <Empty description={(
                                <span className="text-blue-500 text-lg">
                                    {/* Hiện tại chưa có đánh giá nào */}
                                </span>
                            )} />
                        </div>
                    )}

                </div>
            </div >

        </div >
    </>
}

export default productById;