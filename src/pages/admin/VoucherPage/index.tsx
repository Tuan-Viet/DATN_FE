import {
    Space,
    Table,
    Popconfirm,
    Button,
    message,
    Spin,
    Steps
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
import { useDeleteVoucherMutation, useListVoucherQuery } from '../../../store/vouchers/voucher.service';
import { deleteVoucherSlice, listVoucherSlice } from '../../../store/vouchers/voucherSlice';

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
    const [onRemove] = useDeleteVoucherMutation()
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
            title: 'HẠN SỬ DỤNG',
            render: (value: any) => (
                <div className="">
                    <span className={`bg-${statusValid(value.validFrom, value.validTo) === 'Sắp diễn ra' ? 'blue' : statusValid(value.validFrom, value.validTo) === 'Đang diễn ra' ? 'green' : 'red'}-500 text-white px-2 py-1 rounded-lg`}>
                        {statusValid(value.validFrom, value.validTo)}
                    </span>
                    <Steps
                        progressDot
                        direction="vertical"
                        items={[
                            {
                                title: 'Bắt đầu',
                                description: formatDateString(value.validFrom)
                            },
                            {
                                title: 'Kết thúc',
                                description: formatDateString(value.validTo)
                            },
                        ]}
                    />
                </div>
            )
        },
        {
            title: 'TÊN',
            dataIndex: 'title',
            key: 'title',
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
            title: 'LOẠI',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'GIẢM GIÁ',
            render: (value: any) => (
                <div>
                    {value.type === 'value' ? (
                        <span>{value.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ</span>
                    ) : (
                        <span>{value.discount} %</span>
                    )}
                </div>
            )
        },
        // {
        //     title: 'MÔ TẢ',
        //     dataIndex: 'description',
        //     key: 'description',
        // },
        {
            title: '',
            key: 'action',
            render: (value: any) => (
                <Space size="middle" className='flex justify-end'>
                    <Popconfirm
                        title="Delete category"
                        description="Are you sure to delete this category?"
                        onConfirm={() => confirm(value?._id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "text-white bg-blue-400" }}
                    >
                        <DeleteFilled className='text-xl text-red-400' />
                    </Popconfirm>
                    <Link to={`/admin/voucher/update/${value?._id}`}>
                        <EditFilled className='text-xl text-yellow-400' />
                    </Link>
                </Space>
            ),
        },

    ];
    const formatDateString = (dateString: any) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };
    const statusValid = (validFrom: any, validTo: any) => {
        const currentDate = new Date();
        const startDate = new Date(validFrom);
        const endDate = new Date(validTo);

        currentDate.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);

        if (currentDate >= startDate && currentDate <= endDate) {
            return 'Đang diễn ra';
        } else if (currentDate < startDate) {
            return 'Sắp diễn ra';
        } else if (currentDate > endDate) {
            return 'Hết hạn';
        }
    };

    const data: DataType[] = vocherState.map((voucher: any, index) => ({
        key: index + 1,
        _id: voucher._id,
        code: voucher.code,
        title: voucher.title,
        price: voucher.price,
        quantity: voucher.quantity,
        used: voucher.used,
        type: voucher.type,
        discount: voucher.discount,
        validFrom: voucher.validFrom,
        validTo: voucher.validTo,
        description: voucher.description
    }));
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const confirm = async (id: string) => {
        try {
            if (id) {
                await onRemove(id).then(() => dispatch(deleteVoucherSlice(id)))
                message.success("Xóa thành công")
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className="">
            <Space className='flex justify-between mb-5'>
                <div className="">
                    <span className="block text-xl text-[#1677ff]">
                        QUẢN LÝ VOUCHER
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
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} onChange={onChange} />
            </div>
        </div>
    )
}
export default VoucherPage;