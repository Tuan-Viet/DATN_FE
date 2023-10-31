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
import { deleteProductSearchSlice, deleteProductSlice, listProductFilterSlice, listProductSearch, listProductSearchSlice } from '../../../store/product/productSlice';
import { ICategory } from '../../../store/category/category.interface';
import { useForm } from "react-hook-form";
import { listCategorySlice } from '../../../store/category/categorySlice';
import { useFetchListCategoryQuery } from '../../../store/category/category.service';
import { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
    _id: React.Key;
    title: string;
    images: any[];
    price: number;
    discount: number;
    description: string;
    categoryId: string;
}


const productPage = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const { handleSubmit } = useForm();
    const [onRemove] = useRemoveProductMutation()
    const [search, setSearch] = useState<string>("")
    const [messageApi, contextHolder] = message.useMessage();
    const { data: listProduct, isLoading, isError, isSuccess } = useFetchListProductQuery()
    const productSearchState = useSelector((state: RootState) => state.productSearchReducer.products)
    const { data: listCategory } = useFetchListCategoryQuery()
    // const productState = useSelector((state: RootState) => state.productSlice.products)
    const categoryState = useSelector((state: RootState) => state.categorySlice.categories)

    useEffect(() => {
        if (listProduct) {
            if (search === "" || !search) {
                dispatch(listProductSearch(listProduct))
            }
        }
        if (listCategory) {
            dispatch(listCategorySlice(listCategory));
        }
    }, [isSuccess, search, listCategory])
    const handleSearch = () => {
        if (listProduct) {
            dispatch(listProductSearchSlice({ searchTerm: search, products: listProduct }))
        }
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
                await onRemove(id).then(() => dispatch(deleteProductSearchSlice(id)))
                messageApi.open({
                    type: 'success',
                    content: 'Delete product successfully!',
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const columns: ColumnsType<DataType> = [
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
            sorter: (a, b) => a.title.localeCompare(b.title), // Sắp xếp theo bảng chữ cái
            sortDirections: ['ascend', 'descend'],
            className: 'w-1/4',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            sorter: (a, b) => a.price - b.price, // Sắp xếp theo số
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            sorter: (a, b) => a.price - b.price, // Sắp xếp theo số
            sortDirections: ['ascend', 'descend'],
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
                const category = categoryState.find((cate) => cate._id === (cateId && cateId._id));

                console.log(category);

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

    const data: DataType[] = productSearchState.map((product: any) => ({
        _id: product._id,
        title: product.title,
        images: product.images,
        price: product.price,
        discount: product.discount,
        description: product.description,
        categoryId: product.categoryId,
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
                <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} onChange={onChange} />
            </div>
        </div>
    )
}
export default productPage;