import React, { useEffect, useState } from "react";
import "./Abouts.css";
import DOMPurify from "dompurify";
import { getAboutData } from "../services/api";

function Abouts() {
  const [aboutGr, setAboutGr] = useState([]);

  useEffect(() => {
    getAboutData()?.then(setAboutGr);
  }, []);

  const cleanDescription = DOMPurify.sanitize(aboutGr?.description || "", {
    FORBID_ATTR: ["style"], // style attribute’larini olib tashlaydi
  });

  return (
    <>
      <div className="about">
        <div className="container">
          <h1>{aboutGr?.title}</h1>
          <div
            className="about-page"
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
          />

          {/* <img src={aboutGr?.image} alt="" /> */}
          {/* <div>
            {aboutGr?.images?.map((item) => {
              return <img src={item?.image} alt="" />;
            })}
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Abouts;
