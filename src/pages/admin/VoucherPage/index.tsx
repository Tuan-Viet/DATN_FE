import {
    Space,
    Table,
    Popconfirm,
    Button,
    message,
    Spin,
    Steps,
    Select
} from 'antd';
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined,
    EyeOutlined,
    SearchOutlined,
    DownOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { ColumnsType, TableProps } from 'antd/es/table';
import { useDeleteVoucherMutation, useListVoucherQuery } from '../../../store/vouchers/voucher.service';
import { deleteVoucherSlice, listVoucherSearchByCodeSlice, listVoucherSearchSlice, listVoucherSlice } from '../../../store/vouchers/voucherSlice';
import { useForm } from 'react-hook-form';

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
    const [search, setSearch] = useState<string>("")
    const { handleSubmit } = useForm()
    const vocherState = useSelector((state: RootState) => state.voucherSlice.vouchers)
    const [eventFilter, setEventFilter] = useState<any>(null);
    const [sortOption, setSortOption] = useState<Number>(1);

    useEffect(() => {
        if (listVochers) {
            if (search === "" || !search) {
                dispatch(listVoucherSlice(listVochers))
            }
        }

    }, [isSuccess, search])
    // useEffect(() => {
    //     if (listVochers) {
    //         dispatch(listVoucherSlice(listVochers))
    //     }
    // }, [isSuccess])
    const handleSearch = () => {
        if (listVochers && search) {
            console.log(1)
            dispatch(listVoucherSearchSlice({ searchTerm: search, vouchers: listVochers }));
        }
    };
    useEffect(() => {
        if (vocherState?.length === 0 && listVochers) {
            if (search) {
                dispatch(listVoucherSearchByCodeSlice({ searchTerm: search, vouchers: listVochers }));
            }
        }
    }, [vocherState.length === 0]);
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

    const sortVoucher = [...vocherState];

    switch (sortOption) {
        case 1:
            // Mới nhất
            sortVoucher.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
        case 2:
            // Cũ nhất
            sortVoucher.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            break;
        case 3:
            // Tên: A - Z
            sortVoucher.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 4:
            // Tên: Z - A
            sortVoucher.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            break;
    }

    const data: DataType[] = sortVoucher
        .filter((voucher) => {
            switch (eventFilter) {
                case 'upcoming':
                    return statusValid(voucher.validFrom, voucher.validTo) === 'Sắp diễn ra';
                case 'ongoing':
                    return statusValid(voucher.validFrom, voucher.validTo) === 'Đang diễn ra';
                case 'expired':
                    return statusValid(voucher.validFrom, voucher.validTo) === 'Hết hạn';
                default:
                    return true;
            }
        })
        .map((voucher: any, index) => ({
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
            description: voucher.description,
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
            <div className="border p-3 rounded-lg min-h-screen bg-white relative" >
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
                                onChange={(e) => setSearch(e.target.value)}
                                type="text" id="default-search" className="block w-full outline-none p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#1677ff] hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tìm kiếm</button>
                        </div>
                    </form>


                </div>
                <div className="flex justify-between items-start">
                    <div className="flex items-start  space-x-3 ">


                        <details className="z-50 overflow-hidden rounded-lg border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex w-[300px] cursor-pointer items-center justify-between gap-2 bg-white px-3 py-2 text-gray-900 transition"
                            >
                                <span className="text-sm "> Lọc theo sự kiện </span>
                                <DownOutlined className='text-xs text-gray-300' />
                            </summary>

                            <div className="border-t border-gray-200 bg-white">
                                <header className="flex items-center justify-between p-4">
                                    {/* <span className="text-sm text-gray-700"> đã chọn </span> */}

                                    <button
                                        type="button"
                                        className="text-sm text-gray-900 underline underline-offset-4"
                                        onClick={() => { setEventFilter(null) }}
                                    >
                                        Reset
                                    </button>
                                </header>
                                <ul className="space-y-1 border-t border-gray-200 p-4">
                                    <li>
                                        <label htmlFor="filterDate" className="inline-flex items-center gap-2">
                                            <input
                                                name="filterDate"
                                                type="radio"
                                                id="filterDate"
                                                className="h-5 w-5 rounded border-gray-300"
                                                onChange={() => setEventFilter('upcoming')}
                                                checked={eventFilter === 'upcoming'}
                                            />

                                            <span className="text-sm font-medium text-gray-700">
                                                Sắp diễn ra
                                            </span>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="filterDate" className="inline-flex items-center gap-2">
                                            <input
                                                name="filterDate"
                                                type="radio"
                                                id="filterDate"
                                                className="h-5 w-5 rounded border-gray-300"
                                                onChange={() => setEventFilter('ongoing')}
                                                checked={eventFilter === 'ongoing'}
                                            />
                                            <span className="text-sm font-medium text-gray-700">
                                                Đang diễn ra
                                            </span>
                                        </label>
                                    </li>
                                    <li>
                                        <label htmlFor="filterDate" className="inline-flex items-center gap-2">
                                            <input
                                                name="filterDate"
                                                type="radio"
                                                id="filterDate"
                                                className="h-5 w-5 rounded border-gray-300"
                                                onChange={() => setEventFilter('expired')}
                                                checked={eventFilter === 'expired'}

                                            />

                                            <span className="text-sm font-medium text-gray-700">
                                                Hết hạn
                                            </span>
                                        </label>
                                    </li>


                                </ul>
                            </div>
                        </details>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-3 text-sm text-[#333333]">Sắp xếp theo:</span>
                        <Select
                            defaultValue={1}
                            style={{ width: 200, height: 36 }}
                            options={[
                                { value: 1, label: 'Mới nhất' },
                                { value: 2, label: 'Cũ nhất' },
                                { value: 3, label: 'Tên: A - Z' },
                                { value: 4, label: 'Tên: Z - A' },

                            ]}
                            onChange={(value: Number) => setSortOption(value)}
                        />
                    </div>
                </div>
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} onChange={onChange}
                    className='absolute top-40 right-3 left-3' />
            </div>
        </div>
    )
}
export default VoucherPage;