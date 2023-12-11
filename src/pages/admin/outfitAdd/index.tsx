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
    Card,
    Typography,
    Breadcrumb,
    Switch,
    Tag,
    Tooltip
} from 'antd';
import {
    PlusOutlined,
    InfoCircleOutlined
} from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { useFetchListCategoryQuery } from '../../../store/category/category.service';
import { ICategory } from '../../../store/category/category.interface';
import { useAddProductMutation, useFetchListProductByAdminQuery } from '../../../store/product/product.service';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
const { Dragger } = Upload;
const { TextArea } = Input;
const { Option } = Select;

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
        <Button type="primary" htmlType="submit"
            // disabled={!submittable}
            className='bg-blue-500'>
            Thêm
        </Button>
    );
};

const outfitAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [onAdd] = useAddProductMutation()
    const [description, setDescription] = useState('');
    const [valueHide, setValueHide] = useState(false);
    const { data: listProduct, isLoading, isError, isSuccess } = useFetchListProductByAdminQuery()
    const listSku = listProduct?.map((product) => product.sku);
    const handleCheckSku = async (rule: any, value: any) => {
        if (listSku?.includes(value)) {
            throw new Error('Mã sản phẩm đã tồn tại. Vui lòng chọn mã khác.');
        }
    };

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
                    }
                }
            });
        }
        const newValues = { ...values, hide: valueHide, description: description, images: newImages, colors: colors, sizes: sizes };

        console.log(newImages);
        console.log("Values Data:", newValues);

        await onAdd(newValues)
        message.success(`Tạo mới thành công`);
        navigate("/admin/product");
    };

    const props: UploadProps = {
        listType: "picture",
        name: "images",
        multiple: true,
        action: " http://localhost:8080/api/images/upload",
    };

    const handleSwitchChange = (checked: any) => {
        form.setFieldsValue({ hide: !checked });
        setValueHide(!valueHide)
    }

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);

    return <>
        <Breadcrumb className='pb-3'
            items={[
                {
                    title: <Link to={`/admin/outfit`}>Outfit</Link>,
                },
                {
                    title: 'TẠO MỚI',
                },
            ]}
        />
        <div className='p-10'>
            <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{
                    items: [
                        {}, {}
                    ]
                }}
                className="mx-auto"
            >
                <div className="flex space-x-10">
                    <div className="w-3/4 space-y-5">
                        <div className="bg-white border space-y-3 rounded-sm">
                            <h1 className='border-b p-5 font-medium text-lg'>Thông tin chung</h1>
                            <div className="px-5">

                                <div className="flex space-x-5">
                                    <Form.Item
                                        name="title"
                                        label="Tên sản phẩm"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Không được để trống!'
                                            }
                                        ]}
                                        className='w-1/2'

                                    >
                                        <Input
                                            placeholder='Nhập tên sản phẩm'
                                            className='py-2' />
                                    </Form.Item>
                                    <Form.Item
                                        name="sku"
                                        label="Mã sản phẩm/SKU"
                                        rules={[{ required: true, message: 'Không được để trống!' }, { validator: handleCheckSku },]}
                                        normalize={(value) => value.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                                        className='w-1/2'>
                                        <Input className='py-2' />
                                    </Form.Item>
                                </div>
                                <details className="pb-2 overflow-hidden [&_summary::-webkit-details-marker]:hidde">
                                    <summary
                                        className="flex w-[250px] cursor-pointer p-2 transition"
                                    >
                                        <span className="text-sm text-blue-500">Mô tả sản phẩm</span>
                                    </summary>
                                    <div className="pt-3">
                                        <Form.Item
                                            name="description"
                                        >
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onReady={editor => {
                                                    // console.log('Editor is ready to use!', editor);
                                                    editor.editing.view.change((writer) => {
                                                        writer.setStyle(
                                                            "height",
                                                            "300px",
                                                            editor.editing.view.document.getRoot()
                                                        )
                                                    })
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setDescription(data);
                                                    // console.log({ event, editor, data });
                                                }}
                                                onBlur={(event, editor) => {
                                                    // console.log('Blur.', editor);
                                                }}
                                                onFocus={(event, editor) => {
                                                    // console.log('Focus.', editor);
                                                }}
                                            />
                                        </Form.Item>
                                    </div>
                                </details>
                            </div>
                        </div>
                        <div className="bg-white border p-5 space-y-3 rounded-sm">
                            <div className="flex items-center space-x-1">
                                <h1 className='font-medium text-lg'>Ảnh</h1>
                                {/* <Tooltip title="Ảnh tải đầu tiên sẽ được chọn làm ảnh đại diện" color={'blue'} key={'blue'}>
                                    <InfoCircleOutlined className='text-blue-500' />
                                </Tooltip> */}
                            </div>
                            <Form.Item
                                name="images"
                                rules={[{ required: true, message: 'Không được để trống!' }]}
                            >
                                <Dragger
                                    {...props}
                                    className='text-gray-500'

                                >
                                    <PlusOutlined className='pr-5 text-lg' />  Kéo thả hoặc <a className='text-blue-500'>tải ảnh lên từ thiết bị</a>
                                </Dragger>
                            </Form.Item>

                        </div>
                        <div className="bg-white border space-y-3 rounded-sm">
                            <h1 className='border-b p-5 font-medium text-lg'>Bộ sưu tập</h1>
                            <div className="flex px-5 space-x-5">
                                <Form.Item
                                    name='productOne'
                                    rules={[{ required: true, message: 'Không được để trống' }]}
                                >
                                    <Select
                                        showSearch
                                        style={{ width: 400, height: 60 }}
                                        placeholder="Tìm kiếm tên sản phẩm, mã sản phẩm"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => {
                                            const labelIncludesInput = (option?.label ?? '').includes(input);
                                            const skuIncludesInput = (option?.sku ?? '').includes(input);
                                            return labelIncludesInput || skuIncludesInput;
                                        }}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        optionLabelProp="customLabel"
                                        dropdownRender={menu => (
                                            <div>
                                                {menu}
                                            </div>
                                        )}
                                    >
                                        {listProduct?.map((product: any) => (
                                            <Option key={product._id}
                                                value={product._id}
                                                label={product.title}
                                                sku={product.sku}
                                                customLabel={
                                                    <div className='flex items-center space-x-2'>
                                                        <img className='h-14' src={product.images[0]} alt="" />
                                                        <span>{product.title} {product.sku}</span>
                                                    </div>
                                                }

                                            >
                                                <div className='flex items-center space-x-2'>
                                                    <img className='h-14' src={product.images[0]} alt="" />
                                                    <span>{product.title} {product.sku}</span>
                                                </div>
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name='productTwo' rules={[{ required: true, message: 'Không được để trống' }]}>
                                    <Select
                                        showSearch
                                        style={{ width: 400, height: 60 }}
                                        placeholder="Tìm kiếm tên sản phẩm, mã sản phẩm"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => {
                                            const labelIncludesInput = (option?.label ?? '').includes(input);
                                            const skuIncludesInput = (option?.sku ?? '').includes(input);
                                            return labelIncludesInput || skuIncludesInput;
                                        }}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        optionLabelProp="customLabel"
                                        dropdownRender={menu => (
                                            <div>
                                                {menu}
                                            </div>
                                        )}
                                    >
                                        {listProduct?.map((product: any) => (
                                            <Option key={product._id}
                                                value={product._id}
                                                label={product.title}
                                                sku={product.sku}
                                                customLabel={
                                                    <div className='flex items-center space-x-2'>
                                                        <img className='h-14' src={product.images[0]} alt="" />
                                                        <span>{product.title} {product.sku}</span>
                                                    </div>
                                                }

                                            >
                                                <div className='flex items-center space-x-2'>
                                                    <img className='h-14' src={product.images[0]} alt="" />
                                                    <span>{product.title} {product.sku}</span>
                                                </div>
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/4">
                        <div className="bg-white border rounded-sm">
                            <Form.Item
                                name="hide"
                                valuePropName="checked"
                                initialValue={false}
                                className='px-3 space-y-3'
                            >
                                <h1 className='border-b py-2 font-semibold'>Trạng thái</h1>
                                <Space className="flex justify-between py-2" >
                                    <span className='block'>Cho phép bán</span>
                                    <Switch
                                        size="small"
                                        className=''
                                        defaultChecked={true}
                                        onChange={(checked) => handleSwitchChange(checked)}
                                    />
                                </Space>
                            </Form.Item>
                        </div>
                    </div>
                </div >

                <Form.Item noStyle shouldUpdate>
                    {() => (
                        <Typography>
                            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                        </Typography>
                    )}
                </Form.Item>

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
export default outfitAdd;