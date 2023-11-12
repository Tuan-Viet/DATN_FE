import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import {
    Button,
    Form,
    Input,
    Select,
    Space,
    message,
    Upload,
    Spin,
    Row,
    Col,
    Breadcrumb,
    Table
} from 'antd';
import {
    UploadOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useGetOneOrderQuery, useUpdateOrderMutation } from '../../../store/order/order.service';
import { ColumnsType } from 'antd/es/table';
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

const orderUpdate = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [onUpdate] = useUpdateOrderMutation()
    let orderDetails = []
    if (id) {
        const { data: order } = useGetOneOrderQuery(id);
        const ListOrderDeatils = order?.orderDetails;

        const [orderDetail, setOrderDetail] = useState<any[]>([]);
        useEffect(() => {
            if (ListOrderDeatils) {
                const fetchData = async () => {
                    const productDetails = [];
                    for (const detail of ListOrderDeatils) {
                        try {
                            const response = await axios.get(`http://localhost:8080/api/productDetails/${detail.productDetailId}`);
                            const productInfo = response.data;
                            console.log("1", productInfo);

                            const productResponse = await axios.get(`http://localhost:8080/api/products/${productInfo.product_id}`);
                            const productData = productResponse.data;
                            console.log("2", productData);

                            productDetails.push({
                                ...detail,
                                productInfo,
                                productName: productData.title,

                            });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    setOrderDetail(productDetails);
                };
                fetchData();
            }
        }, [ListOrderDeatils]);

        orderDetails = orderDetail

        const date = () => {
            const date = new Date(order?.createdAt);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return `${day}/${month}/${year}`;
        }
        form.setFieldsValue({
            _id: order?._id,
            fullName: order?.fullName,
            address: order?.address,
            phoneNumber: order?.phoneNumber,
            date: date(),
            paymentStatus: order?.paymentStatus && order?.paymentStatus,
            status: order?.status && order?.status,
            note: order?.note
        });
    }
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
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            key: 'price',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Thành tiền',
            key: 'total',
            render: (record: any) => (record.price * record.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
    ];
    let data: DataType[] = [];

    if (orderDetails) {
        data = orderDetails.map((order: any) => ({
            key: order._id,
            image: order.productInfo.imageColor,
            name: order.productName,
            colorName: order.color,
            size: order.size,
            quantity: order.quantity,
            price: order.price,
        }));
    }

    // const [onUpdate] = useUpdateProductMutation()
    const onFinish = async (values: any) => {
        try {
            console.log("value:", values);

            await onUpdate({ id, ...values });

            message.success(`Cập nhật thành công`);
            navigate("/admin/order");
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        <Breadcrumb className='pb-3'
            items={[

                {
                    title: <Link to={`/admin/order`}>Đơn hàng</Link>,
                },
                {
                    title: 'Cập nhật',
                    className: 'uppercase',
                },
            ]}
        />
        <div className='border p-10 rounded-lg  bg-white'>
            <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff] mb-10">
                Cập nhật đơn hàng
            </h3>
            <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="mx-auto"
            >
                <Form.Item style={{ display: "none" }}>
                    <Input name="_id" />
                </Form.Item>
                <h3 className='text-lg font-medium text-[#1677ff] border-l-4 px-3 border-[#1677ff] mb-3'>Thông tin người nhận</h3>
                <div className="flex ">
                    <div className="w-2/3 px-10">
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
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="note"
                            label="Ghi chú"
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                    </div>
                    <div className="w-1/3 px-10">
                        <Form.Item
                            name="date"
                            label="Ngày đặt"
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            name="paymentStatus"
                            label="Thanh toán"
                        >
                            <Select
                                allowClear
                                options={[
                                    { value: 0, label: 'Chưa thanh toán', disabled: true },
                                    { value: 1, label: 'Đã thanh toán' },
                                ]}
                                disabled={form.getFieldValue('paymentStatus') === 1}

                            ></Select>
                        </Form.Item>
                        <Form.Item name="status" label="Trạng thái">
                            {form.getFieldValue('status') === 0 ? (
                                <div className='w-full leading-[30px] rounded-md text-center font-semibold bg-red-500 text-white outline-none hover:text-white'>Hủy đơn hàng</div>
                            ) : form.getFieldValue('status') === 4 ? (
                                <div className='w-full leading-[30px] rounded-md text-center font-semibold bg-green-500 text-white outline-none hover:text-white' >Đã hoàn thành</div>
                            ) : (
                                <Select
                                    allowClear
                                    options={[
                                        { value: 0, label: 'Hủy đơn hành' },
                                        { value: 1, label: 'Đang xử lí xử lí' },
                                        { value: 2, label: 'Chuẩn bị hàng' },
                                        { value: 3, label: 'Đang giao' },
                                        { value: 4, label: 'Hoàn thành', disabled: true },
                                    ].filter(option => form.getFieldValue('status') <= option.value)}
                                    disabled={form.getFieldValue('status') === 0 || form.getFieldValue('status') === 4}
                                ></Select>
                            )}
                        </Form.Item>
                        {/* <Form.Item name="status" label="Trạng thái">
                            <Select
                                allowClear
                                options={[
                                    { value: 0, label: 'Hủy đơn hành' },
                                    { value: 1, label: 'Đang xử lí xử lí' },
                                    { value: 2, label: 'Chuẩn bị hàng' },
                                    { value: 3, label: 'Đang giao' },
                                    { value: 4, label: 'Hoàn thành', disabled: true },
                                ].filter(option => form.getFieldValue('status') <= option.value)}
                                disabled={form.getFieldValue('status') === 0 || form.getFieldValue('status') === 4}
                            ></Select>

                        </Form.Item> */}
                    </div>
                </div>





                <div className="my-10">
                    <h3 className='text-lg font-medium text-[#1677ff] border-l-4 px-3 border-[#1677ff] mb-5'>Thông tin giỏ hàng</h3>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        className='mb-10'
                        summary={(pageData) => {
                            let total = 0;
                            pageData.forEach((record) => {
                                total += record.price * record.quantity;
                            });
                            return (
                                <>
                                    <Table.Summary.Row className='font-bold'>
                                        <Table.Summary.Cell index={0} colSpan={3}>Tổng sản phẩm</Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}>
                                            {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                    <Table.Summary.Row className='font-bold'>
                                        <Table.Summary.Cell index={0} colSpan={3}>Giao hàng tận nơi</Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}>
                                            Miễn phí
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                    <Table.Summary.Row className='font-bold'>
                                        <Table.Summary.Cell index={0} colSpan={3}>Tổng</Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}>
                                            {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </>
                            );
                        }}
                    />
                </div>
                <Form.Item className='my-5'>
                    <Space>
                        <SubmitButton form={form} />
                        {/* <Button htmlType="reset">Reset</Button> */}
                    </Space>
                </Form.Item>
            </Form >
        </div >

    </>
}

export default orderUpdate;