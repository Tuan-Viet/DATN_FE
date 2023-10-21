import { useEffect } from "react";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";

const signup = () => {
    useEffect(() => {
        const buttonSignin = document.querySelector(".buttonSignin")
        const buttonSignup = document.querySelector(".buttonSignup")
        const formSignup = document.querySelector(".formSignup")
        const formSignin = document.querySelector(".formSignin")
        const buttonSignup2 = document.querySelector(".buttonSignup-2")
        const buttonSignin2 = document.querySelector(".buttonSignin-2")
        const buttonSignin3 = document.querySelector(".buttonSignin-3")
        const buttonForgotPass = document.querySelector(".buttonForgotPass")
        const formForgotPass = document.querySelector(".formForgotPass")
        const navigateButtonSignup = () => {
            formSignin?.classList.add("hidden")
            formSignup?.classList.remove("hidden")
            buttonSignin?.classList.remove("text-black")
            buttonSignup?.classList.add("text-black")
        }
        const navigateButtonSignin = () => {
            formSignup?.classList.add("hidden")
            formSignin?.classList.remove("hidden")
            buttonSignup?.classList.remove("text-black")
            buttonSignin?.classList.add("text-black")
        }
        buttonSignin?.addEventListener("click", () => {
            navigateButtonSignin()
            formForgotPass?.classList.add("hidden")
        })
        buttonSignin2?.addEventListener("click", () => {
            navigateButtonSignin()
        })
        buttonSignup?.addEventListener("click", () => {
            navigateButtonSignup()
            formForgotPass?.classList.add("hidden")
        })
        buttonSignup2?.addEventListener("click", () => {
            navigateButtonSignup()
        })
        buttonSignin3?.addEventListener("click", () => {
            navigateButtonSignin()
            formForgotPass?.classList.add("hidden")
        })
        buttonForgotPass?.addEventListener("click", () => {
            formForgotPass?.classList.remove("hidden")
            formSignin?.classList.add("hidden")
            formSignup?.classList.add("hidden")
            buttonSignin?.classList.add("text-black")
            buttonSignup?.classList.remove("text-black")
        })
    }, [])
    return <>
        <Header></Header>
        <div className="w-[630px] py-[60px] mx-auto flex flex-col items-center mb-[55px]">
            <div className="flex text-[24px] font-semibold tracking-wide text-[#CACACA] mb-[45px]">
                <p className="px-[30px] border-r-2 cursor-pointer buttonSignin">Đăng nhập</p>
                <p className="px-[30px] cursor-pointer text-black buttonSignup">Đăng ký</p>
            </div>
            {/* signup */}
            <form className="w-full formSignup" action="">
                <input type="text" placeholder="Họ và tên của bạn ..." className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 mb-[25px] focus:outline-none focus:bg-white " />
                <input type="text" placeholder="Email" className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 mb-[25px] focus:outline-none focus:bg-white " />
                <input type="password" placeholder="Password" className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 mb-[25px] focus:outline-none focus:bg-white " />
                <input type="password" placeholder="ConfirmPassword" className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 mb-[25px] focus:outline-none focus:bg-white " />
                <div className="flex mt-[25px]">
                    <button className="bg-[#333333] px-[28px] py-[12px] text-[#ffffff] rounded-lg uppercase tracking-wide">Đăng Ký</button>
                    <div className="flex flex-col  ml-[30px]">
                        <p className="font-thin opacity-60">Bạn đã có tài khoản?</p>
                        <p className="text-blue-400 italic buttonSignin-2 cursor-pointer opacity-60 hover:opacity-80">Đăng nhập ngay</p>
                    </div>
                </div>
            </form>
            {/* signin */}
            <form className="w-full formSignin hidden" action="">
                <input type="text" placeholder="Vui lòng nhập email của bạn ..." className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 mb-[25px] focus:outline-none focus:bg-white " />
                <input type="password" placeholder="Vui lòng nhập mật khẩu" className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 mb-[25px] focus:outline-none focus:bg-white " />
                <div className="flex mt-[25px]">
                    <button className="bg-[#333333] hover:bg-black transition-all ease-linear px-[28px] py-[12px] text-[#ffffff] rounded-lg uppercase tracking-wide">Đăng Nhập</button>
                    <div className="flex flex-col ml-[30px]">
                        <div className="font-thin flex">
                            <p>Bạn chưa có tài khoản?</p>
                            <p className="text-blue-400 italic ml-1 opacity-60 cursor-pointer hover:opacity-80 buttonSignup-2">Đăng ký</p>
                        </div>
                        <p>Bạn quên mật khẩu?<span className="text-blue-400 italic ml-1 opacity-60 cursor-pointer hover:opacity-80 buttonForgotPass">Quên mật khẩu</span></p>
                    </div>
                </div>
            </form>
            {/* forgot password */}
            <form className="w-full formForgotPass hidden" action="">
                <input type="text" placeholder="Vui lòng nhập email của bạn ..." className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 mb-[25px] focus:outline-none focus:bg-white " />
                <div className="flex mt-[25px]">
                    <button className="bg-[#333333] hover:bg-black transition-all ease-linear px-[28px] py-[12px] text-[#ffffff] rounded-lg uppercase tracking-wide">Gửi email</button>
                    <div className="flex flex-col ml-[30px]">
                        <p>Quay lại?</p>
                        <p className="text-blue-400 italic ml-1 opacity-60 cursor-pointer hover:opacity-80 buttonSignin-3">Đăng Nhập</p>
                    </div>
                </div>
            </form>
        </div>
        <Footer></Footer>
    </>
}
export default signup;