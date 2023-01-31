import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import 'moment/locale/fr';
import { IconContext } from 'react-icons/lib';
import { FaRegCalendar } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Helmet } from "react-helmet";

import '../Assets/css/offreglobale.scss';
import ets_img from '../Assets/img/SOTW_logo (2).webp';
import countries from '../Utils/africaCountry.json';
import fonctions from '../Utils/fonction.json';
import Pagination from '../Components/Pagination';

const ListeJobDatingGlobale = () => {
  const redirect = useNavigate();
  const { candidat } = useContext(AuthContext);

  const [champ, setChamp] = useState(false);
  const [query, setQuery] = useState('');
  const [jobdatingPublie, setJobdatingPublie] = useState([]);
  const [isLoading, setIsLoading] = useState(" ");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const getJDpublie = async () => {
      setIsLoading("Chargement ...");

      await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}api/jobdating/publie/`,
      })
        .then((res) => {
          setJobdatingPublie(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
        
        jobdatingPublie.length === 0 && setIsLoading("Pas encore de job dating pour le moment");
    };
    getJDpublie();
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
        <title>Skill of the World - Recruter partout et tout le temps</title>
        <meta name="keywords" content="Plateforme de recrutement, Recrutement externalisé, Cabinet de recrutement, Offre d’emploi, Recrutement international" />
      </Helmet>
      <div className="innerDivOffre">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Nos job dating</h2>
        {candidat && (
          <div className="divJd">
            <div className="divTop">
              <div className="cardObjectif cardJdObjectif">
                <div className="value">
                  <div
                    className="imgValue imgJdValue"
                    style={{ height: '145px' }}
                  >
                    <img src={ets_img} alt="Logo de Skill of the world" />
                  </div>
                  <p>
                    <b>Bienvenue</b> dans le monde où vous pouvez rencontrer les
                    recruteurs afin de vous présenter.
                  </p>
                </div>
              </div>
            </div>
            <div className="divTop divTop_2">
              <div className="cardObjectif cardJdObjectif">
                <div className="value">
                  <div
                    className="imgValue imgJdValue"
                    style={{ height: '145px' }}
                  >
                    <img src={ets_img} alt="Logo de Skill of the world" />
                  </div>
                  <p>
                    Si votre candidature est sélectionnée, <b>vous serez contacter
                    directement</b> par l’entreprise qui recrute afin de vous fixer
                    un entretien.
                  </p>
                </div>
              </div>
            </div>
            <div className="divTop divTop_3">
              <div className="cardObjectif cardJdObjectif">
                <div className="value">
                  <div
                    className="imgValue imgJdValue"
                    style={{ height: '145px' }}
                  >
                    <img src={ets_img} alt="Logo de Skill of the world" />
                  </div>
                  <p>
                    Bonnne chance à vous et n’oubliez pas : 
                  </p>
                  <p><b>soyez vous-même !</b></p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Section Recherche */}
        <form className="divRecherche">
          <input
            type="search"
            name="offreSearch"
            placeholder="Poste"
            s
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
        </form>
        {/* <button className="searchBtnAdv" onClick={() => setChamp(!champ)}>
          Recherche avancée
        </button> */}

        {champ && (
          <form className="champ">
            {/* Localisation */}
            <select name="localisation">
              <option defaultValue value="Madagascar - Antananarivo">
                Localisation
              </option>
              {countries.map((country) => {
                return (
                  <option key={country.pays} value={`${country.pays}`}>
                    {country.pays} - {country.capitale}
                  </option>
                );
              })}
            </select>

            {/* Fonction */}
            <select name="fonction">
              <option defaultValue value="Marketing">
                Fonction
              </option>
              {fonctions.map((fonction, index) => {
                return (
                  <option key={index} value={`${fonction.nom}`}>
                    {fonction.nom}
                  </option>
                );
              })}
            </select>

            {/* Delai du recrutement */}
            <select name="delaiRecrutement">
              <option defaultValue value="de suite">
                Délais du recrutement
              </option>
              <option value="de suite">de suite</option>
              <option value={'1 mois'}>1 mois</option>
              <option value={'2 mois'}>2 mois</option>
              <option value={'3 mois'}>3 mois</option>
            </select>

            {/* Télétravail */}
            <select name="teletravail">
              <option defaultValue value="Présentiel possible">
                Télétravail
              </option>
              <option value={'Présentiel possible'}>Présentiel possible</option>
              <option value={'Partiel possible'}>Partiel possible</option>
              <option value={'Total'}>Total</option>
            </select>

            {/* Niveau d'étude */}
            <select name="niveauEtude">
              <option defaultValue value="bac">
                Niveau d'étude
              </option>
              <option value={'bac'}>bac</option>
              <option value={'bac+2'}>bac+2</option>
              <option value={'bac+3'}>bac+3</option>
              <option value={'bac+4'}>bac+4</option>
              <option value={'bac+5'}>bac+5</option>
            </select>

            {/* Type de contrat */}
            <select name="typeContrat">
              <option defaultValue value="CDD">
                Type de contrat
              </option>
              <option value={'CDD'}>CDD</option>
              <option value={'CDI'}>CDI</option>
              <option value={'Freelance'}>Freelance</option>
              <option value={'Freelance'}>Stage de fin d'étude</option>
              <option value={'Freelance'}>Apprentissage</option>
            </select>

            {/* Experience souhaité */}
            <select name="expSouhaite">
              <option defaultValue value="Débutant accepté">
                Experience souhaitée
              </option>
              <option value={'Débutant accepté'}>Débutant accepté</option>
              <option value={"De 1 à 3 ans d'expérience"}>
                De 1 à 3 ans d'expérience
              </option>
              <option value={"De 3 à 5 ans d'expérience"}>
                De 3 à 5 ans d'expérience
              </option>
              <option value={"Superieur 5 ans d'expérience"}>
                {' '}
                &gt; 5 ans d'expérience
              </option>
            </select>
            <br />
            <button className="searchAdvanced">Rechercher</button>
          </form>
        )}

        {/* Fin section Recherche */}
        <div className="forCardOffre">
          {jobdatingPublie.length > 0 ? (
            query !== '' ? (
              jobdatingPublie
                .filter((val) =>
                  val.intitulePoste.toLowerCase().includes(query)
                )
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((val) => {
                  return (
                    <div className="card" key={val._id}>
                      <div className="titre">
                        <h5>{val.intitulePoste}</h5>
                      </div>
                      <h5>Organisé par {val.nomEntreprise}</h5>
                      <div className="forBtn">
                        <div className="calendar">
                          <IconContext.Provider
                            value={{
                              color: '#0000008f',
                              size: '13px',
                            }}
                          >
                            <FaRegCalendar />
                          </IconContext.Provider>
                          <h5>
                            {moment(val.dateDebut).locale('fr').format('LL')}
                          </h5>
                        </div>
                        <Link to={`/detailJD/${val._id}`}>
                          <button>Voir détails</button>
                        </Link>
                      </div>
                    </div>
                  );
                })
            ) : (
              jobdatingPublie
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((val) => {
                  return (
                    <div className="card" key={val._id}>
                      <div className="titre">
                        <h5>{val.intitulePoste}</h5>
                      </div>
                      {/* <h5>Organisé par {val.nomEntreprise}</h5> */}
                      <div className="forBtn">
                        <div className="calendar">
                          <IconContext.Provider
                            value={{
                              color: '#0000008f',
                              size: '13px',
                            }}
                          >
                            <FaRegCalendar />
                          </IconContext.Provider>
                          <h5>
                            {moment(val.dateDebut).locale('fr').format('LL')}
                          </h5>
                        </div>
                        <Link to={`/detailJD/${val._id}`}>
                          <button>Voir détails</button>
                        </Link>
                      </div>
                    </div>
                  );
                })
            )
          ) : (
            <span style={{ textAlign: 'center', width: '100%' }}>
              {isLoading}
            </span>
          )}
        </div>
        {jobdatingPublie.length > 0 && (
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

export default ListeJobDatingGlobale;
