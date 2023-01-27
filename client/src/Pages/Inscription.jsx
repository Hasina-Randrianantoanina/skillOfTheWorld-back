import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Assets/css/loginPage.scss";
import singIn from "../Assets/img/global/inscriptionEnTantQue.svg";
import "../Assets/css/inscription.scss";

const Inscription = () => {
  const redirect = useNavigate();

  return (
    <div className="divInscription">
      <div className="innerInscription">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <div className="left">
          <a href="https://storyset.com/phone" target="_blank" rel="noreferrer noopener"><img src={singIn} alt="Sign in Picture" /></a>
        </div>
        <div className="right">
          <h2>
            <b>SKILL</b> of the <b>WORLD</b>
          </h2>
          <h2>S'inscrire en tant que</h2>
          <div className="forBtn">
            <Link to="/InscriptionEntreprise">
              <button>Entreprise</button>
            </Link>
            <Link to="/InscriptionCandidat">
              <button>Candidat</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
