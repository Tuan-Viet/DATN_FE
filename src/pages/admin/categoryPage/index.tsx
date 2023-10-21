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
        return <>isLoading</>;
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


    const columns = [
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
            )
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
                <Table columns={columns} dataSource={categoryState} pagination={{ pageSize: 20 }} />
            </div>
        </div>
    )
}
export default categoryPage;