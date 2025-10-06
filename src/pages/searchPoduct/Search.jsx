import React, { useEffect, useState } from "react";
import "./Search.css";
import { getSearchData } from "../services/api";
import Card from "../../components/card/Card";

function Search({ searchProductName, setSearchProductName }) {
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
            {findMotion ? (
              <div className="box-borders">
                <div className="box-skeleton darkener"></div>
                <div className="box-skeleton darkener"></div>
                <div className="box-skeleton darkener"></div>
                <div className="box-skeleton darkener"></div>
              </div>
            ) : find.length === 0 ? (
              <div className="notResult">
                <div className="search_icons">
                  <span></span>
                  <span></span>
                  <p>
                    Afsuski maxsulotlar topilmadi
                    Iltimos qaytadan harakat qilib ko'ring
                  </p>
                  <button onClick={()=>{
                    setSearchProductName("")
                  }}>
                     Tozalash
                  </button>
                </div>
              </div>
            ) : (
              find?.map((item) => {
                return <Card key={item?.id} item={item} />;
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
