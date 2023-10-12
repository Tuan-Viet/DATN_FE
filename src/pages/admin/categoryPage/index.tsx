import { Space, Table, Button, Popconfirm, } from 'antd';
import {
    EditFilled,
    DeleteFilled,
    PlusOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";

const categoryPage = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: String) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: any) => (
                <Space size="middle">
                    <Popconfirm
                        title="Delete category"
                        description="Are you sure to delete this category?"
                        // onConfirm={() => confirm(record.key)}
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

    const data = [
        {
            key: '1',
            name: 'Quần áo mùa hè',
        },
        {
            key: '2',
            name: 'Quần áo mùa đông',

        },
        {
            key: '3',
            name: 'Polo',

        },
    ];

    return (
        <div className="">
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
            <div className="border p-3 rounded-lg  bg-white">
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    )
}
export default categoryPage;