import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import 'moment/locale/fr';

import '../Assets/css/validation.scss';
import Pagination from '../Components/Pagination';

const ValidationOffre = () => {
  const redirect = useNavigate();
  const [offreValide, setOffreValide] = useState([]);
  const [offreNonValide, setOffreNonValide] = useState([]);
  const [offreDEpublie, setOffreDepublie] = useState([]);

  const [showOffreEnCours, setShowOffreEnCours] = useState(true);
  const [showOffreValider, setShowOffreValider] = useState(false);
  const [showOffreDepublier, setShowOffreDepublier] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const [isLoading, setIsLoading] = useState(' ');
  const [isValideLoading, setIsValideLoading] = useState(' ');
  const [isDepublieLoading, setIsDepublieLoading] = useState(' ');

  const effectRan = useRef(false);

  const handleClickEnCours = () => {
    if (setShowOffreEnCours) {
      setShowOffreEnCours(true);
    } else {
      setShowOffreEnCours(true);
    }
    setShowOffreValider(false);
    setShowOffreDepublier(false);
  };

  const handleClickValider = () => {
    setShowOffreEnCours(false);
    if (setShowOffreValider) {
      setShowOffreValider(true);
    } else {
      setShowOffreValider(true);
    }
    setShowOffreDepublier(false);
  };

  const handleClickDepublier = () => {
    setShowOffreEnCours(false);
    setShowOffreValider(false);
    if (setShowOffreDepublier) {
      setShowOffreDepublier(true);
    } else {
      setShowOffreDepublier(true);
    }
  };

  const depublieOffre = async (idOffre, statusOffre) => {
    const formData = new FormData();
    formData.append('depublie', statusOffre);
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/offre/update/${idOffre}`,
        formData
      )
      .then((res) => {
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getOffreValide = async () => {
      setIsValideLoading('Chargement ...');
      const idEntreprise = [];

      const getJOValide = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}api/offre/valide`,
      });
      for (let i = 0; i < getJOValide.data.length; i++) {
        idEntreprise.push(getJOValide.data[i].offreId);
      }
      const getEntreprise = await Promise.all(
        idEntreprise.map((i) =>
          axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
          })
        )
      );
      // console.log(getEntreprise[1].data.nomEntreprise);
      for (let i = 0; i < getJOValide.data.length; i++) {
        setOffreValide((oldOffre) => [
          ...oldOffre,
          {
            _id: getJOValide.data[i]._id,
            intitulePoste: getJOValide.data[i].intitulePoste, 
            isValidate: getJOValide.data[i].isValidate,
            depublie: getJOValide.data[i].depublie,
            createdAt: getJOValide.data[i].createdAt,
            nomEntreprise: getEntreprise[i].data.nomEntreprise,
          },
        ]);
      }
      offreValide.length === 0 &&
        setIsValideLoading('Aucune offre validée et publiée');
    };

    const getOffreNonValide = async () => {
      setIsLoading('Chargement ...');
      const idEntreprise = [];
      const getJOValide = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}api/offre/nonvalide`,
      });
      for (let i = 0; i < getJOValide.data.length; i++) {
        idEntreprise.push(getJOValide.data[i].offreId);
      }
      const getEntreprise = await Promise.all(
        idEntreprise.map((i) =>
          axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
          })
        )
      );
      // console.log(getEntreprise[1].data.nomEntreprise);
      for (let i = 0; i < getJOValide.data.length; i++) {
        setOffreNonValide((oldOffre) => [
          ...oldOffre,
          {
            _id: getJOValide.data[i]._id,
            intitulePoste: getJOValide.data[i].intitulePoste,
            isValidate: getJOValide.data[i].isValidate,
            depublie: getJOValide.data[i].depublie,
            createdAt: getJOValide.data[i].createdAt,
            nomEntreprise: getEntreprise[i].data.nomEntreprise,
          },
        ]);
      }
      offreNonValide.length === 0 &&
        setIsLoading('Aucune offre en cours de validation');
    };

    const getOffreDepublie = async () => {
      setIsDepublieLoading('Chargement ...');
      const idEntreprise = [];
      const getJOValide = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}api/offre/depublie`,
      });
      for (let i = 0; i < getJOValide.data.length; i++) {
        idEntreprise.push(getJOValide.data[i].offreId);
      }
      const getEntreprise = await Promise.all(
        idEntreprise.map((i) =>
          axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
          })
        )
      );
      // console.log(getEntreprise[1].data.nomEntreprise);
      for (let i = 0; i < getJOValide.data.length; i++) {
        setOffreDepublie((oldOffre) => [
          ...oldOffre,
          {
            _id: getJOValide.data[i]._id,
            intitulePoste: getJOValide.data[i].intitulePoste,
            isValidate: getJOValide.data[i].isValidate,
            depublie: getJOValide.data[i].depublie,
            createdAt: getJOValide.data[i].createdAt,
            nomEntreprise: getEntreprise[i].data.nomEntreprise,
          },
        ]);
      }
      offreDEpublie.length === 0 &&
        setIsDepublieLoading('Aucune offre dépubliée');
    };

    if (effectRan.current === false) {
      getOffreNonValide();
      getOffreValide();
      getOffreDepublie();
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
    <div className="divValidation">
      <div className="innerValidation">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Validation des offres</h2>
        <Link to="/offreCandidatureAdmin">
          <button className="btnAjout">Validation des candidatures</button>
        </Link>
        <div className="navAndTable">
          <div className="navigation">
            <h4
              onClick={handleClickEnCours}
              className={showOffreEnCours ? 'active' : undefined}
            >
              En cours de validation [{offreNonValide.length}]
            </h4>
            <h4
              onClick={handleClickValider}
              className={showOffreValider ? 'active' : undefined}
            >
              Validée et publiée [{offreValide.length}]
            </h4>
            <h4
              onClick={handleClickDepublier}
              className={showOffreDepublier ? 'active' : undefined}
            >
              Depubliée [{offreDEpublie.length}]
            </h4>
          </div>

          {/* En cours de validation */}
          {showOffreEnCours && (
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
                      Liste des offre en cours de validation
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {offreNonValide.length > 0 ? (
                    offreNonValide
                      .slice(indexOfFirstPost, indexOfLastPost)
                      .map((val, key) => {
                        return (
                          <tr key={val._id}>
                            {val.isValidate === false && (
                              <td
                                style={{
                                  textAlign: 'left',
                                  paddingLeft: '15px',
                                  background: 'rgb(227 170 66 / 35%)',
                                }}
                              >
                                <span>
                                  <h4 style={{ fontFamily: 'poppinsBold' }}>
                                    {!val.isValidate && val.intitulePoste}
                                  </h4>
                                  <h4>{val.nomEntreprise}</h4>
                                </span>
                                <p>
                                  {moment(val.createdAt)
                                    .locale('fr')
                                    .format('LL')}
                                </p>
                              </td>
                            )}
                            {val.isValidate === false && (
                              <td>
                                <Link to={`/detailOffreGlobale/${val._id}`}>
                                  <button style={{ border: 'none' }}>
                                    Details
                                  </button>
                                </Link>
                                <Link to={`/candidatureOffre/${val._id}`}>
                                  <button>Talent</button>
                                </Link>
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
          )}

          {/*  Validée et publiée */}
          {showOffreValider && (
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
                      Liste des offres validées et publiées
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {offreValide.length > 0 ? (
                    offreValide
                      .slice(indexOfFirstPost, indexOfLastPost)
                      .map((val, key) => {
                        return (
                          <tr key={val._id}>
                            {val.isValidate === true &&
                              val.depublie === false && (
                                <td
                                  style={{
                                    textAlign: 'left',
                                    paddingLeft: '15px',
                                    background: 'rgba(20, 220, 97, 0.346)',
                                  }}
                                >
                                  <span>
                                    <h4 style={{ fontFamily: 'poppinsBold' }}>
                                      {val.isValidate && val.intitulePoste}
                                    </h4>
                                    <h4>{val.nomEntreprise}</h4>
                                  </span>
                                  <span>
                                    <p>
                                      {moment(val.createdAt)
                                        .locale('fr')
                                        .format('LL')}
                                    </p>
                                    <Link
                                      to={`/validationCvLm/${val._id}`}
                                      className="validationLink"
                                    >
                                      Liste des CVs et LMs
                                    </Link>
                                  </span>
                                </td>
                              )}
                            {val.isValidate === true &&
                              val.depublie === false && (
                                <td>
                                  <Link to={`/detailOffreGlobale/${val._id}`}>
                                    <button style={{ border: 'none' }}>
                                      Details
                                    </button>
                                  </Link>
                                  <Link to={`/candidatureOffre/${val._id}`}>
                                    <button>Talent</button>
                                  </Link>
                                  {val.depublie === true ? (
                                    <button
                                      style={{ border: 'none' }}
                                      onClick={() =>
                                        depublieOffre(val._id, false)
                                      }
                                    >
                                      Publier
                                    </button>
                                  ) : (
                                    <button
                                      style={{ border: 'none' }}
                                      onClick={() =>
                                        depublieOffre(val._id, true)
                                      }
                                    >
                                      Depublier
                                    </button>
                                  )}
                                </td>
                              )}
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td>{isValideLoading}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {/* Depubliée */}
          {showOffreDepublier && (
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
                      Liste des offres depubliées
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {offreDEpublie.length > 0 ? (
                    offreDEpublie
                      .slice(indexOfFirstPost, indexOfLastPost)
                      .map((val, key) => {
                        return (
                          <tr key={val._id}>
                            {val.isValidate === true &&
                              val.depublie === true && (
                                <td
                                  style={{
                                    textAlign: 'left',
                                    paddingLeft: '15px',
                                    background: 'rgb(227 170 66 / 35%)',
                                  }}
                                >
                                  <span>
                                    <h4 style={{ fontFamily: 'poppinsBold' }}>
                                      {val.intitulePoste}
                                    </h4>
                                    <h4>{val.nomEntreprise}</h4>
                                  </span>
                                  <span></span>
                                  <p>
                                    {moment(val.createdAt)
                                      .locale('fr')
                                      .format('LL')}
                                  </p>
                                </td>
                              )}
                            {val.isValidate === true &&
                              val.depublie === true && (
                                <td>
                                  <Link to={`/detailOffreGlobale/${val._id}`}>
                                    <button style={{ border: 'none' }}>
                                      Details
                                    </button>
                                  </Link>
                                  <Link to={`/candidatureOffre/${val._id}`}>
                                    <button>Talent</button>
                                  </Link>
                                  {val.depublie === true ? (
                                    <button
                                      style={{ border: 'none' }}
                                      onClick={() =>
                                        depublieOffre(val._id, false)
                                      }
                                    >
                                      Publier
                                    </button>
                                  ) : (
                                    <button
                                      style={{ border: 'none' }}
                                      onClick={() =>
                                        depublieOffre(val._id, true)
                                      }
                                    >
                                      Depublier
                                    </button>
                                  )}
                                </td>
                              )}
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td>{isDepublieLoading}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {showOffreEnCours && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={offreNonValide.length}
            paginate={paginate}
          />
        )}
        {showOffreValider && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={offreValide.length}
            paginate={paginate}
          />
        )}
        {showOffreDepublier && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={offreDEpublie.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default ValidationOffre;
