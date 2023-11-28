import React from 'react'
import LayoutStatistic from './LayoutStatistic'
import { WeeklyStatistics } from '../../../store/statistic/statistic.interface';
import { useGetOrderRevenueByMonthQuery, useGetOrderRevenueByWeekQuery } from '../../../store/statistic/statistic.service';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Table } from 'antd';

interface DataType {
  key: string;
  day: string;
  totalOrders: number;
  totalOrderValue: number;
  totalRevenue: number;
  totalProfit: number;
  totalQuantitySold: number;
  totalCostPrice: number;

}
const columns = [
  {
    title: 'Ngày',
    dataIndex: 'day',
    key: 'day',
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
const OrderRevanueByWeek = () => {
  const { data: orderRevanueWeek, isSuccess: isSuccessGetRevanueWeek } = useGetOrderRevenueByWeekQuery()
  let filledData: WeeklyStatistics[] = [];

  const generateLast7Days = () => {
    const last7Days = [];
    const currentDate = new Date();
  
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      last7Days.push(formattedDate);
    }
    
    return last7Days;
  };
  const fillMissingDays = (data: WeeklyStatistics[], allDays: string[]) => {
    const filledData = allDays.map(day => {
      const matchingData = data.find(entry => entry.day === day);
      return matchingData || {
        day: day,
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

  if (orderRevanueWeek) {
    const allDays = generateLast7Days();
    console.log(allDays);
    filledData = fillMissingDays(orderRevanueWeek, allDays);
  }
  const data: DataType[] = isSuccessGetRevanueWeek
    ? orderRevanueWeek?.map((item) => ({
      key: item.day,
      day: item.day,
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
              categories: filledData?.map(entry => entry.day) || []
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

export default OrderRevanueByWeek