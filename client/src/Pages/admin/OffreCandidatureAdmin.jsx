import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import 'moment/locale/fr';
import '../../Assets/css/validation.scss';
import Pagination from '../../Components/Pagination';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const OffreCandidatureAdmin = () => {
  const redirect = useNavigate();
  const { getUrl, urlFile } = useContext(AuthContext);
  const [showCandidatureEnAttente, setShowCandidatureEnAttente] =
    useState(true);
  const [showCandidatureAccepte, setShowCandidatureAccepte] = useState(false);
  const [showCandidatureRefuse, setShowCandidatureRefuse] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const handleClickEnCours = () => {
    if (setShowCandidatureEnAttente) {
      setShowCandidatureEnAttente(true);
    } else {
      setShowCandidatureEnAttente(true);
    }
    setShowCandidatureAccepte(false);
    setShowCandidatureRefuse(false);
  };

  const handleClickAccepte = () => {
    setShowCandidatureEnAttente(false);
    if (setShowCandidatureAccepte) {
      setShowCandidatureAccepte(true);
    } else {
      setShowCandidatureAccepte(true);
    }
    setShowCandidatureRefuse(false);
  };

  const handleClickRefuse = () => {
    setShowCandidatureEnAttente(false);
    setShowCandidatureAccepte(false);
    if (setShowCandidatureRefuse) {
      setShowCandidatureRefuse(true);
    } else {
      setShowCandidatureRefuse(true);
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const effectRan = useRef(false);

  const [listeCandidat, setListeCandidat] = useState([]);
  const [uploadDocument, setUploadDocument] = useState();

  const validation = async (response, candidaId, offreId) => {
    await axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}api/offre/validatecv/${offreId}`,
      data: {
        candidatId: candidaId,
        isValideCV: response,
      },
    })
      .then((res) => {
        if (res.data.errors) {
        } else {
          redirect(`/offreCandidatureAdmin`);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const envoyerDocument = async (candidatId, offreId) => {
    if (uploadDocument) {
      const formData = new FormData();
      formData.append('candidatId', candidatId);
      formData.append('uploadDocument', uploadDocument);
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}api/offre/validatecv/${offreId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          redirect('/offreCandidatureAdmin');
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const idCandidat = [];
    const resultat = [];
    const cv = [];
    const lm = [];

    const getOffreComplet = async () => {
      const candidature = [];
      const idCandida = [];
      const idEntreprise = [];
      const getOffre = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/offre/valide/`,
      });

      // console.log(getOffre.data);

      // dans chaque liste de candidats on y ajout le titre de l'offre identreprise et aussie id offre
      for (let i = 0; i < getOffre.data.length; i++) {
        getOffre.data[i].listCandidat.forEach((entree) => {
          entree.idOffre = getOffre.data[i]._id;
          entree.idEntreprise = getOffre.data[i].offreId;
          entree.intitulePoste = getOffre.data[i].intitulePoste;
        });
        candidature.push(getOffre.data[i].listCandidat);
      }
      // console.log(candidature);

      // on transforme en une seule tableau la candidature
      const listeCandidatureGlobal = candidature.flat();
      // console.log("ETO listeCandidatureGlobal");
      // console.log(listeCandidatureGlobal);
      // console.log("ETO listeCandidat");
      // console.log(listeCandidat);
      // console.log(listeCandidatureGlobal);

      // on prend les informations des candidats
      for (let i = 0; i < listeCandidatureGlobal.length; i++) {
        idCandida.push(listeCandidatureGlobal[i].candidatId);
      }

      const getInfoCandidat = await Promise.all(
        idCandida.map((i) =>
          axios.get(`${process.env.REACT_APP_API_URL}api/user/candidat/${i}`)
        )
      );

      // on prend les informations des entreprises
      for (let i = 0; i < listeCandidatureGlobal.length; i++) {
        idEntreprise.push(listeCandidatureGlobal[i].idEntreprise);
      }
      const getInfoEntreprise = await Promise.all(
        idEntreprise.map((i) =>
          axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
          })
        )
      );

      // console.log(getInfoEntreprise[0].data);

      for (let i = 0; i < listeCandidatureGlobal.length; i++) {
        setListeCandidat((oldOffre) => [
          ...oldOffre,
          {
            idOffre: listeCandidatureGlobal[i].idOffre,
            candidatId: listeCandidatureGlobal[i].candidatId,
            cvpath: listeCandidatureGlobal[i].file1_path,
            lmpath: listeCandidatureGlobal[i].file2_path,
            isValideCV: listeCandidatureGlobal[i].isValideCV,
            resultat: listeCandidatureGlobal[i].resultat,
            documentTexte: listeCandidatureGlobal[i].documentTexte,
            intitulePoste: listeCandidatureGlobal[i].intitulePoste,
            nomEntreprise: getInfoEntreprise[i].data.nomEntreprise,
            nom: getInfoCandidat[i].data.nom,
            prenom: getInfoCandidat[i].data.prenom,
            email: getInfoCandidat[i].data.email,
            dateCandidature: listeCandidatureGlobal[i].date,
          },
        ]);
      }
    };

    if (effectRan.current === false) {
      getUrl();
      getOffreComplet();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  return (
    <div className="divValidation">
      <div className="innerValidation">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>

        <h2>Listes de tous les candidatures</h2>
        <div className="navAndTable">
          <div className="navigation">
            <h4
              onClick={handleClickEnCours}
              className={showCandidatureEnAttente ? 'active' : undefined}
            >
              Candidature en attente
              {/* [{attente.length}] */}
            </h4>

            <h4
              onClick={handleClickAccepte}
              className={showCandidatureAccepte ? 'active' : undefined}
            >
              Candidature acceptée
              {/* [{valide.length}] */}
            </h4>
            <h4
              onClick={handleClickRefuse}
              className={showCandidatureRefuse ? 'active' : undefined}
            >
              Candidature refusée
              {/* [{refuse.length}] */}
            </h4>
          </div>

          {/* En attente */}
          {showCandidatureEnAttente && (
            <form encType="multipart/form-data" className="divTable">
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
                      Liste des candidature en attente
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {listeCandidat.map(
                    (val) =>
                      val.isValideCV === undefined && (
                        <tr key={val._id}>
                          <td
                            style={{
                              textAlign: 'left',
                              paddingLeft: '15px',
                              background: 'rgb(227 170 66 / 35%)',
                            }}
                          >
                            <span>
                              <h4 style={{ fontFamily: 'poppinsBold' }}>
                                {val.nom} {val.prenom}
                              </h4>
                              <h4>
                                {moment(val.dateCandidature)
                                  .locale('fr')
                                  .format('LL')}
                              </h4>
                            </span>
                            <br />
                            <span>
                              <p>
                                {val.nomEntreprise} - {val.intitulePoste}
                              </p>
                              <span>
                                <a
                                  download
                                  href={`${urlFile.split('.com/')[0]}.com/${
                                    val.cvpath
                                  }`}
                                  className="validationLink"
                                >
                                  Telecharger CV
                                </a>
                                &nbsp;-&nbsp;
                                <a
                                  download
                                  href={`${urlFile.split('.com/')[0]}.com/${
                                    val.lmpath
                                  }`}
                                  className="validationLink"
                                >
                                  LM
                                </a>
                              </span>
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() =>
                                validation(true, val.candidatId, val.idOffre)
                              }
                              style={{
                                color: 'white',
                                backgroundColor: '#2e982e',
                                border: '1px solid #073407',
                              }}
                            >
                              Accepté
                            </button>
                            <button
                              style={{
                                color: 'white',
                                backgroundColor: '#c24949',
                                border: '1px solid #a74242',
                              }}
                              onClick={() =>
                                validation(false, val.candidatId, val.idOffre)
                              }
                            >
                              Refusé
                            </button>
                            <span>
                              <label
                                htmlFor="candidatuAttente"
                                style={{
                                  width: '80%',
                                  borderRadius: '5px 0 0 5px',
                                }}
                              >
                                Joindre un fichier
                              </label>
                              <input
                                type="file"
                                id="candidatuAttente"
                                hidden
                                onChange={(event) => {
                                  setUploadDocument(event.target.files[0]);
                                }}
                              />
                              <input
                                onClick={() =>
                                  envoyerDocument(val.candidatId, val.idOffre)
                                }
                                type="submit"
                                style={{
                                  margin: '5px 5px 5px 1px',
                                  borderRadius: '0 5px 5px 0',
                                }}
                                value="Valider"
                              />
                            </span>
                          </td>
                        </tr>
                      )
                  )}
                  {/* <tr>
                    <td
                      style={{
                        textAlign: "left",
                        paddingLeft: "15px",
                        background: "rgb(227 170 66 / 35%)",
                      }}
                    >
                      <span>
                        <h4 style={{ fontFamily: "poppinsBold" }}>
                          Maha Aubin
                        </h4>
                        <h4>13 fevrier 2023</h4>
                      </span>
                      <br />
                      <span>
                        <p>Retina - Vendeur de rue</p>
                        <span>
                          <a href="#" className="validationLink">
                            Telecharger CV
                          </a>
                          &nbsp;-&nbsp;
                          <a href="#" className="validationLink">
                            LM
                          </a>
                        </span>
                      </span>
                    </td>
                    <td>
                      <button
                        style={{
                          color: "white",
                          backgroundColor: "#2e982e",
                          border: "1px solid #073407",
                        }}
                      >
                        Accepté
                      </button>
                      <button
                        style={{
                          color: "white",
                          backgroundColor: "#c24949",
                          border: "1px solid #a74242",
                        }}
                      >
                        Refusé
                      </button>
                      <span>
                        <label
                          htmlFor="candidatuAttente"
                          style={{ width: "80%", borderRadius: "5px 0 0 5px" }}
                        >
                          Joindre un fichier
                        </label>
                        <input type="file" id="candidatuAttente" hidden />
                        <input
                          type="submit"
                          style={{
                            margin: "5px 5px 5px 1px",
                            borderRadius: "0 5px 5px 0",
                          }}
                          value="Valider"
                        />
                      </span>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </form>
          )}

          {/*  Accepté */}
          {showCandidatureAccepte && (
            <form encType="multipart/form-data" className="divTable">
              <table className="innerTable">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: '68%',
                        textAlign: 'left',
                        paddingLeft: '15px',
                      }}
                    >
                      Liste des candidatures accepté
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listeCandidat.map(
                    (val) =>
                      val.isValideCV === true && (
                        <tr>
                          <td
                            style={{
                              textAlign: 'left',
                              paddingLeft: '15px',
                              background: 'rgba(20, 220, 97, 0.346)',
                            }}
                          >
                            <span>
                              <h4 style={{ fontFamily: 'poppinsBold' }}>
                                {val.nom + ' ' + val.prenom}
                              </h4>
                              <h4>
                                {' '}
                                {moment(val.dateCandidature)
                                  .locale('fr')
                                  .format('LL')}
                              </h4>
                            </span>
                            <br />
                            <span>
                              <p>
                                {val.nomEntreprise} - {val.intitulePoste}
                              </p>
                              <span>
                                <a
                                  download
                                  href={`${urlFile.split('.com/')[0]}.com/${
                                    val.cvpath
                                  }`}
                                  className="validationLink"
                                >
                                  Telecharger CV
                                </a>
                                &nbsp;-&nbsp;
                                <a
                                  download
                                  href={`${urlFile.split('.com/')[0]}.com/${
                                    val.lmpath
                                  }`}
                                  className="validationLink"
                                >
                                  LM
                                </a>
                              </span>
                            </span>
                          </td>
                          <td>
                            {val.documentTexte !== undefined ? (
                              <span>
                                <label
                                  htmlFor="candidatureAccepted"
                                  style={{
                                    width: '80%',
                                    borderRadius: '5px 0 0 5px',
                                  }}
                                >
                                  Joindre un fichier
                                </label>
                                <input
                                  onChange={(event) => {
                                    setUploadDocument(event.target.files[0]);
                                  }}
                                  type="file"
                                  id="candidatureAccepted"
                                  hidden
                                />
                                <input
                                  onClick={() =>
                                    envoyerDocument(val.candidatId, val.idOffre)
                                  }
                                  type="submit"
                                  style={{
                                    margin: '5px 5px 5px 1px',
                                    borderRadius: '0 5px 5px 0',
                                  }}
                                  value="Valider"
                                />
                              </span>
                            ) : (
                              <span>Il y a un fichier</span>
                            )}
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </form>
          )}

          {/* Refusé */}
          {showCandidatureRefuse && (
            <form encType="multipart/form-data" className="divTable">
              <table className="innerTable">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: '68%',
                        textAlign: 'left',
                        paddingLeft: '15px',
                      }}
                    >
                      Liste des candidatures refusé
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listeCandidat.map(
                    (val) =>
                      val.isValideCV === false && (
                        <tr>
                          <td
                            style={{
                              textAlign: 'left',
                              paddingLeft: '15px',
                              background: 'rgb(227 170 66 / 35%)',
                            }}
                          >
                            <span>
                              <h4 style={{ fontFamily: 'poppinsBold' }}>
                                {val.nom + ' ' + val.prenom}
                              </h4>
                              <h4>
                                {' '}
                                {moment(val.dateCandidature)
                                  .locale('fr')
                                  .format('LL')}
                              </h4>
                            </span>
                            <br />
                            <span>
                              <p>
                                {val.nomEntreprise} - {val.intitulePoste}
                              </p>
                              <span>
                                <a
                                  download
                                  href={`${urlFile.split('.com/')[0]}.com/${
                                    val.cvpath
                                  }`}
                                  className="validationLink"
                                >
                                  Telecharger CV
                                </a>
                                &nbsp;-&nbsp;
                                <a
                                  download
                                  href={`${urlFile.split('.com/')[0]}.com/${
                                    val.lmpath
                                  }`}
                                  className="validationLink"
                                >
                                  LM
                                </a>
                              </span>
                            </span>
                          </td>
                          <td>
                            <button
                              style={{
                                width: '92%',
                                color: 'white',
                                backgroundColor: '#2e982e',
                                border: '1px solid #073407',
                              }}
                            >
                              Accepté
                            </button>
                            <span>
                              <label
                                htmlFor="candidatureRefuse"
                                style={{
                                  width: '80%',
                                  borderRadius: '5px 0 0 5px',
                                }}
                              >
                                Joindre un fichier
                              </label>
                              <input
                                type="file"
                                id="candidatureRefuse"
                                hidden
                                onChange={(event) => {
                                  setUploadDocument(event.target.files[0]);
                                }}
                              />
                              <input
                                type="submit"
                                style={{
                                  margin: '5px 5px 5px 1px',
                                  borderRadius: '0 5px 5px 0',
                                }}
                                value="Valider"
                                onClick={() =>
                                  envoyerDocument(val.candidatId, val.idOffre)
                                }
                              />
                            </span>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </form>
          )}
        </div>
        {/* {showCandidatureEnAttente && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={offreNonValide.length}
          paginate={paginate}
        />
      )}
      {showCandidatureAccepte && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={offreValide.length}
          paginate={paginate}
        />
      )}
      {showCandidatureRefuse && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={offreDEpublie.length}
          paginate={paginate}
        />
      )} */}
      </div>
    </div>
  );
};

export default OffreCandidatureAdmin;
