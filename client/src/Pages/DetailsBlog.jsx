import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../Assets/css/detailsBlog.scss';

const DetailsBlog = () => {
  const redirect = useNavigate();
  const { admin, getUrl, urlFile } = useContext(AuthContext);
  const [article, setArticle] = useState();
  const { id } = useParams();
  useEffect(() => {
    getUrl();
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
    <div className="outerBlogDiv">
      <div className="innerBlogDiv">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>

        {article ? (
          <div>
            <h1>{article.titre}</h1>
            {article.photoCouverture && (
              <div className="imageBlog">
                <img
                  src={`${urlFile.split('.com/')[0]}.com/${
                    article.photoCouverture
                  }`}
                  alt="Blog"
                />
              </div>
            )}

            <pre>{article.description}</pre>
            {admin && (
              <div className="forModif">
                <Link to={`/modificationArticle/${article._id}`}>
                  <button type="button">Modifier</button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div>Chargement en cours...</div>
        )}
      </div>
    </div>
  );
};

export default DetailsBlog;
