import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import "./../../Assets/css/updateProfil.scss";
import resetIllustration from "./../../Assets/img/profil/resetMdp.svg";

const ResetMdpEntreprise = () => {
  const redirect = useNavigate();
  const { uid } = useContext(AuthContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);

  const mdpError = (a) =>
    toast.error(a, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const resetSuccess = () =>
    toast.success("Mots de passe réinitialisé avec succès", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleShowPassword = () => {
    if (passwordType === "password") {
      setIcon(<FaRegEye />);
      setPasswordType("text");
    } else {
      setIcon(<FaRegEyeSlash />);
      setPasswordType("password");
    }
  };

  const initializePassword = async (e) => {
    e.preventDefault();
    if (confirmPassword === newPassword) {
      const getEmail = await axios.get(
        `${process.env.REACT_APP_API_URL}api/user/entreprise/${uid}`
      );
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}api/user/entreprise/initialise/${uid}`,
          {
            email: getEmail.data.email,
            password: oldPassword,
            newPassword: newPassword,
          }
        )
        .then((res) => {
          redirect("/dashEntreprise");
          resetSuccess();
        })
        .catch((err) => {
          mdpError(err);
        });
    } else {
      mdpError("Les deux nouveaux mots de passe ne sont pas identiques");
    }
  };

  return (
    <div className="divUpdateProfil">
      <div className="innerUpdateProfil">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>

        <div className="left">
          <a
            href="https://storyset.com/illustration/reset-password/rafiki#2F4667FF&hide=&hide=complete"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={resetIllustration} alt="reset password Illustration" />
          </a>
        </div>
        <div className="right">
          <h2>
            Réinitialiser mon <b>mot de passe</b>
          </h2>
          <form
            className="forInput"
            autoComplete="off"
            onSubmit={initializePassword}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <span className="passHint" onClick={handleShowPassword}>
                {icon}
              </span>
              <input
                type={passwordType}
                className="fontSizeInput"
                name="password"
                placeholder="Mot de passe actuel"
                minLength="6"
                onChange={(event) => {
                  setOldPassword(event.target.value);
                }}
              />
            </div>
            <div style={{ position: "relative", width: "100%" }}>
              <span className="passHint" onClick={handleShowPassword}>
                {icon}
              </span>
              <input
                type={passwordType}
                className="fontSizeInput"
                name="password"
                placeholder="Nouveau mot de passe"
                minLength="6"
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
              />
            </div>

            <div style={{ position: "relative", width: "100%" }}>
              <span className="passHint" onClick={handleShowPassword}>
                {icon}
              </span>
              <input
                type={passwordType}
                className="fontSizeInput"
                name="password"
                placeholder="Confirmer mot de passe"
                required
                minLength="6"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </div>
            <input
              type="submit"
              name="modifCandidat"
              value="Réinitialiser"
              style={{ marginBottom: "40px" }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetMdpEntreprise;
