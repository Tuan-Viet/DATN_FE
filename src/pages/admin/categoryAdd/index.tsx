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
import { ICategory } from '../../../store/category/category.interface';
import { useAddCategoryMutation } from '../../../store/category/category.service';

const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [onAdd] = useAddCategoryMutation()
    const [submittable, setSubmittable] = React.useState(false);
    const values = Form.useWatch([], form);
    const navigate = useNavigate()

    const btnSubmit = async () => {
        try {
            await onAdd(values)
            message.success("Add category successfully")
            navigate("/admin/category")
        } catch (error) {
            console.log(error);
        }
    }
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
        <Button onClick={btnSubmit} type="primary" htmlType="submit" disabled={!submittable} className='bg-blue-500'>
            Submit
        </Button>
    );
};

const categoryAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // const onFinish = (values: ICategory) => {
    //     message.success(`Add category successfully!`);
    //     navigate("/admin/category");
    // };

    // const props: UploadProps = {
    //     listType: "picture",
    //     name: "image",
    //     multiple: true,
    //     action: "http://localhost:8080/api/images/upload/category",

    // };
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
                // onFinish={btnSubmit}
                className="mx-auto max-w-[500px]"
            >
                {/* Name Category */}
                <Form.Item
                    name="name"
                    label="Category Name"
                    rules={[
                        { required: true, message: 'Please input your Name!' },
                        {
                            validator: (_, value) => {
                                if (value && value.trim() === '') {
                                    return Promise.reject('Name cannot be just whitespace.');
                                }
                                return Promise.resolve();
                            },
                        },
                        { min: 3, message: 'Name must be at least 3 characters long' },

                    ]}
                >
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
