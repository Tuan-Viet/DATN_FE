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
    SearchOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ColumnsType, TableProps } from 'antd/es/table';
import axios from 'axios';
interface DataType {
    _id: React.Key;
    fullname: string;
    phone: number;
    email: string;
    address: string;
    role: string;
}

const userPage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const userData = localStorage.getItem("persist:user");
    const [userList, setUserList] = useState([]);
    if (userData) {
        const user = JSON.parse(userData);
        const token = user.token;
        const cleanedToken = token.substring(1, token.length - 1);
        const config = {
            headers: { Authorization: `Bearer ${cleanedToken}` }
        };
        useEffect(() => {
            axios.get(`http://localhost:8080/api/auth/users`, config)
                .then((response) => {
                    setUserList(response.data.data);
                })
                .catch((error) => {
                    console.log(error);

                });
        }, []);
    }
    // const confirm = async (id: string) => {
    //     try {
    //         if (id) {
    //             await onRemove(id).then(() => dispatch(deleteCategorySlice(id)))
    //             messageApi.open({
    //                 type: 'success',
    //                 content: 'Delete category successfully!',
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }


    const columns = [
        {
            title: 'User Name',
            key: 'fullname',
            render: (record: any) => (
                <div className="flex items-center  ">
                    {/* <Image
                        width={70}
                        src={record.image}
                        alt="Category Image"
                        className=""
                    /> */}
                    <a className='w-full '>{record.fullname}</a>
                </div>
            ),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

        },
        // {
        //     title: 'Address',
        //     key: 'address',
        //     render: (record: any) => (
        //         <p className='w-[300px] truncate'>{record.address}</p>
        //     ),
        //     className: '',

        // },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',

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

    const data: DataType[] = userList.map((user: any) => ({
        _id: user._id,
        fullname: user.fullname,
        phone: user.phone,
        email: user.email,
        address: user.address,
        role: user.role,
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
                        User List
                    </span>
                    <span className="block text-base  text-[#1677ff]">
                        Manage your users
                    </span>
                </div>
                {/* <Link to={`add`}>
                    <Button type='primary' className='bg-blue-500'
                        icon={<PlusOutlined />}
                    >
                        Add New Category
                    </Button>
                </Link> */}
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
export default userPage;