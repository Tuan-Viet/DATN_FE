import { DatePicker, TreeSelect } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import OrderRevanueByMonth from './OrderRevanueByMonth';
import OrderRevanueByWeek from './OrderRevanueByWeek';
import OrderRevanueByQuarter from './OrderRevanueByQuarter';
import ProductRevanue from './ProductStatistic';
import OrderStatistic from './OrderStatistic';


const { RangePicker } = DatePicker;
const LayoutStatistic
 = () => {
  const navigate = useNavigate()
  dayjs.extend(customParseFormat);
  const dateFormat = 'YYYY/MM/DD';
  const [value, setValue] = useState<string>("date");

  const treeData = [
    {
      title: 'Theo thời gian',
      value: 'date',
      children: [
        {
          title: 'Theo tuần',
          value: 'week',
        },
        {
          title: 'Theo tháng',
          value: 'month',
        },
        {
          title: 'Theo quý',
          value: 'quarter',
        },
      ],
    },
    {
      title: 'Theo sản phẩm',
      value: 'product',

    },
    {
      title: 'Theo đơn hàng',
      value: 'order',

    },
  ];

  const onChange = (newValue: string) => {
    // navigate(`/admin/statistic/by_` +newValue)
    setValue(newValue);
  };
  const renderComponent = () => {
    switch (value) {
      case 'week':
        return <OrderRevanueByWeek />;
      case 'month':
        return <OrderRevanueByMonth />;
      case 'quarter':
        return <OrderRevanueByQuarter />;
      case 'product':
        return <ProductRevanue />;
      case 'order':
        return <OrderStatistic />;
      default:
        return null;
    }
  };
  return (
    <>
      <h3 className='text-xl font-medium'>Hoạt dộng kinh doanh</h3>
      <p className='my-4'>Ghi nhận theo ngày giao hàng thành công</p>

      <div className=''>
        <label htmlFor="">  Khoảng thời gian:   <RangePicker
          style={{ marginLeft: 10 }}
          defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
          format={dateFormat}
        /></label>
        <label htmlFor="" className='ml-10'>Loại báo cáo:
          <TreeSelect
            style={{ width: 200, marginLeft: 10 }}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={treeData}
            treeDefaultExpandAll
            onChange={onChange}
            defaultValue='1'
          />
        </label>
      </div>
      {renderComponent()}
    </>
  )
}

export default LayoutStatistic
