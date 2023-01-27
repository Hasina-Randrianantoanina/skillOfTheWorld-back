import React from "react";
import { Link, useNavigate } from "react-router-dom";

import quiSommesNousImg from "./../Assets/img/global/quiSommesNous.svg";
import quiSommesNousImg2 from "./../Assets/img/global/quiSommesNous2.svg";

import "./../Assets/css/quiSommesNous.scss";

const QuiSommesNous = () => {
  const redirect = useNavigate();

  return (
    <div className="divQuiSommes">
      <div className="innerQuiSommes" style={{flexDirection:"row-reverse"}}>
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <div className="left">
          <a
            href="https://storyset.com/work"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={quiSommesNousImg} alt="Qui sommes nous" />
          </a>
        </div>
        <div className="right">
          <h2>
            <b>Qui sommes-nous ?</b>
          </h2>
          <p>
            Nous sommes des experts en RH et notamment en recrutement et nous
            avons pensé la plateforme pour les entreprises et les talents.
          </p>
          <p>
            La qualité de la mise en réseau TALENTS / ENTREPRISES pour le
            recrutement se fait via la plateforme par une approche globale :
          </p>
          <ul>
            <li>Des candidatures validées par nos soins (pré-tri de CV)</li>
            <li>Des job dating</li>
            <li>Des évènements pour la marque employeur</li>
            <li>Des forums pour l'emploi</li>
            <li>Des diffusions sur des réseaux ciblés : nous nous occupons de tout <br /> pour vous!</li>
          </ul>
        </div>
      </div>
      <div className="innerQuiSommes">
        
        <div className="left">
          <a
            href="https://storyset.com/work"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={quiSommesNousImg2} alt="Qui sommes nous" />
          </a>
        </div>
        <div className="right">
          <h2>
            <b>La plateforme SOTW</b>
          </h2>
          <p>
            SOTW est LA plateforme RH dédiée au recrutement et à la marque
            employeur pour recruter partout, où que vous soyez dans le monde.
          </p>
          <p>
            La plateforme est dédiée aux recrutements de Talents / Cadres /
            Cadres Dirigeants que ce soit en CDI, CDD ou remote work et ce
            partout à travers le monde.
          </p>
          <div className="forBtnContactUs">
            <Link to="/contactezNous">
              <button className="btnContactUs">contactez-nous</button>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default QuiSommesNous;
