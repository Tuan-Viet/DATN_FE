import {
    TeamOutlined,
    SolutionOutlined,
    SkinOutlined,
    BarChartOutlined,
    InboxOutlined
} from '@ant-design/icons';
import { useGetDashboardStatisticQuery, useGetOrderRevenueByMonthQuery, useGetOrderRevenueByQuarterQuery, useGetOrderRevenueByWeekQuery, useGetOrderRevenueQuery, useGetProductRevenueQuery } from '../../../store/statistic/statistic.service';
import Highcharts from 'highcharts';
import { MonthlyStatistics, DashboardStatistic } from '../../../store/statistic/statistic.interface';
import HighchartsReact from 'highcharts-react-official';
import { List, Rate, Skeleton, Spin, TreeSelect } from 'antd';
import { useFetchListProductQuery } from '../../../store/product/product.service';
import { useListOrderQuery } from '../../../store/order/order.service';
import { useState } from 'react';
import OrderRevanueByWeek from '../statistic/OrderRevanueByWeek';
import OrderRevanueByMonth from '../statistic/OrderRevanueByMonth';
import OrderRevanueByQuarter from '../statistic/OrderRevanueByQuarter';
import OrderStatistic from '../statistic/OrderStatistic';
import ProductStatistic from '../statistic/ProductStatistic';

const DashboardPage = () => {
    const { data: dashboardStatistic, isSuccess } = useGetDashboardStatisticQuery()
    const { data: orderRevanueMonth } = useGetOrderRevenueByMonthQuery()
    const { data: orderRevanueQuarter, } = useGetOrderRevenueByQuarterQuery();
    const { data: orderRevanueWeek } = useGetOrderRevenueByWeekQuery()
    const { data: productRevanue } = useGetProductRevenueQuery();
    const { data: orderRevanue } = useGetOrderRevenueQuery();

    // const { data: listProduct } = useFetchListProductQuery()
    // const { data: listOrder } = useListOrderQuery()
    const [value, setValue] = useState<string>("week");

    const treeData = [
        {
            title: '24 giờ qua',
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
    ];
    if (!isSuccess) {
        return <>
            <div className="flex justify-center items-center h-[600px]">
                <Spin size='large' />
            </div>
        </>;
    }
    // const caculateAvgRevalueByMonth = (data: MonthlyStatistics[]) => {
    //     if (data) {
    //         const total = data.reduce((acc, item) => acc += item.totalRevenue, 0) / 12;
    //         return total.toFixed()
    //     }
    // }

    const columnChartData = [
        {
            name: 'Doanh số',
            y: dashboardStatistic?.revenue,
        },
        {
            name: 'Lợi nhuận',
            y: dashboardStatistic?.profit,
        },
    ];

    const columnChartOptions = {
        chart: {
            type: 'column', // Chọn loại biểu đồ cột
        },
        title: {
            text: 'Doanh số và Lợi nhuận',
        },
        xAxis: {
            categories: ['Doanh số', 'Lợi nhuận'],
        },
        yAxis: {
            title: {
                text: 'Số liệu',
            },
        },
        series: [
            {
                name: 'Số liệu trong 24 giờ',
                data: columnChartData,
            },
        ],
    };
    const onChange = (newValue: string) => {
        // navigate(`/admin/statistic/by_` +newValue)
        setValue(newValue);
    };
    const renderComponent = () => {
        switch (value) {
            case 'week':
                return <OrderRevanueByWeek />;
            case 'month':
                return <OrderRevanueByMonth showTable={false} />;
            case 'quarter':
                return <OrderRevanueByQuarter />;
            case 'product':
                return <ProductStatistic />;
            case 'order':
                return <OrderStatistic />;
            default:
                return <HighchartsReact highcharts={Highcharts} options={columnChartOptions} />
                    ;
        }
    };
    return <>
        <h2 className='text-2xl p-4 font-bold pb-2'>KẾT QUẢ KINH DOANH TRONG NGÀY</h2>
        <p className='text-sm italic px-4'>Trong vòng 24 giờ</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
            <div
                className="bg-violet-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-violet-600 dark:border-gray-600 text-white font-medium group"
            >
                <div
                    className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12"
                >
                    <TeamOutlined className="text-3xl text-violet-500 transform transition-transform duration-500 ease-in-out" />
                </div>
                <div className="text-right">
                    <p className="text-2xl">1,234</p>
                    <p>Lượt truy cập</p>
                </div>
            </div>

            <div
                className="bg-orange-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-orange-600 dark:border-gray-600 text-white font-medium group"
            >
                <div
                    className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12"
                >
                    <SolutionOutlined className='text-orange-500 text-3xl transform transition-transform duration-500 ease-in-out' />
                </div>
                <div className="text-right">
                    <p className="text-2xl">{dashboardStatistic.newOrdersCount}</p>
                    <p>Đơn hàng</p>
                </div>
            </div>

            <div
                className="bg-blue-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group"
            >
                <div
                    className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12"
                >
                    <SkinOutlined className='text-blue-500 text-3xl transform transition-transform duration-500 ease-in-out' />
                </div>
                <div className="text-right">
                    <p className="text-2xl">{dashboardStatistic.bestSellingProduct.reduce((acc, curr) => acc += curr.totalQuantitySold, 0)}</p>
                    <p>Sản phẩm bán được</p>
                </div>
            </div>

            <div
                className="bg-lime-500 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-lime-600 dark:border-gray-600 text-white font-medium group"
            >
                <div
                    className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12"
                >
                    <BarChartOutlined className='text-lime-500 text-3xl transform transition-transform duration-500 ease-in-out' />
                </div>
                <div className="text-right">
                    <p className="text-2xl">
                        {/* {orderRevanueMonth ? caculateAvgRevalueByMonth(orderRevanueMonth)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''}đ */}
                        {dashboardStatistic?.revenue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ
                    </p>
                    <p>Doanh số</p>
                </div>
            </div>

        </div>


        <div className='flex justify-between'>
            <div className='w-2/3'>
                <h3 className='px-4 text-lg font-medium'>Tổng quan báo cáo</h3>
                <label htmlFor="" className='block ml-10 text my-3'>Loại báo cáo:
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
                {renderComponent()}
            </div>
            <div className='w-1/4 flex flex-col'>
                <div className='my-4'>
                    <h3 className='text-2xl font-medium'><InboxOutlined />Sản phẩm bán chạy nhất</h3>
                    {dashboardStatistic.bestSellingProduct && (
                        <div>
                            <p className='my-1 text-md text-md'>Tên sản phẩm: <span className='font-bold'>{dashboardStatistic.bestSellingProduct[0].title}</span></p>
                            <p className='my-1 text-xs'>Số lượng bán: <span className='font-bold'>{dashboardStatistic.bestSellingProduct[0].totalQuantitySold}</span></p>
                        </div>
                    )}
                </div>
                <div>                <h3 className='text-2xl font-medium'>Đánh giá gần đây</h3>

                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={dashboardStatistic?.newReviews}
                        renderItem={(review) => (
                            <List.Item
                                actions={[<a className='text-xs'>Chi tiết</a>]}
                            >
                                <Skeleton avatar title={false} loading={false} active>
                                    <List.Item.Meta
                                        title={<a className='text-xs'>{review.productId?.title}</a>}
                                        description={<span className='text-xs'>{review.comment}</span>}
                                    />
                                    <Rate className='text-xs' disabled defaultValue={review.rating} />
                                </Skeleton>
                            </List.Item>
                        )}
                    /></div>
            </div>
        </div>

    </>

};

export default DashboardPage;