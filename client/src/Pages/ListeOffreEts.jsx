import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment/moment';
import 'moment/locale/fr';

import '../Assets/css/listeEts.scss';
import Pagination from '../Components/Pagination';
import ets_img from '../Assets/img/SOTW_logo (2).webp';

const ListeOffreEts = () => {
  const redirect = useNavigate();

  const { uid } = useContext(AuthContext);

  const [offre, setOffre] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}api/offre/entreprise/${uid}`,
    })
      .then((response) => {
        setOffre(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setOffre]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  return (
    <div className="divListe">
      <div className="innerListe">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Mes offres d'emplois</h2>
        <div className="divTop">
          <div className="cardObjectif">
            <div className="value">
              <p>
                Un <strong>expert RH</strong> vous contactera pour la valider,
                signer ensemble la proposition commerciale et la mettre en
                ligne.
              </p>
              <br />
              <p>
                Pas d’inquiétude, nos tarifs sont transparents et uniformes mais
                dans un souci de qualité de la relation, le contact commence dès
                que vous souhaitez travailler avec SKILL of the WORLD.
              </p>
              <br />
              <p>
                Et puis vous <strong>gagnez du temps :</strong> l’annonce sera
                déjà en ligne et il ne restera que le règlement à réaliser.
              </p>
              <p>
                Une fois l’annonce validée, elle apparaitra en VERT dans votre
                tableau de bord.
              </p>
            </div>
            <div className="imgValue" style={{ height: '145px' }}>
              <img src={ets_img} alt="Inscription Illustration" />
            </div>
          </div>
        </div>
        <Link to="/ajoutOffre">
          <button className="btnAjout">Ajouter une offre</button>
        </Link>
        <div className="divTable">
          <table className="innerTable">
            <thead>
              <tr>
                <th
                  style={{
                    width: '75%',
                    textAlign: 'left',
                    paddingLeft: '15px',
                  }}
                >
                  Liste des offres
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {offre.length > 0 ? (
                offre
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((val, key) => {
                    return (
                      <tr key={val._id}>
                        {val.isValidate === true && val.depublie === false ? (
                          <td
                            style={{
                              textAlign: 'left',
                              paddingLeft: '15px',
                              background: 'rgba(20, 220, 97, 0.346)',
                            }}
                          >
                            <span>{val.intitulePoste}</span>
                            <p>
                              {moment(val.createdAt).locale('fr').format('LL')}
                            </p>
                          </td>
                        ) : (
                          <td
                            style={{
                              textAlign: 'left',
                              paddingLeft: '15px',
                              background: 'rgba(220, 153, 20, 0.346)',
                            }}
                          >
                            <span>{val.intitulePoste}</span>
                            <p>
                              {moment(val.createdAt).locale('fr').format('LL')}
                            </p>
                          </td>
                        )}
                        <td>
                          <Link to={`/detailOffreGlobale/${val._id}`}>
                            <button style={{ border: 'none' }}>Details</button>
                          </Link>
                          <Link to={`/candidatureOffre/${val._id}`}>
                            <button>Talent</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td>Aucune offre ajoutée</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={offre.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ListeOffreEts;
