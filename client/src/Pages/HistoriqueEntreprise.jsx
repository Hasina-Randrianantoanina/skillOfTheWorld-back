import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../Assets/css/historique.scss";

const HistoriqueEntreprise = () => {
  const [showOffre, setShowOffre] = useState(true);
  const [showJD, setShowJD] = useState(false);
  const [showEvent, setShowEvent] = useState(false);

  const handleClickOffre = () => {
    if(setShowOffre) {
      setShowOffre(true);
    } else {
      setShowOffre(true);
    }
    setShowJD(false);
    setShowEvent(false);
  }

  const handleClickJD = () => {
    setShowOffre(false);
    if(setShowJD) {
      setShowJD(true);
    } else {
      setShowJD(true);
    }
    setShowEvent(false);
  }

  const handleClickEvent = () => {
    setShowOffre(false);
    setShowJD(false);
    if(setShowEvent) {
      setShowEvent(true);
    } else {
      setShowEvent(true);
    }
  }

  const redirect = useNavigate();

  return (
    <div className="divHistorique">
      <div className="innerHistorique">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {" "}
          &#60; Retour
        </p>
        <h2>Historique</h2>
        <div className="navAndTable">
          <div className="navigation">
            <h4
              onClick={handleClickOffre}
              className={showOffre ? "active" : undefined}
            >
              Offre
            </h4>
            <h4
              onClick={handleClickJD}
              className={showJD ? "active" : undefined}
            >
              Job Dating
            </h4>
            <h4
              onClick={handleClickEvent}
              className={showEvent ? "active" : undefined}
            >
              Evènement
            </h4>
          </div>
          {/* OFFRE */}
          {showOffre && (
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
                      Historique des offres
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Expedita nesciunt consectetur, accusantium est dicta
                        quia molestiae, harum velit quo, nihil delectus. Soluta
                        accusantium, debitis nobis eligendi dolores aperiam
                        magni dolorem!
                      </span>
                      <p>Monday 10 Octobre 2022</p>
                    </td>
                    <td>
                      <Link to="/detailOffreGlogale">
                        <button style={{ border: "none" }}>Details</button>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      Cell
                    </td>
                    <td>
                      <button style={{ border: "none" }}>Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      Cell
                    </td>
                    <td>
                      <button style={{ border: "none" }}>Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Job Dating */}
          {showJD && (
            <div className="divTable">
              <table class="innerTable">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "75%",
                        textAlign: "left",
                        paddingLeft: "15px",
                      }}
                    >
                      Historique des job dating
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Expedita nesciunt consectetur, accusantium est dicta
                        quia molestiae, harum velit quo, nihil delectus. Soluta
                        accusantium, debitis nobis eligendi dolores aperiam
                        magni dolorem!
                      </span>
                      <p>Monday 10 Octobre 2022</p>
                    </td>
                    <td>
                      <button style={{ border: "none" }}>Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      Cell
                    </td>
                    <td>
                      <button style={{ border: "none" }}>Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      Cell
                    </td>
                    <td>
                      <button style={{ border: "none" }}>Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Evènement */}
          {showEvent && (
            <div className="divTable">
              <table class="innerTable">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "75%",
                        textAlign: "left",
                        paddingLeft: "15px",
                      }}
                    >
                      Historique des évènements
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Expedita nesciunt consectetur, accusantium est dicta
                        quia molestiae, harum velit quo, nihil delectus. Soluta
                        accusantium, debitis nobis eligendi dolores aperiam
                        magni dolorem!
                      </span>
                      <p>Monday 10 Octobre 2022</p>
                    </td>
                    <td>
                      <button style={{ border: "none" }}>Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      Cell
                    </td>
                    <td>
                      <button style={{ border: "none" }}>Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "left", paddingLeft: "15px" }}>
                      Cell
                    </td>
                    <td>
                      <button style={{ border: "none" }}>Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoriqueEntreprise;
