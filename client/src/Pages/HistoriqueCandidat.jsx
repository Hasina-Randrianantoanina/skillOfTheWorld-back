import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../Assets/css/historique.scss';
import axios from 'axios';
import moment from 'moment/moment';
import 'moment/locale/fr';

import Pagination from '../Components/Pagination';

const HistoriqueCandidat = () => {
  const redirect = useNavigate();
  const effectRan = useRef(false);
  const { uid, candidat, entreprise, admin } = useContext(AuthContext);

  const [showOffre, setShowOffre] = useState(true);
  const [showJD, setShowJD] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [offreGlobale, setOffreGlobale] = useState([]);
  const [offre, setOffre] = useState([]);
  const idEntreprise = [];

  const [isLoading, setIsLoading] = useState(" ");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const handleClickOffre = () => {
    if (setShowOffre) {
      setShowOffre(true);
    } else {
      setShowOffre(true);
    }
    setShowJD(false);
    setShowEvent(false);
  };

  const handleClickJD = () => {
    setShowOffre(false);
    if (setShowJD) {
      setShowJD(true);
    } else {
      setShowJD(true);
    }
    setShowEvent(false);
  };

  const handleClickEvent = () => {
    setShowOffre(false);
    setShowJD(false);
    if (setShowEvent) {
      setShowEvent(true);
    } else {
      setShowEvent(true);
    }
  };

  useEffect(() => {
    if (effectRan.current === false) {
      const getOffreCandidat = async (idCandidat) => {
        setIsLoading("Chargement ...");
        const idEntreprise = [];
        const resultat = [];
        const listCandidat = [];

        const getOffre = await axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API_URL}api/offre/postule/${idCandidat}`,
        });

        for (let i = 0; i < getOffre.data.length; i++) {
          idEntreprise.push(getOffre.data[i].offreId);
          listCandidat.push(getOffre.data[i].listCandidat);
        }

        for (let i = 0; i < listCandidat.length; i++) {
          for (let y = 0; y < listCandidat[i].length; y++) {
            if (listCandidat[i][y].candidatId === uid) {
              resultat.push(listCandidat[i][y].resultat);
            }
          }
        }

        const getEntreprise = await Promise.all(
          idEntreprise.map((i) =>
            axios({
              method: 'GET',
              url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
            })
          )
        );

        for (let i = 0; i < getOffre.data.length; i++) {
          setOffreGlobale((oldOffre) => [
            ...oldOffre,
            {
              _id: getOffre.data[i]._id,
              intitulePoste: getOffre.data[i].intitulePoste,
              resultat: resultat[i],
              localisation: getOffre.data[i].localisation,
              nomEntreprise: getEntreprise[i].data.nomEntreprise,
            },
          ]);
        }
        offreGlobale.length === 0 && setIsLoading("Aucune offre postulée");
      };

      getOffreCandidat(uid);
    }
    return () => {
      effectRan.current = true;
    };
  }, [uid]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  return (
    <div className="divHistorique">
      <div className="innerHistorique">
        <p
          className="linkRetour"
          onClick={() => redirect('/offreEmploiCandidat')}
        >
          {' '}
          &#60; Retour
        </p>
        <h2>Historique</h2>
        <div className="navAndTable">
          <div className="navigation">
            <h4
              onClick={handleClickOffre}
              className={showOffre ? 'active' : undefined}
            >
              Offre postulé
            </h4>
            {/* <h4
              onClick={handleClickJD}
              className={showJD ? 'active' : undefined}
            >
              Job Dating
            </h4>
            <h4
              onClick={handleClickEvent}
              className={showEvent ? 'active' : undefined}
            >
              Evènement
            </h4> */}
          </div>

          {/* OFFRE */}
          {showOffre && (
            <>
              <div className="divTable">
                <table className="innerTable">
                  <thead>
                    <tr>
                      <th
                        style={{
                          width: '80%',
                          textAlign: 'left',
                          paddingLeft: '15px',
                        }}
                      >
                        Liste des offres
                      </th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offreGlobale.length > 0 ? (
                      offreGlobale
                        .slice(indexOfFirstPost, indexOfLastPost)
                        .map((val, key) => {
                          return (
                            <tr key={val._id}>
                              <td
                                style={{ textAlign: 'left', padding: '12px' }}
                              >
                                <span>
                                  <h4 style={{ fontFamily: 'poppinsBold' }}>
                                    {val.intitulePoste}
                                  </h4>
                                  <h4>{val.nomEntreprise}</h4>
                                </span>
                                <p>
                                  {moment(val.createdAt)
                                    .locale('fr')
                                    .format('LL')}
                                </p>
                              </td>
                              {val.resultat === 'Réfusée' && (
                                <td>
                                  <button className="btnStatus notOk">
                                    Refusée
                                  </button>
                                </td>
                              )}
                              {val.resultat === 'accepté' && (
                                <td>
                                  <button className="btnStatus Ok">
                                    Validée
                                  </button>
                                </td>
                              )}
                              {val.resultat === 'envoye' && (
                                <td>
                                  <button className="btnStatus waiting">
                                    En attente
                                  </button>
                                </td>
                              )}
                              {val.resultat === 'attente' && (
                                <td>
                                  <button className="btnStatus waiting">
                                    En attente
                                  </button>
                                </td>
                              )}
                            </tr>
                          );
                        })
                    ) : (
                      <tr>
                        <td>{isLoading}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Job Dating */}
          {/* {showJD && (
            <div className="divTable">
              <table className="innerTable">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: '80%',
                        textAlign: 'left',
                        paddingLeft: '15px',
                      }}
                    >
                      Liste des job dating
                    </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'left', padding: '12px' }}>
                      <span>
                        <h4 style={{ fontFamily: 'poppinsBold' }}>
                          Speed Recruting
                        </h4>
                        <h4>Vivetic</h4>
                      </span>
                      <p>Monday 10 Octobre 2022</p>
                    </td>
                    <td>
                      <button className="btnStatus Ok">Validée</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
                      Cell
                    </td>
                    <td>
                      <button className="btnStatus notOk">Refusée</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
                      Cell
                    </td>
                    <td>
                      <button className="btnStatus waiting">En attente</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )} */}

          {/* Evènement */}
          {/* {showEvent && (
            <div className="divTable">
              <table className="innerTable">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: '80%',
                        textAlign: 'left',
                        paddingLeft: '15px',
                      }}
                    >
                      Liste des évènements
                    </th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'left', padding: '12px' }}>
                      <span>
                        <h4 style={{ fontFamily: 'poppinsBold' }}>
                          Robotique Event
                        </h4>
                        <h4>Bocasay</h4>
                      </span>
                      <p>Monday 10 Octobre 2022</p>
                    </td>
                    <td>
                      <button className="btnStatus Ok">Validée</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
                      Cell
                    </td>
                    <td>
                      <button className="btnStatus notOk">Refusée</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
                      Cell
                    </td>
                    <td>
                      <button className="btnStatus waiting">En attente</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )} */}
        </div>
        {offreGlobale.length > 0 && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={offreGlobale.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default HistoriqueCandidat;
