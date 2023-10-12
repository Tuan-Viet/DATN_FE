import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='sticky top-0 bg-white'>
            <div className='bg-[#242021] h-[36px] left-0 right-0'>
                <div className="container text-white h-full flex justify-between items-center">
                    <p className='text-[13px]'>Hotline mua hàng:    <strong><Link to="">0967584597</Link></strong>   (9:00-21:00, Tất cả hàng tuần)      <span className='mx-[10px]'>|</span>    <Link to="">Liên hệ</Link></p>
                    <div className="flex">
                        <div className="relative mr-[5px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                            <p className='px-[4px] h-[14px] flex items-center justify-center bg-red-600 rounded-[50%] absolute bottom-0 right-[-2px] top-[-5px] text-[10px]'>1</p>
                        </div>
                        <p>Thông báo của tôi</p>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="h-[73px] flex justify-between container">
                    {/* logo */}
                    <div className="h-[73px] flex items-center">
                        <img src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=173" className='w-[220px] h-[53px]' alt="" />
                    </div>
                    {/* menu */}
                    <ul className='flex font-semibold tracking-wide'>
                        <li className='mx-[15px] leading-[73px]'><Link to="">Sale</Link></li>
                        <li className='mx-[15px] flex items-center group leading-[73px] static'>
                            <Link to="">Áo nam</Link>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mx-[4px] group-hover:rotate-180 transition-all ease-linear">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            <div className='dropdown absolute left-0 right-0 top-[150px] opacity-0 group-hover:opacity-100 group-hover:top-[100px] transition-all ease-in-out bg-white w-full pointer-events-none group-hover:pointer-events-auto py-[25px] leading-7 z-50 px-[50px] border-t-2 flex'>
                                <div className="w-[65%] tracking-wide">
                                    <div className="grid grid-cols-4">
                                        <div className="flex flex-col">
                                            <Link to="" className='font-bold'>Áo polo</Link>
                                            <div className="flex flex-col font-normal text-[14px] mt-[5px] text-[#666666]">
                                                <li className='hover:text-black'><Link to="">Polo trơn</Link></li>
                                                <li className='hover:text-black'><Link to="">Polo họa tiết</Link></li>
                                                <li className='hover:text-black'><Link to="">Polo bo kẻ</Link></li>
                                                <li className='hover:text-black'><Link to="">Polo can phối</Link></li>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Link to="" className='font-bold'>Áo thun</Link>
                                            <div className="flex flex-col font-normal text-[14px] mt-[5px] text-[#666666]">
                                                <li className="hover:text-black"><Link to="">Áo thun in hình</Link></li>
                                                <li className="hover:text-black"><Link to="">Áo tank top</Link></li>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Link to="" className='font-bold'>Sơ mi ngắn tay</Link>
                                            <div className="flex flex-col font-normal text-[14px] mt-[5px] text-[#666666]">
                                                <li className="hover:text-black"><Link to="">Sơ mi tay trơn</Link></li>
                                                <li className="hover:text-black"><Link to="">Sơ mi họa tiết</Link></li>
                                                <li className="hover:text-black"><Link to="">Sơ mi tay kẻ</Link></li>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Link to="" className='font-bold'>Sơ mi dài tay</Link>
                                            <div className="flex flex-col font-normal text-[14px] mt-[5px] text-[#666666]">
                                                <li className="hover:text-black"><Link to="">Sơ mi dài tay dạ</Link></li>
                                                <li className="hover:text-black"><Link to="">Sơ mi dài tay họa tiết</Link></li>
                                                <li className="hover:text-black"><Link to="">Sơ mi dài tay kẻ</Link></li>
                                                <li className="hover:text-black"><Link to="">Sơ mi dài tay trơn</Link></li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to="" className="w-[35%]">
                                    <img className='w-full' src="../../public/images/imgs-menu/mega_menu_3_img.jpg" alt="" />
                                </Link>
                            </div>
                        </li>
                        <li className='mx-[15px] flex items-center group leading-[73px]'><Link to="">Quần nam</Link>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mx-[4px] group-hover:rotate-180 transition-all ease-linear">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            <div className='dropdown absolute left-0 right-0 top-[150px] opacity-0 group-hover:opacity-100 group-hover:top-[100px] transition-all ease-linear bg-white w-full pointer-events-none group-hover:pointer-events-auto py-[25px] leading-7 z-50 px-[50px] border-t-2 flex'>
                                <div className="w-[65%] tracking-wide">
                                    <div className="grid grid-cols-4">
                                        <div className="flex flex-col">
                                            <Link to="" className='font-bold'>Quần dài kaki</Link>
                                            <div className="flex flex-col font-normal text-[14px] mt-[5px] text-[#666666]">
                                                <li className='hover:text-black'><Link to="">Quần dài kaki basic</Link></li>
                                                <li className='hover:text-black'><Link to="">Quần kaki phối thun cạp</Link></li>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Link to="" className='font-bold'>Quần âu</Link>
                                            <div className="flex flex-col font-normal text-[14px] mt-[5px] text-[#666666]">
                                                <li className="hover:text-black"><Link to="">Quần âu basic</Link></li>
                                                <li className="hover:text-black"><Link to="">Quần âu phối thun cạp</Link></li>
                                                <li className="hover:text-black"><Link to="">Quần âu LV</Link></li>
                                                <li className="hover:text-black"><Link to="">Quần âu carrot</Link></li>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Link to="" className='font-bold'>Quần jeans</Link>
                                            <div className="flex flex-col font-normal text-[14px] mt-[5px] text-[#666666]">
                                                <li className="hover:text-black"><Link to="">Quần jeans basic</Link></li>
                                                <li className="hover:text-black"><Link to="">Quần jeans rách</Link></li>
                                                <li className="hover:text-black"><Link to="">Quần jeans xước</Link></li>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Link to="" className='font-bold'>Quần short</Link>
                                            <div className="flex flex-col font-normal text-[14px] mt-[5px] text-[#666666]">
                                                <li className="hover:text-black"><Link to="">Short kaki</Link></li>
                                                <li className="hover:text-black"><Link to="">Short đũi</Link></li>
                                                <li className="hover:text-black"><Link to="">Short gió</Link></li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link to="" className="w-[35%]">
                                    <img className='w-full' src="../../public/images/imgs-menu/mega_menu_2_img.jpg" alt="" />
                                </Link>
                            </div>
                        </li>
                        <li className='mx-[15px] group flex items-center leading-[73px] relative'><Link to="">Hàng đông</Link>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mx-[4px] group-hover:rotate-180 transition-all ease-linear">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            <div className="dropdown absolute  top-[150px] opacity-0 group-hover:opacity-100 group-hover:top-[100%] transition-all ease-linear bg-white w-[200px] pointer-events-none group-hover:pointer-events-auto py-4 leading-7 z-50 px-[20px] border-t-2 flex">
                                <Link to="" className='font-normal'>Áo khoác gió</Link>
                            </div>
                        </li>
                        <li className='mx-[15px] leading-[73px]'><Link to="">Hệ thống cửa hàng</Link></li>
                    </ul>
                    <div className="flex items-center">
                        <Link to="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[32px] h-[26px] mr-[15px] cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </Link>
                        <Link to="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[32px] h-[26px] mr-[15px]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </Link>
                        <Link to="" className="relative">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[32px] h-[26px]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <span className='w-[20px] flex items-center justify-center rounded-[50%] bg-red-600 text-white absolute top-[-5px] right-[-5px]'>1</span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header
