import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

import '../Assets/css/ajoutOffre.scss';

const UpdateOffreAdmin = () => {
  const redirect = useNavigate();
  const { getUrl, urlFile } = useContext(AuthContext);
  const [intitulePoste, setIntitulePoste] = useState('');
  const [savoirIdeal, setSavoirIdeal] = useState('');
  const [competencesAttendues, setCompetencesAttendues] = useState('');
  const [descriptionOffre, setDescription] = useState('');
  const [pourquoiPostuler, setPourquoiPostuler] = useState('');
  const [uploadCouverture, setUploadCouverture] = useState();
  const [offre, setOffre] = useState([]);

  const { id } = useParams();

  const modificationSuccess = () =>
    toast.success('Offre modifiée avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
    
  const Update = async (event, IdOffre) => {
    event.preventDefault();
    const formData = new FormData();
    if (intitulePoste !== '') {
      formData.append('intitulePoste', intitulePoste);
    }
    if (savoirIdeal !== '') {
      formData.append('savoirIdeal', savoirIdeal);
    }
    if (competencesAttendues !== '') {
      formData.append('competencesAttendues', competencesAttendues);
    }
    if (descriptionOffre !== '') {
      formData.append('descriptionOffre', descriptionOffre);
    }
    if (pourquoiPostuler !== '') {
      formData.append('pourquoiPostuler', pourquoiPostuler);
    }
    if (uploadCouverture !== []) {
      formData.append('uploadCouverture', uploadCouverture);
    }
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/offre/update/${IdOffre}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((res) => {
        redirect('/validationOffre');
        modificationSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUrl();
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}api/offre/${id}`,
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          setOffre(res.data);
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="divAjoutOffre">
      <div className="innerAjoutOffre">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Modification de l'offre {offre.intitulePoste}</h2>
        <form
          className="forInput"
          autoComplete="off"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="nomPoste"
            defaultValue={offre.intitulePoste}
            required
            onChange={(event) => {
              setIntitulePoste(event.target.value);
            }}
          />

          {/* Description de l'offre */}
          <label htmlFor="description">Description de l'offre</label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            defaultValue={offre.descriptionOffre}
            required
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>

          {/* Compétences attendues */}
          <label htmlFor="competence">Les compétences attendues</label>
          <textarea
            name="competence"
            cols="30"
            rows="10"
            defaultValue={offre.competencesAttendues}
            required
            onChange={(event) => {
              setCompetencesAttendues(event.target.value);
            }}
          ></textarea>

          {/* Savoir Ideal */}
          <label htmlFor="savoirIdeal">Le savoir-être idéal</label>
          <textarea
            name="savoirIdeal"
            cols="30"
            rows="10"
            defaultValue={offre.savoirIdeal}
            required
            onChange={(event) => {
              setSavoirIdeal(event.target.value);
            }}
          ></textarea>

          {/* Pourquoi postuler */}
          <label htmlFor="pourquoiPostuler">Pourquoi postuler ?</label>
          <textarea
            name="pourquoiPostuler"
            cols="30"
            rows="10"
            defaultValue={offre.pourquoiPostuler}
            required
            onChange={(event) => {
              setPourquoiPostuler(event.target.value);
            }}
          ></textarea>

          {/* Upload couverture */}
          <label htmlFor="uploadCouverture" className="upload">
            Telecharger votre photo de couverture
          </label>
          <input
            type="file"
            id="uploadCouverture"
            name="uploadCoeuverture"
            onChange={(event) => {
              setUploadCouverture(event.target.files[0]);
            }}
          />

          {/* Boutton modification */}
          <div className="forBtn">
            <input
              className="showPaymentMethod"
              type="submit"
              name="publier"
              value="Valider"
              onClick={(event) => Update(event, id)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOffreAdmin;
