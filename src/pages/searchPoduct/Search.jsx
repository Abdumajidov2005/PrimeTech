import React, { useEffect, useState } from "react";
import "./Search.css"
import { getSearchData } from "../services/api";
import Card from "../../components/card/Card";

function Search({searchProductName}) {
  const [find, setFind] = useState([]);
  useEffect(() => {
    getSearchData(searchProductName).then(setFind);
  }, [searchProductName]);

  return (
    <>
      <div className="search-products">
        <div className="container">
          <div className="box-model">
            {find?.map((item) => {
              return <Card key={item?.id} item={item}/>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
