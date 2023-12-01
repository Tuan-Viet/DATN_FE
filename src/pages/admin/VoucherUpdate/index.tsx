import React, { useEffect } from 'react';
import type { FormInstance } from 'antd';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    message,
    Spin,
    Row,
    Col,
    Breadcrumb,
    DatePicker
} from 'antd';
import {
    SyncOutlined
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { useAddVoucherMutation, useGetOneVoucherQuery, useListVoucherQuery, useUpdateVoucherMutation } from '../../../store/vouchers/voucher.service';
import { listVoucherSlice } from '../../../store/vouchers/voucherSlice';
const { TextArea } = Input;
const { RangePicker } = DatePicker;
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

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
            Cập nhật
        </Button>
    );
};

const VoucherUpdate = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: voucher } = useGetOneVoucherQuery(id || '')
    const [onUpdate] = useUpdateVoucherMutation()
    const vocherState = useSelector((state: RootState) => state.voucherSlice.vouchers)
    const voucherCodes = vocherState.map((voucher) => voucher.code);

    const [discountType, setDiscountType] = React.useState(undefined);
    const handleTypeChange = (value: any) => {
        setDiscountType(value);
    };

    const formatter = (value: any) => {
        if (discountType === 'value') {
            return ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } else {
            return value === undefined ? '' : value.toString();
        }
    };

    const generateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        const codeLength = 10;

        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        form.setFieldsValue({ code });
    };
    const handleCheckCode = async (rule: any, value: any) => {
        if (voucherCodes.includes(value)) {
            throw new Error('Mã CODE đã tồn tại. Vui lòng chọn mã khác.');
        }
    };

    form.setFieldsValue({
        _id: voucher?._id,
        title: voucher?.title,
        code: voucher?.code,
        quantity: voucher?.quantity,
        minOrderValue: voucher?.minOrderValue,
        type: voucher?.type,
        discount: voucher?.discount,
        validFrom: [dayjs(voucher?.validFrom), dayjs(voucher?.validTo)],
        description: voucher?.description,
    });
    const onFinish = async (values: any) => {
        try {
            const rangeValue = values['validFrom'];
            const voucherData = {
                ...values,
                validFrom: rangeValue[0].format('YYYY-MM-DD'),
                validTo: rangeValue[1].format('YYYY-MM-DD')
            };
            console.log("Value update:", voucherData);

            await onUpdate({ _id: id, ...voucherData })
            message.success(`Cập nhật thành công`);
            navigate("/admin/voucher");
        } catch (error) {
            console.log(error);

        }
    };

    return <>
        <Breadcrumb className='pb-3'
            items={[
                {
                    title: <Link to={`/admin/voucher`}>Voucher</Link>,
                },
                {
                    title: 'CẬP NHẬT',
                },
            ]}
        />
        <div className='border p-10 rounded-lg  bg-white'>
            <h3 className="text-center text-2xl font-bold uppercase text-[#1677ff] mb-10">
                Cập nhật Voucher
            </h3>
            <Form
                form={form}
                name="validateOnly"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                className="mx-auto w-[700px]"
            >
                <Form.Item name="_id" style={{ display: "none" }}>
                    <Input />
                </Form.Item>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name="title"
                            label="Tên"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống!'
                                }
                            ]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            label="Hạn sử dụng"
                            name="validFrom"
                            rules={[{ required: true, message: 'Không được để trống!' }]}
                        >
                            <RangePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="code"
                            label="Mã CODE"
                            rules={[{ required: true, message: 'Không được để trống!' },
                                // { validator: handleCheckCode },
                            ]}
                            normalize={(value) => value.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}
                        >
                            <Input suffix={<SyncOutlined onClick={generateRandomCode} className='text-gray-400' />} />
                        </Form.Item>

                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item name="quantity" label="Số lượng" rules={[{ required: true, message: 'Không được để trống!' }]}>
                            <InputNumber
                                min={0}
                                formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item name="minOrderValue" label="Áp dụng (đơn hàng tối thiểu)">
                            <InputNumber
                                placeholder='Cho tất cả đơn hàng'
                                min={0}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item name="type" label="Loại" rules={[{ required: true, message: 'Không được để trống!' }]}>
                            <Select
                                allowClear
                                onChange={handleTypeChange}
                                options={[
                                    { value: 'value', label: 'value' },
                                    { value: 'percent', label: 'percent' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <Form.Item
                            name="discount"
                            label="Giảm giá"
                            rules={[{ required: true, message: 'Không được để trống!' }]}
                        >
                            <InputNumber
                                min={0}
                                max={discountType === 'percent' ? 100 : undefined}
                                formatter={formatter}
                                style={{ width: '100%' }}
                                suffix={discountType === 'percent' ? '%' : undefined}
                            // disabled={!discountType}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name="description"
                            label="Mô tả"
                            rules={[{ required: true, message: 'Không được để trống!' }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                    </Col>
                </Row>

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
export default VoucherUpdate;