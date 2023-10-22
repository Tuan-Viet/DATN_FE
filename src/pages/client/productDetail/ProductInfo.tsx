import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetOneProductDetailQuery, useListProductDetailQuery } from "../../../store/productDetail/productDetail.service";
import { useFetchOneProductQuery } from "../../../store/product/product.service";

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentTab, setCurrentTab] = useState(1);
  const renderContent = () => {
    switch (currentTab) {
      case 1:
        return (
          <div className="mb-[40px]">
            <p>
              Áo tanktop nam cá tính, năng động mặc cực thoải mái. Mẫu áo ba lỗ
              nam trẻ trung với 2 màu dễ mặc.
            </p>
          </div>
        );
      case 2:
        return <div className="mb-[40px]">Nội dung của tab 2</div>;
      case 3:
        return (
          <div className="text-sm mb-[40px]">
            <p className="font-bold mb-3">1. CHÍNH SÁCH ÁP DỤNG</p>
            <p className="mb-3 ">Áp dụng từ ngày 01/09/2018.</p>
            <p className="mb-3 ">
              Trong vòng 07 ngày kể từ ngày mua sản phẩm với các sản phẩm
              HUSTLE.
            </p>
            <p className="mb-3 ">
              Áp dụng đối với sản phẩm nguyên giá và sản phẩm giảm giá ít hơn
              50%.
            </p>
            <p className="mb-3 ">
              Sản phẩm nguyên giá chỉ được đổi 01 lần duy nhất sang sản phẩm
              nguyên giá khác và không thấp hơn giá trị sản phẩm đã mua.
            </p>
            <p className="mb-3 ">
              Sản phẩm giảm giá/khuyến mại ít hơn 50% được đổi 01 lần sang màu
              khác hoặc size khác trên cùng 1 mã trong điều kiện còn sản phẩm
              hoặc theo quy chế chương trình (nếu có). Nếu sản phẩm đổi đã hết
              hàng khi đó KH sẽ được đổi sang sản phẩm khác có giá trị ngang
              bằng hoặc cao hơn. Khách hàng sẽ thanh toán phần tiền chênh lệch
              nếu sản phẩm đổi có giá trị cao hơn sản phẩm đã mua.
            </p>
            <p className="mb-3 ">
              Chính sách chỉ áp dụng khi sản phẩm còn hóa đơn mua hàng, còn
              nguyên nhãn mác, thẻ bài đính kèm sản phẩm và sản phẩm không bị dơ
              bẩn, hư hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua sản
              phẩm.
            </p>
            <p className="mb-3 ">
              Sản phẩm đồ lót và phụ kiện không được đổi trả.
            </p>
            <p className="font-bold mb-3 ">2. ĐIỀU KIỆN ĐỔI SẢN PHẨM</p>
            <p className="mb-3 ">
              Đổi hàng trong vòng 07 ngày kể từ ngày khách hàng nhận được sản
              phẩm.
            </p>
            <p className="mb-3 ">
              Sản phẩm còn nguyên tem, mác và chưa qua sử dụng.
            </p>
            <p className="font-bold mb-3 ">3. THỰC HIỆN ĐỔI SẢN PHẨM</p>
            <p className="mb-3 ">
              Quý khách có thể đổi hàng Online tại hệ thống cửa hàng và đại lý
              HUSTLE trên toàn quốc . Lưu ý: vui lòng mang theo sản phẩm và
              phiếu giao hàng.
            </p>
            <p className="mb-3 ">
              Nếu tại khu vực bạn không có cửa hàng HUSTLE hoặc sản phẩm bạn
              muốn đổi thì vui lòng làm theo các bước sau:
            </p>
            <p className="mb-3 ">
              Bước 1: Gọi đến Tổng đài: 0931733469 các ngày trong tuần (trừ ngày
              lễ), cung cấp mã đơn hàng và mã sản phẩm cần đổi.
            </p>
            <p className="mb-3 ">
              Bước 2: Vui lòng gửi hàng đổi về địa chỉ : Kho Online HUSTLE -
              1165 Giải Phóng, Thịnh Liệt, Q. Hoàng Mai, Hà Nội.
            </p>
            <p className="mb-3 ">
              Bước 3: HUSTLE gửi đổi sản phẩm mới khi nhận được hàng. Trong
              trường hợp hết hàng, HUSTLE sẽ liên hệ xác nhận.
            </p>
          </div>
        );
      case 4:
        return (
          <div className="mb-[40px]">
            <h2 className="font-bold text-3xl mb-3">
              BẢO MẬT THÔNG TIN KHÁCH HÀNG HUSTLE
            </h2>
            <div className="text-sm">
              <p className="font-bold mb-3 ">
                1. Thu thập và sử dụng thông tin của TORANO
              </p>
              <p className="mb-3 ">
                TORANO chỉ thu thập các loại thông tin cơ bản liên quan đến đơn
                đặt hàng gồm:……
              </p>
              <p className="mb-3 ">
                Các thông tin này được sử dụng nhằm mục đích xử lý đơn hàng,
                nâng cao chất lượng dịch vụ, nghiên cứu thị trường, các hoạt
                động marketing, chăm sóc khách hàng, quản lý nội bộ hoặc theo
                yêu cầu của pháp luật. Khách hàng tùy từng thời điểm có thể
                chỉnh sửa lại các thông tin đã cung cấp để đảm bảo được hưởng
                đầy đủ các quyền mà TORANO dành cho Khách hàng của mình.
              </p>
              <p className="mb-3 ">TORANO cam kết:</p>
              <p className="mb-3 ">
                Thông tin cá nhân của khách hàng được sử dụng đúng vào mục đích
                của việc thu thập và cung cấp;
              </p>
              <p className="mb-3 ">
                Mọi việc thu thập và sử dụng thông tin đã thu thập được của
                Khách hàng đều được thông qua ý kiến của Khách hàng
              </p>
              <p className="mb-3 ">
                Chỉ sử dụng các thông tin được Khách hàng đã cung cấp cho
                TORANO, không sử dụng các thông tin của Khách hàng được biết đến
                theo các phương thức khác;
              </p>
              <p className="mb-3 ">Thời gian lưu trữ và bảo mật thông tin:</p>
              <p className="mb-3 ">
                Chỉ cho phép các đối tượng sau được tiếp cận với thông tin của
                Khách hàng:
              </p>
              <p className="mb-3 ">
                Người thực hiện việc cung cấp hàng hóa, dịch vụ từ TORANO theo
                yêu cầu của Khách hàng;
              </p>
              <p className="mb-3 ">
                Người thực hiện việc chăm sóc Khách hàng đã sử dụng hàng hóa,
                dịch vụ của TORANO;
              </p>
              <p className="mb-3 ">
                Người tiếp nhận và xử lý các thắc mắc của Khách hàng trong quá
                trình sử dụng hàng hóa, dịch vụ của TORANO;
              </p>
              <p className="mb-3 ">Cơ quan Nhà nước có thẩm quyền</p>
              <p className="mb-3 ">
                Trong quá trình chào hàng, quảng cáo và chăm sóc Khách hàng,
                Khách hàng hoàn toàn có thể gửi yêu cầu dừng việc sử dụng thông
                tin theo cách thức tương ứng mà hoạt động chào hàng, quảng cáo
                và chăm sóc khách hàng gửi tới Khách hàng.
              </p>
              <p className="font-bold mb-3 ">
                2. Cách thức bảo mật thông tin khách hàng:
              </p>
              <p className="mb-3 ">
                Việc bảo mật các thông tin do Khách hàng cung cấp được dựa trên
                sự đảm bảo việc tuân thủ của từng cán bộ, nhân viên TORANO, đối
                tác và hệ thống lưu trữ dữ liệu. Trong trường hợp máy chủ lưu
                trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân
                Khách hàng, TORANO sẽ có trách nhiệm thông báo vụ việc cho cơ
                quan chức năng điều tra xử lý kịp thời và thông báo cho Khách
                hàng được biết. Tuy nhiên, do đặc điểm của môi trường internet,
                không một dữ liệu nào trên môi trường mạng cũng có thể được bảo
                mật 100%. Vì vậy, TORANO không cam kết chắc chắn rằng các thông
                tin tiếp nhận từ Khách hàng được bảo mật tuyệt đối.
              </p>
              <p className="font-bold mb-3 ">
                3. Trách nhiệm bảo mật thông tin Khách hàng
              </p>
              <p className="mb-3 ">
                Khách hàng vui lòng chỉ cung cấp đúng và đủ các thông tin theo
                yêu cầu của TORANO đặc biệt tránh cung cấp các thông tin liên
                quan đến tài khoản ngân hàng khi chưa được mã hóa thông tin
                trong các giao dịch thanh toán trực tuyến hoặc các thông tin
                nhạy cảm khác. Khách hàng hoàn toàn chịu trách nhiệm về tính
                trung thực và chính xác đối với các thông tin đã cung cấp cũng
                như tự chịu trách nhiệm nếu cung cấp các thông tin ngoài yêu
                cầu.
              </p>
              <p className="mb-3 ">
                Trong trường hợp Khách hàng cung cấp thông tin cá nhân của mình
                cho nhiều tổ chức, cá nhân khác nhau, Khách hàng phải yêu cầu
                các bên liên quan cùng bảo mật. Mọi thông tin cá nhân của Khách
                hàng khi bị tiết lộ gây thiệt hại đến Khách hàng, Khách hàng
                phải tự xác định được nguồn tiết lộ thông tin. TORANO không chịu
                trách nhiệm khi thông tin Khách hàng bị tiết lộ mà không có căn
                cứ xác đáng thể hiện TORANO là bên tiết lộ thông tin.
              </p>
              <p className="mb-3 ">
                TORANO không chịu trách nhiệm về việc tiết lộ thông tin của
                Khách hàng nếu Khách hàng không tuân thủ các yêu cầu trên.
              </p>
              <p className="font-bold mb-3 ">
                4. Luật áp dụng khi xảy ra tranh chấp
              </p>
              <p className="mb-3 ">
                Mọi tranh chấp xảy ra giữa Khách hàng và TORANO sẽ được hòa
                giải. Nếu hòa giải không thành sẽ được giải quyết tại Tòa án có
                thẩm quyền và tuân theo pháp luật Việt Nam.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  // fetch ProductDetail
  const { id } = useParams()
  // const { data: getOneProductDetail, isSuccess: isSuccessProductDetail } = useGetOneProductDetailQuery(id)
  if (id) {
    const { data } = useFetchOneProductQuery(id)
    const getOneProduct = data?.data
    return (
      <div className="max-w-[1500px] mx-auto mb-[70px]">
        <div className="flex gap-x-7 mb-10">
          <div className="w-[433px]">
            <div className="product-detail-thumbnail w-[433px] mb-[10px]">
              <Swiper
                modules={[Navigation, Autoplay]}
                grabCursor={"true"}
                spaceBetween={30}
                slidesPerView={"auto"}
                navigation={true}
                autoplay={{ delay: 3000 }}
              >
                <SwiperSlide>
                  <div className="">
                    <img
                      src="/images/img-product/esta010-1_ad9f734ad81a4f339a557960d10dd7f5_master.png"
                      className="h-[555px] object-cover"
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            {/* list anh */}
            <div className="flex justify-between">
              <img
                src="/images/img-product/esta010-1_ad9f734ad81a4f339a557960d10dd7f5_master.png"
                alt=""
                className="w-[61.83px] h-[79.13px]"
              />
              <img
                src="/images/img-product/esta010-2_8a537af4aa4444c0aa99eeaca96547da_master.png"
                alt=""
                className="w-[61.83px] h-[79.13px]"
              />
              <img
                src="/images/img-product/esta010-1_ad9f734ad81a4f339a557960d10dd7f5_master.png"
                alt=""
                className="w-[61.83px] h-[79.13px]"
              />
              <img
                src="/images/img-product/esta010-2_8a537af4aa4444c0aa99eeaca96547da_master.png"
                alt=""
                className="w-[61.83px] h-[79.13px]"
              />
              <img
                src="/images/img-product/esta010-1_ad9f734ad81a4f339a557960d10dd7f5_master.png"
                alt=""
                className="w-[61.83px] h-[79.13px]"
              />
              <img
                src="/images/img-product/esta010-2_8a537af4aa4444c0aa99eeaca96547da_master.png"
                alt=""
                className="w-[61.83px] h-[79.13px]"
              />
            </div>
          </div>
          <div className="product-info">
            <div className="mb-10">
              <h1 className="text-[26px] font-bold mb-2">
                {getOneProduct?.title}
              </h1>
              <div className="flex gap-x-5 text-sm">
                <span>
                  Mã sản phẩm: <b>ESTA01012CT06MB_NV-S</b>
                </span>
                <span>
                  Tình trạng: <b>Còn hàng</b>
                </span>
                <span>
                  Thương hiệu: <b className="uppercase">HUSTLE</b>
                </span>
              </div>
            </div>
            <form>
              <div className="px-4">
                <div className="flex items-center gap-x-[109px] py-4 mb-2">
                  <span className="text-sm font-bold">Giá:</span>
                  <span className="font-bold text-xl text-[#FF2C26]">
                    {getOneProduct?.discount.toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex items-center gap-x-[75.71px] py-4 mb-2">
                  <span className="text-sm font-bold">Màu sắc:</span>
                  <select
                    id="countries"
                    className="bg-gray-50 outline-none border border-gray-300 text-gray-900 w-2/4 text-sm rounded block p-2.5"
                  >
                    <option selected>Chọn màu</option>
                    <option value="Xanh navy">Xanh navy</option>
                    <option value="Trắng - kem đậm">Trắng - kem đậm</option>
                  </select>
                </div>
                <div className="flex items-center gap-x-[60.81px] py-4 mb-2">
                  <span className="text-sm font-bold">Kích thước:</span>
                  <select
                    id="countries"
                    className="bg-gray-50 outline-none border border-gray-300 text-gray-900 w-2/4 text-sm rounded block p-2.5"
                  >
                    <option selected>Chọn size</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                <div className="flex items-center gap-x-[71.75px] py-4 mb-2">
                  <span className="text-sm font-bold">Số lượng:</span>
                  <div>
                    <label htmlFor="Quantity" className="sr-only">
                      {" "}
                      Quantity{" "}
                    </label>

                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={decreaseQuantity}
                        type="button"
                        className="w-10 h-10 leading-10 text-gray-700 transition hover:opacity-75"
                      >
                        &minus;
                      </button>

                      <input
                        type="number"
                        id="Quantity"
                        value={quantity}
                        className="outline-none font-semibold h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      />

                      <button
                        onClick={increaseQuantity}
                        type="button"
                        className="w-10 h-10 leading-10 text-gray-700 transition hover:opacity-75"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-7">
                <div className="flex gap-x-[15px] mb-5">
                  <button className="w-[336px] text-[#E70505] border uppercase h-[50px] rounded font-semibold hover:text-white hover:bg-[#E70505] transition-all border-[#E70505]">
                    Thêm vào giỏ
                  </button>
                  <button className="w-[336px] border h-[50px] rounded font-semibold uppercase text-white bg-[#E70505] border-[#E70505] transition-all">
                    Mua ngay
                  </button>
                </div>
                <button className="w-[687px] border h-[52px] text-sm hover:bg-black rounded font-semibold text-white uppercase bg-[#333] transition-all">
                  Click vào đây để nhận ưu đãi
                </button>
              </div>
            </form>
            <div className="policy flex justify-between gap-x-[13px]">
              <div>
                <div className="flex items-center gap-x-[10px] mb-4">
                  <img
                    src="/images/icon/product_info1_desc1_img.png"
                    className="w-[30px] h-[30px]"
                    alt=""
                  />
                  <span className="text-sm">
                    Miễn phí giao hàng cho đơn hàng từ 500K
                  </span>
                </div>
                <div className="flex items-center gap-x-[10px] mb-4">
                  <img
                    src="/images/icon/product_info2_desc1_img.png"
                    className="w-[30px] h-[30px]"
                    alt=""
                  />
                  <span className="text-sm">
                    ĐỔI SẢN PHẨM DỄ DÀNG (Trong vòng 7 ngày khi còn nguyên tem
                    mác)
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-x-[10px] mb-4">
                  <img
                    src="/images/icon/product_info1_desc2_img.png"
                    className="w-[30px] h-[30px]"
                    alt=""
                  />
                  <span className="text-sm">Hàng phân phối chính hãng 100%</span>
                </div>
                <div className="flex items-center gap-x-[10px] mb-4">
                  <img
                    src="/images/icon/product_info2_desc2_img.png"
                    className="w-[30px] h-[30px]"
                    alt=""
                  />
                  <span className="text-sm">
                    Kiểm tra, thanh toán khi nhận hàng COD
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-x-[10px] mb-4">
                  <img
                    src="/images/icon/product_info1_desc3_img.png"
                    className="w-[30px] h-[30px]"
                    alt=""
                  />
                  <span className="text-sm">TỔNG ĐÀI 24/7 : 0964942121</span>
                </div>
                <div className="flex items-center gap-x-[10px] mb-4">
                  <img
                    src="/images/icon/product_info2_desc3_img.png"
                    className="w-[30px] h-[30px]"
                    alt=""
                  />
                  <span className="text-sm">
                    Kiểm tra, thanh toán khi nhận hàng COD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="product-tabs flex gap-x-[60px]">
            <div>
              <button
                className={`${currentTab === 1
                  ? "border-b-2 border-black text-black"
                  : "text-[#b3b3b3]"
                  } text-lg font-semibold pb-2`}
                onClick={() => setCurrentTab(1)}
              >
                Mô tả sản phẩm
              </button>
            </div>
            <div>
              <button
                className={`${currentTab === 2
                  ? "border-b-2 border-black text-black"
                  : "text-[#b3b3b3]"
                  } text-lg font-semibold pb-2`}
                onClick={() => setCurrentTab(2)}
              >
                Đánh giá - Nhận xét từ khách hàng
              </button>
            </div>
            <div>
              <button
                className={`${currentTab === 3
                  ? "border-b-2 border-black text-black"
                  : "text-[#b3b3b3]"
                  } text-lg font-semibold pb-2`}
                onClick={() => setCurrentTab(3)}
              >
                Chính sách đổi trả
              </button>
            </div>
            <div>
              <button
                className={`${currentTab === 4
                  ? "border-b-2 border-black text-black"
                  : "text-[#b3b3b3]"
                  } text-lg font-semibold pb-2`}
                onClick={() => setCurrentTab(4)}
              >
                Chính sách bảo mật
              </button>
            </div>
          </div>
          <div className="mt-[40px]">{renderContent()}</div>
        </div>
        <div>
          <h1 className="text-[37px] font-semibold mb-[30px] text-center uppercase">
            Sản phẩm liên quan
          </h1>
          <div className="product-related mb-12">
            <Swiper
              modules={[Navigation]}
              grabCursor={"true"}
              spaceBetween={25}
              slidesPerView={"auto"}
              navigation={true}
            >
              <SwiperSlide>
                <div className="relative group">
                  <Link to="">
                    <img
                      src="/images/img-product/home_category_1_img.png"
                      className="mx-auto h-[351px] w-full"
                      alt=""
                    />
                  </Link>
                  <div className="product-info p-[8px] bg-white">
                    <div className="text-sm flex justify-between mb-3">
                      <span>+3 Màu sắc</span>
                      <span>+4 Kích thước</span>
                    </div>
                    <Link to="" className="font-medium">
                      Áo khoác gió 1 lớp mũ liền EWCW007
                    </Link>
                    <div className="price flex gap-x-[8px] items-baseline">
                      <span className="text-sm text-[#FF2C26] font-semibold">
                        299,000₫
                      </span>
                      <span className="text-[13px] text-[#878C8F]">
                        <del>500,000₫</del>
                      </span>
                    </div>
                  </div>
                  <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
                    -40%
                  </span>
                  <Link
                    to=""
                    className="rounded-lg opacity-0 absolute bottom-[140px] left-2/4 -translate-x-2/4 bg-white flex gap-x-[5px] items-center p-3 w-[175px] justify-center group-hover:opacity-100 hover:bg-black hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <span className="uppercase text-xs font-semibold">
                      Thêm vào giỏ
                    </span>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative group">
                  <Link to="">
                    <img
                      src="/images/img-product/home_category_1_img.png"
                      className="mx-auto h-[351px] w-full"
                      alt=""
                    />
                  </Link>
                  <div className="product-info p-[8px] bg-white">
                    <div className="text-sm flex justify-between mb-3">
                      <span>+3 Màu sắc</span>
                      <span>+4 Kích thước</span>
                    </div>
                    <Link to="" className="font-medium">
                      Áo khoác gió 1 lớp mũ liền EWCW007
                    </Link>
                    <div className="price flex gap-x-[8px] items-baseline">
                      <span className="text-sm text-[#FF2C26] font-semibold">
                        299,000₫
                      </span>
                      <span className="text-[13px] text-[#878C8F]">
                        <del>500,000₫</del>
                      </span>
                    </div>
                  </div>
                  <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
                    -40%
                  </span>
                  <Link
                    to=""
                    className="rounded-lg opacity-0 absolute bottom-[140px] left-2/4 -translate-x-2/4 bg-white flex gap-x-[5px] items-center p-3 w-[175px] justify-center group-hover:opacity-100 hover:bg-black hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <span className="uppercase text-xs font-semibold">
                      Thêm vào giỏ
                    </span>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative group">
                  <Link to="">
                    <img
                      src="/images/img-product/home_category_1_img.png"
                      className="mx-auto h-[351px] w-full"
                      alt=""
                    />
                  </Link>
                  <div className="product-info p-[8px] bg-white">
                    <div className="text-sm flex justify-between mb-3">
                      <span>+3 Màu sắc</span>
                      <span>+4 Kích thước</span>
                    </div>
                    <Link to="" className="font-medium">
                      Áo khoác gió 1 lớp mũ liền EWCW007
                    </Link>
                    <div className="price flex gap-x-[8px] items-baseline">
                      <span className="text-sm text-[#FF2C26] font-semibold">
                        299,000₫
                      </span>
                      <span className="text-[13px] text-[#878C8F]">
                        <del>500,000₫</del>
                      </span>
                    </div>
                  </div>
                  <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
                    -40%
                  </span>
                  <Link
                    to=""
                    className="rounded-lg opacity-0 absolute bottom-[140px] left-2/4 -translate-x-2/4 bg-white flex gap-x-[5px] items-center p-3 w-[175px] justify-center group-hover:opacity-100 hover:bg-black hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <span className="uppercase text-xs font-semibold">
                      Thêm vào giỏ
                    </span>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative group">
                  <Link to="">
                    <img
                      src="/images/img-product/home_category_1_img.png"
                      className="mx-auto h-[351px] w-full"
                      alt=""
                    />
                  </Link>
                  <div className="product-info p-[8px] bg-white">
                    <div className="text-sm flex justify-between mb-3">
                      <span>+3 Màu sắc</span>
                      <span>+4 Kích thước</span>
                    </div>
                    <Link to="" className="font-medium">
                      Áo khoác gió 1 lớp mũ liền EWCW007
                    </Link>
                    <div className="price flex gap-x-[8px] items-baseline">
                      <span className="text-sm text-[#FF2C26] font-semibold">
                        299,000₫
                      </span>
                      <span className="text-[13px] text-[#878C8F]">
                        <del>500,000₫</del>
                      </span>
                    </div>
                  </div>
                  <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
                    -40%
                  </span>
                  <Link
                    to=""
                    className="rounded-lg opacity-0 absolute bottom-[140px] left-2/4 -translate-x-2/4 bg-white flex gap-x-[5px] items-center p-3 w-[175px] justify-center group-hover:opacity-100 hover:bg-black hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <span className="uppercase text-xs font-semibold">
                      Thêm vào giỏ
                    </span>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative group">
                  <Link to="">
                    <img
                      src="/images/img-product/home_category_1_img.png"
                      className="mx-auto h-[351px] w-full"
                      alt=""
                    />
                  </Link>
                  <div className="product-info p-[8px] bg-white">
                    <div className="text-sm flex justify-between mb-3">
                      <span>+3 Màu sắc</span>
                      <span>+4 Kích thước</span>
                    </div>
                    <Link to="" className="font-medium">
                      Áo khoác gió 1 lớp mũ liền EWCW007
                    </Link>
                    <div className="price flex gap-x-[8px] items-baseline">
                      <span className="text-sm text-[#FF2C26] font-semibold">
                        299,000₫
                      </span>
                      <span className="text-[13px] text-[#878C8F]">
                        <del>500,000₫</del>
                      </span>
                    </div>
                  </div>
                  <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
                    -40%
                  </span>
                  <Link
                    to=""
                    className="rounded-lg opacity-0 absolute bottom-[140px] left-2/4 -translate-x-2/4 bg-white flex gap-x-[5px] items-center p-3 w-[175px] justify-center group-hover:opacity-100 hover:bg-black hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <span className="uppercase text-xs font-semibold">
                      Thêm vào giỏ
                    </span>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative group">
                  <Link to="">
                    <img
                      src="/images/img-product/home_category_1_img.png"
                      className="mx-auto h-[351px] w-full"
                      alt=""
                    />
                  </Link>
                  <div className="product-info p-[8px] bg-white">
                    <div className="text-sm flex justify-between mb-3">
                      <span>+3 Màu sắc</span>
                      <span>+4 Kích thước</span>
                    </div>
                    <Link to="" className="font-medium">
                      Áo khoác gió 1 lớp mũ liền EWCW008
                    </Link>
                    <div className="price flex gap-x-[8px] items-baseline">
                      <span className="text-sm text-[#FF2C26] font-semibold">
                        299,000₫
                      </span>
                      <span className="text-[13px] text-[#878C8F]">
                        <del>500,000₫</del>
                      </span>
                    </div>
                  </div>
                  <span className="width-[52px] absolute top-3 left-3 height-[22px] rounded-full px-3 py-[3px] text-xs font-semibold text-white bg-[#FF0000]">
                    -40%
                  </span>
                  <Link
                    to=""
                    className="rounded-lg opacity-0 absolute bottom-[140px] left-2/4 -translate-x-2/4 bg-white flex gap-x-[5px] items-center p-3 w-[175px] justify-center group-hover:opacity-100 hover:bg-black hover:text-white transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <span className="uppercase text-xs font-semibold">
                      Thêm vào giỏ
                    </span>
                  </Link>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    );

  }
};

export default ProductInfo;
