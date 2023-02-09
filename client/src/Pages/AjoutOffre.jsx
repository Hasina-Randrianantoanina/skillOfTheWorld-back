import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from 'react-toastify';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { BsCalendarDate } from 'react-icons/bs';
import { IconContext } from 'react-icons';

import countries from "../Utils/africaCountry.json";
import fonctions from "../Utils/fonction.json";
import "../Assets/css/ajoutOffre.scss";
import "../Assets/css/confirmModal.scss";

const AjoutOffre = () => {
  const { uid } = useContext(AuthContext);
  const redirect = useNavigate();
  const [entreprises, setEntreprises] = useState();

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
  const [destinataire, setDestinataire] = useState("");
  const [groupe, setGroupe] = useState("");
  const [annonceAnonyme, setAnnonceAnonyme] = useState("");
  const [souhaitAccompagnement, setSouhaitAccompagnement] = useState("");
  const [savoirIdeal, setSavoirIdeal] = useState("");
  const [competencesAttendues, setCompetencesAttendues] = useState("");
  const [descriptionOffre, setDescription] = useState("");
  const [pourquoiPostuler, setPourquoiPostuler] = useState("");
  const [uploadCouverture, setUploadCouverture] = useState("");
  const [modePaiement, setModePaiement] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${uid}`,
    })
      .then((res) => {
        setEntreprises(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const tarif = () => {
  //   confirmAlert({
  //     customUI: ({ onClose }) => {
  //       return (
  //         <div className="confirmModal">
  //           <div className="container">
  //             <a className="innerCard" href="#">
  //               <h3>1ère Offre</h3>
  //               <p className="small">Pack de 3 offres + 1 évènement offert</p>
  //               <div className="go-corner" href="#">
  //                 <div className="go-plus">+</div>
  //               </div>
  //             </a>
  //             <a className="innerCard" href="#">
  //               <h3>2ème offre</h3>
  //               <p className="small">1 offre d'emploi</p>
  //               <div className="go-corner" href="#">
  //                 <div className="go-plus">+</div>
  //               </div>
  //             </a>
  //             <a className="innerCard" href="#">
  //               <h3>3ème offre</h3>
  //               <p className="small">Offre premium, on s'occupe de tout</p>
  //               <div className="go-corner" href="#">
  //                 <div className="go-plus">+</div>
  //               </div>
  //             </a>
  //           </div>
  //           <button className="btnClose" onClick={onClose}>
  //             Fermer
  //           </button>
  //         </div>
  //       );
  //     },
  //   });
  // };

  const ajoutSucces = () =>
    toast.success('Votre offre a été envoyée avec succès', {
      position: 'top-center',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (uploadCouverture) {
      const formData = new FormData();
      formData.append('offreId', uid);
      formData.append('intitulePoste', intitulePoste);
      formData.append('localisation', localisation);
      formData.append('fonction', fonction);
      formData.append('niveauEtude', niveauEtude);
      formData.append('typeContrat', typeContrat);
      formData.append('typeTravail', typeTravail);
      formData.append('dateDebut', dateDebut);
      formData.append('delaisRecrutement', delaisRecrutement);
      formData.append('expSouhaite', expSouhaite);
      formData.append('siteWeb', siteWeb);
      formData.append('destinataire', destinataire);
      formData.append('groupe', groupe);
      formData.append('annonceAnonyme', annonceAnonyme);
      formData.append('souhaitAccompagnement', souhaitAccompagnement);
      formData.append('savoirIdeal', savoirIdeal);
      formData.append('competencesAttendues', competencesAttendues);
      formData.append('descriptionOffre', descriptionOffre);
      formData.append('pourquoiPostuler', pourquoiPostuler);
      formData.append('modePaiement', modePaiement);
      formData.append('uploadCouverture', uploadCouverture);
      formData.append('email', entreprises.email);
      formData.append('nomEntreprise', entreprises.nomEntreprise);
      await axios
        .post(`${process.env.REACT_APP_API_URL}api/offre`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          if (res.status === 201) {
            ajoutSucces();
            redirect("/listeOffreEts");
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}api/offre/withoutfile/`,
        data: {
          offreId: uid,
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
          destinataire: destinataire,
          groupe: groupe,
          annonceAnonyme: annonceAnonyme,
          souhaitAccompagnement: souhaitAccompagnement,
          savoirIdeal: savoirIdeal,
          competencesAttendues: competencesAttendues,
          descriptionOffre: descriptionOffre,
          pourquoiPostuler: pourquoiPostuler,
          uploadCouverture: uploadCouverture,
          modePaiement: modePaiement,
          listCandidat: [],
          email: entreprises.email,
          nomEntreprise: entreprises.nomEntreprise,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            ajoutSucces();
            redirect('/listeOffreEts');
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
          {' '}
          &#60; Retour
        </p>
        <h2>Diffuser une offre d'emploi</h2>
        <h4>
          Vous y êtes ! Rédigez votre offre d’emploi et accédez à la puissance
          des Skills du monde entier !
        </h4>
        <div className="divTop">
          {/* <div className="cardObjectif">
            <div className="value">
              <p>
                Vous complétez le formulaire de l'offre et vous avez accès aux
                services suivants :
              </p>
              <br />
              <p>
                - <b>Relecture</b> par un chargé de sourcing expert avant mise
                en ligne.
              </p>
              <p>
                - <b>Personnalisation</b> de l'offre avec votre logo ou une
                image qui vous représente
              </p>
              <p>
                - <b>Tri préalable</b> des CV reçus par notre équipe et envoi de
                candidatures ciblées.
              </p>
              <p>
                - Diffusion en parralèle sur des <b>réseaux sociaux</b> ciblés
                et des écoles.
              </p>
              <p>
                - <b>Tableau de bord</b> de suivi des candidatures.
              </p>
              <p> 
                - Réponse <b>automatique</b> aux candidats via la plateforme
                selon le statut (accepté-refusé-en attente)
              </p>
              <p>
                - Visibilité de <b>30 jours</b> sur la plateforme.
              </p>
            </div>
            <div className="imgValue">
              <img src={ets_img} alt="Inscription Illustration" />
            </div>
          </div> */}
        </div>
        {/* <input type="button" name="cout" value="Tarifs" onClick={tarif} /> */}
        <form
          className="forInput"
          autoComplete="off"
          onSubmit={handleOnSubmit}
          encType="multipart/form-data"
        >
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
                <option key={index} value={`${country.pays} - ${country.capitale}`}>
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
            <option value={'bac'}>bac</option>
            <option value={'bac+2'}>bac+2</option>
            <option value={'bac+3'}>bac+3</option>
            <option value={'bac+4'}>bac+4</option>
            <option value={'bac+5'}>bac+5</option>
          </select>

          {/* Type de contrat */}
          <select
            name="typeContrat"
            onChange={(event) => {
              setTypeContrat(event.target.value);
            }}
            required
          >
            <option selected disabled value="">
              Type de contrat *
            </option>
            <option value={'CDD'}>CDD</option>
            <option value={'CDI'}>CDI</option>
            <option value={'Freelance'}>Freelance</option>
            <option value={'Freelance'}>Stage de fin d'étude</option>
            <option value={'Freelance'}>Apprentissage</option>
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
            <option value={'Télétravail ponctuel autorisé'}>
              Télétravail ponctuel autorisé
            </option>
            <option value={'Télétravail partiel possible'}>
              Télétravail partiel possible
            </option>
            <option value={'Télétravail total possible'}>
              Télétravail total possible
            </option>
            <option value={"Télétravail non prévu"}>
            Télétravail non prévu
            </option>
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
              <IconContext.Provider value={{ size: '19px' }}>
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
            placeholder="Date de début souhaitée *"
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
            <option value={'1 mois'}>1 mois</option>
            <option value={'2 mois'}>2 mois</option>
            <option value={'3 mois'}>3 mois</option>
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
            <option value={'Débutant accepté'}>Débutant accepté</option>
            <option value={"De 1 à 3 ans d'expérience"}>
              De 1 à 3 ans d'expérience
            </option>
            <option value={"De 3 à 5 ans d'expérience"}>
              De 3 à 5 ans d'expérience
            </option>
            <option value={"Superieur à 5 ans d'expérience"}>
              {" "}
              Superieur à 5 ans d'expérience
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

          {/* Envoyer Candidature à */}
          <input
            type="text"
            name="candidature"
            placeholder="Nom / prénom du recruteur"
            onChange={(event) => {
              setDestinataire(event.target.value);
            }}
          />

          {/* Si groupe */}
          <input
            type="text"
            name="candidature"
            placeholder="Si groupe : entité qui recrute"
            onChange={(event) => {
              setGroupe(event.target.value);
            }}
          />

          <div className="yesOrNo">
            {/* Annonyme Annonce */}
            <div className="annonce">
              <label>Annonce Anonyme</label>
              <div className="innerYesOrNon">
                <span>
                  <input
                    type="radio"
                    id="annonceOUI"
                    value={true}
                    name="annonce"
                    onChange={(event) => {
                      setAnnonceAnonyme(event.target.value);
                    }}
                  />
                  <label htmlFor="annonceOUI">Oui</label>
                </span>
                <span>
                  <input
                    type="radio"
                    id="annonceNON"
                    value={false}
                    name="annonce"
                    required
                    onChange={(event) => {
                      setAnnonceAnonyme(event.target.value);
                    }}
                  />
                  <label htmlFor="annonceNON">Non</label>
                </span>
              </div>
            </div>

            {/* accompagnement */}
            <div className="accompagnement">
              <label>
                <b>Offre Premium :</b> vous souhaitez que SOTW réalise
                totalement votre recrutement ?
              </label>
              <div className="innerYesOrNon">
                <span>
                  <input
                    type="radio"
                    id="accompagnementOui"
                    value={true}
                    name="accompagnement"
                    onChange={(event) => {
                      setSouhaitAccompagnement(event.target.value);
                    }}
                  />
                  <label htmlFor="accompagnementOui">Oui</label>
                </span>
                <span>
                  <input
                    type="radio"
                    id="accompagnementNon"
                    value={false}
                    name="accompagnement"
                    required
                    onChange={(event) => {
                      setSouhaitAccompagnement(event.target.value);
                    }}
                  />
                  <label htmlFor="accompagnementNon">Non</label>
                </span>
              </div>
            </div>
          </div>

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
          <label htmlFor="competence">Les compétences attendues *</label>
          <textarea
            name="competence"
            id="competence"
            cols="30"
            rows="10"
            placeholder="Les compétences attendues *"
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

          {/* Upload couverture */}
          <label htmlFor="uploadCouverture" className="upload">
            Télécharger une photo de couverture pour l'offre
          </label>
          <input
            type="file"
            id="uploadCouverture"
            name="uploadCouverture"
            onChange={(event) => {
              setUploadCouverture(event.target.files[0]);
            }}
          />

          {/* boutton Cout diffusion offre et Publier */}
          <div className="forBtn">
            <input
              className="showPaymentMethod"
              type="button"
              name="publier"
              value={!showPaymentMethod ? 'Publier' : 'Annuler'}
              onClick={() => setShowPaymentMethod(!showPaymentMethod)}
            />
          </div>

          {/* MODE DE PAIEMENT */}
          {showPaymentMethod && (
            <div className="divPaiement">
              <h3>Mode de paiement</h3>

              <div className="forPaiement">
                <input
                  type="radio"
                  id="virement"
                  name="virement"
                  value={'Virement bancaire'}
                  onChange={(event) => {
                    setModePaiement(event.target.value);
                  }}
                />
                <label className="forPaiement" htmlFor="virement">
                  Virement bancaire
                </label>
                <input
                  type="radio"
                  id="orange"
                  name="virement"
                  value={'Orange Money'}
                  onChange={(event) => {
                    setModePaiement(event.target.value);
                  }}
                />
                <label className="forPaiement" htmlFor="orange">
                  Pour Madagascar / Afrique : Orange Money - Mvola
                </label>
                {/* <input
                  type="radio"
                  id="telma"
                  name="virement"
                  value={' Telma Mvola'}
                  onChange={(event) => {
                    setModePaiement(event.target.value);
                  }}
                />
                <label className="forPaiement" htmlFor="telma">
                  Telma Mvola
                </label> */}
                {/* <input
                  type="radio"
                  id="cheque"
                  name="virement"
                  value={' Chèque'}
                  onChange={(event) => {
                    setModePaiement(event.target.value);
                  }}
                />
                <label className="forPaiement" htmlFor="cheque">
                  Chèque (paiement uniquement à Madagascar)
                </label> */}
                <div className="btnSubmit">
                  <input
                    className="btnPublier"
                    type="submit"
                    name="publier"
                    value={isLoading ? 'Chargement ...' : 'Publier'}
                  />
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AjoutOffre;
