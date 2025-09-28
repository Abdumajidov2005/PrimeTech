import React from "react";
import { getToken } from "../../pages/services/token";
import { baseUrl } from "../../pages/services/config";
import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <>
      <div key={item?.id} className="box">
        <Link className="box-send" to={`/productDetail/${item?.id}`}>
          {
            item?.discount_percentage > 0 && <div className="prsent">-{item?.discount_percentage}%</div>
          }
          <div className="box-img">
            <img src={`${baseUrl}/${item?.image}`} alt="box uchun rasm" />
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
            <h3>
              Price: <span> {item?.price}$</span>
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
    </>
  );
}

export default Card;
