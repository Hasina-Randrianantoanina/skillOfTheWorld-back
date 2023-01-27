import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/fr";

import "../../Assets/css/validation.scss";
import Pagination from "../../Components/Pagination";

const ListeArticle = () => {
  const redirect = useNavigate();
  const effectRan = useRef(false);

  const [article, setArticle] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const deleteSuccess = () =>
    toast.success("Article supprimée avec succès", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const deleteConfirmation = (id) => {
    confirmAlert({
      title: "Validation",
      message: "Voulez-vous supprimer cette article ?",
      buttons: [
        {
          label: "Supprimer",
          onClick: () => {
            deleteArticle(id);
            redirect(`/listeArticle`);
          },
        },
        {
          label: "Annuler",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  };

  const deleteArticle = async (idArticle) => {
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/article/${idArticle}`,
    })
      .then((res) => {
        redirect(`/listeArticle`);
        deleteSuccess();
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getArticles = async () => {
    await axios({
      method: "GET",
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
      getArticles();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  return (
    <div className="divValidation">
      <div className="innerValidation">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {" "}
          &#60; Retour
        </p>
        <h2>Liste des articles</h2>
        <Link to="/ajoutArticle">
          <button className="btnAjout">Nouvelle article</button>
        </Link>
        <div className="navAndTable">
          {/* Liste des articles */}
          <div className="divTable">
            <table className="innerTable">
              <thead>
                <tr>
                  <th
                    style={{
                      width: "75%",
                      textAlign: "left",
                      paddingLeft: "15px",
                    }}
                  >
                    Liste des articles
                  </th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {article.length > 0 ? (
                  article
                    .slice(indexOfFirstPost, indexOfLastPost)
                    .map((val, key) => {
                      return (
                        <tr key={key}>
                          <td
                            style={{
                              textAlign: "left",
                              paddingLeft: "15px",
                            }}
                          >
                            <span>
                              <h4 style={{ fontFamily: "poppinsBold" }}>
                                {val.titre}
                              </h4>
                            </span>
                            <p>
                              {moment(val.createdAt).locale("fr").format("LL")}
                            </p>
                          </td>
                          <td>
                            <Link to={`/detailBlog/${val._id}`}>
                              <button style={{ border: "none" }}>
                                Details
                              </button>
                            </Link>
                            <button
                              style={{ border: "none", background: "#ff3e8e" }}
                              onClick={() => deleteConfirmation(val._id)}
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td>Aucun article ajouté</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={article.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ListeArticle;
