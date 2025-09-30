import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Hero from "../hero/Hero";
import { getCategoyData, getProductData } from "../services/api";
import Card from "../../components/card/Card";

function Home({ category, setCategory }) {
  const [data, setData] = useState([]);
  const [categoryMotion, setCategoryMotion] = useState(false);
  const [dataMotion, setDataMotion] = useState(false);

  useEffect(() => {
    setCategoryMotion(true);
    setDataMotion(true);
    getProductData()?.then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        setData(data);
      } else {
        setData([]);
      }
    });
    getCategoyData()
      ?.then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategory(data);
        } else {
          setCategory([]);
        }
      })
      .finally(() => {
        setCategoryMotion(false);
        setDataMotion(false);
      });
  }, []);

  return (
    <>
      <Hero />

      <div className="main-page">
        <div className="container">
          <div className="category">
            {categoryMotion || category.length === 0 ? (
              <div className="skeleton_border">
                <div className="category-skeleton darkener"></div>
                <div className="category-skeleton darkener"></div>
                <div className="category-skeleton darkener"></div>
                <div className="category-skeleton darkener"></div>
                <div className="category-skeleton darkener"></div>
              </div>
            ) : (
              category?.map((item) => {
                return (
                  <Link to={`/categoryFilter/${item?.id}`} key={item?.id}>
                    {item?.title}
                    <span>{item?.description}</span>
                  </Link>
                );
              })
            )}
          </div>
          <div className="block-content">
            <div className="box-model">
              {dataMotion || data.length === 0 ? (
                <div className="box-borders">
                  <div className="box-skeleton darkener"></div>
                  <div className="box-skeleton darkener"></div>
                  <div className="box-skeleton darkener"></div>
                  <div className="box-skeleton darkener"></div>
                </div>
              ) : (
                data?.map((item) => {
                  return <Card key={item?.id} item={item} />;
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
