import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { BsCalendarDate } from 'react-icons/bs';
import { IconContext } from 'react-icons';

import { AuthContext } from '../../context/AuthContext';
import '../../Assets/css/ajoutOffre.scss';
import '../../Assets/css/confirmModal.scss';
import eventPics from '../../Assets/img/event/event.webp';

const AjoutEvent = () => {
  const redirect = useNavigate();
  const { uid } = useContext(AuthContext);

  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const tarif = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirmModal">
            <div className="container">
              <a className="innerCard" href="#">
                <h3>1ère Offre</h3>
                <p className="small">Pack de 3 offres + 1 évènement offert</p>
                <div className="go-corner" href="#">
                  <div className="go-plus">+</div>
                </div>
              </a>
              <a className="innerCard" href="#">
                <h3>2ème offre</h3>
                <p className="small">1 offre d'emploi</p>
                <div className="go-corner" href="#">
                  <div className="go-plus">+</div>
                </div>
              </a>
              <a className="innerCard" href="#">
                <h3>3ème offre</h3>
                <p className="small">Offre premium, on s'occupe de tout</p>
                <div className="go-corner" href="#">
                  <div className="go-plus">+</div>
                </div>
              </a>
            </div>
            <button className="btnClose" onClick={onClose}>
              Fermer
            </button>
          </div>
        );
      },
    });
  };

  const ajoutSucces = () =>
    toast.success('Votre évènement a été envoyé avec succès', {
      position: 'top-center',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  // const [error, setError] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  const [nomEntreprise, setNomEntreprise] = useState();
  const [theme, setTheme] = useState();
  const [personneContacter, setPersonneContacter] = useState();
  const [dateEvenement, setDateEvenement] = useState();
  const [horaireSouhaite, setHoraireSouhaite] = useState();
  const [photoCouverture, setPhotoCouverture] = useState();
  const [typeEvenement, setTypeEvenement] = useState('public');
  const [modePayement, setModePayement] = useState();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('idEntreprise', uid);
    formData.append('nomEntreprise', nomEntreprise);
    formData.append('theme', theme);
    formData.append('typeEvenement', typeEvenement);
    formData.append('personneContacter', personneContacter);
    formData.append('dateEvenement', dateEvenement);
    formData.append('horaireSouhaite', horaireSouhaite);
    formData.append('photoCouverture', photoCouverture);
    formData.append('modePayement', modePayement);

    await axios
      .post(`${process.env.REACT_APP_API_URL}api/evenement`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        redirect('/listeEventEts');
        ajoutSucces();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="divAjoutOffre">
      <div className="innerAjoutOffre">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Organiser un évènement</h2>
        <div className="divTop">
          <div className="cardObjectif">
            <div className="value">
              <p>
                <b>ENTREPRISES : </b>
              </p>
              <p>- Présenter votre entreprise</p>
              <p>- Parler de votre actualité</p>
              <p>- Organiser un forum en ligne</p>
              <br />
              <p>
                <b>ECOLES :</b>
              </p>
              <p>- Présenter votre école</p>
              <p>- Recruter vos future(e)s étudiant(e)s</p>
              <p>- Parler de votre actualité</p>
            </div>
            <div className="imgValue">
              <img src={eventPics} alt="Event Illustration" />
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
          {/* Nom de l'entreprise */}
          <input
            type="text"
            name="etpName"
            placeholder="Nom de l'entreprise *"
            required
            onChange={(event) => {
              setNomEntreprise(event.target.value);
            }}
          />
          {/* Theme de l'évènement */}
          <input
            type="text"
            name="eventTheme"
            placeholder="Thème de l'évènement *"
            required
            onChange={(event) => {
              setTheme(event.target.value);
            }}
          />
          {/* Personne à contacter */}
          <input
            type="text"
            name="contactPerson"
            placeholder="Personne à contacter *"
            required
            onChange={(event) => {
              setPersonneContacter(event.target.value);
            }}
          />
          {/* Date du forum */}
          <label className="labelEvent" htmlFor="datePicker">
            Date du forum *
          </label>
          <DatePicker
            id="datePicker"
            className="datePickerOffre"
            name="forumDate"
            value={dateEvenement}
            onChange={(dateEvenement) => {
              setDateEvenement(dateEvenement);
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
            name="forumDate"
            placeholder="Date du forum *"
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
            required
            onChange={(event) => {
              setDateEvenement(event.target.value);
            }}
          /> */}
          {/* Horaire prévisionnel */}
          <input
            type="text"
            name="hours"
            placeholder="Horaire souhaité *"
            onFocus={(e) => (e.target.type = 'time')}
            onBlur={(e) => (e.target.type = 'text')}
            required
            onChange={(event) => {
              setHoraireSouhaite(event.target.value);
            }}
          />

          {/* Lien public ou privée */}
          <select
            name="publicPrivatLink"
            onChange={(event) => {
              setTypeEvenement(event.target.value);
            }}
          >
            <option selected disabled value="">
              Lien public ou privée
            </option>
            <option value={'Public'}>Public</option>
            <option value={'Privée'}>Privée</option>
          </select>

          {/* Upload couverture */}
          <label htmlFor="photoCouverture" className="upload">
            Telecharger photo de couverture de l'évènement
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
                    setModePayement(event.target.value);
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
                    setModePayement(event.target.value);
                  }}
                />
                <label className="forPaiement" htmlFor="orange">
                  Pour Madagascar / Afrique : Orange Money - Mvola
                </label>
                <div className="btnSubmit">
                  <input
                    className="btnPublier"
                    type="submit"
                    name="publier"
                    value="Organiser"
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

export default AjoutEvent;
