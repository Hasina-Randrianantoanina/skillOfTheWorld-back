import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import mesFormationsImg from './../../Assets/img/ecole/jePresenteMes Formations.svg';
import './../../Assets/css/jeChercheEmploie.scss';

const MesFormations = () => {
  const redirect = useNavigate();

  return (
    <div className="divJeCherche">
      <div className="innerJeCherche">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <div className="left">
          <h2>Je présente mes formations </h2>
          <h2>
            Et je recrute mes <br /> futur(e)s étudiant(e)s
          </h2>
          <a
            href="https://storyset.com/people"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={mesFormationsImg} alt="Mes formations" />
          </a>
        </div>
        <div className="right">
          <p>
            Grâce à SOTW, les écoles peuvent être au plus près des talents à
            partir du niveau BAC. <br /> Et les talents peuvent connaître les offres de
            formations diplomantes des écoles et organismes de formation. <br /> Grâce
            à SOTW, vous pouvez organiser votre forum en ligne. <br /> Pour ce faire,
            contactez-nous et nous organiserons l'évènement ensemble !
          </p>
          <div className="forSommeBtn">
            <Link to="/contactezNous">
              <button className="btnSommeBtn">Contactez-nous</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MesFormations;
