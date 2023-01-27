import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import jeChercheEmploieImg from './../../Assets/img/SOTW_logo (5).webp';
import './../../Assets/css/jeChercheEmploie.scss';

const JeChercheEmploie = () => {
  const redirect = useNavigate();

  return (
    <div className="divJeCherche">
      <div className="innerJeCherche">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <div className="left">
          <div className="imgJob">
            <img src={jeChercheEmploieImg} alt="Je cherche un emploie" />
          </div>
        </div>
        <div className="right">
          <p>
            Venez apporter vos compétences auprès des entreprises partenaires de
            SKILL of the WORLD.
            <br /> Pour cela, il suffit de vous inscrire et vous aurez accès :
          </p>
          <div className="forSommeBtn">
            <Link to="/offreEmploi">
              <button className="btnSommeBtn">Aux offres d'emploi</button>
            </Link>
            <Link to="/nosEvent">
              <button className="btnSommeBtn">Aux évènements</button>
            </Link>
            <Link to="/nosJobDating">
              <button className="btnSommeBtn">Aux job dating</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JeChercheEmploie;
