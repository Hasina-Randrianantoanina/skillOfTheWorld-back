import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment/moment';
import 'moment/locale/fr';

import '../Assets/css/validation.scss';

import Pagination from '../Components/Pagination';

const ValidationEvent = () => {
  // const { uid, admin } = useContext(AuthContext);
  const effectRan = useRef(false);
  const redirect = useNavigate();

  const [showEventNonPublier, setShowEventNonPublier] = useState(true);
  const [showEventPublier, setShowEventPublier] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const handleClickEnCours = () => {
    if (setShowEventNonPublier) {
      setShowEventNonPublier(true);
    } else {
      setShowEventNonPublier(true);
    }
    setShowEventPublier(false);
  };

  const handleClickValider = () => {
    setShowEventNonPublier(false);
    if (setShowEventPublier) {
      setShowEventPublier(true);
    } else {
      setShowEventPublier(true);
    }
  };
  const [eventValide, setEventValide] = useState([]);
  const [eventNonValide, setEventNonValide] = useState([]);

  const getEventNotPublie = async () => {
    const idEntreprise = [];

    const getEventNotPublie = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}api/evenement/notpublie`,
    });

    for (let i = 0; i < getEventNotPublie.data.length; i++) {
      idEntreprise.push(getEventNotPublie.data[i].idEntreprise);
    }
    const getEntreprise = await Promise.all(
      idEntreprise.map((i) =>
        axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
        })
      )
    );

    for (let i = 0; i < getEventNotPublie.data.length; i++) {
      setEventNonValide((oldOffre) => [
        ...oldOffre,
        {
          _id: getEventNotPublie.data[i]._id,
          theme: getEventNotPublie.data[i].theme,
          createdAt: getEventNotPublie.data[i].createdAt,
          nomEntreprise: getEntreprise[i].data.nomEntreprise,
        },
      ]);
    }
  };
  const getEventPublie = async () => {
    const idEntreprise = [];

    const getEventPublie = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}api/evenement/publie`,
    });

    for (let i = 0; i < getEventPublie.data.length; i++) {
      idEntreprise.push(getEventPublie.data[i].idEntreprise);
    }
    const getEntreprise = await Promise.all(
      idEntreprise.map((i) =>
        axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
        })
      )
    );

    for (let i = 0; i < getEventPublie.data.length; i++) {
      setEventValide((oldOffre) => [
        ...oldOffre,
        {
          _id: getEventPublie.data[i]._id,
          theme: getEventPublie.data[i].theme,
          createdAt: getEventPublie.data[i].createdAt,
          nomEntreprise: getEntreprise[i].data.nomEntreprise,
        },
      ]);
    }
  };

  useEffect(() => {
    if (effectRan.current === false) {
      getEventNotPublie();
      getEventPublie();
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
        <h2>Publication des évènemets</h2>
        <Link to="/organiserEvent">
          <button className="btnAjout">Organiser un évènement</button>
        </Link>
        <div className="navAndTable">
          <div className="navigation">
            <h4
              onClick={handleClickEnCours}
              className={showEventNonPublier ? 'active' : undefined}
            >
              Non-publiée [{eventNonValide.length}]
            </h4>
            <h4
              onClick={handleClickValider}
              className={showEventPublier ? 'active' : undefined}
            >
              Publiée [{eventValide.length}]
            </h4>
          </div>

          {/* Non-publiée */}
          {showEventNonPublier && (
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
                      Liste des évènements non-publiées
                    </th>
                    <th>Action </th>
                  </tr>
                </thead>
                <tbody>
                  {eventNonValide.length > 0 ? (
                    eventNonValide
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
                                  {val.theme}
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
                              <Link to={`/detailEvent/${val._id}`}>
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
                      <td>{eventNonValide.length > 0 ? "Chargement ..." : "Pas encore d'evènement"}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/*  Publiée */}
          {showEventPublier && (
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
                      Liste des évènements publiées
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {eventValide.length > 0 ? (
                    eventValide
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
                                  {val.theme}
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
                              <Link to={`/detailEvent/${val._id}`}>
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
                      <td>{eventValide.length > 0 ? "Chargement ..." : "Pas encore d'evènement"}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {showEventNonPublier && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={eventNonValide.length}
            paginate={paginate}
          />
        )}
        {showEventPublier && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={eventValide.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default ValidationEvent;
