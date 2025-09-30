import React, { useEffect, useState } from "react";
import "./Search.css";
import { getSearchData } from "../services/api";
import Card from "../../components/card/Card";

function Search({ searchProductName }) {
  const [find, setFind] = useState([]);
  const [findMotion, setFindMotion] = useState(false);
  useEffect(() => {
    setFindMotion(true);
    getSearchData(searchProductName)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFind(data);
        } else {
          setFind([]);
        }
      })
      .finally(() => {
        setFindMotion(false);
      });
  }, [searchProductName]);

  return (
    <>
      <div className="search-products">
        <div className="container">
          <div className="box-model">
            <div className="box-borders">
              <div className="box-skeleton darkener"></div>
              <div className="box-skeleton darkener"></div>
              <div className="box-skeleton darkener"></div>
              <div className="box-skeleton darkener"></div>
            </div>
            {find?.map((item) => {
              return <Card key={item?.id} item={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
