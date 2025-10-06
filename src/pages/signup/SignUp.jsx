import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../services/config";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/auth/register/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (Array.isArray(result?.password)) {
          toast.error(result.password[0]);
        } else if (Array.isArray(result?.username)) {
          toast.error(result.username[0]);
        } else {
          toast.success("Profil yaratildi");
          navigate("/kirish");
        }
      })
      .catch((error) => console.error(error))
      .finally(()=>{
        setLoading(false)
      })
  };

  return (
    <>
    
      <div className="sign-up">
        <div className="container">
          <div className="sign-img">
            <img src="imgs/primetech.jpg" alt="logotip rasmi bor" />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
            className="sign-information"
          >
            <h1>Ro'yxatdan o'tish</h1>
            <div className="sign-information_title">
              <label htmlFor="">Ismingizni kiriting:</label>
              <input
                onInput={(e) => {
                  setFirstName(e.target.value);
                }}
                type="text"
                placeholder="Ismingiz....."
              />
            </div>
            <div className="sign-information_title">
              <label htmlFor="">Familyangizni kiriting:</label>
              <input
                onInput={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                placeholder="Familyangiz...."
              />
            </div>
            <div className="sign-information_title">
              <label htmlFor="">Username:</label>
              <input
                onInput={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                placeholder="Username..."
              />
            </div>
            <div className="sign-information_title">
              <label htmlFor="">Parol kiriting:</label>
              <input
                onInput={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                placeholder="Parol..."
              />
            </div>
            <div className="submition">
              {loading ? (
                <button>Yuklanmoqda....</button>
              ) : (
                <button>Profilni yaratish</button>
              )}
              <p>
                Profilingiz mavjud bo'lsa <Link to={"/kirish"}>Kirish</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
