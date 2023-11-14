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
            <div className="flex justify-center items-center h-[600px]">
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
            title: 'MÃ DANH MỤC',
            dataIndex: '_id',
            render: (value: any) => <Link to={``} className='uppercase'>#{value.slice(0, 10)}</Link>,
            className: 'w-1/5'
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

    const data: DataType[] = categoryData.map((category: any) => ({
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
export default categoryPage;