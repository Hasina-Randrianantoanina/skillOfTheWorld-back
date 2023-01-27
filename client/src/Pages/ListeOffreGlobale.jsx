import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { FaRegCalendar } from 'react-icons/fa';

import axios from 'axios';

import '../Assets/css/offreglobale.scss';

const ListeOffreGlobaleCandidat = () => {
  const redirect = useNavigate();

  const [offre, setOffre] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/offre/valide/`,
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          console.log(res.data);
          setOffre(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="outerDivOffre">
      <div className="innerDivOffre">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Offres d'emploi</h2>

        <div className="forCardOffre">
          {offre.map((val, key) => {
            return (
              <div className="card" key={val._id}>
                <div className="titre">
                  <h5>{val.intitulePoste}</h5>
                  <h5 className="ville">{val.localisation}</h5>
                </div>
                {/* <h5>Calina Corps</h5> */}
                <div style={{ margin: '25px 12px 0' }} className="forBtn">
                  <div className="calendar">
                    <IconContext.Provider
                      value={{
                        color: '#0000008f',
                        size: '13px',
                      }}
                    >
                      <FaRegCalendar />
                    </IconContext.Provider>
                    <h5>{val.typeContrat}</h5>
                  </div>
                  <Link to={`/detailOffreGlobale/${val._id}`}>
                    <button>Voir détails</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListeOffreGlobaleCandidat;
