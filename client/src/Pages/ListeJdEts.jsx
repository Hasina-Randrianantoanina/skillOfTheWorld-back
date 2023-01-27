import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/fr";

import "../Assets/css/listeEts.scss";
import Pagination from "../Components/Pagination";

const ListeJdEts = () => {
  const redirect = useNavigate();
  const { uid, candidat, entreprise, admin } = useContext(AuthContext);

  const [jobdating, setJobdating] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/jobdating/entreprise/${uid}`,
    })
      .then((response) => {
        setJobdating(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setJobdating]);

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
        <h2>Liste des job dating</h2>
        <h4>
          Une fois que votre job dating est validé, il apparaitra en vert et
          sera donc en ligne.
        </h4>
        <Link to="/ajoutJD">
          <button className="btnAjout">Organiser un job dating</button>
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
                  Liste des job dating
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobdating.length > 0 ? (
                jobdating
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
                            <span>{val.intitulePoste}</span>
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
                            <span>{val.intitulePoste}</span>
                            <p>
                              {moment(val.createdAt).locale("fr").format("LL")}
                            </p>
                          </td>
                        )}
                        <td>
                          <Link to={`/detailJD/${val._id}`}>
                            <button style={{ border: "none" }}>Détails</button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td>Aucun Job Dating ajouté</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={jobdating.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default ListeJdEts;
