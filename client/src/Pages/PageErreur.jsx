import React from "react";
import { Link } from "react-router-dom";

import "../Assets/css/pageErreur.scss";
import errorImg from "../Assets/img/global/errorPage.svg";

const PageErreur = () => {
  return (
    <div className="outerDivError">
      <div className="innerDivError">
        <h2>Cette page n'existe pas</h2>
        <div className="errorImg">
          <img src={errorImg} alt="Error 404" />
        </div>
        <Link to="/">
          <button>Retourner vers la page d'accueil</button>
        </Link>
      </div>
    </div>
  );
};

export default PageErreur;
