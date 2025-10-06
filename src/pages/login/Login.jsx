import React, { useState } from "react";
import "./Login.css";
import { baseUrl } from "../services/config";
import { getToken, setToken } from "../services/token";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login({ setUserToken }) {
  const navigate = useNavigate();
  const [loginLoad, setLoginLoad] = useState(false);
  const [username1, setUsername1] = useState("");
  const [password1, setPassword1] = useState("");

  const loginAdd = () => {
    setLoginLoad(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: username1,
      password: password1,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/auth/token/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.access) {
          setToken(result?.access);
          setUserToken(getToken());
          toast.success("Muvofaqqiyatli kiridingiz");
          navigate("/");
        } else if (Array.isArray(result?.password)) {
          toast.error(result.password[0]);
        } else if (Array.isArray(result?.username)) {
          toast.error(result.username[0]);
        } else if (Array.isArray(result?.non_field_errors)) {
          toast.error(result.non_field_errors[0]);
        } else if (Array.isArray(result?.username) != username1) {
          toast.error("Username xato");
        } else if (Array.isArray(result?.password1) != password1) {
          toast.error("Parol xato");
        }else if(Array.isArray(result?.username) != username1 && Array.isArray(result?.password1) != password1){
          toast.error("Username va parol xato")
        } else {
          toast.error("Xatolik bor");
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoginLoad(false);
      });
  };

  return (
    <>
      <div className={`loaderss ${loginLoad ? "load-animation":""}`}>
        <span></span>
      </div>
      <div className="sign-up login">
        <div className="container">
          <div className="sign-img login-img">
            <img src="imgs/primetech.jpg" alt="" />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginAdd();
            }}
            className="sign-information"
          >
            <h1>Kirish</h1>

            <div className="sign-information_title">
              <label htmlFor="">Profilingiz:</label>
              <input
                onInput={(e) => {
                  setUsername1(e.target.value);
                }}
                type="text"
                placeholder="Profil"
              />
            </div>
            <div className="sign-information_title">
              <label htmlFor="">Parolingiz:</label>
              <input
                onInput={(e) => {
                  setPassword1(e.target.value);
                }}
                type="text"
                placeholder="Parol"
              />
            </div>
            <button>Kirish</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
