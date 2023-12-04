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
    Image,
    Badge,
    Breadcrumb
} from 'antd';
import {
    UploadOutlined,
    CloseOutlined,
    CloudUploadOutlined,
    CloseCircleFilled
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetchListCategoryQuery } from '../../../store/category/category.service';
import { ICategory } from '../../../store/category/category.interface';
import { useFetchListProductQuery, useFetchOneProductByAdminQuery, useFetchOneProductQuery, useUpdateProductMutation } from '../../../store/product/product.service';
import IProduct from '../../../store/product/product.interface';
import axios from 'axios';
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

interface ProductDetail {
    _id: string;
    product_id: string;
    nameColor: string;
    imageColor: string;
    quantity: number;
    size: string;
    sold: number;
    deleted: boolean;
}

const productUpdate = () => {
    const navigate = useNavigate();
    const { data: categories } = useFetchListCategoryQuery();
    // const { data: products } = useFetchListProductQuery();
    const { id } = useParams();
    // const product = products?.find((product: IProduct) => product._id === id);
    if (id) {
        const { data: product } = useFetchOneProductByAdminQuery(id)
        const [productDetails, setProductDetails] = useState<ProductDetail[]>([]); // State để lưu thông tin sản phẩm chi tiết

        // const product = fetchOneProduct?.data

        // Sử dụng useEffect để gọi API khi component được render
        useEffect(() => {
            if (product?.variants) {
                const promises = product.variants.map((variantId: any) => {
                    return axios
                        .get(` http://localhost:8080/api/productDetails/${variantId}`)
                        .then((response) => response.data
                        ) // Access the 'data' property
                        .catch((error) => {
                            console.error(`Error fetching product details for variant ${variantId}:`, error);
                            return null;
                        });
                });

                Promise.all(promises)
                    .then((results) => {
                        // Filter out null responses
                        const filteredResults = results.filter((detail) => detail !== null);
                        setProductDetails(filteredResults);
                    });
            }
        }, [product]);


        const variantsMap = new Map();
        productDetails.forEach((detail) => {
            const key = `${detail.imageColor}-${detail.nameColor}`;
            if (variantsMap.has(key)) {
                const existingVariant = variantsMap.get(key);
                // Tạo một đối tượng mới với _id và thêm nó vào items
                const newItem = { _id: detail._id, size: detail.size, quantity: detail.quantity };
                existingVariant.items.push(newItem);
            } else {
                variantsMap.set(key, {
                    product_id: id,
                    imageColor: detail.imageColor,
                    nameColor: detail.nameColor,
                    sold: detail.sold,
                    deleted: detail.deleted,
                    items: [{ _id: detail._id, size: detail.size, quantity: detail.quantity }]
                });
            }
        });

        // Chuyển dữ liệu từ Map thành mảng variants
        const variants = Array.from(variantsMap.values());


        const [form] = Form.useForm();
        form.setFieldsValue({
            _id: product?._id,
            title: product?.title,
            discount: product?.discount,
            price: product?.price,
            images: product?.images,
            variants: variants,
            description: product?.description,
            categoryId: product?.categoryId?._id && product?.categoryId._id,
        });

        const [onUpdate] = useUpdateProductMutation()

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

        const [imageList, setImageList] = useState<string[]>([]);
        useEffect(() => {
            if (product?.images) {
                setImageList(product.images);
            }
        }, [product]);
        const handleRemoveImage = (index: number) => {
            const updatedImages = [...imageList];
            updatedImages.splice(index, 1);
            setImageList(updatedImages);

        };

        const onFinish = async (values: any) => {
            try {
                let newImages: string[] = [];

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
                            }
                        }
                    });
                }
                const updatedImageList = [...imageList, ...newImages];

                const variantsData = values.variants;

                const deletedIds: string[] = [];

                // Lặp qua mảng variants ban đầu
                for (const variant of variants) {
                    // Lặp qua các phần tử trong mảng items của variant
                    for (const item of variant.items) {
                        // Kiểm tra xem _id của item không tồn tại trong mảng variantsData
                        if (!variantsData.some((dataVariant: any) =>
                            dataVariant.items.some((dataItem: any) => dataItem._id === item._id)
                        )) {
                            deletedIds.push(item._id);
                        }
                    }
                }
                const apiUrl = ' http://localhost:8080/api/productDetails/'; //
                deletedIds.forEach(async (id) => {
                    try {
                        await axios.delete(`${apiUrl}/${id}`);
                    } catch (error) {
                        console.log(error);

                    }
                });
                const newVariants: string[] = [];
                for (const variant of variants) {
                    for (const item of variant.items) {
                        if (!deletedIds.includes(item._id)) {
                            newVariants.push(item._id);
                        }
                    }
                }

                // console.log("Các _id không bị xóa: ", newVariants);
                const newValues = { ...values, images: updatedImageList };

                await onUpdate({ id, ...newValues })
                    .then(() =>
                        message.success(`Cập nhật thành công`)
                    ).then(() =>
                        navigate("/admin/product")
                    )
            } catch (error) {
                console.log(error);

            }
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
                        title: 'Update Product',
                    },
                ]}
            />
            <div className='border p-10 rounded-lg  bg-white'>
                <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff]">
                    Update Product
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
                    <Form.Item style={{ display: "none" }}>
                        <Input name="_id" />
                    </Form.Item>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                        <Col className="gutter-row" span={6}>

                            {/* Input Title Product */}
                            <Form.Item
                                name="title"
                                label="Tên sản phẩm"
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
                                label="Giá"
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
                            <Form.Item name="discount" label="Giảm giá">
                                <InputNumber
                                    min={0}
                                    formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            {/* Input Category */}
                            <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true, message: 'Please input your Category!' }]}>
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
                            <div className="w-1/3 mr-10">
                                <Form.Item
                                    label="Ảnh"
                                    name="images"
                                    rules={[{ required: true, message: 'Please input your Image!' }]}
                                >
                                    <Dragger {...props}>
                                        <Button icon={<UploadOutlined />}>Choose images</Button>
                                    </Dragger>
                                </Form.Item>

                                <Form.Item label="">
                                    {product?.images && (
                                        <Image.PreviewGroup>
                                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                {imageList.map((image, index) => (
                                                    <div key={index} style={{ marginRight: '20px', marginBottom: '20px' }}>
                                                        <Badge count={<CloseCircleFilled
                                                            onClick={() => handleRemoveImage(index)}
                                                            className='text-xl text-red-500 rounded-full bg-white'
                                                        />}>
                                                            <Image width={70} src={image} />
                                                        </Badge>
                                                    </div>
                                                ))}
                                            </div>
                                        </Image.PreviewGroup>
                                    )}
                                </Form.Item>
                            </div>

                            {/* Input Desription */}
                            <Form.Item
                                name="description"
                                label="Mô tả"
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
                                        title={`Mẫu ${field.name + 1}`}
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
                                            <div className="text-center w-[300px]">
                                                <Form.Item name={[field.name, 'imageColor']}>
                                                    <Upload
                                                        {...props}
                                                        listType="picture"
                                                        className="avatar-uploader"
                                                        maxCount={1}

                                                    >
                                                        {variants[field.name]?.imageColor ? (
                                                            <div className="w-[100px] h-[100px] p-1 relative">
                                                                <img
                                                                    src={variants[field.name]?.imageColor}
                                                                    alt="Image"
                                                                    style={{
                                                                        margin: '0 auto',
                                                                        maxWidth: '100%',
                                                                        maxHeight: '100%',
                                                                        filter: 'brightness(60%)',
                                                                    }}
                                                                />
                                                                <CloudUploadOutlined
                                                                    style={{
                                                                        position: 'absolute',
                                                                        top: '50%',
                                                                        left: '50%',
                                                                        transform: 'translate(-50%, -50%)',
                                                                        color: 'white'
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-[100px] h-[100px] p-3 flex items-center justify-center">
                                                                <CloudUploadOutlined />
                                                            </div>
                                                        )}

                                                    </Upload>
                                                </Form.Item>
                                                <Form.Item name={[field.name, 'nameColor']}>
                                                    <Input placeholder="Màu sắc sản phẩm" />
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
                                                                        <Form.Item noStyle name={[subField.name, 'size']}>
                                                                            <Select
                                                                                placeholder="Size"
                                                                                style={{ width: 356 }}
                                                                                options={optionSize}
                                                                            />
                                                                        </Form.Item>
                                                                        <Form.Item noStyle name={[subField.name, 'quantity']} >
                                                                            <Input style={{ width: 360 }} placeholder="Số lượng" />
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
                                                                    + Thêm size
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
                                    className='bg-blue-500 text-white w-[200px] mx-auto'
                                >
                                    + Thêm mẫu mới
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
}
export default productUpdate;