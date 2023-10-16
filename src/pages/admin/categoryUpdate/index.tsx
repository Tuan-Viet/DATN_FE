import React, { useEffect, useState } from 'react';
import type { FormInstance } from 'antd';
import { Breadcrumb, Button, Form, Input, Space, message } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ICategory } from '../../../store/category/category.interface';
import { useFetchOneCategoryQuery, useUpdateCategoryMutation } from '../../../store/category/category.service';


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

const categoryUpdate = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [onUpdate] = useUpdateCategoryMutation()
    const { id } = useParams();
    const { data: fetchOneCategory, isSuccess: isSuccessOneCategory } = useFetchOneCategoryQuery(id)

    if (fetchOneCategory) {
        form.setFieldValue("name", fetchOneCategory.name)
    }

    const onFinish = async (values: ICategory) => {
        try {
            if (id) {
                await onUpdate({ id, ...values })
                message.success(`Update category successfully!`);
                navigate("/admin/category");
            }
        } catch (error) {
            console.log(error);

        }
    };
    return <>
        <Breadcrumb className='pb-3'
            items={[

                {
                    title: <Link to={`/admin/category`}>Category</Link>,
                },
                {
                    title: 'Update Category',
                },
            ]}
        />
        <div className="border p-10 rounded-lg  bg-white">
            <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff]">
                Update Category
            </h3>
            <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="mx-auto max-w-[500px]"
            >
                <Form.Item name="_id" style={{ display: "none" }}>
                    <Input />
                </Form.Item>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <SubmitButton form={form} />
                        {/* <Button htmlType="reset">Reset</Button> */}
                    </Space>
                </Form.Item>
            </Form>
        </div>

    </>
}
export default categoryUpdate;