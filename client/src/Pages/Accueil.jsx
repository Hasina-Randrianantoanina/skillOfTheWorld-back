import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../Assets/css/accueil.scss";
import Header from "../Components/Header";
import Partenaire from "../Components/Partenaire";
import SectionAnnonce from "../Components/SectionAnnonce";
import SectionEvent from "../Components/SectionEvent";
import SectionJobDating from "../Components/SectionJobDating";
import SectionValeur from "../Components/SectionValeur";

const Accueil = () => {
  const location = useLocation();
  const url = location.pathname;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Skill of the World - Externaliser et Gagnez du temps à recruter !
        </title>
        <meta
          name="description"
          content="Skill of the world, une plateforme de recrutement externalisé. Les Cv sont triés pour gagner du temps."
        />
        <link rel="canonical" href="https://www.skilloftheworld.com/" />
      </Helmet>
      <Header />
      <section>
        <SectionValeur />
        <SectionAnnonce />
        <SectionJobDating />
        <SectionEvent />
        {url === "/" ? <Partenaire /> : undefined}
      </section>
    </>
  );
};

export default Accueil;
