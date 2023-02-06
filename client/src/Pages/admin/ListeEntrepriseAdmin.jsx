import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import 'moment/locale/fr';

import '../../Assets/css/historique.scss';
import Pagination from '../../Components/Pagination';

const ListeEntrepriseAdmin = () => {
  const redirect = useNavigate();
  const effectRan = useRef(false);

  //   const [showOffre, setShowOffre] = useState(true);
  //   const [showJD, setShowJD] = useState(false);
  //   const [showEvent, setShowEvent] = useState(false);
  const [societe, setSociete] = useState([]);

  //   const handleClickOffre = () => {
  //     if (setShowOffre) {
  //       setShowOffre(true);
  //     } else {
  //       setShowOffre(true);
  //     }
  //     setShowJD(false);
  //     setShowEvent(false);
  //   };

  //   const handleClickJD = () => {
  //     setShowOffre(false);
  //     if (setShowJD) {
  //       setShowJD(true);
  //     } else {
  //       setShowJD(true);
  //     }
  //     setShowEvent(false);
  //   };

  //   const handleClickEvent = () => {
  //     setShowOffre(false);
  //     setShowJD(false);
  //     if (setShowEvent) {
  //       setShowEvent(true);
  //     } else {
  //       setShowEvent(true);
  //     }
  //   };

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const deleteSuccess = () =>
    toast.success('Entreprise supprimé avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteEntreprise = async (idEntreprise) => {
    await axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}api/user/entreprise/delete/${idEntreprise}`,
    })
      .then((res) => {
        window.location.reload(false);
        redirect('/listeEntrepriseAdmin');
        deleteSuccess();
      })
      .then((error) => {
        console.log(error);
      });
  };

  const submitFile = (idEntreprise) => {
    confirmAlert({
      title: 'Suppression',
      message: 'Supprimer le candidat ?',
      buttons: [
        {
          label: 'Supprimer',
          onClick: () => deleteEntreprise(idEntreprise),
        },
        {
          label: 'Annuler',
          onClick: () => console.log('Click No'),
        },
      ],
    });
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  useEffect(() => {
    const getEntreprise = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/user/entreprise/`,
      })
        .then((res) => {
          setSociete(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (effectRan.current === false) {
      getEntreprise();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <div className="divHistorique">
      <div className="innerHistorique">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Liste des entreprises</h2>
        <div className="navAndTable">
          {/* <div className="navigation">
            <h4
              onClick={handleClickOffre}
              className={showOffre ? "active" : undefined}
            >
              Offre
            </h4>
            <h4
              onClick={handleClickJD}
              className={showJD ? "active" : undefined}
            >
              Job Dating
            </h4>
            <h4
              onClick={handleClickEvent}
              className={showEvent ? "active" : undefined}
            >
              Evènement
            </h4>
          </div> */}

          {/* Liste des entreprises */}
          <div className="divTable">
            <form className="filterEts">
              <input
                type="search"
                name="offreSearch"
                placeholder="Recherche : Nom de l'entreprise, pays, date ..."
              />
            </form>
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
                    Liste des Entreprises
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {societe.length > 0 ? (
                  societe.map((val, key) => {
                    return (
                      <tr key={val._id}>
                        <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
                          <span>
                            <b>{val.nomEntreprise}</b>
                            <h4>
                              {moment(val.createdAt).locale('fr').format('LL')}
                            </h4>
                          </span>
                          <span>{val.lieuxActivite}</span>
                        </td>
                        <td>
                          <Link to={`/detailEtsAdmin/${val._id}`}>
                            <button>Détail</button>
                          </Link>
                          <button
                            className="deleteAction"
                            onClick={() => submitFile(val._id)}
                          >
                            <IconContext.Provider value={{ size: '12px' }}>
                              <FaRegTrashAlt />
                            </IconContext.Provider>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>Aucun entreprise inscrit</td>
                  </tr>
                )}
              </tbody>

              {/* 
              <tbody>
                <tr>
                  <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
                    <span>
                      <b>Retina Corps</b>
                      <h4>19 octobre 2023</h4>
                    </span>
                    <span>Madagasikara - Antananarivo</span>
                  </td>
                  <td>
                    <Link to="/detailEtsAdmin">
                      <button>Détail</button>
                    </Link>
                    <button className="deleteAction">
                      <IconContext.Provider value={{ size: '12px' }}>
                        <FaRegTrashAlt />
                      </IconContext.Provider>
                    </button>
                  </td>
                </tr>
              </tbody> */}
            </table>
          </div>

          {/* Job Dating */}
          {/* {showJD && (
            <div className="divTable">
              <table class="innerTable">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "75%",
                        textAlign: "left",
                        paddingLeft: "15px",
                      }}
                    >
                      Liste des entreprises (job dating)
                    </th>
                    <th>Nombre d'action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      <span>
                        <b>Economika</b>
                        <h4>07 Juin 2023</h4>
                      </span>
                      <span>France - Paris</span>
                    </td>
                    <td>
                      <button className="nbrAction">8</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )} */}

          {/* Evènement */}
          {/* {showEvent && (
            <div className="divTable">
              <table class="innerTable">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "75%",
                        textAlign: "left",
                        paddingLeft: "15px",
                      }}
                    >
                      Liste des entreprises (évènement)
                    </th>
                    <th>Nombre d'action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      <span>
                        <b>Manager de demain</b>
                        <h4>13 Fevrier 2023</h4>
                      </span>
                      <span>Madagascar - Antananarivo</span>
                    </td>
                    <td>
                      <button className="nbrAction">5</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )} */}
        </div>
        {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={candidat.length}
          paginate={paginate}
        /> */}
      </div>
    </div>
  );
};

export default ListeEntrepriseAdmin;
