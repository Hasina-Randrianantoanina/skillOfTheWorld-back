import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import { BsCalendarDate } from 'react-icons/bs';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Helmet } from 'react-helmet';

import inscriptionImg from '../Assets/img/global/inscription.svg';
import fonctions from '../Utils/fonction.json';
import '../Assets/css/inscriptionCandidat.scss';
import countries from '../Utils/africaCountry.json';
import ets_img from '../Assets/img/SOTW_logo (2).webp';

const InscriptionCandidat = () => {
  const redirect = useNavigate();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [secteurActivite, setSecteurActivite] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordType, setPasswordType] = useState('password');
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = () => {
    if (passwordType === 'password') {
      setIcon(<FaRegEye />);
      setPasswordType('text');
    } else {
      setIcon(<FaRegEyeSlash />);
      setPasswordType('password');
    }
  };

  const inscriptionSuccess = () =>
    toast.success(
      'Veuillez vérifier votre boîte mail pour valider votre inscription',
      {
        position: 'top-center',
        autoClose: 60000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      }
    );

  const mdpError = () =>
    toast.warning(
      'Les mots de passe que vous avez saisi ne sont pas identiques',
      {
        position: 'top-center',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      }
    );

  const Error = (err) =>
    toast.warning(err, {
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
    setIsLoading(true);
    if (password === confirmPassword) {
      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}api/user/candidat/signup`,
        data: {
          nom: nom,
          prenom: prenom,
          dateNaissance: dateNaissance,
          localisation: localisation,
          email: email,
          secteurActivite: secteurActivite,
          uploadLogo: null,
          isVerified: false,
          password: password,
          listLM: [],
          listCV: [],
        },
      })
        .then((res) => {
          if (res.status === 201) {
            setNom('');
            setPrenom('');
            setDateNaissance('');
            setLocalisation('');
            setEmail('');
            setPassword('');
            setSecteurActivite('');
            setConfirmPassword('');
            inscriptionSuccess();
            redirect('/login');
            setIsLoading(false);
          } else if (res.status === 200) {
            Error(res.data.errors.email);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } else {
      mdpError();
      setIsLoading(false);
    }
  };
  return (
    <div className="divInscriptionCdt">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Skill of the World</title>
        <meta
          name="keywords"
          content="Trouver un emploi, Recrutement International, Offre d’emploi, Annonce, Recrutement"
        />
      </Helmet>
      <div className="innerInscriptionCdt">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <div className="bienvenue" style={{ textAlign: 'center' }}>
          <h2>
            <b>Bienvenue à vous, Talent !</b>
          </h2>
        </div>
        <div className="divTop">
          <div className="cardObjectif">
            <div className="value">
              <ul>
                <li>Vous recherchez un emploi à travers le monde ?</li>
                <li>En CDI, CDD, Remote Work ?</li>
                <li>
                  Vous souhaitez une expérience candidat où les entreprises
                  peuvent développer une relation particulière avec vous lors de
                  job dating ou encore d’évènements ?
                </li>
                <li>
                  Sans compter que par la plateforme, vous serez informé(e) du
                  suivi de vos candidatures ?
                </li>
                <br />
                <p>
                  <b>Vous êtes au bon endroit.</b>
                </p>
                <p>
                  Profitez de l’expérience Skill of the World Et …
                  Inscrivez-vous !
                </p>
              </ul>
            </div>
            <div className="imgValue">
              <img src={ets_img} alt="Logo de Skill of the world" />
            </div>
          </div>
        </div>
        {/* <p>- Vous recherchez un emploi à travers le monde ?</p>
          <p>- En CDI, CDD, Remote Work ?</p>
          <p>
            - Vous souhaitez une expérience candidat où les entreprises peuvent
            développer une relation particulière avec vous lors de job dating ou
            encore d’évènements ?
          </p>
          <p>
            - Sans compter que par la plateforme, vous serez informé(e) du suivi
            de vos candidatures ?
          </p>
          <br />
          <p>
            <b>Vous êtes au bon endroit.</b>
          </p>
          <p>
            Profitez de l’expérience Skill of the World Et … Inscrivez-vous !
          </p> */}
        <div className="left">
          <a
            href="https://storyset.com/phone"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={inscriptionImg} alt="Inscription" />
          </a>
        </div>
        <div className="right">
          <form
            className="forInput"
            autoComplete="off"
            onSubmit={handleOnSubmit}
          >
            <input
              type="text"
              name="nom"
              placeholder="Nom *"
              required
              onChange={(event) => {
                setNom(event.target.value);
              }}
              value={nom}
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom *"
              required
              onChange={(event) => {
                setPrenom(event.target.value);
              }}
              value={prenom}
            />
            {/* <input
              type="text"
              name="dateNaissance"
              onChange={(event) => {
                setDateNaissance(event.target.value);
              }}
              value={dateNaissance}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              placeholder="Date de naissance *"
              required
            /> */}
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
            <select
              name="fonction"
              onChange={(event) => {
                setSecteurActivite(event.target.value);
              }}
              required
            >
              <option selected disabled value="">
                Secteur d'activité *
              </option>
              {fonctions.map((fonction, index) => {
                return (
                  <option key={index} value={`${fonction.nom}`}>
                    {fonction.nom}
                  </option>
                );
              })}
            </select>
            <label htmlFor="datePicker">Date de Naissance</label>
            <DatePicker
              id="datePicker"
              className="datePicker"
              name="dateNaissance"
              value={dateNaissance}
              onChange={(dateNaissance) => {
                setDateNaissance(dateNaissance);
              }}
              calendarIcon={
                <IconContext.Provider value={{ size: '19px' }}>
                  <span>
                    <BsCalendarDate />
                  </span>
                </IconContext.Provider>
              }
              maxDate={new Date()}
              required="true"
            />
            <input
              type="email"
              name="email"
              placeholder="Adressse mail *"
              required
              pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
              title="Veuillez entrer une adresse e-mail valide"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
            />
            {/* <label htmlFor="uploadLogo">Uploader votre photo</label>
            <input
              type="file"
              id="uploadLogo"
              name="uploadLogo"
              required
              onChange={(event) => {
                setUploadLogo(event.target.value);
              }}
              value={uploadLogo}
            /> */}

            <div style={{ position: 'relative', width: '100%' }}>
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

            <div style={{ position: 'relative', width: '100%' }}>
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
            <input type="submit" name="sign-up" disabled={isLoading && true} value={isLoading ? "Chargement ...":"S'inscrire"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default InscriptionCandidat;
