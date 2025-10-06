import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import Navbar from "../../components/navbar/Navbar";
import ProductDetail from "../productDetail/ProductDetail";
import Footer from "../footer/Footer";
import SignUp from "../signup/SignUp";
import Login from "../login/Login";
import { ToastContainer } from "react-toastify";
import { getToken } from "../services/token";
import ScrollToTop from "../../components/scrolltotop/ScrollToTop";
import Categorys from "../categorys/Categorys";
import Search from "../searchPoduct/Search";
import Error from "../error/Error";
import Abouts from "../about/Abouts";
import AccountEdit from "../accountEdit/AccountEdit";

function Routers() {
  const [userToken, setUserToken] = useState(getToken());
  const [category, setCategory] = useState([]);
  const [searchProductName, setSearchProductName] = useState("");

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <div className={`routermode ${theme ? "dark" : ""}`}>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={1000} />
        <Navbar
          theme={theme}
          setTheme={setTheme}
          userToken={userToken}
          setUserToken={setUserToken}
          searchProductName={searchProductName}
          setSearchProductName={setSearchProductName}
        />
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={<Home category={category} setCategory={setCategory} />}
          />
          <Route path="/categoryFilter/:id" element={<Categorys />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route
            path="/searching"
            element={
              <Search
                searchProductName={searchProductName}
                setSearchProductName={setSearchProductName}
              />
            }
          />
          <Route path="/editProfil" element={<AccountEdit />} />
          <Route path="/ro'yxatdan o'tish" element={<SignUp />} />
          <Route
            path="kirish"
            element={<Login setUserToken={setUserToken} />}
          />
          <Route path="aboutus" element={<Abouts />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Routers;
