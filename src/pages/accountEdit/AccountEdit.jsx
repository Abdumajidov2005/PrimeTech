import React, { useEffect, useState } from "react";
import "./AccountEdit.css";
import { baseUrl } from "../services/config";
import { getToken } from "../services/token";
import { getUserData } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AccountEdit() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  useEffect(() => {
    getUserData()?.then((data) => {
      setUserData(data);
      setFirstName(data?.first_name || "");
      setLastName(data?.last_name || "");
      setPhoneNumber(data?.phone_number || "");
      setUsername(data?.username || "");
    });
  }, []);

  const editProfil = () => {
    if (
      username === userData?.username &&
      first_name === userData?.first_name &&
      last_name === userData?.last_name &&
      phone_number === userData?.phone_number
    ) {
      toast.info("O‘zgarish kiritilmadi!");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("first_name", first_name);
    formdata.append("last_name", last_name);
    formdata.append("phone_number", phone_number);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${baseUrl}/auth/user-crud/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        toast.success("Profil tasdiqlandi");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="account-edit">
        <div className="container">
          <div className="account-edit-title">
            <h1>Profilni tahrirlash</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editProfil();
            }}
            className="block-profil"
          >
            <div className="block-profil_contents">
              <label htmlFor="">Profil Nomi:</label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                type="text"
                placeholder="Profil nomi"
              />
            </div>
            <div className="block-profil_contents">
              <label htmlFor="">Ismingiz:</label>
              <input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={first_name}
                type="text"
                placeholder="Ismingiz"
              />
            </div>
            <div className="block-profil_contents">
              <label htmlFor="">Familyangiz:</label>
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={last_name}
                type="text"
                placeholder="Familyangiz"
              />
            </div>
            <div className="block-profil_contents">
              <label htmlFor="">Telefon raqamingiz:</label>
              <input
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                value={phone_number}
                type="text"
                placeholder="Telefon raqamingiz"
              />
            </div>
            <div className="btns">
              <button type="submit">Tasdiqlash</button>
              <button
                onClick={() => {
                  navigate("/");
                }}
                type="button"
              >
                Orqaga qaytish
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountEdit;
