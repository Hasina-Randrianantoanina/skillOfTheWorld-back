import React from "react";
import { useNavigate } from "react-router-dom";

import "../../Assets/css/ajoutArticle.scss";

const ModificationTitre = () => {
    const redirect = useNavigate();
  
    return (
      <div className="outerAddArticle">
        <div className="innerAddArticle">
          <p className="linkRetour" onClick={() => redirect(-1)}>
            {" "}
            &#60; Retour
          </p>
          <h2>Modifier le titre</h2>
          <form className="forInput" autoComplete="off">
            <label htmlFor="titreEcranLarge">Titre sur ecran large</label>
            <input
              type="text"
              name="titreEcranLarge"
              id="titreEcranLarge"
              placeholder="description"
            />
            <label htmlFor="titreEcranMobile1">Titre sur ecran mobile</label>
            <input
              type="text"
              name="titreEcranMobile1"
              id="titreEcranMobile1"
              placeholder="titre 1 (Max 30 caractères)"
              maxLength="30"
            />
            <input
              type="text"
              name="titreEcranMobile2"
              id="titreEcranMobile2"
              placeholder="titre 2 (Max 30 caractères)"
              maxLength="30"
            />
            <input
              type="text"
              name="titreEcranMobile3"
              id="titreEcranMobile3"
              placeholder="titre 3 (Max 30 caractères)"
              maxLength="30"
            />
            {/* boutton */}
            <div className="forBtn">
              <input
                className="btnArticle"
                type="submit"
                name="modifierTitre"
                value="Modifier"
              />
            </div>
          </form>
        </div>
      </div>
    );
};

export default ModificationTitre;