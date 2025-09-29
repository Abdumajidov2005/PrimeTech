import { useEffect, useState } from "react";
import { getToken } from "../services/token";
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import { getProductDetail } from "../services/api";

function ProductDetail() {
  const { id } = useParams();
  const [selectDetail, setSelectDetail] = useState(null);
  const [selectImg, setSelectImg] = useState("");

  useEffect(() => {
    getProductDetail(id)?.then(setSelectDetail);
  }, [id]);

  return (
    <>
      <div className="product-detail">
        <div className="container">
          <p className="go-back">
            <Link to={"/"}>Asosiy sahifa </Link>
            <span>/</span>
            <span>Mahsulot tafsilotlari </span>
            <span>/</span>
            <span>{selectDetail?.title}</span>
          </p>
          <div className="product-main-details">
            <div className="detail-picture">
              <div className="main-picture">
                <img
                  src={selectImg ? selectImg : selectDetail?.image}
                  alt="Elelktronikani rasmi bor edi"
                />
              </div>
              <div className="picture-panels">
                {selectDetail?.images?.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        setSelectImg(item?.image);
                      }}
                      key={item?.id}
                      className="picture-pick"
                    >
                      <img src={item?.image} alt="Maxsulot rasmi bor edi" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="detail-information">
              <h2>
                Nomi : <span>{selectDetail?.title}</span>
              </h2>
              <h2>
                Firmasi: <span>{selectDetail?.brand}</span>
              </h2>
              {selectDetail?.discount_percentage > 0 && (
                <h2>
                  Chegirmasi :<span>-{selectDetail?.discount_percentage}%</span>
                </h2>
              )}
              <h2 className="prices">
                Narxi : <span>{selectDetail?.price}$</span>{" "}
                <span>{selectDetail?.discount_price}$</span>
              </h2>
              <p>
                <span>Maxsulot tavsifi : </span>
                {selectDetail?.description.split("\r\n").map((line, idx) => (
                  <span style={{ color: "GrayText" }} key={idx}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <div className="detail-buy">
                <a
                  href={
                    getToken()
                      ? "https://t.me/PrimeTechUz_admin"
                      : "/ro'yxatdan o'tish"
                  }
                  rel="noopener noreferrer"
                  className="btn"
                >
                  sotib olish
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
