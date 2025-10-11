import React, { useEffect } from "react";
import "./Carts.css";
import { getCartsData } from "../services/api";

function Carts({ cartsData, setCartsData }) {
  useEffect(() => {
    getCartsData()?.then(setCartsData);
  }, []);

  return (
    <>
      <div className="carts-border">
        <div className="container">
          {cartsData?.map((item) => {
            return <div key={item?.id}>{item?.created_at}</div>;
          })}
        </div>
      </div>
    </>
  );
}

export default Carts;
