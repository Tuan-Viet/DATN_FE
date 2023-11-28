import React from 'react'
import LayoutStatistic from './LayoutStatistic'
import { MonthlyStatistics } from '../../../store/statistic/statistic.interface';
import { useGetOrderRevenueByMonthQuery, useGetProductRevenueQuery } from '../../../store/statistic/statistic.service';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

interface DataType {
    key: string;
    productId: string;
    productName: string;
    quantitySold: number;
    totalOrders: number;
    totalRevenue: number;
    profit: number;

}
const columns: ColumnsType<DataType> = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productId',
      key: 'productId',
      ellipsis: {
        showTitle: true
      },
      render: (text) => <Link to={`#`}>#{text}</Link>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Số lượng bán',
      dataIndex: 'quantitySold',
      key: 'quantitySold',
    },
    {
      title: 'Số đơn',
      dataIndex: 'totalOrders',
      key: 'totalOrders',
    },
    {
      title: 'Doanh thu',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
    },
    {
      title: 'Lợi nhuận',
      dataIndex: 'profit',
      key: 'profit',
    },
  ];
  
  const ProductStatistic = () => {
    const { data: productRevanue, isSuccess } = useGetProductRevenueQuery();
  
    const data: DataType[] = isSuccess
      ? productRevanue?.map((item) => ({
          key: item.productId,
          productId: item.productId,
          productName: item.productName,
          quantitySold: item.quantitySold,
          totalOrders: item.totalOrders,
          totalRevenue: item.totalRevenue,
          profit: item.profit,
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
                  <strong>{data.reduce((acc, current) => acc + current.quantitySold, 0)}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell  index={2} colSpan={1}>
                  <strong>{data.reduce((acc, current) => acc + current.totalOrders, 0)}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={0} colSpan={1}>
                  <strong>{data.reduce((acc, current) => acc + current.totalRevenue, 0)}</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={0} colSpan={1}>
                  <strong>{data.reduce((acc, current) => acc + current.profit, 0)}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )}
          />
          
        </div>
    );
  };
  
  export default ProductStatistic;