import React from "react";
import { Link, useNavigate } from "react-router-dom";

import participerEventImg from "./../../Assets/img/entreprise/JD.svg";
import "./../../Assets/css/organisation.scss";

const OrgJdEts = () => {
  const redirect = useNavigate();

  return (
    <div className="divOrganisation">
      <div className="innerOrganisation">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <div className="left" style={{ width: "410px" }}>
          <a
            href="https://storyset.com/discussion"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={participerEventImg} alt="Participer Forum" />
          </a>
        </div>
        <div className="right">
          <h2>
            <b>Organiser un job dating</b>
          </h2>
          <p>
            SOTW vous offre la possiblité d'<b>organiser vos job dating</b>. <br /> Ils
            apparaitront directement sur notre site. <br /> Les candidats pourront
            s'inscrire et vous recevrez directement les CV des candidats
            intéressés. <br /> 
          </p>
          <div className="forBtnContactUs">
            <Link to="/login">
              <button className="btnContactUs">S'inscrire</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgJdEts;
