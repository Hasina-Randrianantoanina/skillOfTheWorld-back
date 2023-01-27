import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./../../Assets/css/updateProfil.scss";
import profilIllustration from "./../../Assets/img/profil/profil.svg";

const ModifierProfilAdmin = () => {
    const redirect = useNavigate();

    return (
        <div className="divUpdateProfil">

            <div className="innerUpdateProfil">
                <p className="linkRetour" onClick={() => redirect(-1)}>
                    &#60; Retour
                </p>

                <div className="left">
                    <a href="https://storyset.com/social-media" target="_blank" rel="noreferrer noopener"><img src={profilIllustration} alt="profil Illustration" /></a>
                </div>
                <div className="right">
                    <h2>
                        <b>Profil</b> admin
                    </h2>
                    <form className="forInput admin" autoComplete="off">
                        <input
                            type="text"
                            name="emailAdmin"
                            placeholder="email"
                        />
                        <label htmlFor="uploadPdp" style={{ textAlign: "center", padding: "5px" }}>Telecharger votre photo de profil</label>
                        <input
                            type="file"
                            id="uploadPdp"
                            name="uploadPdp"
                        />
                        <input type="submit" name="modifAdmin" value="Modifier" style={{ marginBottom: "40px" }} />
                        <Link to="/mdpResetAdmin" className="resetLink"><h4>Réinitialiser mots de passe</h4></Link>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ModifierProfilAdmin;