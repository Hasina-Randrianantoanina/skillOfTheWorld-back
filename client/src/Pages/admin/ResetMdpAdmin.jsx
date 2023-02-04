import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import "./../../Assets/css/updateProfil.scss";
import resetIllustration from "./../../Assets/img/profil/resetMdp.svg";

const ResetMdpAdmin = () => {
  const redirect = useNavigate();
  const { uid, candidat, entreprise, admin } = useContext(AuthContext);

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
          <form className="forInput" autoComplete="off">
            <input
              type="text"
              name="password"
              placeholder="Mot de passe actuel"
              minLength="6"
            />
            <input
              type="password"
              name="password"
              placeholder="Nouveau mot de passe"
              minLength="6"
            />
            
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

export default ResetMdpAdmin;
