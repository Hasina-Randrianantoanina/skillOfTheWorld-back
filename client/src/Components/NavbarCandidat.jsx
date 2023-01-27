import React, { useEffect, useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { FaBars, FaTimes, FaBell } from 'react-icons/fa';
import { IoExitOutline, IoPersonCircleOutline } from 'react-icons/io5';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

import '../Assets/css/navbarCandidat.scss';
import '../Assets/css/index.scss';
import logo from '../Assets/img/SOTW_logo (2).webp';
import profil2 from '../Assets/img/profil/defaultProfil.webp';

const NavbarCandidat = () => {
  const { uid, getUrl, urlFile } = useContext(AuthContext);
  const url = window.location.pathname;
  const redirect = useNavigate();
  const [candidat, setCandidat] = useState();

  // Desktop
  const [accueil, setAccueil] = useState(false);
  const [dropdownOffre, setdropdownOffre] = useState(false);
  const [dropdownJobDating, setDropdownJobDating] = useState(false);
  const [dropdownEvent, setDropdownEvent] = useState(false);
  const [dropdownCV, setDropdownCV] = useState(false);
  const [dropdownHistorique, setDropdownHistorique] = useState(false);

  // Mobile
  const [accueilResp, setAccueilResp] = useState(false);
  const [dropdownOffreResp, setdropdownOffreResp] = useState(false);
  const [dropdownJobDatingResp, setDropdownJobDatingResp] = useState(false);
  const [dropdownEventResp, setDropdownEventResp] = useState(false);
  const [dropdownCVResp, setDropdownCVResp] = useState(false);
  const [dropdownHistoriqueResp, setDropdownHistoriqueResp] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdownProfil, setDropdownProfil] = useState(false);

  const deconnexion = async () => {
    await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}api/user/candidat/logout`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('Vous êtes déconnecté');
          redirect('/');
          window.location.reload(true);
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
  const CVRef = useRef();
  const historiqueRef = useRef();
  const blogRef = useRef();
  const closeRef = useRef();

  useEffect(() => {
    getUrl();
    const myLinks = document.getElementById('myLinks');
    if (click === true) {
      myLinks.style.transform = 'translateX(0%)';
      myLinks.style.transition = '.5s';
    } else {
      myLinks.style.transform = 'translateX(-100%)';
      myLinks.style.transition = '.5s';
    }

    const closeDropdown = (e) => {
      if (
        e.composedPath()[0].tagName !== 'B' &&
        e.target.tagName !== 'svg' &&
        e.target.tagName !== 'path' &&
        e.target.tagName !== 'IMG' &&
        e.composedPath()[0] !== AccueilRef.current &&
        e.composedPath()[0] !== offreRef.current &&
        e.composedPath()[0] !== jobDatingRef.current &&
        e.composedPath()[0] !== eventRef.current &&
        e.composedPath()[0] !== CVRef.current &&
        e.composedPath()[0] !== historiqueRef.current &&
        e.composedPath()[0] !== blogRef.current &&
        e.composedPath()[0] !== closeRef.current
      ) {
        // DESKTOP
        setAccueil(false);
        setdropdownOffre(false);
        setDropdownJobDating(false);
        setDropdownEvent(false);
        setDropdownCV(false);
        setDropdownHistorique(false);
        setClick(false);
        setDropdownProfil(false);
      }
    };
    const getnombrecv = async (idCandidat) =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/candidat/${idCandidat}`)
        .then((res) => {
          setCandidat(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    getnombrecv(uid);

    document.body.addEventListener('click', closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown);
  }, [click]);

  // Dropdown Desktop
  const handleClickAcceuil = () => {
    setAccueil(!accueil);
    setdropdownOffre(false);
    setDropdownJobDating(false);
    setDropdownEvent(false);
    setDropdownCV(false);
    setDropdownHistorique(false);
  };

  const handleClickOffre = () => {
    setdropdownOffre(!dropdownOffre);
    setAccueil(false);
    setDropdownJobDating(false);
    setDropdownEvent(false);
    setDropdownCV(false);
    setDropdownHistorique(false);
  };

  const handleClickJobDating = () => {
    setDropdownJobDating(!dropdownJobDating);
    setAccueil(false);
    setdropdownOffre(false);
    setDropdownEvent(false);
    setDropdownCV(false);
    setDropdownHistorique(false);
  };

  const handleClickEvent = () => {
    setDropdownEvent(!dropdownEvent);
    setAccueil(false);
    setdropdownOffre(false);
    setDropdownJobDating(false);
    setDropdownCV(false);
    setDropdownHistorique(false);
  };

  const handleClickCV = () => {
    setDropdownCV(!dropdownCV);
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
    setDropdownCV(false);
  };

  // Dropdown Mobile
  const handleClickAcceuilResp = () => {
    setAccueilResp(!accueilResp);
    setdropdownOffreResp(false);
    setDropdownJobDatingResp(false);
    setDropdownEventResp(false);
    setDropdownCVResp(false);
    setDropdownHistoriqueResp(false);
    setClick(!click);
  };

  const handleClickOffreResp = () => {
    setdropdownOffreResp(!dropdownOffreResp);
    setAccueilResp(false);
    setDropdownJobDatingResp(false);
    setDropdownEventResp(false);
    setDropdownCVResp(false);
    setDropdownHistoriqueResp(false);
    setClick(!click);
  };

  const handleClickJobDatingResp = () => {
    setDropdownJobDatingResp(!dropdownJobDatingResp);
    setAccueilResp(false);
    setdropdownOffreResp(false);
    setDropdownEventResp(false);
    setDropdownCVResp(false);
    setDropdownHistoriqueResp(false);
    setClick(!click);
  };

  const handleClickEventResp = () => {
    setDropdownEventResp(!dropdownEventResp);
    setAccueilResp(false);
    setdropdownOffreResp(false);
    setDropdownJobDatingResp(false);
    setDropdownCVResp(false);
    setDropdownHistoriqueResp(false);
    setClick(!click);
  };

  const handleClickCVResp = () => {
    setDropdownCVResp(!dropdownCVResp);
    setAccueilResp(false);
    setdropdownOffreResp(false);
    setDropdownJobDatingResp(false);
    setDropdownEventResp(false);
    setDropdownHistoriqueResp(false);
  };

  const handleClicHistoriqueResp = () => {
    setDropdownHistoriqueResp(!dropdownHistoriqueResp);
    setAccueilResp(false);
    setdropdownOffreResp(false);
    setDropdownJobDatingResp(false);
    setDropdownCVResp(false);
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
                style={{ marginTop: '5px' }}
                src={logo}
                alt="logo de skill of the World"
              />
            </Link>
          </div>
          <div className="menu">
            <ul>
              <li ref={AccueilRef} onClick={handleClickAcceuil}>
                {url !== '/' ? (
                  <Link to="/">
                    <b>Accueil</b>
                  </Link>
                ) : (
                  <Link to="/dashCandidat">
                    <b>Dashboard</b>
                  </Link>
                )}
              </li>
              <li
                ref={offreRef}
                onClick={handleClickOffre}
                className={dropdownOffre ? 'active' : undefined}
              >
                <Link to="/offreEmploiCandidat">
                  <b>Offres</b>
                </Link>
              </li>
              <li
                ref={jobDatingRef}
                onClick={handleClickJobDating}
                className={dropdownJobDating ? 'active' : undefined}
              >
                <Link to="/nosJobDating">
                  <b>Job Dating</b>
                </Link>
              </li>
              <li
                ref={eventRef}
                onClick={handleClickEvent}
                className={dropdownEvent ? 'active' : undefined}
              >
                <Link to="/nosEvent">
                  <b>Evènements</b>
                </Link>
              </li>
              <li
                ref={CVRef}
                onClick={handleClickCV}
                className={dropdownCV ? 'active' : undefined}
              >
                <b>CV et LM</b>
              </li>
              <li ref={historiqueRef} onClick={handleClicHistorique}>
                <Link to="historiqueCandidat">
                  <b>Historique</b>
                </Link>
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
                <IconContext.Provider value={{ color: 'white', size: '30px' }}>
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
                  to="/notificationCandidat"
                  style={{ color: '#112443', fontWeight: 'bold' }}
                >
                  {' '}
                  Voir plus ...
                </Link>
              </div>
            </div>

            <div className="profil">
              <div className="hoverProfil">
                {/* <img
                  src={`${process.env.REACT_APP_API_URL}${candidat.uploadLogo}`}
                  alt=""
                /> */}
                <a href="#" style={{ width: '47px', padding: '0' }}>
                  <img
                    src={
                      candidat && candidat.uploadLogo
                        ? `${urlFile.split('.com/')[0]}.com/${
                            candidat.uploadLogo
                          }`
                        : profil2
                    }
                    alt="profil illustration"
                  />
                </a>
              </div>

              <div className="dropProfil" style={{ height: '288px' }}>
                <Link to="/offreEmploiCandidat">Liste des offres</Link>
                <Link to="/nosJobDating">Liste des job dating</Link>
                <Link to="/nosEvent">Liste des évènements</Link>
                <Link to="/myCV">Curriculum vitae</Link>
                <Link to="/myLM">Lettre de motivation</Link>
                <span className="line"></span>
                <IconContext.Provider
                  value={{ color: '#262b2f', size: '25px' }}
                >
                  <Link to="/profilCandidat">
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
            <IconContext.Provider value={{ color: 'white', size: '30px' }}>
              {click ? <FaTimes /> : <FaBars />}
            </IconContext.Provider>
          </div>
        </menu>
      </nav>

      {/* Section Desktop Dropdown */}
      {/* {dropdownOffre && (
          <div className="dropdownCandidat">
            <div className="dropdownContentCandidat">
              <div className="left">
                <a href="#">Mes offres</a>
                <a href="#">Ajouter une offre</a>
              </div>
            </div>
          </div>
        )}
        {dropdownJobDating && (
          <div className="dropdownCandidat">
            <div className="dropdownContentCandidat">
              <div className="left jobDating">
                <a href="#">Mes Job Dating</a>
                <a href="#">Organiser un Job Dating</a>
              </div>
            </div>
          </div>
        )}
        {dropdownEvent && (
          <div className="dropdownCandidat">
            <div className="dropdownContentCandidat">
              <div className="left event">
                <a href="#">Mes évènements</a>
                <a href="#">Organiser un évènements</a>
              </div>
            </div>
          </div>
        )} */}
      {dropdownCV && (
        <div className="dropdownCandidat">
          <div className="dropdownContentCandidat">
            <div className="left CV">
              <Link to="/myCV">Curriculum vitae</Link>
              <Link to="/myLM">Lettre de motivation</Link>
            </div>
          </div>
        </div>
      )}

      {/* Section Menu responsive  */}
      <div id="myLinks">
        <menu className="menuForResponsive">
          {url !== '/' ? (
            <Link to="/" onClick={handleClickAcceuilResp}>
              <b>Accueil</b>
            </Link>
          ) : (
            <Link to="/dashCandidat" onClick={handleClickAcceuilResp}>
              <b>Dashboard</b>
            </Link>
          )}

          {/* Offres */}
          <Link
            to="/offreEmploiCandidat"
            onClick={handleClickOffreResp}
            className={dropdownOffreResp ? 'active' : undefined}
          >
            <b>Offres</b>
          </Link>

          {/* {dropdownOffreResp && (
            <div className="drop">
              <a href="#">Mes offres</a>
              <a href="#">Ajouter une offre</a>
            </div>
          )} */}

          {/* Job Dating */}
          <Link
            to="/nosJobDating"
            onClick={handleClickJobDatingResp}
            className={dropdownJobDatingResp ? 'active' : undefined}
          >
            <b>Job Dating</b>
          </Link>

          {/* {dropdownJobDatingResp && (
            <div className="drop">
              <a href="#">Mes Job Dating</a>
              <a href="#">Organiser un Job Dating</a>
            </div>
          )} */}

          {/* Event */}
          <Link
            to="/nosEvent"
            onClick={handleClickEventResp}
            className={dropdownEventResp ? 'active' : undefined}
          >
            <b>Evènements</b>
          </Link>

          {/* {dropdownEventResp && (
            <div className="drop">
              <a href="#">Mes évènements</a>
              <a href="#">Organiser un évènements</a>
            </div>
          )} */}

          {/* CV et LM */}
          <a
            href="#"
            onClick={handleClickCVResp}
            className={dropdownCVResp ? 'active' : undefined}
          >
            <b>CV et LM</b>
          </a>

          {dropdownCVResp && (
            <div className="drop">
              <Link to="/myCV">Curriculum vitae</Link>
              <Link to="/myLM">Lettre de motivation</Link>
            </div>
          )}

          {/* Historique */}
          <Link to="/historiqueCandidat" onClick={handleClicHistoriqueResp}>
            <b>Historique</b>
          </Link>

          {/* Blog */}
          <Link to="/blog" onClick={handleClicHistoriqueResp}>
            <b>Blog</b>
          </Link>

          <div className="btn_mobile">
            {/* <Link to="/notificationCandidat" onClick={handleClick}>
              <div className="notif">
                <span>6</span>
                <IconContext.Provider value={{ color: 'white', size: '30px' }}>
                  <FaBell />
                </IconContext.Provider>
              </div>
            </Link> */}
            <Link to="#" onClick={() => setDropdownProfil(!dropdownProfil)}>
              <div className="profil">
                <img
                  style={{ width: '36px', height: '38px', marginTop: '-1px' }}
                  src={
                    candidat && candidat.uploadLogo
                      ? `${urlFile.split('.com/')[0]}.com/${
                          candidat.uploadLogo
                        }`
                      : profil2
                  }
                  alt="profil illustration"
                />
              </div>
            </Link>
          </div>
          {dropdownProfil && (
            <div className="drop">
              <Link to="/offreEmploiCandidat">Liste des offres</Link>
              <Link to="/nosJobDating">Liste des job dating</Link>
              <Link to="/nosEvent">Liste des évènements</Link>
              <Link to="/myCV">Curriculum vitae</Link>
              <Link to="/myLM">Lettre de motivation</Link>
              <IconContext.Provider value={{ color: '#9ffbfb', size: '30px' }}>
                <Link
                  to="/profilCandidat"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <IoPersonCircleOutline /> Mon profil
                </Link>
                <Link
                  to="#"
                  onClick={deconnexion}
                  style={{ display: 'flex', alignItems: 'center' }}
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

export default NavbarCandidat;
