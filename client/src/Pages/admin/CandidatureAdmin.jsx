import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { confirmAlert } from "react-confirm-alert";
import { toast } from 'react-toastify';

import "../../Assets/css/historique.scss";
import Pagination from "../../Components/Pagination";

const CandidatureAdmin = () => {
  const redirect = useNavigate();
  const effectRan = useRef(false);

  // const [showOffre, setShowOffre] = useState(true);
  // const [showJD, setShowJD] = useState(false);
  // const [showEvent, setShowEvent] = useState(false);

  // const handleClickOffre = () => {
  //   if (setShowOffre) {
  //     setShowOffre(true);
  //   } else {
  //     setShowOffre(true);
  //   }
  //   setShowJD(false);
  //   setShowEvent(false);
  // };

  // const handleClickJD = () => {
  //   setShowOffre(false);
  //   if (setShowJD) {
  //     setShowJD(true);
  //   } else {
  //     setShowJD(true);
  //   }
  //   setShowEvent(false);
  // };

  // const handleClickEvent = () => {
  //   setShowOffre(false);
  //   setShowJD(false);
  //   if (setShowEvent) {
  //     setShowEvent(true);
  //   } else {
  //     setShowEvent(true);
  //   }
  // };

  const [candidat, setCandidat] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const deleteSuccess = () =>
    toast.success('Candidat supprimé avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const deleteCandidat = async (idCandidat) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/user/candidat/delete/${idCandidat}`,
    })
      .then((res) => {
        window.location.reload(false);
        redirect("/CandidatureAdmin");
        deleteSuccess();
      })
      .then((error) => {
        console.log(error);
      });
  };
  const submitFile = (idCandidat) => {
    confirmAlert({
      title: "Suppression",
      message: "Supprimer le candidat ?",
      buttons: [
        {
          label: "Supprimer",
          onClick: () => deleteCandidat(idCandidat),
        },
        {
          label: "Annuler",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  };

  useEffect(() => {
    const getOffre = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/user/candidat/`,
      })
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            setCandidat(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (effectRan.current === false) {
      getOffre();
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
    <div className="divHistorique">
      <div className="innerHistorique">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {" "}
          &#60; Retour
        </p>
        <h2>Candidature</h2>
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

          {/* OFFRE */}
          <div className="divTable">
            <table className="innerTable">
              <thead>
                <tr>
                  <th
                    style={{
                      width: "75%",
                      textAlign: "left",
                      paddingLeft: "15px",
                    }}
                  >
                    Liste des candidats
                  </th>
                  <th>Nombre d'action (offre)</th>
                </tr>
              </thead>
              <tbody>
                {candidat.length === 0 && (
                  <tr>
                    <td>Aucun candidat inscrit</td>
                  </tr>
                )}
                {candidat.length > 0 &&
                  candidat
                    .slice(indexOfFirstPost, indexOfLastPost)
                    .map((val, key) => {
                      return (
                        <tr key={val._id}>
                          <td
                            style={{ textAlign: "left", paddingLeft: "15px" }}
                          >
                            <span>
                              {val.nom} {val.prenom}
                            </span>
                            <span>
                              <b>[{val.email}]</b>
                            </span>
                          </td>
                          <td>
                            <button className="nbrAction">
                              {val.nombreAction}
                            </button>
                            <button
                              className="deleteAction"
                              onClick={() => submitFile(val._id)}
                            >
                              <IconContext.Provider value={{ size: "12px" }}>
                                <FaRegTrashAlt />
                              </IconContext.Provider>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
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
                      Liste des candidats (job dating)
                    </th>
                    <th>Nombre d'action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      <span>
                        PIRAUDON Elsa
                      </span>
                      <span>
                        <b>[elsa@gmail.com]</b>
                      </span>
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
                      Liste des candidats (évènement)
                    </th>
                    <th>Nombre d'action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      <span>
                        RAZAKAMANANTSOA Antsarivelo Tsaroana
                      </span>
                      <span>
                        <b>[tsaroana@gmail.com]</b>
                      </span>
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
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={candidat.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default CandidatureAdmin;
