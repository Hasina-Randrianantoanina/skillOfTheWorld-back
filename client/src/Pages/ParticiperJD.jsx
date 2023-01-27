import React from "react";
import { Link, useNavigate } from "react-router-dom";

import participerJDImg from "./../Assets/img/entreprise/jeSouhaiteOrganiserUnJobDating.svg";
import "./../Assets/css/quiSommesNous.scss";

const ParticiperJD = () => {
  const redirect = useNavigate();

  return (
    <div className="divQuiSommes">
      <div className="innerQuiSommes">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <div className="left">
          <a
            href="https://storyset.com/work"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={participerJDImg} alt="Participer Job Dating" />
          </a>
        </div>
        <div className="right">
          <h2>
            <b>Participer à un job dating</b>
          </h2>
          <p>
            Vous avez à minima un niveau BAC. Vous souhaitez directement
            décrocher un entretien avec un recruteur ? <br/> Inscrivez-vous aux job
            dating
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

export default ParticiperJD;
