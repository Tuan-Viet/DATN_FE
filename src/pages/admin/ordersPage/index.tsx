import {
    Space,
    Table,
    Popconfirm,
    Image,
    Button,
    message,
    Spin
} from 'antd';
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined,
    EyeOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useFetchListProductQuery, useRemoveProductMutation } from '../../../store/product/product.service';
import { useEffect, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { ColumnsType, TableProps } from 'antd/es/table';
import { useListOrderQuery } from '../../../store/order/order.service';

interface DataType {
    key: React.Key;
    date: string;
    fullName: string;
    status: number;
    pay_method: number;
    totalMoney: number;
}


const ordersPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const { data: orders, isLoading, isError, isSuccess } = useListOrderQuery()

    const [onRemove] = useRemoveProductMutation()

    if (isError) {
        return <>error</>;
    }
    if (isLoading) {
        return <>
            <div className="flex justify-center items-center h-[600px]">
                <Spin size='large' />
            </div>
        </>;
    }

    // const confirm = async (id: string) => {
    //     try {
    //         if (id) {
    //             await onRemove(id).then(() => dispatch(deleteProductSearchSlice(id)))
    //             message.success('Delete order successfully!',);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Order number',
            key: 'key',
            render: (record: any) => (<Link to={``} className=''>#{record?.key}</Link>),
            className: 'w-1/4',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => {
                // Chuyển đổi giá trị date thành kiểu Date
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);

                // Lấy ngày, tháng, năm từ đối tượng Date
                const dayA = dateA.getDate();
                const monthA = dateA.getMonth() + 1; // Months are zero-based
                const yearA = dateA.getFullYear();

                const dayB = dateB.getDate();
                const monthB = dateB.getMonth() + 1;
                const yearB = dateB.getFullYear();

                // So sánh theo ngày/tháng/năm
                if (yearA === yearB) {
                    if (monthA === monthB) {
                        return dayA - dayB;
                    } else {
                        return monthA - monthB;
                    }
                } else {
                    return yearA - yearB;
                }
            },
            render: (text, record) => {
                const date = new Date(record.date);
                const day = date.getDate();
                const month = date.getMonth() + 1; // Months are zero-based
                const year = date.getFullYear();

                return `${day}/${month}/${year}`;
            },
            sortDirections: ['ascend', 'descend'],
            showSorterTooltip: false,
        },
        {
            title: 'Customer name',
            dataIndex: 'fullName',
            key: 'fullName',
            className: 'w-1/4',
        },
        {
            title: 'Total',
            dataIndex: 'totalMoney',
            key: 'totalMoney',
            sorter: (a, b) => a.totalMoney - b.totalMoney, // Sắp xếp theo số
            sortDirections: ['ascend', 'descend'],
            showSorterTooltip: false,
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
            title: 'Payment',
            key: 'pay_method',
            render: (value: any) => (value.pay_method === 1 ? (
                <span className='border bg-green-500 rounded-lg text-white px-2 py-1 text-xs'>
                    Paid
                </span>
            ) : (
                <span className='border bg-gray-200 rounded-lg text-gray-500 px-2 py-1 text-xs'>
                    Unpaid
                </span>
            )),
            sorter: (a, b) => a.pay_method - b.pay_method, // Sắp xếp theo số
            sortDirections: ['ascend', 'descend'],
            showSorterTooltip: false,
        },
        {
            title: 'Status',
            key: 'status',
            render: (value: any) => {
                if (value.status === 0) {
                    return (
                        <span className='border bg-red-500 rounded-lg text-white px-2 py-1 text-xs'>
                            Canceled
                        </span>
                    )
                }
                if (value.status === 1) {
                    return (
                        <span className='border bg-gray-200 rounded-lg text-gray-500 px-2 py-1 text-xs'>
                            Pending
                        </span>
                    )
                }
                if (value.status === 2) {
                    return (
                        <span className='border bg-yellow-400 rounded-lg text-white px-2 py-1 text-xs'>
                            Packing
                        </span>
                    )
                }
                if (value.status === 3) {
                    return (
                        <span className='border bg-blue-500 rounded-lg text-white px-2 py-1 text-xs'>
                            Shipping
                        </span>
                    )
                }
                if (value.status === 4) {
                    return (
                        <span className='border bg-green-500 rounded-lg text-white px-2 py-1 text-xs'>
                            Completed
                        </span>
                    )
                }
            },
            sorter: (a, b) => {
                const customOrder = [1, 2, 3, 4, 0];

                const orderA = customOrder.indexOf(a.status);
                const orderB = customOrder.indexOf(b.status);

                return orderA - orderB;
            },
            sortDirections: ['ascend', 'descend'],
            showSorterTooltip: false,
        },

        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <Space size="middle">
                    <Link to={`/admin/product/${record?._id}`}>
                        <EyeOutlined className='text-xl text-green-400' />
                    </Link>
                    <Popconfirm
                        title="Delete category"
                        description="Are you sure to delete this category?"
                        onConfirm={() => confirm(record?._id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "text-white bg-blue-400" }}
                    >
                        <DeleteFilled className='text-xl text-red-400' />
                    </Popconfirm>
                    <Link to={`/admin/order/${record?.key}`}>
                        <EditFilled className='text-xl text-yellow-400' />
                    </Link>
                </Space>
            ),
        },

    ];

    let data: DataType[] = [];

    if (orders) {
        data = orders.map((order: any) => ({
            key: order._id,
            date: order.createdAt,
            fullName: order.fullName,
            status: order.status,
            pay_method: order.pay_method,
            totalMoney: order.totalMoney,
        }));
    }

    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div className="">
            <Space className='mb-5'>
                <div className="">
                    <span className="block text-xl text-[#1677ff]">
                        Order List
                    </span>
                    <span className="block text-base  text-[#1677ff]">
                        Manage your orders
                    </span>
                </div>
            </Space>
            <div className="border p-3 rounded-lg min-h-screen bg-white">
                <div className="pb-6 pt-3">
                    <form>
                        <input type="text" className='border p-2 w-64 outline-none '
                            placeholder="" />
                        <button type="submit" className='p-2 bg-[#1677ff]'>
                            <SearchOutlined className='text-white' />
                        </button>
                    </form>
                </div>
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} onChange={onChange} />
            </div>
        </div>
    )
}
export default ordersPage;