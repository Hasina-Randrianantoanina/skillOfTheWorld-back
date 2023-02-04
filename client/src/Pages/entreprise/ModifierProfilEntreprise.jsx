import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import './../../Assets/css/updateProfil.scss';
import { AuthContext } from '../../context/AuthContext';
import profilIllustration from './../../Assets/img/profil/profil.svg';

const ModifierProfilEntreprise = () => {
  const redirect = useNavigate();
  const { uid } = useContext(AuthContext);

  const [nomInterlocuteur, setNomInterlocuteur] = useState('');
  const [prenomInterlocuteur, setPrenomInterlocuteur] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [uploadLogo, setUploadLogo] = useState('');
  const [entrepriseInfo, setEntrepriseInfo] = useState([]);

  const modifSucces = () =>
    toast.success('Votre profil a été modifié avec succès', {
      position: 'top-center',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const modifError = () =>
    toast.error(
      'Votre image ne doit pas dépasser 1 Mo et doit être en format jpg, jpeg et png',
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

  const updateProfil = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (prenomInterlocuteur !== '') {
      formData.append('prenomInterlocuteur', prenomInterlocuteur);
    }
    if (nomInterlocuteur !== '') {
      formData.append('nomInterlocuteur', nomInterlocuteur);
    }
    if (telephone !== '') {
      formData.append('telephone', telephone);
    }
    if (email !== '') {
      formData.append('email', email);
    }
    if (uploadLogo !== '') {
      formData.append('uploadLogo', uploadLogo);
    }

    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/user/entreprise/${uid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => {
        redirect('/profilEntreprise');
        modifSucces();
        window.location.reload(false);
      })
      .catch((err) => {
        modifError();
      });
  };

  useEffect(() => {
    const getEntreprise = async (idCandidat) =>
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}api/user/entreprise/${idCandidat}`
        )
        .then((res) => {
          setEntrepriseInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    getEntreprise(uid);
  }, [uid]);
  return (
    <div className="divUpdateProfil">
      <div className="innerUpdateProfil">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>

        <div className="left">
          <a
            href="https://storyset.com/social-media"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={profilIllustration} alt="profil Illustration" />
          </a>
        </div>
        <div className="right">
          <h2 className="titleH2Ets">
            Mon <b>profil</b>
          </h2>
          <form
            className="forInput"
            autoComplete="off"
            encType="multipart/form-data"
            onSubmit={updateProfil}
          >
            <input
              type="text"
              placeholder={`${entrepriseInfo.nomEntreprise}`}
              readOnly
            />
            <input
              type="text"
              name="nomInterlocuteur"
              // placeholder={`${entrepriseInfo.nomInterlocuteur}`}
              defaultValue={entrepriseInfo.nomInterlocuteur}
              onChange={(event) => {
                setNomInterlocuteur(event.target.value);
              }}
            />
            <input
              type="text"
              defaultValue={entrepriseInfo.prenomInterlocuteur}
              onChange={(event) => {
                setPrenomInterlocuteur(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder={`${entrepriseInfo.fonction}`}
              readOnly
            />
            <input
              type="number"
              defaultValue={entrepriseInfo.telephone}
              onChange={(telephone) => setTelephone(telephone)}
            />
            {/* <PhoneInput
              containerClass="containtTel"
              inputClass="nbrTel"
              country={"af"}
              onChange={(telephone) => setTelephone(telephone)}
            /> */}
            <input
              type="text"
              name="email"
              defaultValue={entrepriseInfo.email}
              pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
              title="Veuillez entrer une adresse e-mail valide"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder={
                entrepriseInfo.lieuxActivite !== ''
                  ? entrepriseInfo.lieuxActivite
                  : 'Pas indiqué'
              }
              readOnly
            />
            <input
              type="text"
              placeholder={
                entrepriseInfo.nombreSalaire !== ''
                  ? entrepriseInfo.nombreSalaire
                  : 'Pas indiqué'
              }
              readOnly
            />
            <input
              type="text"
              placeholder={
                entrepriseInfo.siteWeb !== ''
                  ? entrepriseInfo.siteWeb
                  : 'Pas indiqué'
              }
              readOnly
            />
            <label htmlFor="uploadLogo" style={{ textAlign: 'center' }}>
              Telecharger votre logo
            </label>
            <input
              type="file"
              id="uploadLogo"
              name="uploadLogo"
              onChange={(event) => {
                setUploadLogo(event.target.files[0]);
              }}
            />
            <p style={{ fontSize: '12px', marginBottom: '10px' }}>
              (Votre image ne doit pas dépasser 1 Mo et doit être en format jpg,
              jpeg et png)
            </p>
            <input
              type="submit"
              name="modifEntreprise"
              value="Modifier"
              style={{ marginBottom: '40px' }}
            />
            <Link to="/mdpResetEntreprise" className="resetLink">
              <h4>Réinitialiser mots de passe</h4>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifierProfilEntreprise;
