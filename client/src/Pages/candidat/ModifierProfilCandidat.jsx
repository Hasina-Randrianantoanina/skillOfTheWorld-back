import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';

import './../../Assets/css/updateProfil.scss';
import profilIllustration from './../../Assets/img/profil/profil.svg';

const ModifierProfilCandidat = () => {
  const redirect = useNavigate();
  const { uid } = useContext(AuthContext);

  // const [nom, setNom] = useState('');
  // const [prenom, setPrenom] = useState('');
  const [uploadLogo, setUploadLogo] = useState('');
  const [email, setEmail] = useState('');
  const [candidatInfo, setCandidatInfo] = useState([]);

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
    if (email !== '') {
      formData.append('email', email);
    }
    if (uploadLogo !== '') {
      formData.append('uploadLogo', uploadLogo);
    }
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/user/candidat/${uid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => {
        redirect('/profilCandidat');
        window.location.reload(false);
        modifSucces();
      })
      .catch((err) => {
        console.log(err);
        modifError();
      });
  };
  useEffect(() => {
    const getnombrecv = async (idCandidat) =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/candidat/${idCandidat}`)
        .then((res) => {
          setCandidatInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    getnombrecv(uid);
  }, []);

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
          <h2>
            Mon <b>profil</b>
          </h2>
          <form
            className="forInput"
            autoComplete="off"
            encType="multipart/form-data"
            onSubmit={updateProfil}
          >
            {/* <input
              type="text"
              name="nomCandidat"
              placeholder="Nom"
              onChange={(event) => {
                setNom(event.target.value);
              }}
            />
            <input
              type="text"
              name="Prenom"
              placeholder="Prenom"
              onChange={(event) => {
                setPrenom(event.target.value);
              }}
            /> */}
            {candidatInfo && (
              <div>
                <input
                  type="text"
                  placeholder={`${candidatInfo.nom} ${candidatInfo.prenom}`}
                  readOnly
                />
                <input
                  type="email"
                  name="email"
                  defaultValue={candidatInfo.email}
                  pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
                  title="Veuillez entrer une adresse e-mail valide"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
            )}

            <label htmlFor="uploadPdp" style={{ textAlign: 'center' }}>
              Telecharger votre photo de profil
            </label>
            <input
              type="file"
              id="uploadPdp"
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
              name="modifCandidat"
              value="Modifier"
              style={{ marginBottom: '40px' }}
            />
            <Link to="/mdpResetCandidat" className="resetLink">
              <h4>Réinitialiser mots de passe</h4>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifierProfilCandidat;
