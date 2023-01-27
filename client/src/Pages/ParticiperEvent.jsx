import React from "react";
import { Link, useNavigate } from "react-router-dom";

import participerEventImg from "./../Assets/img/entreprise/jeSouhaiteOrganiserUnEvent.svg";
import "./../Assets/css/quiSommesNous.scss";

const ParticiperEvent = () => {
  const redirect = useNavigate();

  return (
    <div className="divQuiSommes">
      <div className="innerQuiSommes">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <div className="left" style={{width:"410px"}}>
          <a
            href="https://storyset.com/work"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={participerEventImg} alt="Participer Forum" />
          </a>
        </div>
        <div className="right">
          <h2>
            <b>Participer à un évènement</b>
          </h2>
          <p>
            Vous souhaitez : Découvrir des écoles, des métiers, des formations ?
            <br /> Aller à la rencontre de partenaires ou encore être aidé dans votre
            recherche d'emploi ? <br/> Inscrivez-vous à nos évènements en ligne
          </p>
          <div className="forBtnContactUs">
            <Link to="/inscriptionCandidat">
              <button className="btnContactUs">S'inscrire</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticiperEvent;
