import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import "moment/locale/fr";

import "../../Assets/css/validation.scss";
import Pagination from "../../Components/Pagination";

const OffreCandidatureAdmin = () => {
  const redirect = useNavigate();

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
  return (
    <div className="divValidation">
      <div className="innerValidation">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {" "}
          &#60; Retour
        </p>
        <h2>Liste de tous les candidatures</h2>
        <div className="navAndTable">
          <div className="navigation">
            <h4
              onClick={handleClickEnCours}
              className={showCandidatureEnAttente ? "active" : undefined}
            >
              Candidature en attente
            </h4>
            <h4
              onClick={handleClickAccepte}
              className={showCandidatureAccepte ? "active" : undefined}
            >
              Candidature acceptée
            </h4>
            <h4
              onClick={handleClickRefuse}
              className={showCandidatureRefuse ? "active" : undefined}
            >
              Candidature refusée
            </h4>
          </div>

          {/* En attente */}
          {showCandidatureEnAttente && (
            <form className="divTable">
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
                      Liste des candidature en attente
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
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
                        <a href="#" className="validationLink">
                          Telecharger CV et LM
                        </a>
                      </span>
                    </td>
                    <td>
                      <button>Accepté</button>
                      <button>Refusé</button>
                      <span>
                      <label
                          htmlFor="candidatuAttente"
                          style={{ width: "92%" }}
                        >
                          Joindre un fichier
                        </label>
                        <input
                          type="file"
                          id="candidatuAttente"
                          hidden
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          )}

          {/*  Accepté */}
          {showCandidatureAccepte && (
            <form className="divTable">
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
                      Liste des candidatures accepté
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        paddingLeft: "15px",
                        background: "rgba(20, 220, 97, 0.346)",
                      }}
                    >
                      <span>
                        <h4 style={{ fontFamily: "poppinsBold" }}>
                          Antsa Tsaroana
                        </h4>
                        <h4>09 Mars 2023</h4>
                      </span>
                      <br />
                      <span>
                        <p>Retina - Vendeur de rue</p>
                        <a href="#" className="validationLink">
                          Telecharger CV et LM
                        </a>
                      </span>
                    </td>
                    <td>
                    <label
                          htmlFor="candidatureAccepted"
                          style={{ width: "92%" }}
                        >
                          Joindre un fichier
                        </label>
                        <input
                          type="file"
                          id="candidatureAccepted"
                          hidden
                        />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          )}

          {/* Refusé */}
          {showCandidatureRefuse && (
            <form className="divTable">
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
                      Liste des candidatures refusé
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        textAlign: "left",
                        paddingLeft: "15px",
                        background: "rgb(227 170 66 / 35%)",
                      }}
                    >
                      <span>
                        <h4 style={{ fontFamily: "poppinsBold" }}>Hasina</h4>
                        <h4>23 Février 2023</h4>
                      </span>
                      <br />
                      <span>
                        <p>Retina - Vendeur de rue</p>
                        <a href="#" className="validationLink">
                          Telecharger CV et LM
                        </a>
                      </span>
                    </td>
                    <td>
                      <span
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <button style={{ width: "92%" }}>Accepté</button>
                        <label
                          htmlFor="candidatureRefuse"
                          style={{ width: "92%" }}
                        >
                          Joindre un fichier
                        </label>
                        <input
                          type="file"
                          id="candidatureRefuse"
                          hidden
                        />
                      </span>
                    </td>
                  </tr>
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
