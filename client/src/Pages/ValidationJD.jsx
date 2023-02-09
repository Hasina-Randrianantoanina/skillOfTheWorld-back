import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import 'moment/locale/fr';

import '../Assets/css/validation.scss';
import Pagination from '../Components/Pagination';

const ValidatioJD = () => {
  const redirect = useNavigate();
  const effectRan = useRef(false);
  // const { uid, candidat, entreprise, admin } = useContext(AuthContext);
  const [jobdatingPublie, setJobdatingPublie] = useState([]);
  const [jobdatingNonPublie, setJobdatingNonPublie] = useState([]);

  const [showJdNonPublier, setShowJdNonPublier] = useState(true);
  const [showJdPublier, setShowJdPublier] = useState(false);

  const [isNonPublieLoading, setIsNonPublieLoading] = useState(" ");
  const [isLoading, setIsLoading] = useState(" ");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const handleClickEnCours = () => {
    if (setShowJdNonPublier) {
      setShowJdNonPublier(true);
    } else {
      setShowJdNonPublier(true);
    }
    setShowJdPublier(false);
  };

  const handleClickValider = () => {
    setShowJdNonPublier(false);
    if (setShowJdPublier) {
      setShowJdPublier(true);
    } else {
      setShowJdPublier(true);
    }
  };
  const getJDNonpublie = async () => {
    setIsNonPublieLoading("Chargement ...");
    const idEntreprise = [];

    const getJDNonpublie = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}api/jobdating/notpublie/`,
    });

    for (let i = 0; i < getJDNonpublie.data.length; i++) {
      idEntreprise.push(getJDNonpublie.data[i].entrepriseId);
    }
    const getEntreprise = await Promise.all(
      idEntreprise.map((i) =>
        axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
        })
      )
    );
    for (let i = 0; i < getJDNonpublie.data.length; i++) {
      setJobdatingNonPublie((oldOffre) => [
        ...oldOffre,
        {
          _id: getJDNonpublie.data[i]._id,
          intitulePoste: getJDNonpublie.data[i].intitulePoste,
          createdAt: getJDNonpublie.data[i].createdAt,
          nomEntreprise: getEntreprise[i].data.nomEntreprise,
        },
      ]);
    }
    jobdatingNonPublie.length === 0 && setIsNonPublieLoading("Aucune job dating");
  };

  const getJDpublie = async () => {
    setIsLoading("Chargement ...")
    const idEntreprise = [];

    const getJDPublie = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}api/jobdating/publie/`,
    });

    for (let i = 0; i < getJDPublie.data.length; i++) {
      idEntreprise.push(getJDPublie.data[i].entrepriseId);
    }
    const getEntreprise = await Promise.all(
      idEntreprise.map((i) =>
        axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
        })
      )
    );

    for (let i = 0; i < getJDPublie.data.length; i++) {
      setJobdatingPublie((oldOffre) => [
        ...oldOffre,
        {
          _id: getJDPublie.data[i]._id,
          intitulePoste: getJDPublie.data[i].intitulePoste,
          createdAt: getJDPublie.data[i].createdAt,
          nomEntreprise: getEntreprise[i].data.nomEntreprise,
        },
      ]);
    }
    jobdatingPublie.length === 0 && setIsLoading("Aucune job dating publiée");
  };

  useEffect(() => {
    if (effectRan.current === false) {
      getJDNonpublie();
      getJDpublie();
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
        <h2>Publication des job dating</h2>
        <Link to="/organiserJD">
          <button className="btnAjout">Organiser un job dating</button>
        </Link>
        <div className="navAndTable">
          <div className="navigation">
            <h4
              onClick={handleClickEnCours}
              className={showJdNonPublier ? 'active' : undefined}
            >
              Non-publiée [{jobdatingNonPublie.length}]
            </h4>
            <h4
              onClick={handleClickValider}
              className={showJdPublier ? 'active' : undefined}
            >
              Publiée [{jobdatingPublie.length}]
            </h4>
          </div>

          {/* Non-publiée */}
          {showJdNonPublier && (
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
                      Liste des job dating non-publiées
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobdatingNonPublie.length > 0 ? (
                    jobdatingNonPublie
                      .slice(indexOfFirstPost, indexOfLastPost)
                      .map((val, key) => {
                        return (
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
                            <td>
                              <Link to={`/detailJD/${val._id}`}>
                                <button style={{ border: 'none' }}>
                                  Details
                                </button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td>{isNonPublieLoading}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/*  Publiée */}
          {showJdPublier && (
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
                      Liste des job dating publiées
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobdatingPublie.length > 0 ? (
                    jobdatingPublie
                      .slice(indexOfFirstPost, indexOfLastPost)
                      .map((val, key) => {
                        return (
                          <tr key={val._id}>
                            <td
                              style={{
                                textAlign: 'left',
                                paddingLeft: '15px',
                                background: 'rgba(20, 220, 97, 0.346)',
                              }}
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
                            <td>
                              <Link to={`/detailJD/${val._id}`}>
                                <button style={{ border: 'none' }}>
                                  Details
                                </button>
                              </Link>
                            </td>
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
        </div>
        {showJdNonPublier && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={jobdatingNonPublie.length}
            paginate={paginate}
          />
        )}
        {showJdPublier && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={jobdatingPublie.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default ValidatioJD;
