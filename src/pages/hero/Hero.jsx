import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { getAnnouncement } from "../services/api";

function Hero() {
  const [anons, setAnons] = useState([]);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    setMotion(true);
    getAnnouncement()
      .then((data) => {
        setAnons(data);
      })
      .finally(() => {
        setMotion(false);
      });
  }, []);

  return (
    <>
      <div className="hero">
        <div className="container">
          {motion ? (
            <div className="hero-skeleton_border"></div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}

export default Hero;
