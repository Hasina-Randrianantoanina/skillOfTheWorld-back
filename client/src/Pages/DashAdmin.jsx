import React from "react";
import { Link, useNavigate } from "react-router-dom";

import dashPic from "../Assets/img/global/dashboard.svg";
import "../Assets/css/dashAdmin.scss";

const DashAdmin = () => {
  const redirect = useNavigate();

  return (
    <div className="divDashboard">
      <div className="innerDashboard">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>

        <h2>Bienvenue</h2>
        <div className="left">
          <a
            href="https://storyset.com/data"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={dashPic} alt="Sign in Illustration" />
          </a>
        </div>
        <div className="right">
          <div className="forBtn">
            <Link to="/validationOffre">
              <button>Validation des offres</button>{" "}
            </Link>
            <Link to="/validationJD">
              <button>Publication des job dating</button>{" "}
            </Link>
            <Link to="/validationEvent">
              <button>Publication des évènements</button>{" "}
            </Link>
            <Link to="/listeArticle">
              <button>Liste des articles</button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashAdmin;
