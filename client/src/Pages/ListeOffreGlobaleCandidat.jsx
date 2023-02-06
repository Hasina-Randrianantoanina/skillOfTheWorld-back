import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { FaRegCalendar } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet";

import "../Assets/css/offreglobale.scss";
import ets_img from "../Assets/img/SOTW_logo (2).webp";
import countries from "../Utils/africaCountry.json";
import fonctions from "../Utils/fonction.json";
import Pagination from "../Components/Pagination";

const ListeOffreGlobale = () => {
  const redirect = useNavigate();
  const { candidat } = useContext(AuthContext);

  const [offres, setOffre] = useState([]);
  const [champ, setChamp] = useState(false);
  const [query, setQuery] = useState("");
  const [typeTravail, setTypeTravail] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [fonction, setFonction] = useState("");
  const [isLoading, setIsLoading] = useState(" ");
  const [results, setResults] = useState([]);
  const [isNotFound, setIsNotFound] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const getOffrePublie = async () => {
      setIsLoading("Chargement ...");
      setIsNotFound("");
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/offre/valide/`,
      })
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            setOffre(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      offres.length === 0 && setIsLoading("Pas encore d'offre pour le moment");
      results.length === 0 && setIsNotFound("Aucun résultat trouvé");
    };

    getOffrePublie();
  }, []);

  useEffect(() => {
    setResults(
      offres.filter((val) => val.intitulePoste.toLowerCase().includes(query))
    );
  }, [offres, query]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  return (
    <div className="outerDivOffre">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Skill of the World - Externaliser et réduire ses délais de recrutement
        </title>
        <meta
          name="keywords"
          content="Plateforme de recrutement, Recrutement externalisé, Cabinet de recrutement, Offre d’emploi, Recrutement international"
        />
      </Helmet>
      <div className="innerDivOffre">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {" "}
          &#60; Retour
        </p>
        <h2>Offres d'emploi</h2>
        {candidat && (
          <>
            <div className="divTop">
              <div className="cardObjectif">
                <div className="value">
                  <p>Partez à la découverte de nos offres d’emplois !</p>
                  <br />
                  <p>
                    <b>Pour postuler, rien de plus simple :</b>
                  </p>
                  <p>- Soit vous chargez votre CV sous votre profil</p>
                  <p>- Soit vous le chargez via la plateforme</p>
                </div>
                <div className="imgValue" style={{ height: "145px" }}>
                  <img src={ets_img} alt="Logo de Skill of the world" />
                </div>
              </div>
            </div>
            <div
              className="divTop"
              style={{ marginTop: "15px", flexDirection: "row-reverse" }}
            >
              <div
                className="cardObjectif"
                style={{
                  flexDirection: "row-reverse",
                  background: "powderBlue",
                }}
              >
                <div className="value">
                  <p>
                    Nous vous incitons fortement à joindre une{" "}
                    <b>lettre de motivation</b> pour expliquer votre projet
                    professionnel en lien avec l’annonce.
                  </p>
                  <br />
                  <p>
                    Et puis si votre parcours est atypique, nous pouvons tout
                    entendre alors il ne faut pas hésiter à expliquer vos choix
                    professionnels.
                  </p>
                </div>
                <div
                  className="imgValue"
                  style={{ height: "145px", marginRight: "50px" }}
                >
                  <img src={ets_img} alt="Logo de Skill of the world" />
                </div>
              </div>
            </div>
            <div className="divTop" style={{ marginTop: "15px" }}>
              <div className="cardObjectif">
                <div className="value">
                  <p>
                    Le choix des candidats se fait à notre niveau et les
                    <b> meilleures candidatures</b> seront envoyées aux
                    entreprises.
                  </p>
                  <br />
                  <p>
                    Une fois votre candidature envoyée, elle parviendra à un
                    Expert Recrutement SOTW.
                  </p>
                  <br />
                  <p>
                    Vous recevrez une notification automatique de notre part.
                  </p>
                  <p>Fini la non réponse aux candidatures !</p>
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
            placeholder="Intitulé du poste ..."
            onChange={(event) => {
              setQuery(event.target.value);
            }}
          />
          {/* <button type="submit" className="searchBtn">
            Rechercher
          </button> */}
        </form>
        {/* <button className="searchBtnAdv" onClick={() => setChamp(!champ)}>
          Recherche avancée
        </button> */}
        {champ && (
          <form className="champ">
            {/* Localisation */}
            <select
              name="localisation"
              onChange={(event) => {
                setLocalisation(event.target.value);
              }}
            >
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
            <select
              name="fonction"
              onChange={(event) => {
                setFonction(event.target.value);
              }}
            >
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
            {/* Télétravail */}
            <select
              name="teletravail"
              onChange={(event) => {
                setTypeTravail(event.target.value);
              }}
            >
              <option defaultValue value="Présentiel possible">
                Télétravail
              </option>
              <option value={"Présentiel possible"}>Présentiel possible</option>
              <option value={"Partiel possible"}>Partiel possible</option>
              <option value={"Total"}>Total</option>
            </select>
            {/* Delai du recrutement */}
            {/* <select
              name="delaiRecrutement"
              onChange={(event) => {
                setdelaisRecrutement(event.target.value);
              }}
            >
              <option defaultValue value="de suite">
                Délais du recrutement
              </option>
              <option value="de suite">de suite</option>
              <option value={'1 mois'}>1 mois</option>
              <option value={'2 mois'}>2 mois</option>
              <option value={'3 mois'}>3 mois</option>
            </select> */}

            {/* Niveau d'étude */}
            {/* <select
              name="niveauEtude"
              onChange={(event) => {
                setNiveauEtude(event.target.value);
              }}
            >
              <option defaultValue value="bac">
                Niveau d'étude
              </option>
              <option value={'bac'}>bac</option>
              <option value={'bac+2'}>bac+2</option>
              <option value={'bac+3'}>bac+3</option>
              <option value={'bac+4'}>bac+4</option>
              <option value={'bac+5'}>bac+5</option>
            </select> */}

            {/* Type de contrat */}
            {/* <select
              name="typeContrat"
              onChange={(event) => {
                setTypeContrat(event.target.value);
              }}
            >
              <option defaultValue value="CDD">
                Type de contrat
              </option>
              <option value={'CDD'}>CDD</option>
              <option value={'CDI'}>CDI</option>
              <option value={'Freelance'}>Freelance</option>
              <option value={'Freelance'}>Stage de fin d'étude</option>
              <option value={'Freelance'}>Apprentissage</option>
            </select> */}

            {/* Experience souhaité */}
            {/* <select
              name="expSouhaite"
              onChange={(event) => {
                setExpSouhaite(event.target.value);
              }}
            >
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
            <br /> */}
            {/* <button type="submit" className="searchAdvanced">
              Rechercher
            </button> */}
          </form>
        )}
        {/* Fin section Recherche */}
        {/* recherche avec Aubin */}
        <div className="forCardOffre">
          {offres.length > 0 ? (
            query !== "" ? (
              offres
                .filter((val) =>
                  val.intitulePoste.toLowerCase().includes(query)
                )
                .slice(indexOfFirstPost, indexOfLastPost)
                .map((val) => {
                  return (
                    <div className="card" key={val._id}>
                      <div className="titre">
                        <h5>{val.intitulePoste}</h5>
                        <h5 className="ville">{val.localisation}</h5>
                      </div>
                      {/* <h5>Calina Corps</h5> */}
                      <div className="forBtn" style={{ marginTop: "25px" }}>
                        <div className="calendar">
                          <IconContext.Provider
                            value={{
                              color: "#0000008f",
                              size: "13px",
                            }}
                          >
                            <FaRegCalendar />
                          </IconContext.Provider>
                          <h5>{val.typeContrat}</h5>
                        </div>
                        <Link to={`/detailOffreGlobale/${val._id}`}>
                          <button>Voir détails</button>
                        </Link>
                      </div>
                    </div>
                  );
                })
            ) : (
              offres.slice(indexOfFirstPost, indexOfLastPost).map((val) => {
                return (
                  <div className="card" key={val._id}>
                    <div className="titre">
                      <h5>{val.intitulePoste}</h5>
                      <h5 className="ville">{val.localisation}</h5>
                    </div>
                    {/* <h5>Calina Corps</h5> */}
                    <div className="forBtn" style={{ marginTop: "25px" }}>
                      <div className="calendar">
                        <IconContext.Provider
                          value={{
                            color: "#0000008f",
                            size: "13px",
                          }}
                        >
                          <FaRegCalendar />
                        </IconContext.Provider>
                        <h5>{val.typeContrat}</h5>
                      </div>
                      <Link to={`/detailOffreGlobale/${val._id}`}>
                        <button>Voir détails</button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )
          ) : (
            <>
              <span style={{ textAlign: "center", width: "100%" }}>
                {isLoading}
              </span>
            </>
          )}
          {results.length <= 0 && offres.length > 0 && (
            <span style={{ textAlign: "center", width: "100%" }}>
              {isNotFound}
            </span>
          )}
        </div>
        {offres.length > 0 && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={offres.length}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
};

export default ListeOffreGlobale;
