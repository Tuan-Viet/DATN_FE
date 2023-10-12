import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const Banner = () => {
    return (
        <>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                className='w-full h-[650px] -z-10'
            >
                <SwiperSlide className='w-[500px]'>
                    <img className='w-full h-full object-cover' src="//theme.hstatic.net/200000690725/1001078549/14/slide_2_img.jpg?v=173" alt="" />
                </SwiperSlide>
                <SwiperSlide className='w-[500px]'>
                    <img className='w-full h-full object-cover' src="//theme.hstatic.net/200000690725/1001078549/14/slide_3_img.jpg?v=173" alt="" />
                </SwiperSlide>
                <SwiperSlide className='w-[500px]'>
                    <img className='w-full h-full object-cover' src="https://theme.hstatic.net/200000690725/1001078549/14/slide_4_img.jpg?v=173" alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default Banner
