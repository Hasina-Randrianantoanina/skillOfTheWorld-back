import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';
import dashPic from '../Assets/img/global/dashboard.svg';
import '../Assets/css/dashboard.scss';

const DashEntreprise = () => {
  const redirect = useNavigate();
  const { uid } = useContext(AuthContext);
  const effectRan = useRef(false);
  const [offre, setOffre] = useState([]);

  useEffect(() => {

    if (effectRan.current === false) {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/entreprise/${uid}`)
        .then((res) => {
          setOffre(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      effectRan.current = true;
    };
  }, [uid]);

  return (
    <div>
      <div className="divDash">
        <div className="innerDash">
          <p className="linkRetour" onClick={() => redirect(-1)}>
            &#60; Retour
          </p>

          <h2>
            Bienvenue{' '}
            <b style={{ fontFamily: 'poppinsBold' }}>{offre.nomEntreprise}</b>{' '}
          </h2>
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
              <Link to="/listeOffreEts">
                <button>Mes offres d'emplois</button>{' '}
              </Link>
              <Link to="/listeJdEts">
                <button>Mes job dating</button>{' '}
              </Link>
              <Link to="/listeEventEts">
                <button>Mes évènements</button>{' '}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashEntreprise;
