import React from "react";
import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Hero() {
  return (
    <>
      <div className="hero">
        <div className="container">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="hero-component"></div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero-component"></div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero-component"></div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero-component"></div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero-component"></div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="hero-component"></div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Hero;
