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

function Routers() {
  const [userToken, setUserToken] = useState(getToken());
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
        />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/ro'yxatdan o'tish" element={<SignUp />} />
          <Route
            path="kirish"
            element={<Login setUserToken={setUserToken} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default Routers;
