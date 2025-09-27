import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { FaShoppingCart, FaUser, FaUserEdit } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoMdSunny } from "react-icons/io";
import { BsMoonStarsFill } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

function Navbar({ theme, setTheme, userToken, setUserToken }) {
  const navigate = useNavigate();
  const [searchPhone, setSearchPhone] = useState(false);
  const [modal, setModal] = useState(false);

  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // agar na panel, na button bosilmasa -> yopiladi
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setModal]);

  return (
    <>
      <div className="navbar">
        <div className="container">
          <Link to={"/"} className="logo">
            <div className="logo-img">
              <img src="/imgs/primetech.jpg" alt="prime tech logo" />
            </div>
            <h1>PRIME TECH</h1>
          </Link>
          <div className="search">
            <input type="text" placeholder="Maxsulotni kiriting..." />
            <label htmlFor="">
              <FiSearch />
            </label>
          </div>
          <div className="icons">
            <p
              onClick={() => {
                setSearchPhone((prev) => !prev);
              }}
              className="search-phone"
            >
              <FiSearch />
            </p>
            <NavLink className="signing" to={"/ro'yxatdan o'tish"}>
              Ro'yxatdan o'tish
            </NavLink>
            <div
              onClick={() => {
                if (theme == false) {
                  setTheme(true);
                } else {
                  setTheme(false);
                }
              }}
              className="change-mode"
            >
              <h5 className="mode">
                {theme ? (
                  <span className="sun">
                    <IoMdSunny />
                  </span>
                ) : (
                  <span className="moon">
                    <BsMoonStarsFill />
                  </span>
                )}
              </h5>
              <h4>{theme ? "light" : "dark"}</h4>
            </div>

            <p>
              <FaShoppingCart />
            </p>

            {userToken ? (
              <p
                ref={buttonRef}
                onClick={() => {
                  setModal(!modal);
                }}
              >
                <FaUser />
              </p>
            ) : (
              ""
            )}
            <div
              ref={panelRef}
              className={`navbar-modal ${modal ? "wiev" : ""}`}
            >
              <div className="navbar-modal-content">
                <h1>Shaxsiy kabinet</h1>
                <h5>
                  <FaUserEdit /> Profilni tahrirlash
                </h5>
                <h5
                  onClick={() => {
                    localStorage.clear();
                    setUserToken(null);
                    setModal(false);
                    navigate("/");
                  }}
                >
                  <IoLogOutOutline /> Profildan chiqish
                </h5>
              </div>
            </div>
          </div>
          <div
            className={`search-phone-version ${searchPhone ? "active" : ""}`}
          >
            <input type="text" placeholder="Maxsulotni kiriting:" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
