import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Helmet } from "react-helmet";

import "../Assets/css/inscriptionEntreprise.scss";
import countries from "../Utils/africaCountry.json";
import ets_img from "../Assets/img/SOTW_logo (2).webp";

const InscriptionEntreprise = () => {
  const redirect = useNavigate();

  const [nomEntreprise, setNomEntreprise] = useState("");
  const [nomInterlocuteur, setNomInterlocuteur] = useState("");
  const [prenomInterlocuteur, setPrenomInterlocuteur] = useState("");
  const [fonction, setFonction] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [lieuxActivite, setLieuxActivite] = useState("");
  const [nombreSalaire, setNombreSalaire] = useState("");
  const [siteWeb, setSiteWeb] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordType, setPasswordType] = useState("password");
  const [icon, setIcon] = useState(<FaRegEyeSlash />);

  const handleShowPassword = () => {
    console.log("there");
    if (passwordType === "password") {
      setIcon(<FaRegEye />);
      setPasswordType("text");
    } else {
      setIcon(<FaRegEyeSlash />);
      setPasswordType("password");
    }
  };

  const inscriptionSuccess = () =>
    toast.success(
      "Veuillez vérifier votre boîte mail pour valider votre inscription",
      {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );

  const mdpError = () =>
    toast.warning(
      "Les mots de passe que vous avez saisi ne sont pas identiques",
      {
        position: "top-center",
        autoClose: 60000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );

  const Error = (err) =>
    toast.warning(err, {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}api/user/entreprise/signup`,
        data: {
          nomEntreprise: nomEntreprise,
          nomInterlocuteur: nomInterlocuteur,
          prenomInterlocuteur: prenomInterlocuteur,
          fonction: fonction,
          telephone: telephone,
          email: email,
          lieuxActivite: lieuxActivite,
          nombreSalaire: nombreSalaire,
          siteWeb: siteWeb,
          password: password,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            console.log("Inscription succès");
            inscriptionSuccess();
            redirect("/login");
          } else if (res.status === 200) {
            console.log(res.data);
            Error(res.data.errors.email);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      mdpError();
    }
  };

  return (
    <div className="divInscriptionEts">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Skill of the World</title>
        <meta name="keywords" content="DRH, RH, Recruter, Gain de temps RH" />
      </Helmet>
      <div className="innerInscriptionEts">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>

        <h2>Inscription à la plateforme</h2>

        <h4>Inscription à la plateforme SKILL OF THE WORLD</h4>
        <div className="divTop">
          <div className="cardObjectif">
            <div className="value">
              <ul>
                <p>
                  Si vous êtes la c'est que vous souhaiter simplifier vos
                  process recrutements.
                </p>
                <p>
                  Vous voulez aussi avoir accès à une communauté de talents
                  <strong> qualitatifs et interculturels.</strong>
                </p>{" "}
                <br />
                <p>
                  L'<strong>externalisation </strong> de certain tàches de recrutement
                  chronophages.
                </p>
                <br />
                <li>Des candidats ciblés</li>
                <li>
                  Un <strong>tableau de bord</strong> de suivi avec réponse automatiques
                  aux talents.
                </li>
                <li>
                  Un <strong>Expert RH</strong> qui vous accompagnera durant tout le
                  process.
                </li>
                <li>
                  La possibilité d'associer vos annonces à des Job Dating en
                  ligne.
                </li>
                <li>
                  Des <strong>évènements</strong> rien que pour mettre en avant votre
                  entreprise, votre actualité et votre marque employeur.
                </li>
              </ul>
            </div>
            <div className="imgValue">
              <img src={ets_img} alt="Logo de Skill of the world" />
            </div>
          </div>
        </div>
        <div className="divBottom">
          <form
            className="forInput"
            autoComplete="off"
            onSubmit={handleOnSubmit}
          >
            <input
              type="text"
              name="nomEntreprise"
              placeholder="Nom de l'entreprise *"
              required
              onChange={(event) => {
                setNomEntreprise(event.target.value);
              }}
            />
            <input
              type="text"
              name="nomInterlocuteur"
              placeholder="Nom de l'interlocuteur *"
              required
              onChange={(event) => {
                setNomInterlocuteur(event.target.value);
              }}
            />
            <input
              type="text"
              name="prenomInterlocuteur"
              placeholder="Prenom de l'interlocuteur *"
              required
              onChange={(event) => {
                setPrenomInterlocuteur(event.target.value);
              }}
            />
            <input
              type="text"
              name="fonction"
              placeholder="Fonction de l'interlocuteur *"
              required
              onChange={(event) => {
                setFonction(event.target.value);
              }}
            />
            {/* <input
              className="nbrTel" 
              type="tel"
              name="telephone"
              placeholder="Téléphone *"
              required
              onChange={(event) => {
                setTelephone(event.target.value);
              }}
            /> */}
            <PhoneInput
              containerClass="containtTel"
              inputClass="nbrTel"
              inputProps={{
                name: "telephone",
                required: true,
                autoFocus: true,
              }}
              country={"fr"}
              value={telephone}
              onChange={(telephone) => setTelephone(telephone)}
            />
            <input
              type="text"
              name="email"
              placeholder="Adresse mail *"
              required
              pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
              title="Veuillez entrer une adresse e-mail valide"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <select
              name="lieuxActivite"
              onChange={(event) => {
                setLieuxActivite(event.target.value);
              }}
            >
              <option defaultValue value="Lieu activité">
                Lieu d'activités
              </option>
              {countries.map((country, index) => {
                return (
                  <option key={index} value={`${country.pays}`}>
                    {country.pays} - {country.capitale}
                  </option>
                );
              })}
            </select>
            <select
              name="nombreSalaire"
              onChange={(event) => {
                setNombreSalaire(event.target.value);
              }}
            >
              <option defaultValue value={"Inferieur à 10"}>
                Nombre de salariés
              </option>
              <option value={"Inferieur à 10"}>Inferieur à 10</option>
              <option value={"10 à 50"}>10 à 50</option>
              <option value={"50 à 100"}>50 à 100</option>
              <option value={"100 à 500"}>100 à 500</option>
              <option value={"500 à 1000"}>500 à 1000</option>
              <option value={"Supérieur à 1000"}>Supérieur à 1000</option>
            </select>
            <input
              type="text"
              name="siteWeb"
              placeholder="Votre site internet"
              pattern="w+w+w+\.[A-Za-z0-9-]+\.[a-z]{2,}"
              title="Veuillez entrer une adresse valide"
              onChange={(event) => {
                setSiteWeb(event.target.value);
              }}
            />
            <div className="divHint">
              <span className="passHint" onClick={handleShowPassword}>
                {icon}
              </span>
              <input
                type={passwordType}
                className="fontSizeInput"
                name="password"
                placeholder="Mot de passe"
                required
                minLength="6"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <div className="divHint">
              <span className="passHint" onClick={handleShowPassword}>
                {icon}
              </span>
              <input
                type={passwordType}
                className="fontSizeInput"
                name="confirmPassword"
                placeholder="Confirmer mot de passe"
                required
                minLength="6"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </div>
            <div className="btnSubmit">
              <input type="submit" name="sign-up" value="S'inscrire" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InscriptionEntreprise;
