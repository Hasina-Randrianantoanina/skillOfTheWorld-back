import React from "react";
import { Link, useNavigate } from "react-router-dom";

import participerEventImg from "./../../Assets/img/entreprise/event.svg";
import "./../../Assets/css/organisation.scss";

const OrgEventEts = () => {
  const redirect = useNavigate();

  return (
    <div className="divOrganisation">
      <div className="innerOrganisation">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <div className="left" style={{ width: "410px" }}>
          <a
            href="https://storyset.com/event"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={participerEventImg} alt="Participer Forum" />
          </a>
        </div>
        <div className="right">
          <h2>
            <b>Organiser un évènement</b>
          </h2>
          <p>
            Vous souhaitez présenter vos métiers, votre entreprise ? Participez
            à nos forums ou faites-nous vos propositions de thématiques pour nos
            évènements en ligne ! <br/> Vous souhaitez en savoir plus ?
          </p>
          <div className="forBtnContactUs">
            <Link to="/contactezNous">
              <button className="btnContactUs">Contactez-nous</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgEventEts;
