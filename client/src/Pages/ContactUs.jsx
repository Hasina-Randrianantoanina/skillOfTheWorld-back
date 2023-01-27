import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { messageClient } from '../Utils/reponse';
import contactPic from '../Assets/img/global/ContactUs.svg';
import axios from 'axios';
import '../Assets/css/contactUs.scss';

const ContactUs = () => {
  const redirect = useNavigate();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [autre, setAutre] = useState('');
  const [email, setEmail] = useState('');

  const sendSuccess = () =>
    toast.success(
      'Merci de nous avoir contacté.Un expert RH de SOTW vous contactera dans les meilleurs délais.',
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      }
    );

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}api/message`,
      data: {
        objet: 'Message venant de client',
        message: messageClient(nom, message, email),
      },
    })
      .then((res) => {
        sendSuccess();
        setNom('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="divContact">
      <div className="innerContact">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>

        <h2>Vous souhaitez nous contacter ?</h2>
        <div className="left">
          <div className="inputContact">
            <form onSubmit={handleOnSubmit}>
              <div className="topBox">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  onChange={(event) => {
                    setNom(event.target.value);
                  }}
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prenom"
                  onChange={(event) => {
                    setPrenom(event.target.value);
                  }}
                />
                <select
                  name="jeSuis"
                  required
                  onChange={(event) => {
                    setUser(event.target.value);
                  }}
                >
                  <option defaultValue value="Je suis">
                    Je suis
                  </option>

                  <option value={'Candidat'}>Candidat</option>
                  <option value={'Entreprise'}>Entreprise</option>
                </select>
                <input
                  type="text"
                  name="autre"
                  placeholder="Autre"
                  onChange={(event) => {
                    setAutre(event.target.value);
                  }}
                />
              </div>
              <label htmlFor="descriptionMessage">
                En quoi pouvons-nous vous aider ?
              </label>
              <textarea
                name="messageDescription"
                id=""
                cols="30"
                rows="5"
                placeholder="Votre message"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              ></textarea>
              <input
                type="mail"
                placeholder="Adresse mail "
                style={{ width: '93%' }}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <input type="submit" name="envoi" value="Envoyer" />
            </form>
          </div>
        </div>
        <div className="right">
          <a
            href="https://storyset.com/work"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={contactPic} alt="Contact Us" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
