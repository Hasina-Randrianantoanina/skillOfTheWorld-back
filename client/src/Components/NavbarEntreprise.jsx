import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { IoExitOutline, IoPersonCircleOutline } from "react-icons/io5";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

import "../Assets/css/navbarEntreprise.scss";
import "../Assets/css/index.scss";
import logo from "../Assets/img/SOTW_logo (2).webp";
import profil1 from "../Assets/img/profil/defaultProfil.webp";

const NavbarEntreprise = () => {
  const url = window.location.pathname;
  const redirect = useNavigate();
  const { uid, getUrl, urlFile } = useContext(AuthContext);

  // Desktop
  const [accueil, setAccueil] = useState(false);
  const [dropdownOffre, setdropdownOffre] = useState(false);
  const [dropdownJobDating, setDropdownJobDating] = useState(false);
  const [dropdownEvent, setDropdownEvent] = useState(false);
  const [dropdownHistorique, setDropdownHistorique] = useState(false);
  const [entreprise, setEntreprise] = useState();

  // Mobile
  const [accueilResp, setAccueilResp] = useState(false);
  const [dropdownOffreResp, setdropdownOffreResp] = useState(false);
  const [dropdownJobDatingResp, setDropdownJobDatingResp] = useState(false);
  const [dropdownEventResp, setDropdownEventResp] = useState(false);
  const [dropdownHistoriqueResp, setDropdownHistoriqueResp] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdownProfil, setDropdownProfil] = useState(false);

  const deconnexion = async () => {
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/user/entreprise/logout`,
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

  const handleClick = () => {
    setClick(!click);
    setDropdownProfil(false);
  };

  const AccueilRef = useRef();
  const offreRef = useRef();
  const jobDatingRef = useRef();
  const eventRef = useRef();
  const historiqueRef = useRef();
  const blogRef = useRef();
  const closeRef = useRef();

  useEffect(() => {
    getUrl();
    const getEntreprise = async (idEntreprise) =>
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}api/user/entreprise/${idEntreprise}`
        )
        .then((res) => {
          setEntreprise(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    getEntreprise(uid);

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
        e.composedPath()[0] !== historiqueRef.current &&
        e.composedPath()[0] !== blogRef.current &&
        e.composedPath()[0] !== closeRef.current
      ) {
        // DESKTOP
        setAccueil(false);
        setdropdownOffre(false);
        setDropdownJobDating(false);
        setDropdownEvent(false);
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
    setDropdownHistorique(false);
  };

  const handleClickOffre = () => {
    setdropdownOffre(!dropdownOffre);
    setAccueil(false);
    setDropdownJobDating(false);
    setDropdownEvent(false);
    setDropdownHistorique(false);
  };

  const handleClickJobDating = () => {
    setDropdownJobDating(!dropdownJobDating);
    setAccueil(false);
    setdropdownOffre(false);
    setDropdownEvent(false);
    setDropdownHistorique(false);
  };

  const handleClickEvent = () => {
    setDropdownEvent(!dropdownEvent);
    setAccueil(false);
    setdropdownOffre(false);
    setDropdownJobDating(false);
    setDropdownHistorique(false);
  };

  const handleClicHistorique = () => {
    setDropdownHistorique(!dropdownHistorique);
    setAccueil(false);
    setdropdownOffre(false);
    setDropdownJobDating(false);
    setDropdownEvent(false);
  };

  // Dropdown Mobile
  const handleClickAcceuilResp = () => {
    setAccueilResp(!accueilResp);
    setdropdownOffreResp(false);
    setDropdownJobDatingResp(false);
    setDropdownEventResp(false);
    setDropdownHistoriqueResp(false);
    setClick(!click);
  };

  const handleClickOffreResp = () => {
    setdropdownOffreResp(!dropdownOffreResp);
    setAccueilResp(false);
    setDropdownJobDatingResp(false);
    setDropdownEventResp(false);
    setDropdownHistoriqueResp(false);
  };

  const handleClickJobDatingResp = () => {
    setDropdownJobDatingResp(!dropdownJobDatingResp);
    setAccueilResp(false);
    setdropdownOffreResp(false);
    setDropdownEventResp(false);
    setDropdownHistoriqueResp(false);
  };

  const handleClickEventResp = () => {
    setDropdownEventResp(!dropdownEventResp);
    setAccueilResp(false);
    setdropdownOffreResp(false);
    setDropdownJobDatingResp(false);
    setDropdownHistoriqueResp(false);
  };

  const handleClickHistoriqueResp = () => {
    setDropdownHistoriqueResp(!dropdownHistoriqueResp);
    setAccueilResp(false);
    setdropdownOffreResp(false);
    setDropdownJobDatingResp(false);
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
                  <Link to="/dashEntreprise">
                    <b>Dashboard</b>
                  </Link>
                )}
              </li>
              <li
                ref={offreRef}
                onClick={handleClickOffre}
                className={dropdownOffre ? "active" : undefined}
              >
                <b>Offres</b>
              </li>
              <li
                ref={jobDatingRef}
                onClick={handleClickJobDating}
                className={dropdownJobDating ? "active" : undefined}
              >
                <b>Job Dating</b>
              </li>
              <li
                ref={eventRef}
                onClick={handleClickEvent}
                className={dropdownEvent ? "active" : undefined}
              >
                <b>Evènements</b>
              </li>
              <li ref={blogRef} onClick={handleClicHistorique}>
                <Link to="/blog">
                  <b>Blog</b>
                </Link>
              </li>
            </ul>
          </div>
          <div className="right desktop">
            <div className="notif">
              {/* <div className="hoverNotif">
                <span>6</span>
                <IconContext.Provider value={{ color: "white", size: "30px" }}>
                  <FaBell />
                </IconContext.Provider>
              </div> */}

              <div className="dropNotif">
                <Link to="#">Notification 1</Link>
                <Link to="#">Notification 2</Link>
                <Link to="#">Notification 3</Link>
                <Link to="#">Notification 4</Link>
                <Link to="#">Notification 5</Link>
                <Link to="#">Notification 6</Link>
                <Link
                  to="/notificationEntreprise"
                  style={{ color: "#112443", fontWeight: "bold" }}
                >
                  {" "}
                  Voir plus ...
                </Link>
              </div>
            </div>

            <div className="profil">
              <div className="hoverProfil">
                <a href="#" style={{ width: "47px", padding: "0" }}>
                  <img
                    src={
                      entreprise && entreprise.uploadLogo
                        ? `${urlFile.split(".com/")[0]}.com/${
                            entreprise.uploadLogo
                          }`
                        : profil1
                    }
                    alt="profil Illustration"
                  />
                </a>
              </div>

              <div className="dropProfil">
                <Link to="/listeOffreEts">Liste des offres</Link>
                <Link to="/listeJdEts">Liste des job dating</Link>
                <Link to="/listeEventEts">Liste des évènements</Link>
                <span className="line"></span>
                <IconContext.Provider
                  value={{ color: "#262b2f", size: "25px" }}
                >
                  <Link to="/profilEntreprise">
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

      {/* Section Desktop Dropdown */}
      {dropdownOffre && (
        <div className="dropdownEntreprise">
          <div className="dropdownContentEntreprise">
            <div className="left">
              <Link to="/listeOffreEts">Mes offres</Link>
              <Link to="/ajoutOffre">Ajouter une offre</Link>
            </div>
          </div>
        </div>
      )}
      {dropdownJobDating && (
        <div className="dropdownEntreprise">
          <div className="dropdownContentEntreprise">
            <div className="left jobDating">
              <Link to="/listeJdEts">Mes Job Dating</Link>
              <a href="/ajoutJD">Organiser un Job Dating</a>
            </div>
          </div>
        </div>
      )}
      {dropdownEvent && (
        <div className="dropdownEntreprise">
          <div className="dropdownContentEntreprise">
            <div className="left event">
              <Link to="/listeEventEts">Mes évènements</Link>
              <a href="ajoutEvent">Organiser un évènements</a>
            </div>
          </div>
        </div>
      )}

      {/* Section Menu responsive  */}
      <div id="myLinks">
        <menu className="menuForResponsive">
          {url !== "/" ? (
            <Link to="/" onClick={handleClickAcceuilResp}>
              <b>Accueil</b>
            </Link>
          ) : (
            <Link to="/dashEntreprise" onClick={handleClickAcceuilResp}>
              <b>Dashboard</b>
            </Link>
          )}

          {/* Offres */}
          <a
            href="#"
            onClick={handleClickOffreResp}
            className={dropdownOffreResp ? "active" : undefined}
          >
            <b>Offres</b>
          </a>

          {dropdownOffreResp && (
            <div className="drop">
              <Link to="/listeOffreEts">Mes offres</Link>
              <Link to="/ajoutOffre">Ajouter une offre</Link>
            </div>
          )}

          {/* Job Dating */}
          <a
            href="#"
            onClick={handleClickJobDatingResp}
            className={dropdownJobDatingResp ? "active" : undefined}
          >
            <b>Job Dating</b>
          </a>

          {dropdownJobDatingResp && (
            <div className="drop">
              <Link to="/listeJdEts">Mes Job Dating</Link>
              <a href="/ajoutJD">Organiser un Job Dating</a>
            </div>
          )}

          {/* Event */}
          <a
            href="#"
            onClick={handleClickEventResp}
            className={dropdownEventResp ? "active" : undefined}
          >
            <b>Evènements</b>
          </a>

          {dropdownEventResp && (
            <div className="drop">
              <Link to="/listeEventEts">Mes évènements</Link>
              <a href="/ajoutEvent">Organiser un évènements</a>
            </div>
          )}

          {/* Blog */}
          <Link to="/blog" onClick={handleClickHistoriqueResp}>
            <b>Blog</b>
          </Link>

          <div className="btn_mobile">
            {/* <Link to="/notificationEntreprise" onClick={handleClick}>
              <div className="notif">
                <span>6</span>
                <IconContext.Provider value={{ color: "white", size: "30px" }}>
                  <FaBell />
                </IconContext.Provider>
              </div>
            </Link> */}
            <Link to="#" onClick={() => setDropdownProfil(!dropdownProfil)}>
              <div className="profil">
                <img
                  src={
                    entreprise && entreprise.uploadLogo
                      ? `${urlFile.split(".com/")[0]}.com/${
                          entreprise.uploadLogo
                        }`
                      : profil1
                  }
                  alt="profil"
                />
              </div>
            </Link>
          </div>
          {dropdownProfil && (
            <div className="drop">
              <Link to="/listeOffreEts">Liste des offres</Link>
              <Link to="/listeJdEts">Liste des job dating</Link>
              <Link to="/listeEventEts">Liste des évènements</Link>
              <IconContext.Provider value={{ color: "#9ffbfb", size: "30px" }}>
                <Link
                  to="/profilEntreprise"
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

export default NavbarEntreprise;
