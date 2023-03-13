import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import { AuthContext } from '../../context/AuthContext';
import '../../Assets/css/ajoutArticle.scss';

const AjoutArticle = () => {
  const redirect = useNavigate();
  const { uid, admin } = useContext(AuthContext);

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [photoCouverture, setPhotoCouverture] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pubicationSuccess = () =>
    toast.success('Article publié avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const handleOnSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('photoCouverture', photoCouverture);
    await axios
      .post(`${process.env.REACT_APP_API_URL}api/article`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        pubicationSuccess();
        redirect('/listeArticle');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <div className="outerAddArticle">
      <div className="innerAddArticle">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Ajouter une article</h2>
        <form
          className="forInput"
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={handleOnSubmit}
        >
          <label htmlFor="titreArticle">Titre de l'article *</label>
          <input
            type="text"
            name="titreArticle"
            id="titreArticle"
            placeholder="titre de l'article"
            required
            onChange={(event) => {
              setTitre(event.target.value);
            }}
          />
          <label htmlFor="descriptionArticle">Description de l'article *</label>
          <textarea
            name="descriptionArticle"
            id="descriptionArticle"
            cols="30"
            rows="10"
            placeholder="description"
            required
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
          {/* Upload couverture */}
          <label htmlFor="photoCouverture" className="upload">
            Telecharger photo de couverture de l'article *
          </label>
          <input
            type="file"
            id="photoCouverture"
            name="photoCouverture"
            required
            onChange={(event) => {
              setPhotoCouverture(event.target.files[0]);
            }}
          />
          {/* boutton */}
          <div className="forBtn">
            <input
              className="btnArticle"
              type="submit"
              name="publierArticle"
              disabled={isLoading && true}
              value={isLoading ? "Chargement ...":"Publier"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjoutArticle;
