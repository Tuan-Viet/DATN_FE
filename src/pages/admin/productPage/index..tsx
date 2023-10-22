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
    EyeOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useFetchListProductQuery, useRemoveProductMutation } from '../../../store/product/product.service';
import { useEffect, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { deleteProductFilterSlice, deleteProductSlice, listProductFilterSlice, listProductSearchSlice, listProductSlice } from '../../../store/product/productSlice';
import { ICategory } from '../../../store/category/category.interface';
import { useForm } from "react-hook-form";
import { listCategorySlice } from '../../../store/category/categorySlice';
import { useFetchListCategoryQuery } from '../../../store/category/category.service';


const productPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const { handleSubmit } = useForm();
    const [onRemove] = useRemoveProductMutation()
    const [search, setSearch] = useState<string>("")
    const [messageApi, contextHolder] = message.useMessage();
    const { data: listProduct, isLoading, isError, isSuccess } = useFetchListProductQuery()
    const { data: listCategory } = useFetchListCategoryQuery()
    // const productState = useSelector((state: RootState) => state.productSlice.products)
    const productFilterState = useSelector((state: RootState) => state.productFilterSlice.products)
    const categoryState = useSelector((state: RootState) => state.categorySlice.categories)
    console.log("cate", categoryState);

    useEffect(() => {
        if (listProduct) {
            if (search === "" || !search) {
                dispatch(listProductFilterSlice(listProduct))
            }
        }
        if (listCategory) {
            dispatch(listCategorySlice(listCategory));
        }
    }, [isSuccess, search, listCategory])
    const handleSearch = () => {
        if (listProduct)
            dispatch(listProductSearchSlice({ searchTerm: search, products: listProduct }))

    }
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
                await onRemove(id).then(() => dispatch(deleteProductFilterSlice(id)))
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
                    <Image.PreviewGroup items={record?.images.map((image: any, index: number) => ({ src: image, alt: `Product Image ${index}` }))}>
                        <Image
                            width={70}
                            src={record?.images[0]}
                        />
                    </Image.PreviewGroup>

                    <a className='w-full overflow-hidden ml-1'>{record?.title}</a>
                </div>
            ),
            className: 'w-1/4',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },

        {
            title: 'Category',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (cateId: any) => {
                const category = categoryState.find((cate) => cate._id === cateId);
                return category ? category.name : 'N/A';
            },
            className: 'w-[150px]',
        },

        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <Space size="middle">
                    <Link to={`/admin/product/${record?._id}`}>
                        <EyeOutlined className='text-xl text-green-400' />
                    </Link>
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
                    <Link to={`/admin/product/update/${record?._id}`}>
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
                        Product List
                    </span>
                    <span className="block text-base  text-[#1677ff]">
                        Manage your products
                    </span>
                </div>
                <Link to={`add`}>
                    <Button type='primary' className='bg-[#1677ff]'
                        icon={<PlusOutlined />}
                    >
                        Add New Product
                    </Button>
                </Link>
            </Space>
            <div className="border p-3 rounded-lg min-h-screen bg-white">
                <div className="pb-6 pt-3">
                    <form onSubmit={handleSubmit(handleSearch)}>
                        <input onChange={(e) => setSearch(e.target.value)} type="text" className='border p-2 w-64 outline-none '
                            placeholder="" />
                        <button type="submit" className='p-2 bg-[#1677ff]'>
                            <SearchOutlined className='text-white' />
                        </button>
                    </form>
                </div>
                <Table columns={columns} dataSource={productFilterState} pagination={{ pageSize: 10 }} />
            </div>
        </div>
    )
}
export default productPage;