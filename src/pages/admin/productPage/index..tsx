import {
    Space,
    Table,
    Popconfirm,
    Image,
    Button,
} from 'antd';
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";

const productPage = () => {
    const columns = [
        {
            title: 'Product Name',
            key: 'name',
            render: (record: any) => (
                <div className="flex items-center  ">
                    <Image
                        width={70}
                        src={record.images}
                        alt="Product Image"
                        className=""
                    />
                    <a className='w-full overflow-hidden ml-1'>{record.name}</a>
                </div>
            ),
            className: 'w-1/4',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        // {
        //     title: 'Description',
        //     dataIndex: 'description',
        //     key: 'description',
        // },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: "Category",
            key: "category",
            dataIndex: "category",
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
    const data = [
        {
            key: '1',
            name: 'Quần áo mùa hè',
            images: 'https://zizoou.com/cdn/shop/products/Ao-khoac-Jean-somi-form-rong-xanh-2-2-ZiZoou-Store.jpg?v=1676538411',
            price: 200000,
            quantity: 99,
            category: "Quần áo"

        },

    ];
    return (
        <div className="">
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

                <Table columns={columns} dataSource={data} pagination={{ pageSize: 20 }} />
            </div>
        </div>
    )
}
export default productPage;