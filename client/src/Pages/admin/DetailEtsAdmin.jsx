import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import "moment/locale/fr";
import { AuthContext } from "../../context/AuthContext";
import "../../Assets/css/detailEtsAdmin.scss";
import logoParDefaut from "../../Assets/img/SOTW_logo (5).webp";
import axios from "axios";

const DetailEtsAdmin = () => {
  const effectRan = useRef(false);
  const { getUrl, urlFile } = useContext(AuthContext);
  const redirect = useNavigate();
  const { id } = useParams();
  const [entreprise, setEntreprise] = useState([]);
  const [evenement, setEvenement] = useState([]);
  const [jobdating, setJobdating] = useState([]);
  const [offre, setOffre] = useState([]);

  useEffect(() => {
    const getEntreprise = async (idEntreprise) => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}api/user/entreprise/${idEntreprise}`
        )
        .then((res) => {
          setEntreprise(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getOffreEntreprise = async (idEntreprise) => {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}api/offre/entreprise/${idEntreprise}`,
      })
        .then((response) => {
          setOffre(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getJobDatingEntreprise = async (idEntreprise) => {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}api/jobdating/entreprise/${idEntreprise}`,
      })
        .then((response) => {
          setJobdating(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    const getEvenementEntreprise = async (idEntreprise) => {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}api/evenement/entreprise/${idEntreprise}`,
      })
        .then((response) => {
          setEvenement(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    if (effectRan.current === false) {
      getUrl();
      getEntreprise(id);
      getOffreEntreprise(id);
      getJobDatingEntreprise(id);
      getEvenementEntreprise(id);
    }
    return () => {
      effectRan.current = true;
    };
  }, [id]);

  return (
    <div className="outerDivDetailEtsAdmin">
      <div className="innerDivDetailEtsAdmin">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {" "}
          &#60; Retour
        </p>
        <h2>Détail de l'entreprise</h2>
        {/* TOP CARD */}
        <div className="topCard">
          {/* LEFT */}
          <div className="topLeft">
            <img
              src={
                entreprise.uploadLogo
                  ? `${urlFile.split(".com/")[0]}.com/${entreprise.uploadLogo}`
                  : logoParDefaut
              }
              alt="profil du candidat"
            />
          </div>
          {/* RIGHT */}
          <div className="topRight">
            <div
              className="titre"
              style={{ justifyContent: "center", marginBottom: "25px" }}
            >
              <h3 style={{ color: "#00b5be" }}>
                <b>{entreprise.nomEntreprise}</b>
              </h3>
            </div>

            <span>
              <h4>Nom et prenom de l'interlocuteur :</h4>
              <p>
                &nbsp;{entreprise.nomInterlocuteur}{" "}
                {entreprise.prenomInterlocuteur}
              </p>
            </span>
            <span>
              <h4>Fonction de l'interlocuteur :</h4>
              <p>&nbsp;{entreprise.fonction}</p>
            </span>
            <span>
              <h4>Contact :</h4>
              <p>&nbsp;+{entreprise.telephone}</p>
            </span>
            <span>
              <h4>Adresse mail :</h4>
              <p>&nbsp;{entreprise.email}</p>
            </span>
            <span>
              <h4>Lieu d'activités :</h4>
              <p>&nbsp;{entreprise.lieuxActivite}</p>
            </span>
            <span>
              <h4>Nombre de salariés :</h4>
              <p>&nbsp;{entreprise.nombreSalaire} salariés</p>
            </span>
            <span>
              <h4>site internet :</h4>
              <p>
                &nbsp;
                {entreprise.siteWeb !== ""
                  ? entreprise.siteWeb
                  : "Pas de site web"}
              </p>
            </span>
            <span>
              <h4>Date d'inscription à la plateforme :</h4>
              <p>
                &nbsp;{moment(entreprise.createdAt).locale("fr").format("LL")}
              </p>
            </span>

            <h4 style={{ marginTop: "20px" }}>Liste des offres :</h4>
            {offre.length > 0 ? (
              offre.map((val) => {
                return (
                  <div className="titre" style={{ top: "5px" }} key={val._id}>
                    <p>{val.intitulePoste}</p>
                    <i>
                      <p>{moment(val.createdAt).locale("fr").format("LL")}</p>
                    </i>
                  </div>
                );
              })
            ) : (
              <div className="titre" style={{ top: "5px" }}>
                <p>Pas encore d'offre</p>
              </div>
            )}
            <h4 style={{ marginTop: "20px" }}>Liste des job dating :</h4>
            {jobdating.length > 0 ? (
              jobdating.map((val) => {
                return (
                  <div className="titre" style={{ top: "5px" }} key={val._id}>
                    <p>{val.intitulePoste}</p>
                    <i>
                      <p>{moment(val.createdAt).locale("fr").format("LL")}</p>
                    </i>
                  </div>
                );
              })
            ) : (
              <div className="titre" style={{ top: "5px" }}>
                <p>Pas encore de job dating</p>
              </div>
            )}

            <h4 style={{ marginTop: "20px" }}>Liste des évènements :</h4>
            {evenement.length > 0 ? (
              evenement.map((val) => {
                return (
                  <div className="titre" style={{ top: "5px" }} key={val._id}>
                    <p>{val.theme}</p>
                    <i>
                      <p>{moment(val.createdAt).locale("fr").format("LL")}</p>
                    </i>
                  </div>
                );
              })
            ) : (
              <div className="titre" style={{ top: "5px" }}>
                <p>Pas encore d'évènement</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEtsAdmin;
