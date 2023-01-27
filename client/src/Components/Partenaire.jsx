import React from "react";

import "../Assets/css/partenaire.scss";
import partenaire1 from "../Assets/img/logo/kaloes.webp";
import partenaire4 from "../Assets/img/logo/valalaFarm.webp";
import partenaire5 from "../Assets/img/logo/vivetic.webp";
import partenaire6 from "../Assets/img/logo/smef.webp";
import partenaire7 from "../Assets/img/logo/sopromer.webp";

const Partenaire = () => {
  return (
    <div className="divPartenaire">
      <h1>Ils <b style={{color:'#00f4ff'}}>nous</b> font confiance</h1>
      <div className="imageLogo">
        <img src={partenaire1} alt="logo des partenaires" />
        <img src={partenaire4} alt="logo des partenaires" />
        <img src={partenaire5} alt="logo des partenaires" />
        <img src={partenaire6} alt="logo des partenaires" />
        <img src={partenaire7} alt="logo des partenaires" />
      </div>
    </div>
  );
};

export default Partenaire;
