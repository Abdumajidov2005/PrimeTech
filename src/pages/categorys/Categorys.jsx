import React, { useEffect, useState } from "react";
import "./Categorys.css";
import Card from "../../components/card/Card";
import { getFilterCategoryData } from "../services/api";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

function Categorys() {
  const { id } = useParams();
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [loaderCateg, setLoaderCateg] = useState(false);

  useEffect(() => {
    setLoaderCateg(true);
    getFilterCategoryData(id)
      .then(setCategoryFilter)
      .finally(() => {
        setLoaderCateg(false);
      });
  }, [id]);

  return (
    <>
      <div className="categorys">
        <div className="container">
          <div className="get-back">
            <Link to={"/"}>
              <FaArrowLeftLong /> Asosiy sahifa
            </Link>
          </div>
          <div className="box-model">
            {loaderCateg || categoryFilter === 0 ? (
              <div className="box-borders">
                <div className="box-skeleton darkener"></div>
                <div className="box-skeleton darkener"></div>
                <div className="box-skeleton darkener"></div>
                <div className="box-skeleton darkener"></div>
              </div>
            ) : (
              categoryFilter?.map((item) => {
                return <Card key={item?.id} item={item} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Categorys;
