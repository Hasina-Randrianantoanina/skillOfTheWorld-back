import React from "react";
import { BsCameraVideo } from "react-icons/bs";
import { BsPersonPlus } from "react-icons/bs";
import { BsCalendarDate } from "react-icons/bs";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

import "../Assets/css/sectionValeur.scss";
import recrutement from "../Assets/img/global/wave (1).webp";
import entreprise from "../Assets/img/global/wave (2).webp";
import talent from "../Assets/img/global/wave (3).webp";

const SectionValeur = () => {
  return (
    <div className="divSectionValeur">
      <Link to="/jeRecrute">
        <div className="divCard">
          <img src={recrutement} alt="value illustration" />
          <IconContext.Provider value={{ color: "#112443", size: "30px" }}>
            <span>
              <BsPersonPlus />
            </span>
          </IconContext.Provider>
          <h5>
            <b>Diffusion d'offres d'emplois - CV pré-triés</b>
          </h5>
        </div>
      </Link>
      <Link to="/participerJD">
        <div className="divCard">
          <img src={entreprise} alt="value illustration" />
          <IconContext.Provider value={{ color: "#112443", size: "30px" }}>
            <span>
              <BsCameraVideo />
            </span>
          </IconContext.Provider>
          <h5>
            <b>Job dating en ligne</b>
          </h5>
        </div>
      </Link>
      <Link to="/participerEvent">
        <div className="divCard">
          <img src={talent} alt="value illustration" />
          <IconContext.Provider value={{ color: "#112443", size: "30px" }}>
            <span>
              <BsCalendarDate />
            </span>
          </IconContext.Provider>
          <h5>
            <b>Evènement pour votre marque employeur</b>
          </h5>
        </div>
      </Link>
    </div>
  );
};

export default SectionValeur;
