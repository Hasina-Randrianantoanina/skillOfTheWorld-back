import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../Assets/css/dashAdmin.scss';
import dashPic from '../Assets/img/global/dashboard.svg';
import { AuthContext } from '../context/AuthContext';

const DashCandidat = () => {
  const redirect = useNavigate();
  const { uid } = useContext(AuthContext);
  const effectRan = useRef(false);

  const [offre, setOffre] = useState([]);

  useEffect(() => {
    if (effectRan.current === false) {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/candidat/${uid}`)
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
      <div className="divDashboard">
        <div className="innerDashboard">
          <p className="linkRetour" onClick={() => redirect(-1)}>
            &#60; Retour
          </p>
          <h2>
            Bienvenue{' '}
            <b style={{ fontFamily: 'poppinsBold' }}>{offre.prenom}</b>{' '}
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
              <Link to="/offreEmploiCandidat">
                <button>Liste des offres</button>{' '}
              </Link>
              <Link to="/nosJobDating">
                <button>Liste des job dating</button>{' '}
              </Link>
              <Link to="/nosEvent">
                <button>Liste des évènements</button>{' '}
              </Link>
              <Link to="/myCV">
                <button>Curriculum vitae</button>{' '}
              </Link>
              <Link to="/myLM">
                <button>Lettre de motivation</button>{' '}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashCandidat;
