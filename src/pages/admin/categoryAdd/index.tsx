import React from 'react';
import type { FormInstance } from 'antd';
import {
    Breadcrumb,
    Button,
    Form,
    Input,
    Space,
} from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import Dragger from 'antd/es/upload/Dragger';

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
                autoComplete="off"
                className="mx-auto max-w-[500px]"
            >
                {/* Name Category */}
                <Form.Item name="name" label="Category Name" rules={[{ required: true, message: 'Please input your Name!' }]}>
                    <Input />
                </Form.Item>

                {/* Upload Images */}
                <Form.Item label="Images" name="images" rules={[{ required: true, message: 'Please input your Image!' }]}>
                    <Dragger>
                        <Button icon={<UploadOutlined />}>Choose images</Button>
                    </Dragger>
                </Form.Item>
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
