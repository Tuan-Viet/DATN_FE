import React, { useState } from 'react'
import LayoutStatistic from './LayoutStatistic'
// import { WeeklyStatistics } from '../../../store/statistic/statistic.interface';
import { useGetOrderRevenueByDateQuery, useGetOrderRevenueByMonthQuery, useGetOrderRevenueByWeekQuery } from '../../../store/statistic/statistic.service';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Button, Dropdown, MenuProps, Select, Space, Spin, Table, DatePicker } from 'antd';
import {
  EyeOutlined,
  DownOutlined,
  FileExcelFilled,
  PrinterFilled
} from '@ant-design/icons';
import { Excel } from "antd-table-saveas-excel";
import { IExcelColumn } from 'antd-table-saveas-excel/app';
import moment from 'moment';
const { RangePicker } = DatePicker;
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
    render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    key: 'totalOrders',
  },
  {
    title: 'Tiền vốn',
    dataIndex: 'totalCostPrice',
    render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    key: 'totalCostPrice',
  },
  {
    title: 'Tiền hàng',
    dataIndex: 'totalOrderValue',
    render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    key: 'totalOrderValue',
  },
  {
    title: 'Số sản phẩm bán được',
    dataIndex: 'totalQuantitySold',
    render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    key: 'totalQuantitySold',
  },
  {
    title: 'Tổng doanh thu',
    dataIndex: 'totalRevenue',
    render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    key: 'totalRevenue',
  },
  {
    title: 'Tổng lợi nhuận',
    dataIndex: 'totalProfit',
    render: (value: number) => value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    key: 'totalProfit',
  },

  // Thêm các cột khác nếu cần
]; interface OrderRevanueByMonthProps {
  showTable?: boolean;
}
const OrderRevanueByDate = (props: OrderRevanueByMonthProps = ({ showTable: true })) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [selectedStatus, setSelectedStatus] = useState<any[]>([]);
  const [dateFrom, setDateFrom] = useState<any>(null);
  const [dateTo, setDateTo] = useState<any>(null);
  const [selectedFilterType, setSelectedFilterType] = useState('');

  const [orderOption, setOrderOption] = useState<Number>(1);
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [visibleDate, setVisibleDate] = useState(false);
  const { data: orderRevanueWeek, isSuccess: isSuccessGetRevanueWeek } = useGetOrderRevenueByDateQuery()

  const [betweenDay, setBetweenDay] = useState(0)

  if (!isSuccessGetRevanueWeek) {
    return <>
      <div className="fixed inset-0 flex justify-center items-center bg-gray-50 ">
        <Spin size='large' />
      </div>
    </>;
  }
  let filledData = [];

  const generateLast7Days = () => {
    const last7Days = [];
    const currentDate = new Date();


    for (let i = betweenDay; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      last7Days.push(formattedDate);
    }

    return last7Days;
  };
  const fillMissingDays = (data: any, allDays: string[]) => {
    const filledData = allDays.map(day => {
      const matchingData = data.find((entry: any) => entry.day === day);
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
  const excelColumns: IExcelColumn[] = columns.map(column => {
    // Lọc ra các thuộc tính quan trọng từ cột
    const { title, dataIndex } = column;

    return {
      title,
      dataIndex: dataIndex as string, // Chắc chắn rằng dataIndex là một chuỗi
      key: dataIndex as string, // Chắc chắn rằng dataIndex là một chuỗi

    };
  });
  const handleClick = () => {
    console.log(excelColumns);
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(excelColumns)
      .addDataSource(data, {
        str2Percent: true,
      })
      .saveAs("Thongketheotuan.xlsx");
  };


  const filteredOrder = data?.filter((order: any) => {
    // Lọc theo thời gian
    if (dateFrom && dateTo) {
      const createdAtMoment = moment(order.day, 'YYYY-MM-DD');
      console.log(createdAtMoment);

      if (!createdAtMoment.isBetween(dateFrom, dateTo, null, '[]')) {
        console.log('Order filtered out:', order);
        return false;
      }
    }

    return true;
  });
  const handleResetClick = () => {
    setSelectedStatus([]);
  };

  const handleClickFilterStatus = () => {
    setVisibleStatus(!visibleStatus);
  };

  const handleClickFilterDate = () => {
    setVisibleDate(!visibleDate);
  };

  const handleResetDate = () => {
    setSelectedFilterType("")
    setBetweenDay(0);
    setDateFrom(null);
    setDateTo(null);
  };

  const handleDateFilter = (filterType: string) => {
    let fromDate, toDate, quantity: any;

    switch (filterType) {
      case 'today':
        fromDate = moment().startOf('day').format('YYYY-MM-DD ');
        toDate = moment().endOf('day').format('YYYY-MM-DD');
        quantity = 0
        break;
      case 'oneWeekAgo':
        fromDate = moment().subtract(7, 'days').startOf('day').format('YYYY-MM-DD ');
        toDate = moment().endOf('day').format('YYYY-MM-DD ');
        quantity = 6
        break;
      case 'oneMonthAgo':
        fromDate = moment().subtract(1, 'months').startOf('day').format('YYYY-MM-DD');
        toDate = moment().endOf('day').format('YYYY-MM-DD ');
        quantity = 30
        break;
      default:
        fromDate = moment().startOf('day').format('YYYY-MM-DD ');
        toDate = moment().endOf('day').format('YYYY-MM-DD');
        break;
    }

    setDateFrom(fromDate);
    setDateTo(toDate);
    setBetweenDay(quantity)
  };

  const handleDateChange = (dates: [moment.Moment, moment.Moment] | null) => {
    if (dates) {
      const fromDate = dates[0].startOf('day').format('YYYY-MM-DD');
      const toDate = dates[1].endOf('day').format('YYYY-MM-DD');

      // Calculate the difference in days
      const daysBetween = dates[1].diff(dates[0], 'days');

      setDateFrom(fromDate);
      setDateTo(toDate);

      if (daysBetween === 0) {
        // Handle special case when fromDate is the same as toDate
        console.log('From date is the same as To date.');
        // Add additional handling specific to this case if needed
      }

      setBetweenDay(daysBetween);
      setSelectedFilterType('');
    } else {
      setDateFrom(null);
      setDateTo(null);
    }
  };



  const disabledDate = (current) => {
    // Kiểm tra nếu ngày hiện tại (current) là sau ngày hôm nay
    return current && current > moment().endOf('day');
  };

  const filterDate: MenuProps['items'] = [
    {
      label: (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-700">Thời gian</span>

          <button
            type="button"
            className="text-sm text-gray-900 underline underline-offset-4"
            onClick={handleResetDate}
          >
            Reset
          </button>
        </div>
      ),
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <label htmlFor="FilterToday" className="inline-flex items-center gap-2">
          <input
            name="FilterToday"
            type="radio"
            id="FilterToday"
            className="h-5 w-5 rounded border-gray-300"
            onChange={() => {
              handleDateFilter('today');
              setSelectedFilterType('today');
            }}
            checked={selectedFilterType === 'today'}
          />

          <span className="text-sm font-medium text-gray-700">
            Hôm nay
          </span>
        </label>
      ),
      key: 'today',
    },
    {
      label: (
        <label htmlFor="FilterOneWeekAgo" className="inline-flex items-center gap-2">
          <input
            name="FilterOneWeekAgo"
            type="radio"
            id="FilterOneWeekAgo"
            className="h-5 w-5 rounded border-gray-300"
            onChange={() => {
              handleDateFilter('oneWeekAgo');
              setSelectedFilterType('oneWeekAgo');
            }}
            checked={selectedFilterType === 'oneWeekAgo'}
          />

          <span className="text-sm font-medium text-gray-700">
            1 tuần trước
          </span>
        </label>
      ),
      key: 'oneWeekAgo',
    },
    {
      label: (
        <label htmlFor="FilterOneMonthAgo" className="inline-flex items-center gap-2">
          <input
            name="FilterOneMonthAgo"
            type="radio"
            id="FilterOneMonthAgo"
            className="h-5 w-5 rounded border-gray-300"
            onChange={() => {
              handleDateFilter('oneMonthAgo');
              setSelectedFilterType('oneMonthAgo');
            }}
            checked={selectedFilterType === 'oneMonthAgo'}
          />

          <span className="text-sm font-medium text-gray-700">
            1 tháng trước
          </span>
        </label>
      ),
      key: 'oneMonthAgo',
    },

    {
      label: (
        <RangePicker
          bordered={false}
          onChange={(dates: any) => handleDateChange(dates)}
          format={'DD/MM/YYYY'}
          disabledDate={disabledDate}
        />
      ),
      key: 1,
    },

  ];



  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-3">
          <Dropdown
            menu={{ items: filterDate }}
            trigger={['click']}
            visible={visibleDate}
            onOpenChange={handleClickFilterDate}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Button className='w-[250px]'>
                <Space className='flex justify-between' >
                  <span>Lọc theo thời gian</span>
                  <DownOutlined />
                </Space>
              </Button>
            </a>
          </Dropdown>
        </div>
      </div>
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
        {props.showTable && (

          <>      <Button danger onClick={handleClick}>Export</Button>
            <Table
              columns={columns}
              dataSource={filteredOrder}
              pagination={{ size: 'small', pageSize: 5 }}
              summary={() => (
                <Table.Summary.Row className='h-20 bg-blue-50'>
                  <Table.Summary.Cell index={0} colSpan={1}>
                    <strong>Tổng</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={0} colSpan={1}>
                    <strong>{filteredOrder.reduce((acc, current) => acc + current.totalOrders, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} colSpan={1}>
                    <strong>{filteredOrder.reduce((acc, current) => acc + current.totalCostPrice, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3} colSpan={1}>
                    <strong>{data.reduce((acc, current) => acc + current.totalOrderValue, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4} colSpan={1}>
                    <strong>{filteredOrder.reduce((acc, current) => acc + current.totalQuantitySold, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5} colSpan={1}>
                    <strong>{filteredOrder.reduce((acc, current) => acc + current.totalRevenue, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6} colSpan={1}>
                    <strong>{filteredOrder.reduce((acc, current) => acc + current.totalProfit, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />        </>)}
      </div></>
  )
}

export default OrderRevanueByDate