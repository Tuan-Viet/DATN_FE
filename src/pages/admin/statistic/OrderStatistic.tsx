import React from 'react'
import LayoutStatistic from './LayoutStatistic'
import { MonthlyStatistics } from '../../../store/statistic/statistic.interface';
import { useGetOrderRevenueByMonthQuery, useGetOrderRevenueQuery, useGetProductRevenueQuery } from '../../../store/statistic/statistic.service';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

interface DataType {
    key: string;
    orderId: string;
    customerName: string;
    totalQuantitySold: number;
    totalRevenue: number;
    totalProfit: number;
    totalCostPrice: number

}
const columns: ColumnsType<DataType> = [
  {
    title: 'Mã đơn',
    dataIndex: 'orderId',
    key: 'orderId',
    ellipsis: {
      showTitle: true,
    },
    render: (text) => <Link to={`#`}>#{text}</Link>,
  },
  {
    title: 'Tên khách hàng',
    dataIndex: 'customerName',
    key: 'customerName',
  },
  {
    title: 'Số lượng sản phẩm bán',
    dataIndex: 'totalQuantitySold',
    key: 'totalQuantitySold',
  },
  {
    title: 'Vốn',
    dataIndex: 'totalCostPrice',
    key: 'totalCostPrice',
  },
  {
    title: 'Doanh thu',
    dataIndex: 'totalRevenue',
    key: 'totalRevenue',
  },
  {
    title: 'Lợi nhuận',
    dataIndex: 'totalProfit',
    key: 'totalProfit',
  },
  
  ];
  
  const OrderStatistic = () => {
    const { data: productRevanue, isSuccess } = useGetOrderRevenueQuery();
  
    const data: DataType[] = isSuccess
      ? productRevanue?.map((item) => ({
          key: item.orderId,
          orderId: item.orderId,
          customerName: item.customerName,
          totalRevenue: item.totalRevenue,
          totalQuantitySold: item.totalQuantitySold,
          totalCostPrice: item.totalCostPrice,
          totalProfit: item.totalProfit,
        }))
      : [];
  
    return (
        <div>
          <Table
            sticky
            showHeader={true}
            columns={columns}
            dataSource={data}
            pagination={{size:'small', pageSize: 5}}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2}>
                  <strong>Tổng</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell  index={1} colSpan={1}>
                  <strong>{data.reduce((acc, current) => acc + current.totalQuantitySold, 0)}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell  index={2} colSpan={1}>
                  <strong>{data.reduce((acc, current) => acc + current.totalCostPrice, 0)}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={0} colSpan={1}>
                  <strong>{data.reduce((acc, current) => acc + current.totalRevenue, 0)}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={0} colSpan={1}>
                  <strong>{data.reduce((acc, current) => acc + current.totalProfit, 0)}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          />
          
        </div>
    );
  };
  
  export default OrderStatistic;