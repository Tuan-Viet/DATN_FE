import React from 'react'
import LayoutStatistic from './LayoutStatistic'
import { MonthlyStatistics } from '../../../store/statistic/statistic.interface';
import { useGetOrderRevenueByMonthQuery } from '../../../store/statistic/statistic.service';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Table } from 'antd';

interface DataType {
  key: string;
  month: string;
  totalOrders: number;
  totalOrderValue: number;
  totalRevenue: number;
  totalProfit: number;
  totalQuantitySold: number;
  totalCostPrice: number;

}
const columns = [
  {
    title: 'Tháng',
    dataIndex: 'month',
    key: 'month',
  },
  {
    title: 'Tổng số đơn',
    dataIndex: 'totalOrders',
    key: 'totalOrders',
  },
  {
    title: 'Tiền vốn',
    dataIndex: 'totalCostPrice',
    key: 'totalCostPrice',
  },
  {
    title: 'Tiền hàng',
    dataIndex: 'totalOrderValue',
    key: 'totalOrderValue',
  },
  {
    title: 'Số sản phẩm bán được',
    dataIndex: 'totalQuantitySold',
    key: 'totalQuantitySold',
  },
  {
    title: 'Tổng doanh thu',
    dataIndex: 'totalRevenue',
    key: 'totalRevenue',
  },
  {
    title: 'Tổng lợi nhuận',
    dataIndex: 'totalProfit',
    key: 'totalProfit',
  },

  // Thêm các cột khác nếu cần
];
const OrderRevanueByMonth = () => {
    const { data: orderRevanueMonth, isSuccess: isSuccessGetRevanueMonth } = useGetOrderRevenueByMonthQuery()
    let filledData: MonthlyStatistics[] = [];

    const generateAllMonths = () => {
      const allMonths = [];
      const currentDate = new Date();
    
      for (let i = 0; i < 12; i++) {
        const month = (currentDate.getMonth() + 1 - i + 12) % 12 + 1;
        const year = currentDate.getFullYear();
        allMonths.unshift(`${year}-${String(month).padStart(2, '0')}`);
      }
    
      return allMonths;
    };
    const fillMissingMonths = (data: MonthlyStatistics[], allMonths: string[]) => {
        const filledData = allMonths.map(month => {
            const matchingData = data.find(entry => entry.month === month);
            return matchingData || {
                month,
                totalOrders: 0,
                totalOrderValue: 0,
                totalRevenue: 0,
                totalProfit: 0,
                totalCostPrice: 0,
                totalQuantitySold: 0,
            };
        });
        return filledData;
    };
    if (orderRevanueMonth) {
        const allMonths = generateAllMonths();
        filledData = fillMissingMonths(orderRevanueMonth, allMonths);
    }
    const data: DataType[] = isSuccessGetRevanueMonth
    ? orderRevanueMonth?.map((item) => ({
        key: item.month,
        month: item.month,
        totalOrders: item.totalOrders,
        totalQuantitySold: item.totalQuantitySold,
        totalOrderValue: item.totalOrderValue,
        totalRevenue: item.totalRevenue,
        totalProfit: item.totalProfit,
        totalCostPrice: item.totalCostPrice,

      }))
    : [];
    return (
<>
<div>        
            <HighchartsReact
            highcharts={Highcharts}
            options={{
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Biểu đồ doanh thu'
                },
                xAxis: {
                    categories: filledData?.map(entry => entry.month) || []
                },
                yAxis: {
                    title: {
                        text: 'Doanh thu (đơn vị)'
                    }
                },
                series: [{
                    name: 'Doanh thu',
                    data: filledData?.map(entry => entry.totalRevenue) || []
                },
                {
                    name: 'Lợi nhuận',
                    data: filledData?.map(entry => entry.totalProfit) || []
                },
                ]
            }}
        /></div>
        <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ size: 'small', pageSize: 5 }}
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={1}>
                <strong>Tổng</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={0} colSpan={1}>
                <strong>{data.reduce((acc, current) => acc + current.totalOrders, 0)}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} colSpan={1}>
                <strong>{data.reduce((acc, current) => acc + current.totalOrderValue, 0)}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} colSpan={1}>
                <strong>{data.reduce((acc, current) => acc + current.totalQuantitySold, 0)}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4} colSpan={1}>
                <strong>{data.reduce((acc, current) => acc + current.totalRevenue, 0)}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={5} colSpan={1}>
                <strong>{data.reduce((acc, current) => acc + current.totalProfit, 0)}</strong>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={6} colSpan={1}>
                <strong>{data.reduce((acc, current) => acc + current.totalCostPrice, 0)}</strong>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
        </div></>
    )
}

export default OrderRevanueByMonth