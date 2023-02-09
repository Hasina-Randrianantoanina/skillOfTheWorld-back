import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import './../../Assets/css/updateProfil.scss';

const EmailConfirmation = () => {
  const redirect = useNavigate();
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');

  const emailSuccess = () =>
    toast.success('Veuillez vérifier votre boîte mail', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

    const emailError = () =>
    toast.warning("Vous n'avez pas encore de compte", {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (type === 'candidat') {
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/user/candidat/email/${email}`,
      })
        .then((res) => {
          if (res.data[0]) {
            emailSuccess();
          } else {
            emailError();

          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type === 'entreprise') {
      axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/user/entreprise/email/${email}`,
      })
        .then((res) => {
          if (res.data[0]) {
            emailSuccess();
          } else {
            emailError();
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
            Confirmer votre <b>adresse mail</b>
          </h2>
          <form className="forInput" autoComplete="off" onSubmit={handleLogin}>
            <select
              name="enTantQue"
              onChange={(e) => {
                setType(e.target.value);
              }}
              required
              >
              <option selected disabled value="">
                En tant que ...
              </option>
              <option value={`candidat`}>Candidat</option>
              <option value={`entreprise`}>Entreprise</option>
            </select>
            <input
              type="email"
              name="email"
              required
              pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
              title="Veuillez entrer une adresse e-mail valide"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="submit"
              name="emailConfirmation"
              value="Soumettre"
              style={{ marginBottom: '40px' }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
