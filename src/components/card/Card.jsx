import React, { useEffect, useState } from "react";
import { getToken } from "../../pages/services/token";
import { baseUrl } from "../../pages/services/config";
import { Link, useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { getCartId, getCartsData } from "../../pages/services/api";

function Card({ item }) {
  const navigate = useNavigate();

  const [cartIds, setCartIds] = useState(null);

  useEffect(() => {
    getCartId()?.then(setCartIds);
  }, []);

  return (
    <>
      <div key={item?.id} className="box">
        <Link className="box-send" to={`/productDetail/${item?.id}`}>
          {item?.discount_percentage > 0 && (
            <div className="prsent">-{item?.discount_percentage}%</div>
          )}
          <div className="box-img">
            <img src={`${baseUrl}/${item?.image}`} alt="box for img" />
          </div>
          <div className="contents">
            <h2>
              {item?.title.length > 20
                ? item.title.slice(0, 18) + "..."
                : item?.title}
            </h2>
            <h3>
              Brand: <span>{item?.brand}</span>
            </h3>
            <h3 className="prices-alls">
              Narxi: <span> {item?.price}$</span>
              <span>{item?.discount_price}$</span>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  getCartsData(item?.id);
                }}
                className="buyBtn"
              >
                <IoCart />
              </div>
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
    </>
  );
}

export default Card;
