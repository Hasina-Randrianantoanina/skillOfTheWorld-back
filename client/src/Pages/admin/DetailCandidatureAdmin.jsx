import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment/moment';
import 'moment/locale/fr';
import axios from 'axios';
import '../../Assets/css/detailEvent.scss';
import { AuthContext } from '../../context/AuthContext';
import logoParDefaut from '../../Assets/img/SOTW_logo (5).webp';

const DetailCandidatureAdmin = () => {
  const redirect = useNavigate();
  const { id } = useParams();
  const effectRan = useRef(false);
  const [candidat, setCandidat] = useState([]);
  const { getUrl, urlFile } = useContext(AuthContext);

  useEffect(() => {
    const getCandidat = async (idCandidat) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/user/candidat/${idCandidat}`)
        .then((res) => {
          setCandidat(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (effectRan.current === false) {
      getCandidat(id);
      getUrl();
    }
    return () => {
      effectRan.current = true;
    };
  }, [id]);

  return (
    <div className="outerDivDetailEvent">
      <div className="innerDivDetailEvent">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Détail du candidat</h2>
        {/* TOP CARD */}

        <div className="topCard">
          {/* LEFT */}
          <div className="topLeft">
            <img
              src={
                candidat && candidat.uploadLogo
                  ? `${urlFile.split('.com/')[0]}.com/${candidat.uploadLogo}`
                  : logoParDefaut
              }
              alt="profil du candidat"
            />
          </div>
          {/* RIGHT */}
          <div className="topRight">
            <div className="titre">
              <h4>
                <b>
                  {candidat.nom !== '' && candidat.nom}{' '}
                  {candidat.prenom !== '' && candidat.prenom}
                </b>
              </h4>
              <i>
                <p>{candidat.localisation !== '' && candidat.localisation}</p>
              </i>
            </div>
            <p style={{ marginTop: '12px' }}>
              {candidat.secteurActivite !== '' && candidat.secteurActivite}
            </p>
            <p>
              Date de naissance :{' '}
              <b>{candidat.dateNaissance !== '' && candidat.dateNaissance}</b>
            </p>
            <p>{candidat.email !== '' && candidat.email}</p>
            <p>
              Date d'inscription à sotw :{' '}
              <b>{candidat.createdAt !== '' && candidat.createdAt}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCandidatureAdmin;
