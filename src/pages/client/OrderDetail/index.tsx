import React, { Dispatch } from 'react'
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../store/user/userSlice';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import TextArea from 'antd/es/input/TextArea';

interface DataType {
    key: string;
    image: string;
    name: string;
    colorName: string;
    size: string;
    quantity: number;
    price: number;
}

const orderDetail = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();
    const columns: ColumnsType<DataType> = [
        {
            title: 'Sản phẩm',
            render: (record: any) => (
                <div className='flex'>
                    <div className='mr-2'>
                        <img src={record?.image} alt="" className='w-14 h-auto object-cover' />
                    </div>
                    <div className="space-y-3 py-2 font-light ">
                        <span className='block'>{record?.name}</span>
                        <span className='block text'>{record?.colorName} / {record.size}</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Đơn giá',
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
            key: 'total',
            title: 'Thành tiền',
            render: (record: any) => (record.price * record.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'Quần gió basic ống suông',
            image: 'https://product.hstatic.net/200000690725/product/3_098eae3951be45f3b8bc357ba73ebad1_small.jpg',
            price: 299000,
            quantity: 1,
            size: 'S',
            colorName: 'Xám'
        },
        {
            key: '2',
            name: 'Quần gió basic ống suông',
            image: 'https://product.hstatic.net/200000690725/product/3_098eae3951be45f3b8bc357ba73ebad1_small.jpg',
            price: 299000,
            quantity: 3,
            size: 'S',
            colorName: 'Xám'
        },
    ];

    // const total = data.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // const totalRow: any = {
    //     key: 'total',
    //     price: total,
    // };

    // data.push(totalRow);

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
                    <span>Chi tiết đơn hàng</span>
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
                        <h3 className='uppercase text-[17px] mb-2'>
                            Đơn hàng : #336895
                        </h3>
                        <div className="flex items-center justify-between mb-5">
                            <div className="">
                                <span className='block mb-2'>Đặt lúc - 02/11/2023</span>
                                <span className='block font-bold text-xl'>Chờ xử lí</span>
                            </div>
                            <div className="">
                                <button className='border px-10 py-2 bg-red-500 text-white hover:bg-red-400 rounded-md'>
                                    Hủy đơn hàng
                                </button>
                                {/* <button className='border px-10 py-2 bg-blue-500 text-white hover:bg-blue-400 rounded-md'>
                                    Đã nhận được hàng
                                </button> */}
                            </div>
                        </div>
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
                                            <Table.Summary.Cell index={0} colSpan={3}>Tổng tiền</Table.Summary.Cell>
                                            <Table.Summary.Cell index={1}>
                                                {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                            </Table.Summary.Cell>
                                        </Table.Summary.Row>
                                    </>
                                );
                            }}
                        />
                        <div className="grid grid-cols-2 gap-5">
                            <div className="">
                                <h3 className='text-lg font-medium mb-3'>Thông tin gửi hàng</h3>
                                <div className="space-y-1 text-sm">
                                    <span className='block '>Lê Tuấn Việt</span>
                                    <span className='block '>0986198509</span>
                                    <span className='block '>Hà Nội</span>
                                    <span className='block '>Ba Vì</span>
                                    <span className='block '>Vật Phụ, Vật Lại, Ba Vì, Hà Nội</span>
                                </div>
                            </div>
                            <div className="">
                                <h3 className='font-medium mb-3'>Ghi chú:</h3>
                                <TextArea rows={5} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default orderDetail;
