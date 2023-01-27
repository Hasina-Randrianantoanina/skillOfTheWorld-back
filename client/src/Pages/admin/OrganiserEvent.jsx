import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { BsCalendarDate } from 'react-icons/bs';
import { IconContext } from 'react-icons';

import { AuthContext } from '../../context/AuthContext';
import fonctions from '../../Utils/fonction.json';
import '../../Assets/css/ajoutOffre.scss';
import '../../Assets/css/confirmModal.scss';

const OrganiserEvent = () => {
  const redirect = useNavigate();
  const { uid } = useContext(AuthContext);

  const ajoutSucces = () =>
    toast.success('votre offre a été envoyer avec succès', {
      position: 'top-center',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  const [nomEntreprise, setNomEntreprise] = useState();
  const [theme, setTheme] = useState();
  const [personneContacter, setPersonneContacter] = useState();
  const [dateEvenement, setDateEvenement] = useState();
  const [horaireSouhaite, setHoraireSouhaite] = useState();
  const [photoCouverture, setPhotoCouverture] = useState();
  const [typeEvenement, setTypeEvenement] = useState();
  const [lien, setLien] = useState();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('idEntreprise', uid);
    formData.append('nomEntreprise', nomEntreprise);
    formData.append('theme', theme);
    formData.append('personneContacter', personneContacter);
    formData.append('dateEvenement', dateEvenement);
    formData.append('typeEvenement', typeEvenement);
    formData.append('horaireSouhaite', horaireSouhaite);
    formData.append('photoCouverture', photoCouverture);
    formData.append('lienEvenement', lien);
    formData.append('isPublie', true);
    await axios
      .post(`${process.env.REACT_APP_API_URL}api/evenement`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        redirect('/validationEvent');
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

        <form className="forInput" autoComplete="off" onSubmit={handleOnSubmit}>
          {/* Nom de l'entreprise */}
          <input
            type="text"
            name="etpName"
            placeholder="Nom de l'entreprise *"
            onChange={(event) => {
              setNomEntreprise(event.target.value);
            }}
            required
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
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
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
            <option defaultValue value={'public'}>
              Lien public ou privée
            </option>
            <option value={'Public'}>Public</option>
            <option value={'Privée'}>Privée</option>
          </select>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Upload couverture */}
            <label htmlFor="uploadCouverture" className="upload">
              Telecharger photo de couverture de l'évènement
            </label>
            <input
              style={{ width: '100%' }}
              type="file"
              id="photoCouverture"
              name="photoCouverture"
              onChange={(event) => {
                setPhotoCouverture(event.target.files[0]);
              }}
            />
            {/* LIEN */}
            <input
              type="text"
              placeholder="Lien de l'evenement"
              style={{ width: '100%' }}
              onChange={(event) => {
                setLien(event.target.value);
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

export default OrganiserEvent;
