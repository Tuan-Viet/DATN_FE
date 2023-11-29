import {
    Space,
    Table,
    Button,
    Popconfirm,
    message,
    Image,
    Spin
} from 'antd';
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Dispatch, useEffect, useState } from 'react';
import { useFetchListCategoryQuery, useRemoveCategoryMutation } from '../../../store/category/category.service';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategorySlice, listCategorySlice } from '../../../store/category/categorySlice';
import { RootState } from '../../../store';
import { ICategory } from '../../../store/category/category.interface';
import { ColumnsType, TableProps } from 'antd/es/table';
interface DataType {
    _id: React.Key;
    name: string;
    images: any;
    ICategory: string;
}

const categoryPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const [onRemove] = useRemoveCategoryMutation()
    const [messageApi, contextHolder] = message.useMessage();
    const { data: listCategory, isLoading, isError, isSuccess } = useFetchListCategoryQuery()
    const categoryState = useSelector((state: RootState) => state.categorySlice.categories)
    const categoryData = categoryState.filter(category => category.name !== 'Chưa phân loại');

    useEffect(() => {
        if (isSuccess) {
            dispatch(listCategorySlice(listCategory))
        }
    }, [isSuccess])
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
    const confirm = async (id: string) => {
        try {
            if (id) {
                await onRemove(id).then(() => dispatch(deleteCategorySlice(id)))
                messageApi.open({
                    type: 'success',
                    content: 'Xóa thành công',
                });
            }
        } catch (error) {
            console.log(error);
        }

    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'key',
            render: (value: any) => <Link to={``} className='uppercase font-bold '>{value}</Link>,
            className: 'w-[100px]'
        },
        {
            title: 'ẢNH',
            render: (value: any) => (
                <Image
                    width={70}
                    src={value.images?.url}
                    alt="Image"
                    className=""
                />
            ),
            className: 'w-1/5'
        },
        {
            title: ' TÊN DANH MỤC',
            key: 'name',
            render: (record: ICategory) => (
                <div className="flex items-center  ">

                    <a className='w-full overflow-hidden'>{record.name}</a>
                </div>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name), // Sắp xếp theo bảng chữ cái
            sortDirections: ['ascend', 'descend'],
            showSorterTooltip: false,
        },
        {
            title: '',
            key: 'action',
            render: (record: ICategory) => (
                <Space size="middle" className='flex justify-end'>
                    <Popconfirm
                        title="Delete category"
                        description="Are you sure to delete this category?"
                        onConfirm={() => confirm(record._id!)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "text-white bg-blue-400" }}
                    >
                        <DeleteFilled className='text-xl text-red-400' />
                    </Popconfirm>
                    <Link to={`/admin/category/update/${record._id}`}>
                        <EditFilled className='text-xl text-yellow-400' />
                    </Link>
                </Space>
            ),
        },

    ];

    const data: DataType[] = categoryData.map((category: any, index) => ({
        key: index + 1,
        _id: category._id,
        name: category.name,
        images: category.images,
        ICategory: category.ICategory,
    }));
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    return (
        <div className="">
            {contextHolder}
            <Space className='flex justify-between mb-5'>
                <div className="">
                    <span className="block text-xl text-[#1677ff]">
                        QUẢN LÝ DANH MỤC
                    </span>
                    {/* <span className="block text-base  text-[#1677ff]">
                        Quản lý danh mục
                    </span> */}
                </div>
                <Link to={`add`}>
                    <Button type='primary' className='bg-blue-500'
                        icon={<PlusOutlined />}
                    >
                        Tạo mới
                    </Button>
                </Link>
            </Space>
            <div className="border min-h-[300px] p-3 rounded-lg  bg-white">
                <div className="flex pb-6 pt-3 justify-between">
                    <form
                        //  onSubmit={handleSubmit(handleSearch)} 
                        className='w-[500px]'>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                //  onChange={(e) => setSearch(e.target.value)} 
                                type="text" id="default-search" className="block w-full outline-none p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-[#1677ff] hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tìm kiếm</button>
                        </div>
                    </form>


                </div>
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} onChange={onChange} />
            </div>
        </div>
    )
}
export default categoryPage;