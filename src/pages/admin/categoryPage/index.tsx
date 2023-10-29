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
    PlusOutlined
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
    key: React.Key;
    name: string;
    ICategory: string;
}

const categoryPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const [onRemove] = useRemoveCategoryMutation()
    const [messageApi, contextHolder] = message.useMessage();
    const { data: listCategory, isLoading, isError, isSuccess } = useFetchListCategoryQuery()
    const categoryState = useSelector((state: RootState) => state.categorySlice.categories)

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
                    content: 'Delete category successfully!',
                });
            }
        } catch (error) {
            console.log(error);
        }

    }


    const columns: ColumnsType<DataType> = [
        {
            title: 'Category Name',
            key: 'name',
            render: (record: ICategory) => (
                <div className="flex items-center  ">
                    {/* <Image
                        width={70}
                        src={record.image}
                        alt="Category Image"
                        className=""
                    /> */}
                    <a className='w-full overflow-hidden'>{record.name}</a>
                </div>
            ),
            sorter: (a, b) => a.name.localeCompare(b.name), // Sắp xếp theo bảng chữ cái
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: ICategory) => (
                <Space size="middle">
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

    const data: DataType[] = categoryState.map((category: any) => ({
        key: category._id,
        name: category.name,
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
                        Category List
                    </span>
                    <span className="block text-base  text-[#1677ff]">
                        Manage your categorys
                    </span>
                </div>
                <Link to={`add`}>
                    <Button type='primary' className='bg-blue-500'
                        icon={<PlusOutlined />}
                    >
                        Add New Category
                    </Button>
                </Link>
            </Space>
            <div className="border min-h-[300px] p-3 rounded-lg  bg-white">
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} onChange={onChange} />
            </div>
        </div>
    )
}
export default categoryPage;