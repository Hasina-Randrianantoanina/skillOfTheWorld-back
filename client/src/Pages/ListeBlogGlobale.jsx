import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../context/AuthContext';

import '../Assets/css/blogGlobale.scss';

const ListeBlogGlobale = () => {
  const redirect = useNavigate();
  const { getUrl, urlFile } = useContext(AuthContext);
  const [article, setArticle] = useState();

  const effectRan = useRef(false);
  const getArticles = async () => {
    await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}api/article`,
    })
      .then((res) => {
        setArticle(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (effectRan.current === false) {
      getUrl();
      getArticles();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <div className="divBlog">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Skill of the World</title>
        <meta
          name="keywords"
          content="Blog RH, Blog recrutement, Externaliser le recrutement, Pénurie de talents, Recruter en Afrique"
        />
      </Helmet>
      <div className="innerDivBlog">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Blog</h2>
        <div className="cardBlog">
          {article && article.length > 0 ? (
            article.map((val, key) => {
              return (
                <div
                  className="innerCard"
                  onClick={() => redirect(`/detailBlog/${val._id}`)}
                >
                  <img
                    src={`${urlFile.split('.com/')[0]}.com/${
                      val.photoCouverture
                    }`}
                    alt="blog images"
                  />
                  <h4>{val.titre}</h4>
                </div>
              );
            })
          ) : (
            <span style={{ marginTop: '25px' }}>Aucun article ajouté</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListeBlogGlobale;
