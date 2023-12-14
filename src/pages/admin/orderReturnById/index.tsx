import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import {
    Button,
    Form,
    Input,
    message,
    Upload,
    Breadcrumb,
    Table,
    Modal,
    Image,
} from 'antd';
import {
    FormOutlined,
    FrownOutlined
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useGetOneOrderReturnQuery, useUpdateOrderReturnMutation } from '../../../store/orderReturn/order.service';
import { useAddOrderByAdminMutation, useGetOneOrderQuery, useUpdateOrderMutation } from '../../../store/order/order.service';
import { useDeleteOrderDetailMutation, useUpdateOrderDetailMutation } from '../../../store/orderDetail/orderDetail.service';
const { TextArea } = Input;

interface DataType {
    key: string;
    image: string;
    name: string;
    colorName: string;
    size: string;
    quantity: number;
    price: number;
}

const orderReturnById = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [onUpdateOrder] = useUpdateOrderMutation()
    const [onAddOrderByAdmin] = useAddOrderByAdminMutation()
    const [onUpdateOrderReturn] = useUpdateOrderReturnMutation()
    const [onUpdateOrderDetail] = useUpdateOrderDetailMutation()
    const [onRemoveOrderDetail] = useDeleteOrderDetailMutation()
    const { data: orderReturn } = useGetOneOrderReturnQuery(id!);
    const idOrder = orderReturn?.orderId
    const { data: order } = useGetOneOrderQuery(idOrder || '');

    const ListOrderReturnDetail = orderReturn?.orderReturnDetails;

    const [openFormCreateOrder, setOpenFormCreateOrder] = useState(false);
    const [orderReturnDetail, setOrderReturnDetail] = useState<any[]>([]);
    const [openFormConfirmOrderReturn, setOpenFormConfirmOrderReturn] = useState(false);

    const [openFormUpdateNote, setOpenFormUpdateNote] = useState(false);
    const [openFormUpdateInfo, setOpenFormUpdateInfo] = useState(false);
    const [openFormUpdateStatus, setOpenFormUpdateStatus] = useState(false);
    const [orderDetail, setOrderDetail] = useState<any[]>([]);
    const [sumTotalMoney, setSumTotalMoney] = useState<Number>()

    useEffect(() => {
        if (ListOrderReturnDetail) {
            const fetchData = async () => {
                const productDetails = [];
                for (const detail of ListOrderReturnDetail) {
                    try {
                        const response = await axios.get(`http://localhost:8080/api/productDetails/${detail.productDetailId}`);
                        const productInfo = response.data;

                        const productResponse = await axios.get(`http://localhost:8080/api/products/${productInfo.product_id}`);
                        const productData = productResponse.data;

                        productDetails.push({
                            ...detail,
                            productInfo,
                            productName: productData.title,
                            sku: productData.sku

                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                setOrderReturnDetail(productDetails);
            };
            fetchData();
        }
    }, [ListOrderReturnDetail]);


    form.setFieldsValue({
        _id: orderReturn?._id,
        fullName: orderReturn?.fullName,
        address: orderReturn?.address,
        phoneNumber: orderReturn?.phoneNumber,
        note: orderReturn?.note
    });
    const columns: ColumnsType<DataType> = [
        {
            title: 'Sản phẩm',
            render: (record: any) => (
                <div className='flex'>
                    <div className='mr-2'>
                        <img src={record?.image} alt="" className='w-14 h-20 object-cover' />
                    </div>
                    <div className="space-y-3 py-2 font-light ">
                        <span className='block'>{record?.name}</span>
                        <span className='block text'>{record?.colorName} / {record.size}</span>
                    </div>
                </div>
            ),
            className: 'w-2/5'
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: <div className="text-end">Thành tiền</div>,
            key: 'total',
            render: (record: any) => <div className='text-end'>{(record.price * record.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>,
            className: 'w-1/5'
        },
    ];
    let data: DataType[] = [];

    data = orderReturnDetail.map((order: any) => ({
        key: order._id,
        image: order.productInfo.imageColor,
        name: order.productName,
        colorName: order.color,
        size: order.size,
        quantity: order.quantity,
        price: order.price,
    }));

    const listOrderDetail = orderReturnDetail.map((order) => ({
        productDetailId: order.productDetailId,
        costPrice: order.costPrice,
        price: order.price,
        quantity: order.quantity,
        color: order.color,
        size: order.size,
        totalMoney: order.quantity * order.price
    }));
    const totalOrderAmount = listOrderDetail.reduce((total, order) => {
        return total + order.totalMoney;
    }, 0);

    const createNewOrder = async (values: any) => {
        try {
            const valueCreate = {
                ...values,
                note: values.note === undefined ? "" : values.note,
                userId: orderReturn?.userId,
                items: listOrderDetail,
                totalMoney: totalOrderAmount,
                paymentStatus: 1,
                pay_method: "FREE",
                orderReturnId: orderReturn?._id
            }
            await onAddOrderByAdmin(valueCreate)
            const updateStatus = { ...orderReturn, status: 3 }
            const idOrderreturn = orderReturn?._id
            await onUpdateOrderReturn({ id: idOrderreturn, ...updateStatus })
            setOpenFormCreateOrder(false)
            message.success(`Thêm mới thành công`);
        } catch (error) {
            console.log(error);
        }
    };

    const confirmOrderReturn = async () => {
        try {
            const orderDetailsArray = order?.orderDetails;
            const orderReturnDetailsArray = orderReturn?.orderReturnDetails;

            const updatePromises: any = orderDetailsArray?.map(async (orderDetail) => {
                const matchingOrderReturnDetail = orderReturnDetailsArray.find(
                    (orderReturnDetail: any) => orderReturnDetail.orderDetailId === orderDetail._id
                );

                if (matchingOrderReturnDetail) {
                    if (orderDetail.quantity > matchingOrderReturnDetail?.quantity) {
                        const valueUpdate = {
                            ...orderDetail,
                            totalMoney: orderDetail.price * (orderDetail.quantity - matchingOrderReturnDetail.quantity),
                            quantity: orderDetail.quantity - matchingOrderReturnDetail.quantity,
                        };

                        await onUpdateOrderDetail({ _id: orderDetail._id, order: valueUpdate });

                        let totalMoneyUpdate =
                            sumTotalMoney - (matchingOrderReturnDetail.quantity * matchingOrderReturnDetail.price);
                        setSumTotalMoney(totalMoneyUpdate);
                        console.log(1);
                    }
                    if (orderDetail.quantity === matchingOrderReturnDetail?.quantity) {
                        await onRemoveOrderDetail(orderDetail._id)
                        let totalMoneyUpdate =
                            sumTotalMoney - (matchingOrderReturnDetail?.quantity * matchingOrderReturnDetail?.price);
                        setSumTotalMoney(totalMoneyUpdate);

                    }
                }
            });

            await Promise.all(updatePromises);

            const updatedTotalMoney = orderDetailsArray?.reduce((total, orderDetail) => {
                const matchingOrderReturnDetail = orderReturnDetailsArray.find(
                    (orderReturnDetail: any) => orderReturnDetail.orderDetailId === orderDetail._id
                );

                if (matchingOrderReturnDetail) {
                    total -= matchingOrderReturnDetail.quantity * matchingOrderReturnDetail.price;
                }

                return total;
            }, sumTotalMoney);

            const valueStatus = order?.paymentStatus === 1 ? 5 : 4
            const updatedOrder = { ...order, status: valueStatus, totalMoney: updatedTotalMoney };
            await onUpdateOrder({ id: idOrder, ...updatedOrder });

            const updateStatusOrderReturn = { ...orderReturn, status: 2 };
            const idOrderReturn = order?.orderReturn?._id;
            onUpdateOrderReturn({ id: idOrderReturn, ...updateStatusOrderReturn });

            setOpenFormConfirmOrderReturn(false);
            message.info(`Xác nhận yêu cầu đổi hàng`);
        } catch (error) {
            console.log(error);
        }
    };
    const unConfirmOrderReturn = async () => {
        try {
            const valueStatus = order?.paymentStatus === 1 ? 5 : 4;
            const updatedOrder = { ...order, status: valueStatus };
            await onUpdateOrder({ id, ...updatedOrder });

            const updateStatusOrderReturn = { ...orderReturn, status: 0 };
            const idOrderReturn = order?.orderReturn?._id;
            onUpdateOrderReturn({ id: idOrderReturn, ...updateStatusOrderReturn });

            setOpenFormConfirmOrderReturn(false);
            message.info(`Xác nhận yêu cầu đổi hàng`);
        } catch (error) {
            console.log(error);
        }
    };

    function mapStatusToText(statusCode: number) {
        switch (statusCode) {
            case 0:
                return "Từ chối yêu cầu";
            case 1:
                return "Chờ xác nhận";
            case 2:
                return "Chờ xử lí";
            case 3:
                return "Đang xử lí";
            case 4:
                return "Hoàn thành";
            default:
                return "Trạng thái không xác định";
        }
    }

    return <>
        <Breadcrumb className='pb-3'
            items={[
                {
                    title: <Link to={`/admin/orderreturn`}>QL đổi hàng</Link>,
                },
                {
                    title: 'CHI TIẾT',
                    className: 'uppercase',
                },
            ]}
        />
        <div className='px-10 '>
            <div className="space-y-2 py-5 w-[85%] mx-auto">
                <span className='block text-lg font-medium'>#{orderReturn?._id}</span>
                <div className="flex space-x-1 text-gray-400">
                    <span className='block'>{moment(orderReturn?.createdAt as string, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("HH:mm DD/MM/YYYY")}</span>
                    <span className='border-l border-gray-300'></span>
                    <span className='block'>
                        Trạng thái: {orderReturn && orderReturn.status === 4 ? (
                            <span className='text-green-500'>Hoàn thành</span>
                        ) : (
                            <span className='text-blue-500'>{mapStatusToText(orderReturn?.status)}</span>
                        )}
                    </span>
                </div>
            </div>
            <div className="flex w-[85%] mx-auto space-x-10">
                <div className="border bg-white w-2/3">
                    <div className="">
                        <h2 className='text-[#1677ff] text-lg border-b border-t px-5 py-3'>
                            Yêu cầu đổi hàng
                        </h2>
                        <div className="">
                            <Table
                                columns={columns}
                                dataSource={data}
                                pagination={false}
                                summary={(pageData) => {
                                    return (
                                        <>
                                            <Table.Summary.Row >
                                                <Table.Summary.Cell index={0} colSpan={3}>
                                                    <span className='text-[13px] text-gray-600'>Trạng thái</span>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell index={1} className='text-end'>
                                                    {orderReturn?.newOrder?.status === 5 ? (
                                                        <span className='p-2 font-medium text-xs text-green-600'>Hoàn thành</span>
                                                    ) : (
                                                        <span className='p-2 font-medium text-xs text-blue-700'>{mapStatusToText(orderReturn?.status)}</span>
                                                    )}
                                                </Table.Summary.Cell>
                                            </Table.Summary.Row>
                                            {orderReturn?.status === 3 && (
                                                <Table.Summary.Row >
                                                    <Table.Summary.Cell index={0} colSpan={3}>
                                                        {orderReturn.newOrder.status === 5 ? (
                                                            <span className='text-[13px] text-gray-600'>Hoàn tất đổi hàng</span>
                                                        ) : (
                                                            <span className='text-[13px] text-gray-600'>Đang xử lí yêu cầu</span>
                                                        )}
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={1} className='text-end'>
                                                        <Link to={`/admin/order/${orderReturn?.newOrder && orderReturn?.newOrder._id}`}>
                                                            <span className="inline-block cursor-pointer border rounded-lg p-2 font-medium text-xs text-yellow-500 border-yellow-500 transition-transform transform hover:scale-105">
                                                                Kiểm tra
                                                            </span>
                                                        </Link>
                                                    </Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            )}

                                            {orderReturn?.status === 1 && (
                                                <Table.Summary.Row >
                                                    <Table.Summary.Cell index={0} colSpan={3}>
                                                        <div className="flex items-center space-x-1">
                                                            <span className='block '>YÊU CẦU ĐỔI TRẢ</span>
                                                        </div>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={1} className='text-end'>
                                                        <div className="flex justify-end">
                                                            <span className="inline-block cursor-pointer border rounded-lg p-2 font-medium text-xs text-blue-500 border-blue-500 transition-transform transform hover:scale-105"
                                                                onClick={() => setOpenFormConfirmOrderReturn(true)}
                                                            >
                                                                Chi tiết
                                                            </span>
                                                            {/* <Button className='bg-yellow-500 text-white hover:text-white hover:bg-yellow-400' onClick={() => setOpenFormConfirmOrderReturn(true)}>Kiểm tra</Button> */}
                                                            <Modal
                                                                title="Yêu cầu đổi hàng"
                                                                // centered
                                                                open={openFormConfirmOrderReturn}
                                                                onOk={() => setOpenFormConfirmOrderReturn(false)}
                                                                onCancel={() => setOpenFormConfirmOrderReturn(false)}
                                                                okButtonProps={{ hidden: true }}
                                                                cancelButtonProps={{ hidden: true }}
                                                                width={500}
                                                            >
                                                                <div className="space-y-1">
                                                                    <span className='font-medium'>Khách hàng: </span>
                                                                    <span>{orderReturn?.fullName}</span>
                                                                    <span className='block mb-2 font-medium'> Lí do: </span>
                                                                    <div className="">
                                                                        <FrownOutlined className='text-red-500 px-1' />  {orderReturn?.reason}
                                                                        {/* <TextArea value={orderReturn?.reason} rows={3} /> */}
                                                                    </div>
                                                                    <Image.PreviewGroup>
                                                                        <div className='flex space-x-2 py-3'>
                                                                            {orderReturn?.images.map((url: any) => (
                                                                                <div
                                                                                    className='w-24 h-24 border flex justify-center items-center rounded-md hover:border-blue-400 shadow-xl '
                                                                                >
                                                                                    <Image height={80} src={url} />
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </Image.PreviewGroup>
                                                                    <div className="">
                                                                        <h2 className=' font-medium text-gray-800 my-3'>Sản phẩm đổi trả</h2>
                                                                        {orderReturnDetail.map((item: any) => (
                                                                            <div className="flex items-center justify-between space-x-2 mb-3">
                                                                                <div className="flex items-center space-x-2">
                                                                                    <div className="">
                                                                                        <img className='h-16 w-16' src={item.productInfo.imageColor} alt="" />
                                                                                    </div>
                                                                                    <div className="space-y-2">
                                                                                        <span className='block text-gray-800'><Link to={`/admin/product/${item.productInfo.product_id}`}>{item.productName}</Link></span>
                                                                                        <div className="flex space-x-3">
                                                                                            <div className="space-x-1 text-xs">
                                                                                                <span>Phân loại:</span>
                                                                                                <span className='text-blue-500'>{item.color}</span>
                                                                                                <span className='border-l text-gray-400'></span>
                                                                                                <span className='text-blue-500'>{item.size}</span>
                                                                                            </div>
                                                                                            <div className="text-xs">
                                                                                                <span>Mã SP: <Link to={`/admin/product/${item.productInfo.product_id}`}>{item.sku}</Link></span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                <div className=" space-x-3">
                                                                                    <span className='text-[12px] text-gray-500'>SL: 1</span>
                                                                                    {/* <span className='text-[12px] text-gray-500'>320,000 đ</span> */}
                                                                                </div>
                                                                            </div>
                                                                        ))}


                                                                    </div>
                                                                    <div className="flex justify-end pt-8 space-x-3">
                                                                        <Button
                                                                            onClick={() => unConfirmOrderReturn()}>
                                                                            Từ chối yêu cầu
                                                                        </Button>
                                                                        <Button type="primary"
                                                                            className='bg-blue-500'
                                                                            onClick={() => confirmOrderReturn()}>
                                                                            Xác nhận
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </Modal>
                                                        </div>
                                                    </Table.Summary.Cell>
                                                </Table.Summary.Row >
                                            )}

                                            {orderReturn?.status === 2 && (
                                                <Table.Summary.Row>
                                                    <Table.Summary.Cell index={0} colSpan={3}>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={1} className='text-end'>
                                                        <div className="flex justify-end">
                                                            <Button type="primary" className='bg-blue-500' onClick={() => setOpenFormCreateOrder(true)}>Tạo đơn hàng</Button>
                                                        </div>
                                                        <Modal
                                                            title="Tạo mới đơn hàng"
                                                            centered
                                                            open={openFormCreateOrder}
                                                            onOk={() => setOpenFormCreateOrder(false)}
                                                            onCancel={() => setOpenFormCreateOrder(false)}
                                                            okButtonProps={{ hidden: true }}
                                                            cancelButtonProps={{ hidden: true }}
                                                            width={700}
                                                        >
                                                            <Form
                                                                form={form}
                                                                name="validateOnly"
                                                                layout="vertical"
                                                                onFinish={createNewOrder}
                                                                autoComplete="off"
                                                                className="mx-auto"
                                                            >
                                                                <Form.Item
                                                                    name="fullName"
                                                                    label="Khách hàng"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                        }
                                                                    ]}>
                                                                    <Input />
                                                                </Form.Item>

                                                                <Form.Item
                                                                    name="phoneNumber"
                                                                    label="Số điện thoại"
                                                                    rules={[{ required: true }]}
                                                                >
                                                                    <Input
                                                                        style={{ width: '100%' }}
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item

                                                                    name="address"
                                                                    label="Địa chỉ"
                                                                    rules={[{ required: true }]}
                                                                    className='mb-1'
                                                                >
                                                                    <Input />
                                                                </Form.Item>
                                                                <details className="pb-2 overflow-hidden [&_summary::-webkit-details-marker]:hidde">
                                                                    <summary
                                                                        className="flex w-[250px] cursor-pointer p-2 transition"
                                                                    >
                                                                        <span className="text-sm text-blue-500">Ghi chú <FormOutlined /></span>
                                                                    </summary>
                                                                    <div className="pt-3">
                                                                        <Form.Item
                                                                            name="note"
                                                                        >
                                                                            <TextArea />
                                                                        </Form.Item>
                                                                    </div>
                                                                </details>

                                                                <Table
                                                                    columns={columns}
                                                                    dataSource={data}
                                                                    pagination={false}
                                                                />
                                                                <Form.Item className=' flex justify-end '>
                                                                    <Button type="primary" htmlType="submit" className='bg-blue-500 my-3'>
                                                                        Tạo mới
                                                                    </Button>
                                                                </Form.Item>
                                                            </Form>
                                                        </Modal>
                                                    </Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            )}

                                        </>
                                    )
                                }}
                            />


                        </div>
                    </div>
                </div>
                <div className="w-1/3 space-y-5">
                    <div className="border w-full bg-white p-3">
                        <div className="flex mb-2 items-center justify-between">
                            <h2 className='text-sm font-medium text-gray-900 '>Ghi chú</h2>
                        </div>
                        {orderReturn?.note === "" ? (
                            <span>Không có ghi chú</span>
                        ) : (
                            <span>
                                {orderReturn?.note}
                            </span>
                        )}
                    </div>
                    <div className="border w-full bg-white">
                        <div className="border-b p-4">
                            <h2 className='text-sm mb-2  font-medium text-gray-900 '>Khách hàng</h2>
                            <span className='block text-blue-500 underline'><Link to={``}>{orderReturn?.fullName}</Link></span>
                        </div>
                        <div className="border-b p-4">
                            <h2 className='text-sm mb-2 font-medium text-gray-900 '>Thông tin liên hệ</h2>
                            <span className='block'>{(orderReturn as any)?.userId?.email}</span>
                        </div>
                        <div className="border-b p-4">
                            <div className="flex mb-2 items-center justify-between">
                                <h2 className='text-sm font-medium text-gray-900 '>ĐỊA CHỈ GIAO HÀNG</h2>
                            </div>
                            <span className='block'>{orderReturn?.fullName}</span>
                            <span className='block'>{orderReturn?.phoneNumber}</span>
                            <span className='block'>{orderReturn?.address}</span>
                        </div>

                    </div>
                </div>
            </div>
        </div >

    </>
}

export default orderReturnById;