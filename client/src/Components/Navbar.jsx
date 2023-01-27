import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { FaBars, FaTimes } from 'react-icons/fa';

import '../Assets/css/navbar.scss';
import '../Assets/css/index.scss';
import logo from '../Assets/img/SOTW_logo (2).webp';

const Navbar = () => {
  // Desktop
  const [dropdownEntreprise, setDropdownEntreprise] = useState(false);
  const [dropdownCandidat, setDropdownCandidat] = useState(false);
  const [dropdownEcole, setDropdownEcole] = useState(false);
  const [dropdownEvent, setDropdownEvent] = useState(false);
  const [dropdownWhy, setDropdownWhy] = useState(false);

  // Mobile
  const [dropdownEntrepriseResp, setDropdownEntrepriseResp] = useState(false);
  const [dropdownCandidatResp, setDropdownCandidatResp] = useState(false);
  const [dropdownEcoleResp, setDropdownEcoleResp] = useState(false);
  const [dropdownEventResp, setDropdownEventResp] = useState(false);
  const [dropdownWhyResp, setDropdownWhyResp] = useState(false);
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const entrepriseRef = useRef();
  const candidatRef = useRef();
  const ecoleRef = useRef();
  const eventRef = useRef();
  const whyRef = useRef();
  const closeRef = useRef();

  useEffect(() => {
    const myLinks = document.getElementById('myLinks');
    if (click === true) {
      myLinks.style.transform = 'translateX(0%)';
      myLinks.style.transition = '.5s';
    } else {
      myLinks.style.transform = 'translateX(-100%)';
      myLinks.style.transition = '.5s';
    }

    const closeDropdown = (e) => {
      // console.log("Clicked : ", e.composedPath()[0]);
      if (
        e.composedPath()[0].tagName !== 'B' &&
        e.composedPath()[0].tagName !== 'SPAN' &&
        e.target.tagName !== 'svg' &&
        e.target.tagName !== 'path' &&
        e.composedPath()[0] !== candidatRef.current &&
        e.composedPath()[0] !== ecoleRef.current &&
        e.composedPath()[0] !== entrepriseRef.current &&
        e.composedPath()[0] !== eventRef.current &&
        e.composedPath()[0] !== whyRef.current &&
        e.composedPath()[0] !== closeRef.current
      ) {
        // DESKTOP
        setDropdownEntreprise(false);
        setDropdownCandidat(false);
        setDropdownEcole(false);
        setDropdownEvent(false);
        setDropdownWhy(false);
        setClick(false);
        // MOBIILE
      }
    };

    document.body.addEventListener('click', closeDropdown);
    return () => document.body.removeEventListener('click', closeDropdown);
  }, [click]);

  // Dropdown Desktop
  const handleClickEntreprise = () => {
    setDropdownEntreprise(!dropdownEntreprise);
    setDropdownCandidat(false);
    setDropdownEcole(false);
    setDropdownEvent(false);
    setDropdownWhy(false);
  };

  const handleClickCandidat = () => {
    setDropdownCandidat(!dropdownCandidat);
    setDropdownEntreprise(false);
    setDropdownEcole(false);
    setDropdownEvent(false);
    setDropdownWhy(false);
  };

  const handleClickEcole = () => {
    setDropdownEcole(!dropdownEcole);
    setDropdownEntreprise(false);
    setDropdownCandidat(false);
    setDropdownEvent(false);
    setDropdownWhy(false);
  };

  const handleClickEvent = () => {
    setDropdownEvent(!dropdownEvent);
    setDropdownEntreprise(false);
    setDropdownCandidat(false);
    setDropdownEcole(false);
    setDropdownWhy(false);
  };

  const handleClickWhy = () => {
    setDropdownWhy(!dropdownWhy);
    setDropdownEntreprise(false);
    setDropdownCandidat(false);
    setDropdownEcole(false);
    setDropdownEvent(false);
  };

  // Dropdown Mobile
  const handleClickEntrepriseResp = () => {
    setDropdownEntrepriseResp(!dropdownEntrepriseResp);
    setDropdownCandidatResp(false);
    setDropdownEcoleResp(false);
    setDropdownEventResp(false);
    setDropdownWhyResp(false);
  };

  const handleClickCandidatResp = () => {
    setDropdownCandidatResp(!dropdownCandidatResp);
    setDropdownEntrepriseResp(false);
    setDropdownEcoleResp(false);
    setDropdownEventResp(false);
    setDropdownWhyResp(false);
  };

  const handleClickEcoleResp = () => {
    setDropdownEcoleResp(!dropdownEcoleResp);
    setDropdownEntrepriseResp(false);
    setDropdownCandidatResp(false);
    setDropdownEventResp(false);
    setDropdownWhyResp(false);
  };

  const handleClickEventResp = () => {
    setDropdownEvent(!dropdownEventResp);
    setDropdownEntrepriseResp(false);
    setDropdownCandidatResp(false);
    setDropdownEcoleResp(false);
    setDropdownWhyResp(false);
    setClick(false);
  };

  const handleClickWhyResp = () => {
    setDropdownWhyResp(!dropdownWhyResp);
    setDropdownEntrepriseResp(false);
    setDropdownCandidatResp(false);
    setDropdownEcoleResp(false);
    setDropdownEventResp(false);
  };

  return (
    <>
      {/* Section Desktop Navbar */}
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
              <li
                ref={entrepriseRef}
                onClick={handleClickEntreprise}
                className={dropdownEntreprise ? 'active' : undefined}
              >
                <span>
                  Je suis une <b>Entreprise</b>
                </span>
              </li>
              <li
                ref={candidatRef}
                onClick={handleClickCandidat}
                className={dropdownCandidat ? 'active' : undefined}
              >
                <span>
                  Je suis un <b>Talent</b>
                </span>
              </li>
              <li
                ref={ecoleRef}
                onClick={handleClickEcole}
                className={dropdownEcole ? 'active' : undefined}
              >
                <span>
                  Je suis une <b>Ecole</b>
                </span>
              </li>
              <li
                ref={eventRef}
                onClick={handleClickEvent}
                className={dropdownEvent ? 'active' : undefined}
              >
                <Link to="/evenement">
                  <b>Evènements</b>
                </Link>
              </li>
              <li
                ref={whyRef}
                onClick={handleClickWhy}
                className={dropdownWhy ? 'active' : undefined}
              >
                <span>
                  Pourquoi <b>SOTW ?</b>
                </span>
              </li>
            </ul>
          </div>
          <div className="right desktop">
            <Link to="/inscription">
              <button className="inscription">Inscription</button>
            </Link>
            <Link to="/login">
              <button className="se_connecter">Se connecter</button>
            </Link>
          </div>
          <div ref={closeRef} onClick={handleClick} className="right mobile">
            <IconContext.Provider value={{ color: 'white', size: '30px' }}>
              {click ? <FaTimes /> : <FaBars />}
            </IconContext.Provider>
          </div>
        </menu>
      </nav>

      {/* Section Desktop Dropdown */}
      {dropdownEntreprise && (
        <div className="dropdownNav">
          <div className="dropdownContentNav">
            <div className="left">
              <Link to="/jeRecrute">Je recrute</Link>
              <a href="/orgJdEts">Je souhaite organiser un Job Dating</a>
              <a href="/orgEventEts">Je souhaite organiser un évènement</a>
            </div>
            <div className="right">
              <Link to="/contactezNous">Contactez-nous</Link>
            </div>
          </div>
        </div>
      )}
      {dropdownCandidat && (
        <div className="dropdownNav">
          <div className="dropdownContentNav">
            <div className="left">
              <Link to="/jeChercheEmploie">Je cherche un emploi</Link>
              <a href="/participerJD">Je participe à un Job Dating</a>
              <a href="/participerEvent">Je participe à un évènement</a>
            </div>
            <div className="right">
              <Link to="/contactezNous">Contactez-nous</Link>
            </div>
          </div>
        </div>
      )}
      {dropdownEcole && (
        <div className="dropdownNav">
          <div className="dropdownContentNav">
            <div className="left ecole">
              <Link to="/mesFormations">Je présente mes formations</Link>
              <Link to="/contactezNous">Contactez-nous</Link>
            </div>
          </div>
        </div>
      )}
      {dropdownWhy && (
        <div className="dropdownNav">
          <div className="dropdownContentNav">
            <div className="left why">
              <Link to="/quiSommesNous">Qui sommes-nous ?</Link>
              <Link to="/blog">Blog</Link>
            </div>
          </div>
        </div>
      )}

      {/* Section Menu responsive  */}
      <div id="myLinks">
        <menu className="menuForResponsive">
          <a
            href="#"
            ref={entrepriseRef}
            onClick={handleClickEntrepriseResp}
            className={dropdownEntrepriseResp ? 'active' : undefined}
          >
            Je suis une <b>Entreprise</b>
          </a>
          {/* Entreprise */}
          {dropdownEntrepriseResp && (
            <div className="drop">
              <Link to="/jeRecrute">Je recrute</Link>
              <a href="/orgJdEts">Je souhaite organiser un Job Dating</a>
              <a href="/orgEventEts">Je souhaite organiser un évènement</a>
              <Link to="/contactezNous">Contactez-nous</Link>
            </div>
          )}

          <a
            href="#"
            ref={candidatRef}
            onClick={handleClickCandidatResp}
            className={dropdownCandidatResp ? 'active' : undefined}
          >
            Je suis un <b>Talent</b>
          </a>
          {/* Candidat */}
          {dropdownCandidatResp && (
            <div className="drop">
              <Link to="/jeChercheEmploie">Je cherche un emploi</Link>
              <a href="/participerJD">Je participe à un Job Dating</a>
              <a href="/participerEvent">Je participe à un évènement</a>
              <Link to="/contactezNous">Contactez-nous</Link>
            </div>
          )}

          <a
            href="#"
            ref={ecoleRef}
            onClick={handleClickEcoleResp}
            className={dropdownEcoleResp ? 'active' : undefined}
          >
            Je suis une <b>Ecole</b>
          </a>
          {/* Ecole */}
          {dropdownEcoleResp && (
            <div className="drop">
              <Link to="/mesFormations">Je présente mes formations</Link>
              <Link to="/contactezNous">Contactez-nous</Link>
            </div>
          )}

          <Link
            to="/evenement"
            onClick={handleClickEventResp}
            className={dropdownEventResp ? 'active' : undefined}
          >
            <b id="eventId">Evènements</b>
          </Link>
          {/* Event */}
          {/* {dropdownEventResp && (
            <div className="drop">
              <Link to="/participerJD">Job Dating</Link>
              <Link to="/participerEvent">Evènements</Link>
            </div>
          )} */}

          <a
            href="#"
            ref={whyRef}
            onClick={handleClickWhyResp}
            className={dropdownWhyResp ? 'active' : undefined}
          >
            Pourquoi <b>SOTW ?</b>
          </a>
          {/* Pourquoi */}
          {dropdownWhyResp && (
            <div className="drop">
              <Link to="/quiSommesNous">Qui sommes-nous ?</Link>
              <Link to="/blog">Blog</Link>
            </div>
          )}
          <div className="btn_mobile">
            <Link to="/inscription">
              <button className="inscription">Inscription</button>
            </Link>
            <Link to="/login">
              <button className="se_connecter">Se connecter</button>
            </Link>
          </div>
        </menu>
      </div>
    </>
  );
};

export default Navbar;
