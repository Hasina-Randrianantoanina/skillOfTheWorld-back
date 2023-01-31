import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { IoExitOutline, IoPersonCircleOutline } from "react-icons/io5";
import axios from "axios";

import "../Assets/css/navbarAdmin.scss";
import "../Assets/css/index.scss";
import logo from "../Assets/img/SOTW_logo (2).webp";
import profil3 from "../Assets/img/profil/defaultProfil.webp";

const NavbarAdmin = () => {
  const url = window.location.pathname;

  const redirect = useNavigate();

  const deconnexion = async () => {
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/user/admin/logout`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("Vous êtes déconnecté");
          redirect("/");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Desktop
  const [accueil, setAccueil] = useState(false);
  const [dropdownOffre, setdropdownOffre] = useState(false);
  const [dropdownJobDating, setDropdownJobDating] = useState(false);
  const [dropdownEvent, setDropdownEvent] = useState(false);
  const [dropdownArticle, setDropdownArticle] = useState(false);
  const [dropdownHistorique, setDropdownHistorique] = useState(false);

  // Mobile
  const [accueilResp, setAccueilResp] = useState(false);
  const [dropdownOffreResp, setdropdownOffreResp] = useState(false);
  const [dropdownJobDatingResp, setDropdownJobDatingResp] = useState(false);
  const [dropdownEventResp, setDropdownEventResp] = useState(false);
  const [dropdownArticleResp, setDropdownArticleResp] = useState(false);
  const [dropdownHistoriqueResp, setDropdownHistoriqueResp] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdownProfil, setDropdownProfil] = useState(false);

  const handleClick = () => {
    setClick(!click);
    setDropdownProfil(false);
  };

  const AccueilRef = useRef();
  const offreRef = useRef();
  const jobDatingRef = useRef();
  const eventRef = useRef();
  const articleRef = useRef();
  const historiqueRef = useRef();
  const titreRef = useRef();
  const closeRef = useRef();

  useEffect(() => {
    const myLinks = document.getElementById("myLinks");
    if (click === true) {
      myLinks.style.transform = "translateX(0%)";
      myLinks.style.transition = ".5s";
    } else {
      myLinks.style.transform = "translateX(-100%)";
      myLinks.style.transition = ".5s";
    }

    const closeDropdown = (e) => {
      if (
        e.composedPath()[0].tagName !== "B" &&
        e.target.tagName !== "svg" &&
        e.target.tagName !== "path" &&
        e.target.tagName !== "IMG" &&
        e.composedPath()[0] !== AccueilRef.current &&
        e.composedPath()[0] !== offreRef.current &&
        e.composedPath()[0] !== jobDatingRef.current &&
        e.composedPath()[0] !== eventRef.current &&
        e.composedPath()[0] !== articleRef.current &&
        e.composedPath()[0] !== historiqueRef.current &&
        e.composedPath()[0] !== titreRef.current &&
        e.composedPath()[0] !== closeRef.current
      ) {
        // DESKTOP
        setAccueil(false);
        setdropdownOffre(false);
        setDropdownJobDating(false);
        setDropdownEvent(false);
        setDropdownArticle(false);
        setDropdownHistorique(false);
        setClick(false);
        setDropdownProfil(false);
      }
    };

    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, [click]);

  // Dropdown Desktop
  const handleClickAcceuil = () => {
    setAccueil(!accueil);
    setdropdownOffre(false);
    setDropdownJobDating(false);
    setDropdownEvent(false);
    setDropdownArticle(false);
    setDropdownHistorique(false);
  };

  const handleClickOffre = () => {
    setdropdownOffre(!dropdownOffre);
    setAccueil(false);
    setDropdownJobDating(false);
    setDropdownEvent(false);
    setDropdownArticle(false);
    setDropdownHistorique(false);
  };

  const handleClickJobDating = () => {
    setDropdownJobDating(!dropdownJobDating);
    setAccueil(false);
    setdropdownOffre(false);
    setDropdownEvent(false);
    setDropdownArticle(false);
    setDropdownHistorique(false);
  };

  const handleClickEvent = () => {
    setDropdownEvent(!dropdownEvent);
    setAccueil(false);
    setdropdownOffre(false);
    setDropdownJobDating(false);
    setDropdownArticle(false);
    setDropdownHistorique(false);
  };

  const handleClickArticle = () => {
    setDropdownArticle(!dropdownArticle);
    setAccueil(false);
    setdropdownOffre(false);
    setDropdownJobDating(false);
    setDropdownEvent(false);
    setDropdownHistorique(false);
  };

  const handleClicHistorique = () => {
    setDropdownHistorique(!dropdownHistorique);
    setAccueil(false);
    setdropdownOffre(false);
    setDropdownJobDating(false);
    setDropdownEvent(false);
    setDropdownArticle(false);
  };

  // Dropdown Mobile
  const handleClickAcceuilResp = () => {
    setAccueilResp(!accueilResp);
    setdropdownOffreResp(false);
    setDropdownJobDatingResp(false);
    setDropdownEventResp(false);
    setDropdownArticleResp(false);
    setDropdownHistoriqueResp(false);
    setClick(!click);
  };

  const handleClickOffreResp = () => {
    setdropdownOffreResp(!dropdownOffreResp);
    setAccueilResp(false);
    setDropdownJobDatingResp(false);
    setDropdownEventResp(false);
    setDropdownArticleResp(false);
    setDropdownHistoriqueResp(false);
    setClick(!click);
  };

  const handleClickJobDatingResp = () => {
    setDropdownJobDatingResp(!dropdownJobDatingResp);
    setAccueilResp(false);
    setdropdownOffreResp(false);
    setDropdownEventResp(false);
    setDropdownArticleResp(false);
    setDropdownHistoriqueResp(false);
    setClick(!click);
  };

  const handleClickEventResp = () => {
    setDropdownEventResp(!dropdownEventResp);
    setAccueilResp(false);
    setdropdownOffreResp(false);
    setDropdownJobDatingResp(false);
    setDropdownArticleResp(false);
    setDropdownHistoriqueResp(false);
    setClick(!click);
  };

  const handleClickCVResp = () => {
    setDropdownArticleResp(!dropdownArticleResp);
    setAccueilResp(false);
    setdropdownOffreResp(false);
    setDropdownJobDatingResp(false);
    setDropdownEventResp(false);
    setDropdownHistoriqueResp(false);
    setClick(!click);
  };

  const handleClickHistoriqueResp = () => {
    setDropdownHistoriqueResp(!dropdownHistoriqueResp);
    setAccueilResp(false);
    setdropdownOffreResp(false);
    setDropdownJobDatingResp(false);
    setDropdownArticleResp(false);
    setDropdownEventResp(false);
    setClick(!click);
  };

  return (
    <>
      {/* Section Desktop NavbarEntreprise */}
      <nav>
        <menu>
          <div className="image">
            <Link to="/">
              <img
                style={{ marginTop: "5px" }}
                src={logo}
                alt="logo de skill of the World"
              />
            </Link>
          </div>
          <div className="menu">
            <ul>
              <li ref={AccueilRef} onClick={handleClickAcceuil}>
                {url !== "/" ? (
                  <Link to="/">
                    <b>Accueil</b>
                  </Link>
                ) : (
                  <Link to="/dashAdmin">
                    <b>Dashboard</b>
                  </Link>
                )}
              </li>
              <li
                ref={offreRef}
                onClick={handleClickOffre}
                className={dropdownOffre ? "active" : undefined}
              >
                <Link to="/validationOffre">
                  <b>Offres</b>
                </Link>
              </li>
              <li
                ref={jobDatingRef}
                onClick={handleClickJobDating}
                className={dropdownJobDating ? "active" : undefined}
              >
                <Link to="/validationJD">
                  <b>Job dating</b>
                </Link>
              </li>
              <li
                ref={eventRef}
                onClick={handleClickEvent}
                className={dropdownEvent ? "active" : undefined}
              >
                <Link to="/validationEvent">
                  <b>Evènement</b>
                </Link>
              </li>
              <li ref={articleRef} onClick={handleClickArticle}>
                <Link to="/listeArticle">
                  <b>Articles</b>
                </Link>
              </li>
              <li ref={historiqueRef} onClick={handleClicHistorique}>
                <Link to="/CandidatureAdmin">
                  <b>Candidature</b>
                </Link>
              </li>
              <li ref={historiqueRef} onClick={handleClicHistorique}>
                <Link to="/listeEntrepriseAdmin">
                  <b>Entreprise</b>
                </Link>
              </li>
              {/* <li ref={titreRef} onClick={handleClicHistorique}>
                <Link to="/modificationTitre">
                  <b>Titre</b>
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="right desktop">
            {/* <div className="notif">
              <div className="hoverNotif">
                <span>6</span>
                <IconContext.Provider value={{ color: "white", size: "30px" }}>
                  <FaBell />
                </IconContext.Provider>
              </div>

              <div className="dropNotif">
                <Link to="#">Notification 1</Link>
                <Link to="#">Notification 2</Link>
                <Link to="#">Notification 3</Link>
                <Link to="#">Notification 4</Link>
                <Link to="#">Notification 5</Link>
                <Link to="#">Notification 6</Link>
                <Link
                  to="/notificationAdmin"
                  style={{ color: "#112443", fontWeight: "bold" }}
                >
                  {" "}
                  Voir plus ...
                </Link>
              </div>
            </div> */}

            <div className="profil">
              <div className="hoverProfil">
                <a
                  href="#"
                  style={{ width: "135%" }}
                >
                  <img src={profil3} alt="profil Illustration" />
                </a>
              </div>

              <div className="dropProfil" style={{ height: "258px" }}>
                <Link to="/validationOffre">Validation des offres</Link>
                <Link to="/validationJD">Publication des job dating</Link>
                <Link to="/validationEvent">Publication des évènements</Link>
                {/* <Link to="/validationCvLm">Validation des CVs et LMs</Link> */}
                <Link to="/listeArticle">Liste des articles</Link>
                <span className="line"></span>
                <IconContext.Provider
                  value={{ color: "#262b2f", size: "25px" }}
                >
                  <Link to="/profilAdmin">
                    <IoPersonCircleOutline /> Mon profil
                  </Link>
                  <Link to="#" onClick={deconnexion}>
                    <IoExitOutline /> Se deconnecter
                  </Link>
                </IconContext.Provider>
              </div>
            </div>
          </div>
          <div ref={closeRef} onClick={handleClick} className="right mobile">
            <IconContext.Provider value={{ color: "white", size: "30px" }}>
              {click ? <FaTimes /> : <FaBars />}
            </IconContext.Provider>
          </div>
        </menu>
      </nav>

      {/* Section Menu responsive  */}
      <div id="myLinks">
        <menu className="menuForResponsive">
          {url !== "/" ? (
            <Link to="/" onClick={handleClickAcceuilResp}>
              <b>Accueil</b>
            </Link>
          ) : (
            <Link to="/dashAdmin" onClick={handleClickAcceuilResp}>
              <b>Dashboard</b>
            </Link>
          )}

          {/* Offres */}
          <Link
            to="/validationOffre"
            onClick={handleClickOffreResp}
            className={dropdownOffreResp ? "active" : undefined}
          >
            <b>Offres</b>
          </Link>

          {/* Job Dating */}
          <Link
            to="/validationJD"
            onClick={handleClickJobDatingResp}
            className={dropdownJobDatingResp ? "active" : undefined}
          >
            <b>Job Dating</b>
          </Link>

          {/* Event */}
          <Link
            to="/validationEvent"
            onClick={handleClickEventResp}
            className={dropdownEventResp ? "active" : undefined}
          >
            <b>Evènements</b>
          </Link>

          {/* Articles */}
          <Link
            to="/listeArticle"
            onClick={handleClickCVResp}
            className={dropdownArticleResp ? "active" : undefined}
          >
            <b>Articles</b>
          </Link>

          {/* Historique */}
          <Link
            to="/CandidatureAdmin"
            onClick={handleClickHistoriqueResp}
            className={dropdownHistoriqueResp ? "active" : undefined}
          >
            <b>Candidature</b>
          </Link>

          <Link
            to="/listeEntrepriseAdmin"
            onClick={handleClickHistoriqueResp}
            className={dropdownHistoriqueResp ? "active" : undefined}
          >
            <b>Entreprise</b>
          </Link>

          {/* Titre */}
          {/* <Link to="/modificationTitre" onClick={handleClickHistoriqueResp}>
            <b>Titre</b>
          </Link> */}

          <div className="btn_mobile">
            {/* <Link to="/notificationAdmin" onClick={handleClick}>
              <div className="notif">
                <span>6</span>
                <IconContext.Provider value={{ color: "white", size: "30px" }}>
                  <FaBell />
                </IconContext.Provider>
              </div>
            </Link> */}
            <Link to="#" onClick={() => setDropdownProfil(!dropdownProfil)}>
              <div className="profil">
                <img src={profil3} alt="profil" />
              </div>
            </Link>
          </div>
          {dropdownProfil && (
            <div className="drop">
              <Link to="/validationOffre">Validation des offres</Link>
              <Link to="/validationJD">Validation des job dating</Link>
              <Link to="/validationEvent">Validation des évènements</Link>
              {/* <Link to="/validationCvLm">Validation des CVs et LMs</Link> */}
              <Link to="/listeArticle">Liste des articles</Link>
              <IconContext.Provider value={{ color: "#9ffbfb", size: "30px" }}>
                <Link
                  to="/profilAdmin"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <IoPersonCircleOutline /> Mon profil
                </Link>
                <Link
                  to="#"
                  onClick={deconnexion}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <IoExitOutline /> Se deconnecter
                </Link>
              </IconContext.Provider>
            </div>
          )}
        </menu>
      </div>
    </>
  );
};

export default NavbarAdmin;
