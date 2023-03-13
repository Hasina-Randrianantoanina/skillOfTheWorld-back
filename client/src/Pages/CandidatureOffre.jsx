import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { reponseRefuse, reponseAttente, reponseValide } from '../Utils/reponse';

import '../Assets/css/candidatureOffre.scss';
import Pagination from '../Components/Pagination';

const CandidatureOffre = () => {
  const redirect = useNavigate();
  const { uid, candidat, entreprise, admin, getUrl, urlFile } =
    useContext(AuthContext);

  const effectRan = useRef(false);

  const [showTalent, setShowTalent] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isRefused, setIsRefused] = useState(false);
  const [enAttente, setEnAttente] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const handleClickTalent = () => {
    if (setShowTalent) {
      setShowTalent(true);
    } else {
      setShowTalent(true);
    }
    setIsAccepted(false);
    setIsRefused(false);
    setEnAttente(false);
  };

  const handleClickAccepted = () => {
    setShowTalent(false);
    if (setIsAccepted) {
      setIsAccepted(true);
    } else {
      setIsAccepted(true);
    }
    setIsRefused(false);
    setEnAttente(false);
  };

  const handleClickRefused = () => {
    setShowTalent(false);
    setIsAccepted(false);
    if (setIsRefused) {
      setIsRefused(true);
    } else {
      setIsRefused(true);
    }
    setEnAttente(false);
  };

  const handleClickAttente = () => {
    setShowTalent(false);
    setIsAccepted(false);
    setIsRefused(false);
    if (setEnAttente) {
      setEnAttente(true);
    } else {
      setEnAttente(true);
    }
  };

  const { id } = useParams();

  const [offre, setOffre] = useState([]);
  const [listCandidat, setListCandidat] = useState([]);

  const repondreAttente = async (
    response,
    candida,
    offreId,
    email,
    titrePoste
  ) => {
    await axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}api/offre/validate/${offreId}`,
      data: {
        candidatId: candida,
        resultat: response,
        email: email,
        texte: reponseAttente(titrePoste),
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          redirect(`/candidatureOffre/${id}`);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const repondreValide = async (
    response,
    candida,
    offreId,
    email,
    titrePoste
  ) => {
    await axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}api/offre/validate/${offreId}`,
      data: {
        candidatId: candida,
        resultat: response,
        email: email,
        texte: reponseValide(titrePoste),
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          redirect(`/candidatureOffre/${id}`);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const repondreRefuse = async (
    response,
    candida,
    offreId,
    email,
    titrePoste
  ) => {
    await axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}api/offre/validate/${offreId}`,
      data: {
        candidatId: candida,
        resultat: response,
        email: email,
        texte: reponseRefuse(titrePoste),
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          redirect(`/candidatureOffre/${id}`);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getOffreWithCandidat = async () => {
      const idCandidat = [];

      const getOffre = await axios.get(
        `${process.env.REACT_APP_API_URL}api/offre/${id}`
      );
      for (let i = 0; i < getOffre.data.listCandidat.length; i++) {
        idCandidat.push(getOffre.data.listCandidat[i].candidatId);
      }
      const getInfoCandidat = await Promise.all(
        idCandidat.map((i) =>
          axios.get(`${process.env.REACT_APP_API_URL}api/user/candidat/${i}`)
        )
      );
      for (let i = 0; i < getInfoCandidat.length; i++) {
        setListCandidat((list) => [
          ...list,
          {
            _id: getOffre.data.listCandidat[i]._id,
            idCandida: getInfoCandidat[i].data._id,
            nom: getInfoCandidat[i].data.nom,
            prenom: getInfoCandidat[i].data.prenom,
            email: getInfoCandidat[i].data.email,
            resultat: getOffre.data.listCandidat[i].resultat,
            cv_path: getOffre.data.listCandidat[i].file1_path,
            lm_path: getOffre.data.listCandidat[i].file2_path,
            isValideCV: getOffre.data.listCandidat[i].isValideCV,
            isValideLM: getOffre.data.listCandidat[i].isValideLM,
            documentTexte: getOffre.data.listCandidat[i].documentTexte,
          },
        ]);
      }

      setOffre(getOffre.data);
    };
    if (effectRan.current === false) {
      getOffreWithCandidat();
      getUrl();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  return (
    <div className="divCandidature">
      <div className="innerCandidature">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Candidatures</h2>
        <h4 className="postTitle">
          <b>Poste : </b>
          {offre.intitulePoste}
        </h4>
        <div className="navAndTable">
          <div className="navigation">
            <h4
              onClick={handleClickTalent}
              className={showTalent ? 'active' : undefined}
            >
              Les talents {/*[23] */}
            </h4>
            <h4
              onClick={handleClickAccepted}
              className={isAccepted ? 'active' : undefined}
            >
              Accepté {/* [10] */}
            </h4>
            <h4
              onClick={handleClickRefused}
              className={isRefused ? 'active' : undefined}
            >
              Refusé {/*[07] */}
            </h4>
            <h4
              onClick={handleClickAttente}
              className={enAttente ? 'active' : undefined}
            >
              Mis en attente {/*[07] */}
            </h4>
          </div>

          {/* TALENTS */}
          {showTalent && (
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
                      Liste des talents
                    </th>
                    {entreprise && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {listCandidat.slice(indexOfFirstPost, indexOfLastPost).map(
                    (val) =>
                      val.resultat === 'envoye' &&
                      val.isValideCV === true && (
                        <tr key={val._id}>
                          <td
                            style={{ textAlign: 'left', paddingLeft: '15px' }}
                          >
                            <span>{val.nom + ' ' + val.prenom} </span>
                            <a
                              download
                              href={`${urlFile.split('.com/')[0]}.com/${
                                val.cv_path
                              }`}
                            >
                              Telecharger le CV
                            </a>{' '}
                            &nbsp; &nbsp;{' '}
                            {val.lm_path && (
                              <a
                                download
                                href={`${urlFile.split('.com/')[0]}.com/${
                                  val.lm_path
                                }`}
                              >
                                Telecharger la LM
                              </a>
                            )}
                            {val.documentTexte !== '' && (
                              <a
                                download
                                href={`${urlFile.split('.com/')[0]}.com/${
                                  val.documentTexte
                                }`}
                              >
                                Telecharger le fichier supplementaire
                              </a>
                            )}
                          </td>
                          <td className="action">
                            <button
                              style={{ border: 'none' }}
                              onClick={() =>
                                repondreValide(
                                  'accepté',
                                  val.idCandida,
                                  id,
                                  val.email,
                                  offre.intitulePoste
                                )
                              }
                            >
                              Acceptée
                            </button>

                            <button
                              style={{ border: 'none' }}
                              onClick={() =>
                                repondreRefuse(
                                  'Réfusée',
                                  val.idCandida,
                                  id,
                                  val.email,
                                  offre.intitulePoste
                                )
                              }
                            >
                              Refusée
                            </button>
                            <button
                              style={{ border: 'none' }}
                              onClick={() =>
                                repondreAttente(
                                  'attente',
                                  val.idCandida,
                                  id,
                                  val.email,
                                  offre.intitulePoste
                                )
                              }
                            >
                              Mettre en attente
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                  {/* <tr>
                    <td>Pas encore de candidat</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          )}

          {/* ACCEPTEE */}
          {isAccepted && (
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
                      Liste des talents acceptés
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listCandidat.slice(indexOfFirstPost, indexOfLastPost).map(
                    (val) =>
                      val.resultat === 'accepté' &&
                      val.isValideCV === true && (
                        <tr key={val._id}>
                          <td
                            style={{
                              textAlign: 'left',
                              paddingLeft: '15px',
                              background: 'rgba(20, 220, 97, 0.346)',
                            }}
                          >
                            <span>{val.nom + ' ' + val.prenom} </span>
                            <a
                              download
                              href={`${urlFile.split('.com/')[0]}.com/${
                                val.cv_path
                              }`}
                            >
                              Telecharger le CV
                            </a>{' '}
                            &nbsp; &nbsp;{' '}
                            {val.lm_path && (
                              <a
                                download
                                href={`${urlFile.split('.com/')[0]}.com/${
                                  val.lm_path
                                }`}
                              >
                                Telecharger la LM
                              </a>
                            )}
                            {val.documentTexte !== '' && (
                              <a
                                download
                                href={`${urlFile.split('.com/')[0]}.com/${
                                  val.documentTexte
                                }`}
                              >
                                Telecharger le fichier supplementaire
                              </a>
                            )}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* REFUSEE */}
          {isRefused && (
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
                      Liste des talents refusés
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listCandidat.slice(indexOfFirstPost, indexOfLastPost).map(
                    (val) =>
                      val.resultat === 'Réfusée' &&
                      val.isValideCV === true && (
                        <tr key={val._id}>
                          <td
                            style={{
                              textAlign: 'left',
                              paddingLeft: '15px',
                              background: 'rgba(220, 20, 20, 0.258)',
                            }}
                          >
                            <span>{val.nom + ' ' + val.prenom}</span>
                            <a
                              download
                              href={`${urlFile.split('.com/')[0]}.com/${
                                val.cv_path
                              }`}
                            >
                              Telecharger le CV
                            </a>{' '}
                            &nbsp; &nbsp;{' '}
                            {val.lm_path && (
                              <a
                                download
                                href={`${urlFile.split('.com/')[0]}.com/${
                                  val.lm_path
                                }`}
                              >
                                Telecharger la LM
                              </a>
                            )}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* MISE EN ATTENTE */}
          {enAttente && (
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
                      Liste des talents mis en attente
                    </th>
                    {entreprise && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {listCandidat.slice(indexOfFirstPost, indexOfLastPost).map(
                    (val) =>
                      val.resultat === 'attente' &&
                      val.isValideCV === true && (
                        <tr key={val._id}>
                          <td
                            style={{
                              textAlign: 'left',
                              paddingLeft: '15px',
                              background: 'rgba(220, 153, 20, 0.346)',
                            }}
                          >
                            <span>{val.nom + ' ' + val.prenom} </span>
                            <a
                              download
                              href={`${urlFile.split('.com/')[0]}.com/${
                                val.cv_path
                              }`}
                            >
                              Telecharger le CV
                            </a>{' '}
                            &nbsp; &nbsp;{' '}
                            {val.lm_path && (
                              <a
                                download
                                href={`${urlFile.split('.com/')[0]}.com/${
                                  val.lm_path
                                }`}
                              >
                                Telecharger la LM
                              </a>
                            )}
                            {/* <a href="#">Telecharger le fichier supplementaire</a> */}
                          </td>
                          <td className="action">
                            <button
                              style={{ border: 'none' }}
                              onClick={() =>
                                repondreValide(
                                  'accepté',
                                  val.idCandida,
                                  id,
                                  val.email,
                                  offre.intitulePoste
                                )
                              }
                            >
                              Acceptée
                            </button>

                            <button
                              style={{ border: 'none' }}
                              onClick={() =>
                                repondreRefuse(
                                  'Réfusée',
                                  val.idCandida,
                                  id,
                                  val.email,
                                  offre.intitulePoste
                                )
                              }
                            >
                              Refusée
                            </button>
                            <button
                              style={{ border: 'none' }}
                              onClick={() =>
                                repondreAttente(
                                  'attente',
                                  val.idCandida,
                                  id,
                                  val.email,
                                  offre.intitulePoste
                                )
                              }
                            >
                              Mettre en attente
                            </button>
                          </td>
                        </tr>
                      )
                  )}
                  {/* <tr>
                    <td>Pas encore de candidat</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {showTalent && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={listCandidat.length}
            paginate={paginate}
          />
        )}
        {isAccepted && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={listCandidat.length}
            paginate={paginate}
          />
        )}
        {isRefused && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={listCandidat.length}
            paginate={paginate}
          />
        )}
        {enAttente && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={listCandidat.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default CandidatureOffre;
