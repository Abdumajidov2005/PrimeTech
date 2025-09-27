import React, { useState } from "react";
import "./Login.css";
import { baseUrl } from "../services/config";
import { getToken, setToken } from "../services/token";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login({setUserToken}) {
  const navigate = useNavigate();
  const [username1, setUsername1] = useState("");
  const [password1, setPassword1] = useState("");

  const loginAdd = () => {
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
          setUserToken(getToken() )
          toast.success("Muvofaqqiyatli kiridingiz");
          navigate("/");
        } else if (Array.isArray(result?.password)) {
          toast.error(result.password[0]);
        } else if (Array.isArray(result?.username)) {
          toast.error(result.username[0]);
        } else if (Array.isArray(result?.non_field_errors)) {
          toast.error(result.non_field_errors[0]);
        } else {
          toast.error("Noma'lum xatolik");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="sign-up">
      <div className="container">
        <div className="sign-img">
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
  );
}

export default Login;
