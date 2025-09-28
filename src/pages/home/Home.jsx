import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Hero from "../hero/Hero";
import {
  getCategoyData,
  getProductData,
} from "../services/api";
import Card from "../../components/card/Card";

function Home({category, setCategory}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProductData()?.then(setData);
    getCategoyData()?.then(setCategory);
  }, []);

  return (
    <>
      <Hero />

      <div className="main-page">
        <div className="container">
          <div className="category">
            {category?.map((item) => {
              return (
                <Link to={`/categoryFilter/${item?.id}`} key={item?.id}>
                  {item?.title}
                  <span>{item?.description}</span>
                </Link>
              );
            })}
          </div>
          <div className="block-content">
            <div className="box-model">
              {data?.map((item) => {
                return <Card key={item?.id} item={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
