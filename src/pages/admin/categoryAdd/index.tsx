import React from 'react';
import type { FormInstance, UploadProps } from 'antd';
import {
    Breadcrumb,
    Button,
    Form,
    Input,
    Space,
    message,
} from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import Dragger from 'antd/es/upload/Dragger';
import { useAppDispatch } from '../../../redux/hook';
import ICategory from '../../../interface/category';
import { createCatetgory } from '../../../redux/reducer/categorySlice';

const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

    return (
        <Button type="primary" htmlType="submit" disabled={!submittable} className='bg-blue-500'>
            Submit
        </Button>
    );
};

const categoryAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onFinish = (values: ICategory) => {
        void dispatch(createCatetgory(values));
        message.success(`Add category successfully!`);
        navigate("/admin/category");
    };

    const props: UploadProps = {
        listType: "picture",
        name: "image",
        multiple: true,
        action: "http://localhost:8080/api/images/upload/category",

    };
    return <>
        <Breadcrumb className='pb-3'
            items={[

                {
                    title: <Link to={`/admin/category`}>Category</Link>,
                },
                {
                    title: 'Add Category',
                },
            ]}
        />
        <div className="border p-10 rounded-lg  bg-white">
            <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff] pb-5">
                Create New Category
            </h3>
            <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="mx-auto max-w-[500px]"
            >
                {/* Name Category */}
                <Form.Item name="name" label="Category Name" rules={[{ required: true, message: 'Please input your Name!' }]}>
                    <Input />
                </Form.Item>

                {/* Upload Images */}
                {/* <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please input your Image!' }]}>
                    <Dragger {...props}>
                        <Button icon={<UploadOutlined />}>Choose images</Button>
                    </Dragger>
                </Form.Item> */}
                <Form.Item>
                    <Space>
                        <SubmitButton form={form} />
                        <Button htmlType="reset">Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>

    </>
}
export default categoryAdd;
