import React, { useEffect, useState } from 'react';
import type { FormInstance, UploadProps } from 'antd';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    message,
    Upload,
    Spin,
    Row,
    Col,
    Card,
    Typography,
    Breadcrumb
} from 'antd';
import {
    UploadOutlined,
    CloseOutlined,
    CloudUploadOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { useFetchListCategoryQuery } from '../../../store/category/category.service';
import { ICategory } from '../../../store/category/category.interface';
import { useAddProductMutation } from '../../../store/product/product.service';
const { Dragger } = Upload;
const { TextArea } = Input;


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

const productAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { data: categories, } = useFetchListCategoryQuery();
    const [onAdd] = useAddProductMutation()

    const selectOptions = categories
        ?.filter((cate: ICategory) => cate.name !== "Chưa phân loại")
        .map((cate: ICategory) => ({
            label: `${cate.name}`,
            value: `${cate._id!}`,
        }));

    const optionSize = [
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'XL', label: 'XL' },
    ]
    const onFinish = async (values: any) => {
        console.log(values);
        let newImages;

        if (values.images && values.images.fileList) {
            newImages = values.images.fileList.map(({ response }: any) => response[0].url);
        } else if (values.images && values.images.file) {
            newImages = values.images.file.response[0].url;
        } else {
            newImages = [];
        }


        if (values.variants && values.variants.length > 0) {
            values.variants.forEach((variant: any) => {
                if (variant.imageColor) {
                    if (variant.imageColor.fileList && variant.imageColor.fileList.length === 1) {
                        variant.imageColor = variant.imageColor.fileList[0].response[0].url;
                        console.log("Image :", variant.imageColor);
                    }
                }
            });
        }
        const newValues = { ...values, images: newImages };

        console.log(newImages);
        console.log("Values Data:", newValues);

        await onAdd(newValues)
        message.success(`Add product successfully!`);
        navigate("/admin/product");
    };

    const props: UploadProps = {
        listType: "picture",
        name: "images",
        multiple: true,
        action: " http://localhost:8080/api/images/upload",
    };
    return <>
        <Breadcrumb className='pb-3'
            items={[

                {
                    title: <Link to={`/admin/product`}>Product</Link>,
                },
                {
                    title: 'Add Product',
                },
            ]}
        />
        <div className='border p-10 rounded-lg  bg-white'>
            <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff]">
                Create New Product
            </h3>
            <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{ variants: [{ "items": [{}] }] }}
                className="mx-auto"
            >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={6}>
                        {/* Input Title Product */}
                        <Form.Item
                            name="title"
                            label="Title Product"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Title Product!'
                                }
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        {/* Input Price */}
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true, message: 'Please input your Price!' }]}
                        >
                            <InputNumber
                                min={0}
                                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item name="discount" label="Discount">
                            <InputNumber
                                min={0}
                                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        {/* Input Category */}
                        <Form.Item name="categoryId" label="Category" rules={[{ required: true, message: 'Please input your Category!' }]}>
                            <Select
                                placeholder="Choose category"
                                allowClear
                                options={selectOptions}
                            ></Select>
                        </Form.Item>
                    </Col>
                </Row>

                <div className="">
                    <div className="flex justify-between">
                        {/* Upload Images */}
                        <Form.Item
                            label="Images"
                            name="images"
                            rules={[{ required: true, message: 'Please input your Image!' }]}
                            className='w-1/3 mr-10'
                        >
                            <Dragger {...props}>
                                <Button icon={<UploadOutlined />}>Choose images</Button>
                            </Dragger>
                        </Form.Item>

                        {/* Input Desription */}
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please input your Description!' }]}
                            className='w-2/3'
                        >
                            <TextArea rows={8} />
                        </Form.Item>
                    </div>
                </div>


                <Form.List name="variants">
                    {(fields, { add, remove }) => (
                        <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                            {fields.map((field) => (
                                <Card
                                    className='bg-zinc-50'
                                    size="small"
                                    title={`Color ${field.name + 1}`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    <div className="flex justify-between px-10 py-3">
                                        <div className="text-center w-[300]">
                                            <Form.Item name={[field.name, 'imageColor']}>
                                                <Upload
                                                    {...props}
                                                    listType="picture-card"
                                                    className="avatar-uploader"
                                                    maxCount={1}
                                                >
                                                    <CloudUploadOutlined />
                                                </Upload>
                                            </Form.Item>
                                            <Form.Item name={[field.name, 'nameColor']} rules={[{ required: true, message: 'Please input your Name Color!' }]}>
                                                <Input placeholder="Enter Color Image" />
                                            </Form.Item>
                                        </div>

                                        <div className="w-2/3">
                                            {/* Nest Form.List */}
                                            <Form.Item label="">
                                                <Form.List name={[field.name, 'items']}>
                                                    {(subFields, subOpt) => (
                                                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                                            {subFields.map((subField) => (
                                                                <Space key={subField.key} className='flex justify-between'>
                                                                    <Form.Item noStyle name={[subField.name, 'size']} rules={[{ required: true }]}>
                                                                        <Select
                                                                            placeholder="Choose Category"
                                                                            style={{ width: 356 }}
                                                                            options={optionSize}
                                                                        />
                                                                    </Form.Item>
                                                                    <Form.Item noStyle name={[subField.name, 'quantity']} rules={[{ required: true }]}>
                                                                        <Input style={{ width: 360 }} placeholder="Enter quantity" />
                                                                    </Form.Item>
                                                                    <CloseOutlined
                                                                        onClick={() => {
                                                                            subOpt.remove(subField.name);
                                                                        }}
                                                                    />
                                                                </Space>
                                                            ))}
                                                            <Button type="primary" onClick={() => subOpt.add()}
                                                                className='w-32 mx-auto bg-blue-500'
                                                            >
                                                                + Add Sub Item
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Form.List>
                                            </Form.Item>
                                        </div>
                                    </div >
                                </Card >
                            ))}

                            <Button type="primary" onClick={() => add()}
                                className='bg-blue-500 text-white w-20 mx-auto'
                            >
                                + Add
                            </Button>
                        </div >
                    )}
                </Form.List >

                {/* <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Typography>
                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                            </Typography>
                        )}
                    </Form.Item> */}

                <Form.Item className='my-5'>
                    <Space>
                        <SubmitButton form={form} />
                        <Button htmlType="reset">Reset</Button>
                    </Space>
                </Form.Item>
            </Form >
        </div >

    </>
}
export default productAdd;