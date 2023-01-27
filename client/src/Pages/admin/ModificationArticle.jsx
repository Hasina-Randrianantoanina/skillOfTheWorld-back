import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../Assets/css/ajoutArticle.scss';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ModificationArticle = () => {
  const redirect = useNavigate();
  const { admin } = useContext(AuthContext);

  const [article, setArticle] = useState();
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [photoCouverture, setPhotoCouverture] = useState('');
  const { id } = useParams();

  const modificationSuccess = () =>
    toast.success('Article modifiée avec succès', {
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
    e.preventDefault();

    const formData = new FormData();

    if (titre !== '') {
      formData.append('titre', titre);
    }
    if (description !== '') {
      formData.append('description', description);
    }
    if (photoCouverture !== '') {
      formData.append('photoCouverture', photoCouverture);
    }
    await axios
      .patch(`${process.env.REACT_APP_API_URL}api/article/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        redirect('/listeArticle');
        modificationSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getOneArticle = async () => {
      await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}api/article/${id}`,
      })
        .then((res) => {
          setArticle(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getOneArticle();
  }, []);

  return (
    <div className="outerAddArticle">
      <div className="innerAddArticle">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Modification de l'article</h2>
        {article ? (
          <form
            className="forInput"
            autoComplete="off"
            encType="multipart/form-data"
            onSubmit={handleOnSubmit}
          >
            <label htmlFor="titreArticle">Titre de l'article</label>
            <input
              type="text"
              name="titreArticle"
              id="titreArticle"
              defaultValue={article.titre}
              onChange={(event) => {
                setTitre(event.target.value);
              }}
            />
            <label htmlFor="descriptionArticle">Description de l'article</label>
            <textarea
              name="descriptionArticle"
              id="descriptionArticle"
              cols="30"
              rows="10"
              defaultValue={article.description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></textarea>
            {/* Upload couverture */}
            <label htmlFor="uploadCouvertureArticle" className="upload">
              Telecharger photo de couverture de l'article
            </label>
            <input
              type="file"
              id="uploadCouvertureArticle"
              name="uploadCouvertureArticle"
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
                value="Modifier"
              />
            </div>
          </form>
        ) : (
          <div>Chargement en cours...</div>
        )}
      </div>
    </div>
  );
};

export default ModificationArticle;
