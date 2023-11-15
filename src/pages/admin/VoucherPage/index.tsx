import {
    Space,
    Table,
    Popconfirm,
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
import { useEffect, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { ColumnsType, TableProps } from 'antd/es/table';
import { useListVoucherQuery } from '../../../store/vouchers/voucher.service';
import { listVoucherSlice } from '../../../store/vouchers/voucherSlice';

interface DataType {
    _id: React.Key;
    code: string;
    title: string;
    price: number;
    quantity: number;
    used: number;
    discount: number;
}


const VoucherPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const { data: listVochers, isLoading, isError, isSuccess } = useListVoucherQuery()
    const vocherState = useSelector((state: RootState) => state.voucherSlice.vouchers)

    useEffect(() => {
        if (isSuccess) {
            dispatch(listVoucherSlice(listVochers))
        }
    }, [isSuccess])
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
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'key',
            render: (value: any) => <span className='uppercase font-bold '>{value}</span>,
            className: 'w-[100px]'
        },
        {
            title: 'MÃ GIẢM GIÁ',
            dataIndex: 'code',
            key: 'code',
        },

        {
            title: 'SỐ LƯỢNG',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'SL NGƯỜI DÙNG',
            dataIndex: 'used',
            key: 'user',
        },
        {
            title: 'THỜI GIAN ÁP DỤNG',
            dataIndex: '',
            key: '',
        },
        // {
        //     title: 'GIÁ',
        //     dataIndex: 'price',
        //     key: 'price',
        //     render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        //     sorter: (a, b) => a.price - b.price, // Sắp xếp theo số
        //     sortDirections: ['ascend', 'descend'],
        //     showSorterTooltip: false,
        // },
        // {
        //     title: 'GIẢM GIÁ',
        //     dataIndex: 'discount',
        //     key: 'discount',
        //     render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        //     sorter: (a, b) => a.price - b.price, // Sắp xếp theo số
        //     sortDirections: ['ascend', 'descend'],
        //     showSorterTooltip: false,
        // },

        {
            title: '',
            key: 'action',
            render: (record: any) => (
                <Space size="middle" className='flex justify-end'>
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
                    <Link to={`/admin/voucher/update/${record?._id}`}>
                        <EditFilled className='text-xl text-yellow-400' />
                    </Link>
                </Space>
            ),
        },

    ];

    const data: DataType[] = vocherState.map((voucher: any, index) => ({
        key: index + 1,
        _id: voucher._id,
        code: voucher.code,
        title: voucher.title,
        price: voucher.price,
        quantity: voucher.quantity,
        used: voucher.used,
        discount: voucher.discount,
    }));
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div className="">
            <Space className='flex justify-between mb-5'>
                <div className="">
                    <span className="block text-xl text-[#1677ff]">
                        QUẢN LÝ
                    </span>
                    {/* <span className="block text-base  text-[#1677ff]">
                        Manage your products
                    </span> */}
                </div>
                <Link to={`add`}>
                    <Button type='primary' className='bg-[#1677ff]'
                        icon={<PlusOutlined />}
                    >
                        Tạo mới
                    </Button>
                </Link>
            </Space>
            <div className="border p-3 rounded-lg min-h-screen bg-white">
                <div className="pb-6 pt-3">
                    <form >
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
export default VoucherPage;