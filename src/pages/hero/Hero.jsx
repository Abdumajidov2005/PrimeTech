import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { getAnnouncement } from "../services/api";
import { baseUrl } from "../services/config";

function Hero() {
  const [anons, setAnons] = useState([]);

  useEffect(() => {
    getAnnouncement().then(setAnons);
  }, []);

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
            {anons?.map((item) => {
              return (
                <SwiperSlide>
                  <div className="hero-component">
                    <div className="hero-info">
                      <h1>{item?.title}</h1>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: item?.description || "",
                        }}
                      />
                    </div>
                    <div></div>
                    <div className="hero-img">
                      <img src={`${item?.image}`} alt="" />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Hero;
