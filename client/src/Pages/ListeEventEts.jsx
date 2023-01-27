import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import moment from "moment/moment";
import "moment/locale/fr";

import "../Assets/css/listeEts.scss";
import Pagination from "../Components/Pagination";

const ListeEventEts = () => {
  const redirect = useNavigate();
  const { uid, candidat, entreprise, admin } = useContext(AuthContext);

  const [evenement, setEvenement] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/evenement/entreprise/${uid}`,
    })
      .then((response) => {
        setEvenement(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setEvenement]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  return (
    <div className="divListe">
      <div className="innerListe">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {" "}
          &#60; Retour
        </p>
        <h2>Liste des évènements</h2>
        <h4>
          Une fois que votre évènement est validé, il apparaitra en vert et sera
          donc en ligne.
        </h4>
        <Link to="/ajoutEvent">
          <button className="btnAjout">Ajouter un évènement</button>
        </Link>

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
                  Liste des évènements
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {evenement.length > 0 ? (
                evenement
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((val, key) => {
                    return (
                      <tr key={val._id}>
                        {val.isPublie ? (
                          <td
                            style={{
                              textAlign: "left",
                              paddingLeft: "15px",
                              background: "rgba(20, 220, 97, 0.346)",
                            }}
                          >
                            <span>{val.theme}</span>
                            <p>
                              {moment(val.createdAt).locale("fr").format("LL")}
                            </p>
                          </td>
                        ) : (
                          <td
                            style={{
                              textAlign: "left",
                              paddingLeft: "15px",
                              background: "rgba(220, 153, 20, 0.346)",
                            }}
                          >
                            <span>{val.theme}</span>
                            <p>
                              {moment(val.createdAt).locale("fr").format("LL")}
                            </p>
                          </td>
                        )}
                        <td>
                          <Link to={`/detailEvent/${val._id}`}>
                            <button style={{ border: "none" }}>Détails</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td>Aucun évènement ajouté</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={evenement.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ListeEventEts;
