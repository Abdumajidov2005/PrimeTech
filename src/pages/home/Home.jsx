import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link, useParams } from "react-router-dom";
import Hero from "../hero/Hero";
import {
  getCategoyData,
  getFilterCategoryData,
  getProductData,
} from "../services/api";
import { baseUrl } from "../services/config";
import { getToken } from "../services/token";

function Home() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    getProductData()?.then(setData);
    getCategoyData()?.then(setCategory);
    getFilterCategoryData(id)?.then(setCategoryFilter);
  }, [id]);

  return (
    <>
      <Hero />

      <div className="main-page">
        <div className="container">
          <div className="category">
            {category?.map((item) => {
              return (
                <p
                  onClick={() => {
                    setCategoryFilter(item?.id);
                  }}
                  key={item?.id}
                >
                  {item?.title}
                  <span>{item?.description}</span>
                </p>
              );
            })}
          </div>
          <div className="block-content">
            <div className="box-model">
              {data?.map((item) => {
                return (
                  <div key={item?.id} className="box">
                    <Link
                      className="box-send"
                      to={`/productDetail/${item?.id}`}
                    >
                      <div className="prsent">
                        -{item?.discount_percentage}%
                      </div>
                      <div className="box-img">
                        <img
                          src={`${baseUrl}/${item?.image}`}
                          alt="box uchun rasm"
                        />
                      </div>
                      <div className="contents">
                        <h2>
                          {item?.title.length > 20
                            ? item.title.slice(0, 20) + "..."
                            : item?.title}
                        </h2>
                        <h3>
                          Price: <span> {item?.price}$</span>{" "}
                          <span>{item?.discount_price}$</span>
                        </h3>
                      </div>
                    </Link>
                    <p className="btn-borders">
                      <a
                        href={
                          getToken()
                            ? "https://t.me/PrimeTechUz_admin"
                            : "/ro'yxatdan o'tish"
                        }
                        rel="noopener noreferrer"
                        className="btn"
                      >
                        Sotib olish
                      </a>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
