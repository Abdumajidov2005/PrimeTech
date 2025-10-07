import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { getAnnouncement } from "../services/api";
import { Link } from "react-router-dom";

function Hero() {
  const [anons, setAnons] = useState([]);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    setMotion(true);
    getAnnouncement()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAnons(data);
        } else {
          setAnons([]);
        }
      })
      .finally(() => {
        setMotion(false);
      });
  }, []);

  return (
    <>
      <div className="hero">
        <div className="container">
          {motion || anons.length === 0 ? (
            <div className="hero-skeleton_border darkener"></div>
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
                    <Link key={item?.id} to={`/annocumentDetails/${item?.id}`} className="hero-component">
                      <div className="hero-info">
                        <h1>{item?.title}</h1>

                        {/* <div
                          dangerouslySetInnerHTML={{
                            __html: item?.description || "",
                          }}
                        /> */}
                        <div className="hero-info_imgs">
                          {item?.images?.map((item) => {
                            return (
                              <div key={item?.id} className="imgs_selections">
                                <img src={item?.image} alt="" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div></div>
                      <div className="hero-img">
                        <img src={`${item?.image}`} alt="" />
                      </div>
                    </Link>
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
