import React from "react";

import "../Assets/css/header.scss";
import headerPic from "../Assets/img/headerPicture.webp";

const Header = () => {
  return (
    <header>
      <img src={headerPic} alt="header Img" className="desktopPic" />
      <img src={headerPic} alt="header Img" className="mobilePic" />
      <h1
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-back"
        data-aos-delay="900"
      >
        <b>SKILL</b> of the <b>WORLD</b>
      </h1>
      <p
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="1000"
        className="desktop"
      >
        <i>Plateforme unique de recrutement externalisé.</i>
        <br />
        <i>Recruteur, gagnez du temps !</i>
        <br />
        <i>Recrutement local et International</i>
      </p>
      <ul data-aos="fade-up" data-aos-duration="2000" data-aos-delay="1000">
        <li>
          <i>Plateforme unique de recrutement externalisé.</i>
        </li>
        <li>
          <i>Recruteur, gagnez du temps !</i>
        </li>
        <li>
          <i>Recrutement local et International</i>
        </li>
      </ul>
    </header>
  );
};

export default Header;
