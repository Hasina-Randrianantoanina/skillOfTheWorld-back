import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { BsCalendarDate } from 'react-icons/bs';
import { IconContext } from 'react-icons';

import countries from '../../Utils/africaCountry.json';
import fonctions from '../../Utils/fonction.json';
import '../../Assets/css/ajoutOffre.scss';
import '../../Assets/css/confirmModal.scss';
import jobDatingPic from '../../Assets/img/jobDating/jobDating.webp';

const AjoutJD = () => {
  const redirect = useNavigate();
  const { uid } = useContext(AuthContext);

  const [intitulePoste, setIntitulePoste] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [fonction, setFonction] = useState('');
  const [niveauEtude, setNiveauEtude] = useState('non mentionné');
  const [typeContrat, setTypeContrat] = useState('');
  const [typeTravail, setTypeTravail] = useState('non mentionné');
  const [dateDebut, setDateDebut] = useState('');
  const [delaisRecrutement, setdelaisRecrutement] = useState('non mentionné');
  const [expSouhaite, setExpSouhaite] = useState('non mentionné');
  const [siteWeb, setSiteWeb] = useState('Aucun site web');
  const [lienConnexion, setLienConnexion] = useState('');
  const [description, setDescription] = useState('');
  const [competencesAttendues, setCompetencesAttendues] = useState('');
  const [savoirIdeal, setSavoirIdeal] = useState('');
  const [photoCouverture, setPhotoCouverture] = useState('');
  const [pourquoiPostuler, setPourquoiPostuler] = useState('');
  const [modePaiement, setModePaiement] = useState('');
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

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
    toast.success('Votre job dating a été envoyé avec succès', {
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
    if (photoCouverture) {
      const formData = new FormData();
      formData.append('entrepriseId', uid);
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
      formData.append('lienConnexion', lienConnexion);
      formData.append('description', description);
      formData.append('modePaiement', modePaiement);
      formData.append('competencesAttendues', competencesAttendues);
      formData.append('savoirIdeal', savoirIdeal);
      formData.append('photoCouverture', photoCouverture);

      await axios
        .post(`${process.env.REACT_APP_API_URL}api/jobdating`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          redirect('/listeJdEts');
          ajoutSucces();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios({
        method: 'POST',
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
          modePaiement: modePaiement,
          description: description,
          competencesAttendues: competencesAttendues,
          savoirIdeal: savoirIdeal,
          pourquoiPostuler: pourquoiPostuler,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            redirect('/listeJdEts');
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
          {' '}
          &#60; Retour
        </p>
        <h2>Organiser un job dating</h2>
        <div className="divTop">
          <div className="cardObjectif">
            <div className="value">
              <p>Complétez le formulaire :</p>
              <br />
              <p>
                - SOTW <b>facilite votre process</b> avant l'entretient.
              </p>
              <p>
                - SOTW validera le job dating et vous fera parvenir le lien de
                connexion une fois votre job dating validé.
              </p>
              <p>
                - Votre entreprise sera <b>mise en avant</b> sur le site SOTW
                avec la date du job dating et son descriptif.
              </p>
              <p>
                - Vous recevrez les <b>candidats ciblés</b> auxquels vous
                déciderez de faire parvenir le lien de connexion pour une
                entretient en ligne.
              </p>
              <p>
                - Si vous souhaitez rencotrer les candidats en presentiel, le
                tri des CV aura déja été réalisé pour vous.{' '}
                <b>Vous gagnez du temps !</b>
              </p>
            </div>
            <div className="imgValue" style={{ height: '145px' }}>
              <img src={jobDatingPic} alt="Inscription Illustration" />
            </div>
          </div>
        </div>
        {/* <input type="button" name="cout" value="Tarifs" onClick={tarif} /> */}
        <form
          style={{ margin: '0 auto' }}
          className="forInput"
          autoComplete="off"
          onSubmit={handleOnSubmit}
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
            <option value={"Superieur 5 ans d'expérience"}>
              {' '}
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
          <select name="appli">
            <option selected disabled value="">
              Appli préferentiel de connexion
            </option>
            <option value={'ZOOM'}>ZOOM</option>
            <option value={'TEAMS'}>TEAMS</option>
            <option value={'WHATSAPP'}>WHATSAPP</option>
            <option value={'SKYPE'}>SKYPE</option>
            <option value={'Autre'}>AUTRE</option>
          </select>

          {/* Description de l'offre */}
          <label htmlFor="description">Description de job dating *</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Description de job dating*"
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

          {/* Upload couverture */}
          <label htmlFor="uploadCouverture" className="upload">
            Telecharger photo de couverture du job dating
          </label>
          <input
            type="file"
            id="photoCouverture"
            name="photoCouverture"
            onChange={(event) => {
              setPhotoCouverture(event.target.files[0]);
            }}
          />
          {/* boutton Cout diffusion offre et Publier */}
          <div className="forBtn">
            <input
              className="showPaymentMethod"
              type="button"
              name="publier"
              value={!showPaymentMethod ? 'Organiser' : 'Annuler'}
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
                    value="Publier"
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

export default AjoutJD;
