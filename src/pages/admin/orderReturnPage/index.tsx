import {
    Space,
    Table,
    Popconfirm,
    Image,
    Button,
    message,
    Spin,
    Select
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

import { listOrderSearchSlice, listOrderSlice } from '../../../store/order/orderSlice';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useListOrderReturnQuery } from '../../../store/orderReturn/order.service';

interface DataType {
    key: React.Key;
    date: string;
    fullName: string;
    status: number;
    pay_method: number;
    totalMoney: number;
    paymentStatus: number;
}


const ordersReturnPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const { data: orders, isLoading, isError, isSuccess } = useListOrderReturnQuery()
    const { handleSubmit } = useForm();
    const [search, setSearch] = useState<string>("")
    const orderState = useSelector((state: RootState) => state.orderSlice.orders)
    const [orderOption, setOrderOption] = useState<Number>(1);

    // const [onRemove] = useRemoveProductMutation()
    useEffect(() => {
        if (orders) {
            if (search === "" || !search) {
                dispatch(listOrderSlice(orders))
            }
        }
    }, [isSuccess, search])

    const handleSearch = () => {
        if (orders) {
            dispatch(listOrderSearchSlice({ searchTerm: search, orders: orders }))
        }
    }
    // useEffect(() => {
    //     if (orderState?.length === 0 && orders) {
    //         dispatch(listOrderSearchSlice({ searchTerm: search, orders: orders }))
    //     }
    // }, [orderState.length === 0])
    if (isError) {
        return <>error</>;
    }
    if (isLoading) {
        return <>
            <div className="fixed inset-0 flex justify-center items-center bg-gray-50 ">
                <Spin size='large' />
            </div>
        </>;
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'key',
            render: (value: any) => <Link to={``} className='uppercase font-bold '>{value}</Link>,
            className: 'w-[100px]'
        },
        {
            title: 'MÃ ĐƠN HÀNG',
            key: '_id',
            render: (record: any) => (<Link to={`/admin/order/${record?._id}`} className='uppercase'>#{record?._id}</Link>),
            className: 'w-1/6',
        },
        {
            title: 'NGÀY',
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
            render: (value: any) => <span>{moment(value as string, "YYYY-MM-DDTHH:mm:ss.SSSZ").format("HH:mm DD/MM/YYYY")}</span>,
            sortDirections: ['ascend', 'descend'],
            showSorterTooltip: false,
        },
        {
            title: 'KHÁCH HÀNG',
            dataIndex: 'fullName',
            key: 'fullName',
            className: 'w-1/4',
        },
        {
            title: 'TRẠNG THÁI',
            key: 'status',
            render: (value: any) => {
                let statusText, statusColor;

                switch (value.status) {
                    case 2:
                        statusText = 'Chờ xử lí';
                        statusColor = 'bg-gray-200 text-gray-700';
                        break;
                    case 3:
                        statusText = 'Chờ lấy hàng';
                        statusColor = 'bg-cyan-300 text-cyan-700';
                        break;
                    default:
                        statusText = '';
                        statusColor = '';
                }
                return (

                    <span className={`border rounded-lg px-2 py-1 text-xs  ${statusColor}`}>
                        {statusText}
                    </span>
                );
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
            title: '',
            key: 'action',
            render: (record: any) => (
                <Space size="middle" className='flex justify-end'>
                    <Link to={`/admin/order/${record?._id}`}>
                        <EyeOutlined className='text-xl text-green-500' />
                    </Link>
                </Space>
            ),
        },

    ];

    const sortOrder = [...orderState];

    switch (orderOption) {
        case 1:
            // Mới nhất
            sortOrder.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        case 2:
            // Cũ nhất
            sortOrder.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
        default:
            break;
    }

    let data: DataType[] = [];

    if (orderState) {
        data = sortOrder
            .filter(order => order.status !== 1)
            .map((order: any, index) => ({
                key: index + 1,
                _id: order._id,
                date: order.createdAt,
                fullName: order.fullName,
                status: order.status,
                pay_method: order.pay_method,
                paymentStatus: order.paymentStatus,
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
                        QUẢN LÝ ĐƠN HÀNG
                    </span>
                    {/* <span className="block text-base  text-[#1677ff]">
                        Manage your orders
                    </span> */}
                </div>
            </Space>
            <div className="border p-3 rounded-lg min-h-screen bg-white">
                <div className="flex pb-6 pt-3 justify-between">
                    <form
                        onSubmit={handleSubmit(handleSearch)}
                        className='w-[500px]'>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                placeholder='Tìm kiếm theo tên khách hàng'
                                onChange={(e) => setSearch(e.target.value)}
                                type="text" id="default-search" className="block w-full outline-none p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#1677ff] hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tìm kiếm</button>
                        </div>
                    </form>


                </div>
                <div className="flex justify-end items-start mb-6">
                    <div className="flex items-center">
                        <span className="mr-3 text-sm text-[#333333]">Sắp xếp theo:</span>
                        <Select
                            defaultValue={1}
                            style={{ width: 200, height: 36 }}
                            options={[
                                { value: 1, label: 'Mới nhất' },
                                { value: 2, label: 'Cũ nhất' },
                            ]}
                            onChange={(value: Number) => setOrderOption(value)}
                        />
                    </div>
                </div>
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} onChange={onChange} />
            </div>
        </div>
    )
}
export default ordersReturnPage;