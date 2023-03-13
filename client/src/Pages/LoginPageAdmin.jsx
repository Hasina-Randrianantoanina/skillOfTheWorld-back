import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

import "../Assets/css/loginPage.scss";
import loginPic from "../Assets/img/global/connexion.svg";

const LoginPageAdmin = () => {
  const redirect = useNavigate();
  const { fetchUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);

  const handleShowPassword = () => {
    if (passwordType === "password") {
      setIcon(<FaRegEye />);
      setPasswordType("text");
    } else {
      setIcon(<FaRegEyeSlash />);
      setPasswordType("password");
    }
  };

  const loginError = (a, b) =>
    toast.error(a + b, {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };
      const connexionAdmin = await axios.post(
        `${process.env.REACT_APP_API_URL}api/user/admin/signIn`,
        loginData
      );
      if (connexionAdmin.data.errors) {
        loginError(
          connexionAdmin.data.errors.email,
          connexionAdmin.data.errors.password
        );
        setIsLoading(false);
      } else {
        await fetchUser();
        redirect("/dashAdmin");
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="divLogin">
      <div className="innerLogin">
        <ToastContainer />
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {" "}
          &#60; Retour
        </p>
        <div className="left">
          <a
            href="https://storyset.com/user"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={loginPic} alt="Login Picture" />
          </a>
        </div>
        <div className="right">
          <h2>
            <b>SKILL</b> of the <b>WORLD</b>
          </h2>
          <h2>Se connecter</h2>
          <div className="box">
            <form onSubmit={handleLogin}>
              {/* EMAIL */}
              <div className="inputBox">
                <input
                  type="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label>Email</label>
              </div>

              {/* PASSWORD */}
              <div className="inputBox">
                <span className="passHint" onClick={handleShowPassword}>
                  {icon}
                </span>
                <input
                  type={passwordType}
                  className="fontSizeInput"
                  name="text"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  minLength="6"
                />
                <label>Mot de passe</label>
              </div>
              <input type="submit" name="sign-in" disabled={isLoading && true} value={isLoading ? "Chargement ...":"Connexion"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageAdmin;
