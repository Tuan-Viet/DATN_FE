import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {


    // hàm dropdownUser
    const handleDropdown = () => {
        const iconUser = document.querySelector(".icon-user")
        const dropdown = document.querySelector(".dropdown-user")
        const hiddenUser = document.querySelector(".dropdown-user.hidden")
        const overlay = document.querySelector(".overlay-dropdownUser")
        const isSelected = document.querySelector(".isSelected")
        const signinDropdown = document.querySelector(".signinDropdown")

        isSelected?.classList.remove("translate-x-0")
        isSelected?.classList.add("translate-x-[150%]")
        signinDropdown?.classList.remove("translate-x-[-150%]")
        if (dropdown?.classList.contains("opacity-0")) {
            dropdown?.classList.remove("opacity-0")
            dropdown?.classList.remove("pointer-events-none")
            overlay?.classList.remove("hidden")
        } else {
            dropdown?.classList.add("pointer-events-none")
            dropdown?.classList.add("opacity-0")
            overlay?.classList.add("hidden")
        }
        overlay?.addEventListener("click", () => {
            dropdown?.classList.add("pointer-events-none")
            dropdown?.classList.add("opacity-0")
            overlay.classList.add("hidden")
        })
    }
    const forgotPassword = () => {
        const isSelected = document.querySelector(".isSelected")
        const signinDropdown = document.querySelector(".signinDropdown")
        isSelected?.classList.add("translate-x-0")
        isSelected?.classList.remove("translate-x-[150%]")
        signinDropdown?.classList.add("translate-x-[-150%]")
    }
    const backSigninDropdown = () => {
        const isSelected = document.querySelector(".isSelected")
        const signinDropdown = document.querySelector(".signinDropdown")
        isSelected?.classList.remove("translate-x-0")
        isSelected?.classList.add("translate-x-[150%]")
        signinDropdown?.classList.remove("translate-x-[-150%]")
    }
    // overlay-cart
    useEffect(() => {
        const overlayCart = document.querySelector(".overlay-cart")
        const iconOutCart = document.querySelector(".icon-outCart")
        const overlay = document.querySelector(".overlay")
        const iconCart = document.querySelector(".icon-cart")
        const closeDropdownUser = () => {
            const overlayDropdownUser = document.querySelector(".overlay-dropdownUser")
            const dropdown = document.querySelector(".dropdown-user")
            if (!overlayDropdownUser?.classList.contains("hidden")) {
                overlayDropdownUser?.classList.add("hidden")
                dropdown?.classList.add("pointer-events-none")
            }
        }
        iconCart?.addEventListener("click", () => {
            overlay?.classList.remove("hidden")
            overlayCart?.classList.remove("translate-x-[100%]", "opacity-0")
            const dropdown = document.querySelector(".dropdown-user")
            if (!dropdown?.classList.contains("opacity-0")) {
                dropdown?.classList.add("opacity-0")
                dropdown?.classList.add("pointer-events-none")

            }
        })
        iconOutCart?.addEventListener("click", () => {
            overlay?.classList.add("hidden")
            overlayCart?.classList.add("translate-x-[100%]", "opacity-0")
            closeDropdownUser()
        })
        overlay?.addEventListener("click", () => {
            overlay?.classList.add("hidden")
            overlayCart?.classList.add("translate-x-[100%]", "opacity-0")
            closeDropdownUser()
        })
        overlayCart?.addEventListener("click", (e) => {
            e.stopPropagation()
        })
    }, [])
    return (
        <>
            <div className='sticky top-0 bg-white z-[99]'>
                <div className='bg-[#242021] h-[36px] left-0 right-0'>
                    <div className="container text-white h-full flex justify-between items-center">
                        <p className='text-[13px]'>Hotline mua hàng:    <strong><Link to="">0967584597</Link></strong>   (9:00-21:00, Tất cả hàng tuần)      <span className='mx-[10px]'>|</span>    <Link to="">Liên hệ</Link></p>
                        <div className="flex">
                            <div className="relative mr-[5px]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                                </svg>
                                <p className='px-[4px] w-[14px] h-[14px] flex items-center justify-center bg-red-600 rounded-full absolute bottom-0 right-[-2px] top-[-5px] text-[10px]'>1</p>
                            </div>
                            <p>Thông báo của tôi</p>
                        </div>
                    </div>
                </div>
                <div className="border-b-2">
                    <div className="h-[73px] flex justify-between container">
                        {/* logo */}
                        <div className="h-[73px] flex items-center">
                            <Link to="/">
                                <img src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=173" className='w-[220px] h-[53px]' alt="" />
                            </Link>
                        </div>
                        {/* menu */}
                        <ul className='flex font-semibold text-[#666666]  tracking-wide'>
                            <li className='mx-[15px] cursor-pointer leading-[73px]'>Sale</li>
                            <li className='mx-[15px] cursor-pointer flex items-center group leading-[73px] static'>
                                <a href="">Áo nam</a>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mx-[4px] group-hover:rotate-180 transition-all ease-linear">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                                <div className='dropdown absolute left-0 border-2 right-0 top-[150px] opacity-0 group-hover:opacity-100 group-hover:top-[100px] transition-all ease-in-out bg-white w-full pointer-events-none group-hover:pointer-events-auto py-[25px] leading-7 px-[50px] border-t-2 flex'>
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
                                <div className='dropdown absolute left-0 border-2 right-0 top-[150px] opacity-0 group-hover:opacity-100 group-hover:top-[100px] transition-all ease-linear bg-white w-full pointer-events-none group-hover:pointer-events-auto py-[25px] leading-7 z-50 px-[50px] border-t-2 flex'>
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
                                <div className="dropdown absolute  top-[150px] border-2 opacity-0 group-hover:opacity-100 group-hover:top-[100%] transition-all ease-linear bg-white w-[200px] pointer-events-none group-hover:pointer-events-auto py-4 leading-7 z-50 px-[20px] border-t-2 flex">
                                    <p className='font-normal cursor-pointer'>Áo khoác gió</p>
                                </div>
                            </li>
                            <li className='mx-[15px] leading-[73px]'><Link to="">Hệ thống cửa hàng</Link></li>
                        </ul>
                        {/* icon */}
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[32px] h-[26px] mr-[15px] cursor-pointer">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                            {/* icon user */}
                            <div className="relative">
                                <svg onClick={handleDropdown} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[32px] h-[26px] mr-[15px] cursor-pointer icon-user">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                                <div className="w-[350px] h-[400px] top-[190%] right-[-23px] py-[15px] px-[20px] absolute z-50 bg-white shadow-inner tracking-wide before:content-[''] before:absolute before:top-0 before:right-[3rem] before:border-l-[12px]  before:border-r-[10px] before:border-t-[10px] before:border-b-[10px] before:border-l-white before:border-r-white before:border-b-white before:translate-y-[-100%] before:rotate-[180deg] dropdown-user opacity-0 transition-all ease-in-out pointer-events-none cursor-pointer overflow-x-hidden">
                                    <div className="relative">
                                        {/* singin */}
                                        <div className="flex flex-col transition-all ease-in-out signinDropdown absolute left-0 right-0  items-center">
                                            <h1 className='uppercase text-[18px] text-[#333333]'>Đăng nhập tài khoản</h1>
                                            <p className='text-[#666666]'>Nhập email và mật khẩu của bạn</p>
                                            <hr className='my-4 w-full' />
                                            <input type="text" className='py-2 px-2 w-full border-2 focus:outline-none mt-3' placeholder='Email' />
                                            <input type="text" className='py-2 px-2 w-full border-2 focus:outline-none mt-3' placeholder='Mật khẩu' />
                                            <button className='w-full text-white bg-[#333333] hover:bg-[#000000] transition-all ease-linear uppercase text-[14px] py-3 px-3 mt-8 rounded-lg'>Đăng nhập</button>
                                            <div className="flex text-[#666666] w-full text-[12px] justify-between mt-8">
                                                <p>Bạn đã có tài khoản chưa?</p>
                                                <Link to='/signup' className='hover:text-black'>Tạo tài khoản</Link>
                                            </div>
                                            <div className="flex text-[#666666] w-full text-[12px] justify-between mt-2">
                                                <p>Quên mật khẩu?</p>
                                                <button onClick={forgotPassword} className='hover:text-black'>Khôi phục mật khẩu</button>
                                            </div>
                                        </div>
                                        {/* khôi phục mật khẩu */}
                                        <div className="flex flex-col transition-all ease-in-out isSelected absolute left-0 right-0 translate-x-[150%] items-center">
                                            <h1 className='uppercase text-[18px] text-[#333333]'>Khôi phục mật khẩu</h1>
                                            <p className='text-[#666666]'>Nhập email của bạn</p>
                                            <hr className='my-4 w-full' />
                                            <input type="text" className='py-2 px-2 w-full border-2 focus:outline-none mt-3' placeholder='Email' />
                                            <button className='w-full text-white bg-[#333333] hover:bg-[#000000] transition-all ease-linear uppercase text-[14px] py-3 px-3 mt-8 rounded-lg'>Khôi phục</button>
                                            <div className="flex text-[#666666] w-full text-[12px] justify-between mt-2">
                                                <p>Bạn đã nhớ mật khẩu?</p>
                                                <button onClick={backSigninDropdown} className='hover:text-black'>Trở về đăng nhập</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="left-0 right-0 bottom-0 absolute hidden overlay-dropdownUser bg-[#666666] opacity-30 w-full h-[100vh] top-[100%]"></div>
                            {/* icon cart */}
                            <div className="relative icon-cart cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[32px] h-[26px] cursor-pointer">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <span className='w-[20px] flex items-center justify-center rounded-[50%] bg-red-600 text-white absolute top-[-5px] right-[-5px]'>1</span>
                            </div>

                        </div>
                    </div>
                </div>
                {/* overlay-cart */}
                <div className='fixed overlay transition-all ease-linear hidden top-0 right-0 bottom-0 left-0  bg-[rgba(57,56,56,0.2)]'>
                </div>
                {/* cart */}
                <div className="fixed top-0 opacity-0 translate-x-[100%] transition-all ease-linear overlay-cart bg-white right-0 min-w-[480px] h-full py-[20px] px-[15px] flex flex-col justify-between">
                    {/* list product */}
                    <div className="">
                        <h1 className='font-bold tracking-wide text-[20px] mb-[10px]'>Giỏ hàng</h1>
                        <h1 className="tracking-wide py-[10px] text-sm">Bạn cần mua thêm <strong className="text-red-400">50.000đ</strong> để có thể <strong className="uppercase">miễn phí vận chuyển</strong></h1>
                        <hr className='my-[20px]' />
                        <div className="overflow-y-scroll h-[450px]">
                            <div className="justify-between mb-6 rounded-lg border-2 bg-white p-6 max-h-[140px] shadow-md sm:flex sm:justify-start relative">
                                <img src="https://product.hstatic.net/200000690725/product/estp041-3_83014782b53841358a80703e3de20b49_medium.jpg" alt="product-image" className="w-[80px] rounded-lg sm:w-[80px] h-[90px]" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        {/* name */}
                                        <h2 className="text-lg font-bold text-gray-900">Áo Polo trơn hiệu ứng ESTP041</h2>
                                        {/* color and size */}
                                        <p className="mt-1 text-xs text-gray-700">Trắng - kem đậm / S</p>
                                        {/* price product */}
                                        <p className="mt-1 text-[14px] text-[#8f9bb3] font-semibold tracking-wide">400.000đ</p>
                                    </div>
                                    <div className="absolute right-[10px] top-[10px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block">
                                        <div className="flex items-center">
                                            <p className="font-bold tracking-wide text-[15px]">400.000đ</p>
                                        </div>
                                        <div className="flex items-center border-gray-100">
                                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                            <input className="appearance-none h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="justify-between mb-6 rounded-lg border-2 bg-white p-6 max-h-[140px] shadow-md sm:flex sm:justify-start relative">
                                <img src="https://product.hstatic.net/200000690725/product/estp041-3_83014782b53841358a80703e3de20b49_medium.jpg" alt="product-image" className="w-[80px] rounded-lg sm:w-[80px] h-[90px]" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        {/* name */}
                                        <h2 className="text-lg font-bold text-gray-900">Áo Polo trơn hiệu ứng ESTP041</h2>
                                        {/* color and size */}
                                        <p className="mt-1 text-xs text-gray-700">Trắng - kem đậm / S</p>
                                        {/* price product */}
                                        <p className="mt-1 text-[14px] text-[#8f9bb3] font-semibold tracking-wide">400.000đ</p>
                                    </div>
                                    <div className="absolute right-[10px] top-[10px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block">
                                        <div className="flex items-center">
                                            <p className="font-bold tracking-wide text-[15px]">400.000đ</p>
                                        </div>
                                        <div className="flex items-center border-gray-100">
                                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                            <input className="appearance-none h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="justify-between mb-6 rounded-lg border-2 bg-white p-6 max-h-[140px] shadow-md sm:flex sm:justify-start relative">
                                <img src="https://product.hstatic.net/200000690725/product/estp041-3_83014782b53841358a80703e3de20b49_medium.jpg" alt="product-image" className="w-[80px] rounded-lg sm:w-[80px] h-[90px]" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        {/* name */}
                                        <h2 className="text-lg font-bold text-gray-900">Áo Polo trơn hiệu ứng ESTP041</h2>
                                        {/* color and size */}
                                        <p className="mt-1 text-xs text-gray-700">Trắng - kem đậm / S</p>
                                        {/* price product */}
                                        <p className="mt-1 text-[14px] text-[#8f9bb3] font-semibold tracking-wide">400.000đ</p>
                                    </div>
                                    <div className="absolute right-[10px] top-[10px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block">
                                        <div className="flex items-center">
                                            <p className="font-bold tracking-wide text-[15px]">400.000đ</p>
                                        </div>
                                        <div className="flex items-center border-gray-100">
                                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                            <input className="appearance-none h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="justify-between mb-6 rounded-lg border-2 bg-white p-6 max-h-[140px] shadow-md sm:flex sm:justify-start relative">
                                <img src="https://product.hstatic.net/200000690725/product/estp041-3_83014782b53841358a80703e3de20b49_medium.jpg" alt="product-image" className="w-[80px] rounded-lg sm:w-[80px] h-[90px]" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        {/* name */}
                                        <h2 className="text-lg font-bold text-gray-900">Áo Polo trơn hiệu ứng ESTP041</h2>
                                        {/* color and size */}
                                        <p className="mt-1 text-xs text-gray-700">Trắng - kem đậm / S</p>
                                        {/* price product */}
                                        <p className="mt-1 text-[14px] text-[#8f9bb3] font-semibold tracking-wide">400.000đ</p>
                                    </div>
                                    <div className="absolute right-[10px] top-[10px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block">
                                        <div className="flex items-center">
                                            <p className="font-bold tracking-wide text-[15px]">400.000đ</p>
                                        </div>
                                        <div className="flex items-center border-gray-100">
                                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                            <input className="appearance-none h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* pay */}
                    <div className="mt-6  w-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-full">
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Tổng tiền:</p>
                            <div className="">
                                <p className="mb-1 text-[20px] font-bold text-red-500 tracking-wide">400.000đ</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-[10px]">
                            <button className="mt-6 w-full uppercase rounded-md bg-red-500 py-1.5 font-medium text-red-50 hover:bg-red-600">Thanh toán</button>
                            <button className="mt-6 w-full uppercase rounded-md bg-red-500 py-1.5 font-medium text-red-50 hover:bg-red-600"><Link to="/cart">Xem giỏ hàng</Link></button>
                        </div>
                    </div>
                    <div className="absolute right-[10px] top-[10px] icon-outCart">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-7 w-7 cursor-pointer duration-150 hover:text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Header
