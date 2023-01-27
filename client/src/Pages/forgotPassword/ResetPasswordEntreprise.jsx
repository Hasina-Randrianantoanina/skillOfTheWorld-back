import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import './../../Assets/css/updateProfil.scss';

const ResetPasswordEntreprise = () => {
  const redirect = useNavigate();
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mdpError = (a) =>
    toast.error(a , {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const resetSuccess = () =>
    toast.success('Mots de passe réinitialisé avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const initializePassword = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}api/user/entreprise/reset/${id}`,
          {
            password: password,
          }
        )
        .then((res) => {
          redirect('/login');
          resetSuccess();
        })
        .catch((err) => {
          mdpError(err);
        });
    } else {
      mdpError('Les deux nouveaux mots de passe ne sont pas identiques');
    }
  };

  return (
    <div className="divUpdateProfil">
      <div className="innerUpdateProfil">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <div className="right">
          <h2>
            Ajouter nouveau <b>mots de passe</b>
          </h2>
          <form
            className="forInput"
            autoComplete="off"
            onSubmit={initializePassword}
          >
            <input
              type="password"
              name="password"
              required
              placeholder="Nouveau mot de passe"
              minLength={6}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Confirmer mot de passe"
              minLength={6}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <input
              type="submit"
              name="emailConfirmation"
              value="Reinitialiser"
              style={{ marginBottom: '40px' }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordEntreprise;
