import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../layout/Footer";
import Header from "../../../layout/Header";
import { useEffect } from "react";
import { Form } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { register } from "../../../store/user/userSlice";

type FormDataType = {
  email: string;
  password: string;
};

const signin = () => {
  useEffect(() => {
    const buttonSignin = document.querySelector(".buttonSignin");
    const formSignin = document.querySelector(".formSignin");
    const buttonSignin3 = document.querySelector(".buttonSignin-3");
    const buttonForgotPass = document.querySelector(".buttonForgotPass");
    const formForgotPass = document.querySelector(".formForgotPass");
    const navigateButtonSignin = () => {
      formSignin?.classList.remove("hidden");
      buttonSignin?.classList.add("text-black");
    };
    buttonForgotPass?.addEventListener("click", () => {
      formForgotPass?.classList.remove("hidden");
      formSignin?.classList.add("hidden");
      buttonSignin?.classList.add("text-black");
    });
    buttonSignin3?.addEventListener("click", () => {
      navigateButtonSignin();
      formForgotPass?.classList.add("hidden");
    });
  }, []);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handSubmitSignin = async (data: FormDataType) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        data
      );
      toast.success("Đăng nhập thành công");
      dispatch(
        register({
          isLoggedIn: true,
          token: response?.data?.accessToken,
          userData: response?.data?.user,
        })
      );
      if (response?.data?.user?.role == "user") {
        navigate("/");
      } else if (response?.data?.user?.role == "admin") {
        navigate("/admin");
      }
    } catch (error: any) {
      if (error.response) {
        const serverErrorMessage = error.response.data.messages;
        toast.error(`Đăng nhập thất bại: ${serverErrorMessage}`);
      } else {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);
  return (
    <>
      <Header></Header>
      <div className="w-[630px] py-[60px] mx-auto flex flex-col items-center mb-[55px]">
        <div className="flex text-[24px] font-semibold tracking-wide text-[#CACACA] mb-[45px]">
          <Link
            to="/signin"
            className="px-[30px] border-r-2 text-black cursor-pointer buttonSignin"
          >
            Đăng nhập
          </Link>
          <Link to="/signup" className="px-[30px] cursor-pointer buttonSignup">
            Đăng ký
          </Link>
        </div>
        <Form
          form={form}
          onFinish={handSubmitSignin}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          style={{ maxWidth: 600 }}
          className="w-full formSignin"
          scrollToFirstError
        >
          <Form.Item
            name="email"
            className="mb-7"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ",
              },
              {
                required: true,
                message: "Vui lòng nhập email",
              },
            ]}
          >
            <input
              type="text"
              placeholder="E-mail"
              className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 focus:outline-none focus:bg-white "
            />
          </Form.Item>
          <Form.Item
            name="password"
            className="mb-7"
            rules={[
              {
                required: true,
                message: "Vui lòng nhâp mật khẩu",
              },
              {
                min: 6,
                message: "Mật khẩu tối thiểu 6 kí tự",
              },
            ]}
          >
            <input
              type="password"
              placeholder="Password"
              className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 focus:outline-none focus:bg-white "
            />
          </Form.Item>
          <Form.Item>
            <div className="flex mt-[25px]">
              <button className="bg-[#333333] hover:bg-black transition-all ease-linear px-[28px] py-[12px] text-[#ffffff] rounded-lg uppercase tracking-wide">
                Đăng Nhập
              </button>
              <div className="flex flex-col ml-[30px]">
                <div className="font-thin flex">
                  <p>Bạn chưa có tài khoản?</p>
                  <Link
                    to="/signup"
                    className="text-blue-400 italic ml-1 opacity-60 cursor-pointer hover:opacity-80 buttonSignup-2"
                  >
                    Đăng ký
                  </Link>
                </div>
                <p>
                  Bạn quên mật khẩu?
                  <span className="text-blue-400 italic ml-1 opacity-60 cursor-pointer hover:opacity-80 buttonForgotPass">
                    Quên mật khẩu
                  </span>
                </p>
              </div>
            </div>
          </Form.Item>
        </Form>
        {/* <form className="w-full formSignin" action="">
          <input
            type="text"
            placeholder="Vui lòng nhập email của bạn ..."
            className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 mb-[25px] focus:outline-none focus:bg-white "
          />
          <input
            type="password"
            placeholder="Vui lòng nhập mật khẩu"
            className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 mb-[25px] focus:outline-none focus:bg-white "
          />
          <div className="flex mt-[25px]">
            <button className="bg-[#333333] hover:bg-black transition-all ease-linear px-[28px] py-[12px] text-[#ffffff] rounded-lg uppercase tracking-wide">
              Đăng Nhập
            </button>
            <div className="flex flex-col ml-[30px]">
              <div className="font-thin flex">
                <p>Bạn chưa có tài khoản?</p>
                <Link
                  to="/signup"
                  className="text-blue-400 italic ml-1 opacity-60 cursor-pointer hover:opacity-80 buttonSignup-2"
                >
                  Đăng ký
                </Link>
              </div>
              <p>
                Bạn quên mật khẩu?
                <span className="text-blue-400 italic ml-1 opacity-60 cursor-pointer hover:opacity-80 buttonForgotPass">
                  Quên mật khẩu
                </span>
              </p>
            </div>
          </div>
        </form> */}
        {/* forgot password */}
        <form className="w-full formForgotPass hidden" action="">
          <input
            type="text"
            placeholder="Vui lòng nhập email của bạn ..."
            className="w-full border-[1px] bg-[#EDEDED] text-[#5c5c5c] italic tracking-wide px-4 py-4 mb-[25px] focus:outline-none focus:bg-white "
          />
          <div className="flex mt-[25px]">
            <button className="bg-[#333333] hover:bg-black transition-all ease-linear px-[28px] py-[12px] text-[#ffffff] rounded-lg uppercase tracking-wide">
              Gửi email
            </button>
            <div className="flex flex-col ml-[30px]">
              <p>Quay lại?</p>
              <p className="text-blue-400 italic ml-1 opacity-60 cursor-pointer hover:opacity-80 buttonSignin-3">
                Đăng Nhập
              </p>
            </div>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
};
export default signin;
