import {
    Space,
    Table,
    Popconfirm,
    Image,
    Button,
    message,
    Spin
} from 'antd';
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useFetchListProductQuery, useRemoveProductMutation } from '../../../store/product/product.service';
import { useEffect } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { deleteProductSlice, listProductSlice } from '../../../store/product/productSlice';
import { ICategory } from '../../../store/category/category.interface';

const productPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const [onRemove] = useRemoveProductMutation()
    const [messageApi, contextHolder] = message.useMessage();
    const { data: listProduct, isLoading, isError, isSuccess } = useFetchListProductQuery()
    const productState = useSelector((state: RootState) => state.productSlice.products)

    console.log(productState);

    useEffect(() => {
        if (isSuccess) {
            dispatch(listProductSlice(listProduct))
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
                await onRemove(id).then(() => dispatch(deleteProductSlice(id)))
                messageApi.open({
                    type: 'success',
                    content: 'Delete product successfully!',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const columns = [
        {
            title: 'Product Name',
            key: 'name',
            render: (record: any) => (
                <div className="flex items-center  ">
                    <Image
                        width={70}
                        src={record.images[0]}
                        alt="Product Image"
                        className=""
                    />
                    <a className='w-full overflow-hidden ml-1'>{record.title}</a>
                </div>
            ),
            className: 'w-1/4',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: "Category",
            key: "category",
            dataIndex: "categoryId",
            render: (cate: ICategory) => <span>{cate?.name}</span>,
        },

        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <Space size="middle">
                    <Link to={`/admin/product/${record._id}`}>
                        <EyeOutlined className='text-xl text-green-400' />
                    </Link>
                    <Popconfirm
                        title="Delete category"
                        description="Are you sure to delete this category?"
                        onConfirm={() => confirm(record._id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "text-white bg-blue-400" }}
                    >
                        <DeleteFilled className='text-xl text-red-400' />
                    </Popconfirm>
                    <Link to={`/admin/product/update/${record._id}`}>
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
                    <span className="block text-xl text-primary">
                        Product List
                    </span>
                    <span className="block text-base  text-primary">
                        Manage your products
                    </span>
                </div>
                <Link to={`add`}>
                    <Button type='primary' className='bg-primary'
                        icon={<PlusOutlined />}
                    >
                        Add New Product
                    </Button>
                </Link>
            </Space>
            <div className="border p-3 rounded-lg min-h-screen bg-white">

                <Table columns={columns} dataSource={productState} pagination={{ pageSize: 20 }} />
            </div>
        </div>
    )
}
export default productPage;