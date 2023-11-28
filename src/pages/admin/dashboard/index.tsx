import {
    TeamOutlined,
    SolutionOutlined,
    SkinOutlined,
    BarChartOutlined
} from '@ant-design/icons';
import { useGetOrderRevenueByMonthQuery } from '../../../store/statistic/statistic.service';
import Highcharts from 'highcharts';
import { MonthlyStatistics } from '../../../store/statistic/statistic.interface';
import HighchartsReact from 'highcharts-react-official';

const DashboardPage = () => {
    const { data: orderRevanueMonth, isSuccess: isSuccessGetRevanueMonth } = useGetOrderRevenueByMonthQuery()
    let filledData: MonthlyStatistics[] = [];
    const caculateAvgRevalueByMonth = (data: MonthlyStatistics[])=>{
        if(data){
            const total = data.reduce((acc,item)=> acc+= item.totalRevenue,0)/12;
            return total.toFixed()
        }
    }
    const generateAllMonths = () => {
        const allMonths = [];
        const currentDate = new Date();
        for (let i = 0; i < 12; i++) {
            const month = currentDate.getMonth() - i;
            const year = currentDate.getFullYear();
            allMonths.unshift(`${year}-${String(month + 1).padStart(2, '0')}`);
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

    return <>
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
                    <p className="text-2xl">557</p>
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
                    <p className="text-2xl">236</p>
                    <p>Sản phẩm</p>
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
                    <p className="text-2xl">{orderRevanueMonth?caculateAvgRevalueByMonth(orderRevanueMonth)?.toLocaleString("vi-VN"):''}đ</p>
                    <p>Doanh số / tháng</p>
                </div>
            </div>
        </div>


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
        />

    </>

};

export default DashboardPage;