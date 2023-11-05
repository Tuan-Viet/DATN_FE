import React, { Dispatch } from 'react'
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import { Link, useNavigate } from 'react-router-dom';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { toast } from 'react-toastify';
import { logout } from '../../../store/user/userSlice';
import { useDispatch } from 'react-redux';

interface DataType {
    key: string;
    sku: string;
    date: string;
    price: number;
    status: string;
}

const OrderPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();
    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'sku',
            key: 'sku',
            render: (text) => <Link to={`/order/${text}`}>#{text}</Link>,
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'price',
            key: 'price',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
        {
            title: 'Trạng thái thanh toán',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Vận chuyển',
            dataIndex: 'status',
            key: 'status',
        },

    ];

    const data: DataType[] = [
        {
            key: '1',
            sku: '310023',
            date: '27/10/2023',
            price: 20000,
            status: 'Chờ xử lí',
        },
        {
            key: '2',
            sku: '310027',
            date: '02/11/2023',
            price: 20000,
            status: 'Chờ xử lí',
        },
        {
            key: '3',
            sku: '310024',
            date: '03/11/2023',
            price: 20000,
            status: 'Chờ xử lí',
        },
    ];
    const logOut = () => {
        dispatch(logout());
        toast.success("Bạn đã đăng xuất!");
        navigate("/signin");
    };
    return (

        <div>
            <Header />
            <div className="mx-14 mt-10 mb-16">
                <h1 className='uppercase font-normal text-[20px] text-center mb-10 relative p-3'>
                    <span>Đơn hàng của tôi</span>
                    <span className='block w-20 h-1 bg-black absolute left-1/2 transform -translate-x-1/2 bottom-0'></span>
                </h1>
                <div className="row flex">
                    <div className="w-2/5">
                        <h3 className='uppercase font-medium text-[17px] mb-3'>
                            Tài khoản
                        </h3>
                        <ul className="text-sm">
                            <li className="font-light mb-3 hover:text-[#1677ff]">
                                <Link to="">Tài khoản của tôi</Link>
                            </li>
                            <li className="font-light mb-3 hover:text-[#1677ff]">
                                <Link to="/order">Đơn hàng của tôi</Link>
                            </li>
                            <li className="font-light mb-3 hover:text-[#1677ff]">
                                <Link to="">Danh sách địa chỉ</Link>
                            </li>
                            <li className="list-inside font-light mb-3 hover:text-[#1677ff]">
                                <button onClick={() => logOut()}>
                                    Đăng xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full">
                        <h3 className='uppercase font-medium text-[17px] mb-3'>
                            danh sách đơn hàng
                        </h3>
                        <Table columns={columns} dataSource={data} pagination={false} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderPage;
