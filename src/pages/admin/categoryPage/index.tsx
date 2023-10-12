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
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { getAllCategory, removeCategory } from '../../../redux/reducer/categorySlice';
import { useEffect, useState } from 'react';
import ICategory from '../../../interface/category';

const categoryPage = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const categories = useAppSelector((state) => state.Category.categories);

    useEffect(() => {
        setIsLoading(true);
        void dispatch(getAllCategory()).then(() => {
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
        });
    }, [dispatch]);

    const [messageApi, contextHolder] = message.useMessage();
    const confirm = async (id: string) => {
        await dispatch(removeCategory(id));
        messageApi.open({
            type: 'success',
            content: 'Delete category successfully!',
        });
    }
    const data = categories?.map((cate: ICategory) => ({
        key: cate._id,
        name: cate.name,
        image: cate.image,
    }));
    console.log(categories);

    const columns = [
        {
            title: 'Category Name',
            key: 'name',
            render: (record: any) => (
                <div className="flex items-center  ">
                    <Image
                        width={70}
                        src={record.image}
                        alt="Category Image"
                        className=""
                    />
                    <a className='w-full overflow-hidden'>{record.name}</a>
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <Space size="middle">
                    <Popconfirm
                        title="Delete category"
                        description="Are you sure to delete this category?"
                        onConfirm={() => confirm(record.key)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "text-white bg-blue-400" }}
                    >
                        <DeleteFilled className='text-xl text-red-400' />
                    </Popconfirm>
                    <Link to={`/admin/category/update/${record.key}`}>
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
                {isLoading ? (
                    <div className="text-center ">
                        <Spin size="large" />
                    </div>
                ) : (
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} />
                )}
            </div>
        </div>
    )
}
export default categoryPage;