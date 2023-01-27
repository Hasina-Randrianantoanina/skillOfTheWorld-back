import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { FaRegCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/fr";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet";

import "../Assets/css/offreglobale.scss";
import ets_img from "../Assets/img/SOTW_logo (2).webp";
import Pagination from "../Components/Pagination";

const ListeEventGobale = () => {
  const redirect = useNavigate();
  const { candidat } = useContext(AuthContext);

  const effectRan = useRef(false);

  const [champ, setChamp] = useState(false);
  const [eventValide, setEventValide] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [postsPerPage] = useState(10);

  useEffect(() => {
    const getEventPublie = async () => {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}api/evenement/publie`,
      })
        .then((res) => {
          setEventValide(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (effectRan.current === false) {
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
    <div className="outerDivOffre">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Skill of the World</title>
        <meta name="keywords" content="Marque Employeur, Recrutement développeur" />
      </Helmet>
      <div className="innerDivOffre  ">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {" "}
          &#60; Retour
        </p>
        <h2>Nos évènements</h2>
        {candidat && (
          <>
            <div className="divTop">
              <div className="cardObjectif">
                <div className="value">
                  <p>
                    SOTW organise des évènements pour les Entreprises et aussi pour 
                   <b> accompagner les candidats.</b> 
                  </p>
                  <br />
                  <p>
                    Certains sont privés (ils sont mentionnés comme tels) –
                    D’autres sont publics.
                  </p>
                  <br />
                  <p>
                    Vous recevrez une notification automatique de notre part.
                  </p>
                  <p>
                    <b>N’hésitez pas à vous inscrire !</b>
                  </p>
                </div>
                <div className="imgValue" style={{ height: "145px" }}>
                  <img src={ets_img} alt="Logo de Skill of the world" />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Section Recherche */}
        <form className="divRecherche">
          <input
            type="search"
            name="offreSearch"
            placeholder="Thème de l'évènement"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          {/* <button className="searchBtn">Rechercher</button> */}
        </form>
        {/* <button className="searchBtnAdv" onClick={() => setChamp(!champ)}>
          Recherche avancée
        </button> */}

        {champ && (
          <form className="champ">
            {/* Nom de l'entreprise  */}
            <input
              style={{ marginBottom: "10px", marginRight: "0" }}
              type="text"
              name="etsName"
              placeholder="Nom de l'entreprise"
            />

            {/* Theme de l'évènement  */}
            <input
              style={{ marginBottom: "10px", marginRight: "0" }}
              type="text"
              name="eventName"
              placeholder="Thème de l'évènement"
            />
            <br />
            <button className="searchAdvanced">Rechercher</button>
          </form>
        )}
        {/* Fin section Recherche */}

        <div className="forCardOffre">
          {eventValide.length > 0 ? (
            query !== "" ? (
              eventValide
                .filter((val) => val.theme.toLowerCase().includes(query))
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((val, index) => {
                  return (
                    <div className="card" key={index}>
                      <div className="titre">
                        <h5>{val.theme}</h5>
                      </div>
                      <h5>Organisé par {val.nomEntreprise}</h5>
                      <div className="forBtn">
                        <div className="calendar">
                          <IconContext.Provider
                            value={{
                              color: "#0000008f",
                              size: "13px",
                            }}
                          >
                            <FaRegCalendar />
                          </IconContext.Provider>
                          <h5>
                            {moment(val.dateEvenement)
                              .locale("fr")
                              .format("LL")}
                          </h5>
                        </div>
                        <Link to={`/detailEvent/${val._id}`}>
                          <button>Voir détails</button>
                        </Link>
                      </div>
                    </div>
                  );
                })
            ) : (
              eventValide
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((val, index) => {
                  return (
                    <div className="card" key={index}>
                      <div className="titre">
                        <h5>{val.theme}</h5>
                      </div>
                      {/* <h5>Organisé par {val.nomEntreprise}</h5> */}
                      <div className="forBtn">
                        <div className="calendar">
                          <IconContext.Provider
                            value={{
                              color: "#0000008f",
                              size: "13px",
                            }}
                          >
                            <FaRegCalendar />
                          </IconContext.Provider>
                          <h5>
                            {moment(val.dateEvenement)
                              .locale("fr")
                              .format("LL")}
                          </h5>
                        </div>
                        <Link to={`/detailEvent/${val._id}`}>
                          <button>Voir détails</button>
                        </Link>
                      </div>
                    </div>
                  );
                })
            )
          ) : (
            <span style={{ textAlign: "center", width: "100%" }}>
              {eventValide ? 'Chargement ...' : "Pas encore d'évènement ajouté"}
            </span>
          )}
        </div>
        {eventValide.length > 0 && (
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

export default ListeEventGobale;
