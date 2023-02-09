import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { BsCalendarDate } from "react-icons/bs";
import { IconContext } from "react-icons";

import countries from "../../Utils/africaCountry.json";
import fonctions from "../../Utils/fonction.json";
import "../../Assets/css/ajoutOffre.scss";
import "../../Assets/css/confirmModal.scss";

const OrganiserJD = () => {
  const redirect = useNavigate();
  const { uid } = useContext(AuthContext);

  const [intitulePoste, setIntitulePoste] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [fonction, setFonction] = useState("");
  const [niveauEtude, setNiveauEtude] = useState("non mentionné");
  const [typeContrat, setTypeContrat] = useState("");
  const [typeTravail, setTypeTravail] = useState("non mentionné");
  const [dateDebut, setDateDebut] = useState("");
  const [delaisRecrutement, setdelaisRecrutement] = useState("non mentionné");
  const [expSouhaite, setExpSouhaite] = useState("non mentionné");
  const [siteWeb, setSiteWeb] = useState("Aucun site web");
  const [lienConnexion, setLienConnexion] = useState("");
  const [description, setDescription] = useState("");
  const [competencesAttendues, setCompetencesAttendues] = useState("");
  const [savoirIdeal, setSavoirIdeal] = useState("");
  const [photoCouverture, setPhotoCouverture] = useState("");
  const [pourquoiPostuler, setPourquoiPostuler] = useState("");
  const [lienJobDating, setLienJobDating] = useState("");

  const ajoutSucces = () =>
    toast.success("votre job dating a été envoyer avec succès", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (photoCouverture) {
      const formData = new FormData();
      formData.append("entrepriseId", uid);
      formData.append("intitulePoste", intitulePoste);
      formData.append("localisation", localisation);
      formData.append("fonction", fonction);
      formData.append("niveauEtude", niveauEtude);
      formData.append("typeContrat", typeContrat);
      formData.append("typeTravail", typeTravail);
      formData.append("dateDebut", dateDebut);
      formData.append("delaisRecrutement", delaisRecrutement);
      formData.append("expSouhaite", expSouhaite);
      formData.append("siteWeb", siteWeb);
      formData.append("lienConnexion", lienConnexion);
      formData.append("description", description);
      formData.append("competencesAttendues", competencesAttendues);
      formData.append("savoirIdeal", savoirIdeal);
      formData.append("photoCouverture", photoCouverture);
      formData.append("lienJobDating", lienJobDating);
      formData.append("isPublie", true);

      await axios
        .post(`${process.env.REACT_APP_API_URL}api/jobdating`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          redirect("/validationJD");
          ajoutSucces();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}api/jobdating`,
        data: {
          entrepriseId: uid,
          intitulePoste: intitulePoste,
          localisation: localisation,
          fonction: fonction,
          niveauEtude: niveauEtude,
          typeContrat: typeContrat,
          typeTravail: typeTravail,
          dateDebut: dateDebut,
          delaisRecrutement: delaisRecrutement,
          expSouhaite: expSouhaite,
          siteWeb: siteWeb,
          lienConnexion: lienConnexion,
          description: description,
          competencesAttendues: competencesAttendues,
          savoirIdeal: savoirIdeal,
          pourquoiPostuler: pourquoiPostuler,
          lienJobDating: lienJobDating,
          isPublie: true,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            redirect("/validationJD");
            ajoutSucces();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="divAjoutOffre">
      <div className="innerAjoutOffre">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {" "}
          &#60; Retour
        </p>
        <h2>Organiser un job dating</h2>

        <form className="forInput" autoComplete="off" onSubmit={handleOnSubmit}>
          <input
            type="text"
            name="intitulePoste"
            placeholder="Intitulé du poste *"
            required
            value={intitulePoste}
            onChange={(event) => {
              setIntitulePoste(event.target.value);
            }}
          />

          {/* Localisation */}
          <select
            name="localisation"
            onChange={(event) => {
              setLocalisation(event.target.value);
            }}
            required
          >
            <option selected disabled value="">
              Localisation *
            </option>
            {countries.map((country, index) => {
              return (
                <option key={index} value={`${country.pays}`}>
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
            required
          >
            <option selected disabled value="">
              Fonction *
            </option>
            {fonctions.map((fonction, index) => {
              return (
                <option key={index} value={`${fonction.nom}`}>
                  {fonction.nom}
                </option>
              );
            })}
          </select>

          {/* Niveau d'étude */}
          <select
            name="niveauEtude"
            onChange={(event) => {
              setNiveauEtude(event.target.value);
            }}
          >
            <option selected disabled value="">
              Niveau d'étude minimum
            </option>
            <option value={"bac"}>bac</option>
            <option value={"bac+2"}>bac+2</option>
            <option value={"bac+3"}>bac+3</option>
            <option value={"bac+4"}>bac+4</option>
            <option value={"bac+5"}>bac+5</option>
          </select>

          {/* Type de contrat */}
          <select
            name="typeContrat"
            required
            onChange={(event) => {
              setTypeContrat(event.target.value);
            }}
          >
            <option selected disabled value="">
              Type de contrat *
            </option>
            <option value={"CDD"}>CDD</option>
            <option value={"CDI"}>CDI</option>
            <option value={"Freelance"}>Freelance</option>
            <option value={"Freelance"}>Stage de fin d'étude</option>
            <option value={"Freelance"}>Apprentissage</option>
          </select>

          {/* Télétravail */}
          <select
            name="teletravail"
            onChange={(event) => {
              setTypeTravail(event.target.value);
            }}
          >
            <option selected disabled value="">
              Télétravail
            </option>
            <option value={"Présentiel possible"}>Présentiel possible</option>
            <option value={"Partiel possible"}>Partiel possible</option>
            <option value={"Total"}>Total</option>
          </select>

          {/* Date de debut */}
          <label className="labelOffre" htmlFor="datePicker">
            Date de début souhaité *
          </label>
          <DatePicker
            id="datePicker"
            className="datePickerOffre"
            name="dateDebut"
            value={dateDebut}
            onChange={(dateDebut) => {
              setDateDebut(dateDebut);
            }}
            calendarIcon={
              <IconContext.Provider value={{ size: "19px" }}>
                <BsCalendarDate />
              </IconContext.Provider>
            }
            minDate={new Date()}
            required={true}
          />
          {/* <input
            type="text"
            name="dateDebut"
            onChange={(event) => {
              setDateDebut(event.target.value);
            }}
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
            placeholder="Date de début souhaité *"
            required
          /> */}

          {/* Delai du recrutement */}
          <select
            name="delaiRecrutement"
            onChange={(event) => {
              setdelaisRecrutement(event.target.value);
            }}
          >
            <option selected disabled value="">
              Délai du recrutement
            </option>
            <option value="de suite">de suite</option>
            <option value={"1 mois"}>1 mois</option>
            <option value={"2 mois"}>2 mois</option>
            <option value={"3 mois"}>3 mois</option>
          </select>

          {/* Experience souhaité */}
          <select
            name="expSouhaite"
            onChange={(event) => {
              setExpSouhaite(event.target.value);
            }}
          >
            <option selected disabled value="">
              Experience souhaitée
            </option>
            <option value={"Débutant accepté"}>Débutant accepté</option>
            <option value={"De 1 à 3 ans d'expérience"}>
              De 1 à 3 ans d'expérience
            </option>
            <option value={"De 3 à 5 ans d'expérience"}>
              De 3 à 5 ans d'expérience
            </option>
            <option value={"Superieur 5 ans d'expérience"}>
              {" "}
              &gt; 5 ans d'expérience
            </option>
          </select>

          {/* Site web */}
          <input
            type="text"
            name="siteWeb"
            placeholder="Votre site web"
            onChange={(event) => {
              setSiteWeb(event.target.value);
            }}
          />

          {/* Lien pour se connecter */}
          <input
            type="text"
            name="candidature"
            placeholder="Lien pour se connecter *"
            onChange={(event) => {
              setLienConnexion(event.target.value);
            }}
          />

          {/* Description de l'offre */}
          <label htmlFor="description">Description de l'offre *</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Description de l'offre *"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>

          {/* Compétences attendues */}
          <label htmlFor="competence">Les compétences attendues</label>
          <textarea
            name="competence"
            id="competence"
            cols="30"
            rows="10"
            placeholder="Les compétences attendues"
            onChange={(event) => {
              setCompetencesAttendues(event.target.value);
            }}
          ></textarea>

          {/* Savoir Ideal */}
          <label htmlFor="savoirIdeal" className="lblTxtArea">
            Le savoir-être idéal
          </label>
          <textarea
            name="savoirIdeal"
            id="savoirIdeal"
            cols="30"
            rows="10"
            placeholder="Le savoir-être idéal"
            onChange={(event) => {
              setSavoirIdeal(event.target.value);
            }}
          ></textarea>

          {/* Pourquoi postuler */}
          <label htmlFor="pourquoiPostuler">Pourquoi postuler ?</label>
          <textarea
            name="pourquoiPostuler"
            id="pourquoiPostuler"
            cols="30"
            rows="10"
            placeholder="Pourquoi postuler ?"
            onChange={(event) => {
              setPourquoiPostuler(event.target.value);
            }}
          ></textarea>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Upload couverture */}
            <label htmlFor="uploadCouverture" className="upload">
              Telecharger photo de couverture du job dating
            </label>
            <input
              type="file"
              id="photoCouverture"
              name="photoCouverture"
              style={{ width: "100%" }}
              onChange={(event) => {
                setPhotoCouverture(event.target.value);
              }}
            />
            {/* LIEN */}
            <input
              type="text"
              name="lienJobDating"
              placeholder="Lien du job dating *"
              style={{ width: "100%" }}
              onChange={(event) => {
                setLienJobDating(event.target.value);
              }}
            />
          </div>
          {/* boutton  */}
          <div className="forBtn">
            <input
              className="showPaymentMethod"
              type="submit"
              name="orgnaiser"
              value="Organiser"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganiserJD;
