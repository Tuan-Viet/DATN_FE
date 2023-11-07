import React, { useEffect, useState } from 'react';
import type { FormInstance, UploadProps } from 'antd';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    message,
    Upload,
    Spin,
    Row,
    Col,
    Card,
    Typography,
    Image,
    Badge,
    Breadcrumb,
    Table
} from 'antd';
import {
    UploadOutlined,
    CloseOutlined,
    CloudUploadOutlined,
    CloseCircleFilled
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetchListProductQuery, useFetchOneProductQuery, useUpdateProductMutation } from '../../../store/product/product.service';
import axios from 'axios';
import { useGetOneOrderQuery, useUpdateOrderMutation } from '../../../store/order/order.service';
import { useGetOneProductDetailQuery } from '../../../store/productDetail/productDetail.service';
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
            Submit
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
        console.log("order detail", ListOrderDeatils);

        const [orderDetail, setOrderDetail] = useState<any[]>([]);
        useEffect(() => {
            if (ListOrderDeatils) {
                const fetchData = async () => {
                    const productDetails = [];
                    for (const detail of ListOrderDeatils) {
                        try {
                            // const response = await useGetOneProductDetailQuery(detail.productDetailId)
                            const response = await axios.get(`http://localhost:8080/api/productDetails/${detail.productDetailId}`);
                            const productInfo = response.data;
                            console.log("1", productInfo);

                            productDetails.push({
                                ...detail,
                                productInfo,
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

        console.log("data", orderDetail);
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
            pay_method: order?.pay_method && order?.pay_method,
            status: order?.status && order?.status,
        });




    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Items',
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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
            title: 'Quanttity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            key: 'total',
            title: 'Total',
            render: (record: any) => (record.price * record.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
    ];
    let data: DataType[] = [];

    if (orderDetails) {
        data = orderDetails.map((order: any) => ({
            key: order._id,
            image: order.productInfo.imageColor,
            name: order.fullName,
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

            message.success(`Update order successfully`);
            navigate("/admin/order");
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        <Breadcrumb className='pb-3'
            items={[

                {
                    title: <Link to={`/admin/order`}>Order</Link>,
                },
                {
                    title: 'Update Order',
                },
            ]}
        />
        <div className='border p-10 rounded-lg  bg-white'>
            <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff]">
                Update Order
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
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                    <Col className="gutter-row" span={8}>


                        <Form.Item
                            name="fullName"
                            label="Customer name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Title Product!'
                                }
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            name="phoneNumber"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                        >
                            <Input
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={8}>

                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[{ required: true, message: 'Please input your Address!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            name="date"
                            label="Date"
                        >
                            <Input readOnly />
                        </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            name="pay_method"
                            label="Payment"
                        >
                            <Select
                                allowClear
                                options={[
                                    { value: 0, label: 'Unpaid', },
                                    { value: 1, label: 'Paid', },
                                ]}
                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Form.Item name="status" label="Status">
                            <Select
                                allowClear
                                options={[
                                    { value: 0, label: 'Canceled' },
                                    { value: 1, label: 'Peding' },
                                    { value: 2, label: 'Packing' },
                                    { value: 3, label: 'Shipping' },
                                    { value: 4, label: 'Completed', disabled: true },
                                ].filter(option => form.getFieldValue('status') <= option.value)}
                                disabled={form.getFieldValue('status') === 0}
                            ></Select>
                        </Form.Item>

                    </Col>
                </Row>

                <div className="">
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
                                        <Table.Summary.Cell index={0} colSpan={3}>Total</Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}>
                                            {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                    <Table.Summary.Row className='font-bold'>
                                        <Table.Summary.Cell index={0} colSpan={3}>Shipping</Table.Summary.Cell>
                                        <Table.Summary.Cell index={1}>
                                            Free
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                    <Table.Summary.Row className='font-bold'>
                                        <Table.Summary.Cell index={0} colSpan={3}>Total Money</Table.Summary.Cell>
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
                        <Button htmlType="reset">Reset</Button>
                    </Space>
                </Form.Item>
            </Form >
        </div >

    </>
}

export default orderUpdate;