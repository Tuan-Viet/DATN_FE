import {
    TeamOutlined,
    SolutionOutlined,
    SkinOutlined,
    BarChartOutlined
} from '@ant-design/icons';

const dashboardPage = () => {
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
                className="bg-yellow-300 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-yellow-600 dark:border-gray-600 text-white font-medium group"
            >
                <div
                    className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12"
                >
                    <BarChartOutlined className='text-yellow-500 text-3xl transform transition-transform duration-500 ease-in-out' />
                </div>
                <div className="text-right">
                    <p className="text-2xl">75,257,000</p>
                    <p>Doanh số / tháng</p>
                </div>
            </div>
        </div>

        {/*  Chart  */}
        <div className="flex flex-col justify-center py-20 px-10 text-gray-700 bg-gray-100">
            <div className="flex flex-col items-center mx-auto w-full max-w-screen-md p-6 pb-6 bg-white rounded-lg shadow-xl sm:p-8">
                <h2 className="text-xl font-bold">Doanh thu hàng tháng</h2>
                <span className="text-sm font-semibold text-gray-500">2023</span>
                <div className="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3">
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">37,500,000</span>
                        <div className="relative flex justify-center w-full h-8 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-6 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full h-16 bg-indigo-400"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 1</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">45,000,000</span>
                        <div className="relative flex justify-center w-full h-10 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-6 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full h-20 bg-indigo-400"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 2</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">47,500,000</span>
                        <div className="relative flex justify-center w-full h-10 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-8 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full h-20 bg-indigo-400"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 3</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">50,000,000</span>
                        <div className="relative flex justify-center w-full h-10 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-6 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full h-24 bg-indigo-400"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 4</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">47,500,000</span>
                        <div className="relative flex justify-center w-full h-10 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-8 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full h-20 bg-indigo-400"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 5</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">55,986,000</span>
                        <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-8 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full h-24 bg-indigo-400"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 6</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">66,212,100</span>
                        <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-16 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full h-20 bg-indigo-400"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 7</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">57,500,900</span>
                        <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-10 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full h-24 bg-indigo-400"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 8</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">67,520,500</span>
                        <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-10 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full h-32 bg-indigo-400"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 9</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">65,000,800</span>
                        <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-12 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full bg-indigo-400 h-28"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 10</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">70,060,300</span>
                        <div className="relative flex justify-center w-full h-8 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-8 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full h-40 bg-indigo-400"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 11</span>
                    </div>
                    <div className="relative flex flex-col items-center flex-grow pb-5 group">
                        <span className="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">75,100,600</span>
                        <div className="relative flex justify-center w-full h-12 bg-indigo-200"></div>
                        <div className="relative flex justify-center w-full h-8 bg-indigo-300"></div>
                        <div className="relative flex justify-center w-full h-40 bg-indigo-400"></div>
                        <span className="absolute bottom-0 text-xs font-bold">Th. 12</span>
                    </div>
                </div>
                <div className="flex w-full mt-3">
                    <div className="flex items-center ml-auto">
                        <span className="block w-4 h-4 bg-indigo-400"></span>
                        <span className="ml-1 text-xs font-medium">Existing</span>
                    </div>
                    <div className="flex items-center ml-4">
                        <span className="block w-4 h-4 bg-indigo-300"></span>
                        <span className="ml-1 text-xs font-medium">Upgrades</span>
                    </div>
                    <div className="flex items-center ml-4">
                        <span className="block w-4 h-4 bg-indigo-200"></span>
                        <span className="ml-1 text-xs font-medium">New</span>
                    </div>
                </div>
            </div>
        </div>
    </>

};

export default dashboardPage;