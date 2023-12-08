import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import {
    Button,
    Form,
    Input,
    Select,
    message,
    Upload,
    Spin,
    Breadcrumb,
    Table,
    Modal,
    Popconfirm,
    Image
} from 'antd';
import {
    CheckCircleOutlined,
    FrownOutlined,
    FormOutlined
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useGetOneOrderQuery, useUpdateOrderMutation } from '../../../store/order/order.service';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useGetOneOrderReturnQuery, useUpdateOrderReturnMutation } from '../../../store/orderReturn/order.service';
import { useDeleteOrderDetailMutation, useUpdateOrderDetailMutation } from '../../../store/orderDetail/orderDetail.service';
const { Dragger } = Upload;
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

const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable} className='bg-blue-500'>
            Cập nhật
        </Button>
    );
};

const orderReturnById = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [onUpdate] = useUpdateOrderMutation()
    const [onUpdateOrderReturn] = useUpdateOrderReturnMutation()
    const [onUpdateOrderDetail] = useUpdateOrderDetailMutation()
    const [onRemoveOrderDetail] = useDeleteOrderDetailMutation()
    const { data: order } = useGetOneOrderQuery(id || '');


    const { data: orderReturn } = useGetOneOrderReturnQuery(id || '');

    const ListOrderDeatils = order?.orderDetails;
    const ListOrderReturnDetail = orderReturn?.orderReturnDetails;

    const [openFormUpdateNote, setOpenFormUpdateNote] = useState(false);
    const [openFormUpdateInfo, setOpenFormUpdateInfo] = useState(false);
    const [openFormCreateOrder, setOpenFormCreateOrder] = useState(false);
    const [openFormConfirmOrderReturn, setOpenFormConfirmOrderReturn] = useState(false);
    const [orderDetail, setOrderDetail] = useState<any[]>([]);
    const [orderReturnDetail, setOrderReturnDetail] = useState<any[]>([]);
    console.log(orderReturnDetail);

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
        note: order?.note
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


    console.log(orderReturnDetail);

    data = orderReturnDetail.map((order: any) => ({
        key: order._id,
        image: order.productInfo.imageColor,
        name: order.productName,
        colorName: order.color,
        size: order.size,
        quantity: order.quantity,
        price: order.price,
    }));

    const onFinish = async (values: any) => {
        try {
            const listIdProductDetail = ListOrderReturnDetail.map((order: any) => order.productDetailId)

            const valueCreate = {
                ...values,
                userId: orderReturn?.userId,
                orderDetails: listIdProductDetail
            }
            console.log(valueCreate);

            setOpenFormCreateOrder(false)
            message.success(`Cập nhật thành công`);
        } catch (error) {
            console.log(error);
        }
    };

    function mapStatusToText(statusCode: number) {
        switch (statusCode) {
            case 0:
                return "Đã hủy";
            case 1:
                return "Chờ xử lý";
            case 2:
                return "Chờ xử lí";
            case 3:
                return "Đang xử lí";
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
                            />
                        </div>
                        <div className=' flex justify-end py-3 px-5'>
                            <Button type="primary" className='bg-blue-500' onClick={() => setOpenFormCreateOrder(true)}>Tạo đơn hàng</Button>
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
                                    onFinish={onFinish}
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
                        </div>
                    </div>
                </div>
                <div className="w-1/3 space-y-5">
                    <div className="border w-full bg-white p-3">
                        <div className="flex mb-2 items-center justify-between">
                            <h2 className='text-sm font-medium text-gray-900 '>Ghi chú</h2>
                        </div>
                        {order?.note === "" ? (
                            <span>Không có ghi chú</span>
                        ) : (
                            <span>
                                {order?.note}
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
                            <span className='block'>{(order as any)?.userId?.email}</span>
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