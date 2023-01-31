//eslint-disable-next-line
import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { FaRegCalendar } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

import "../Assets/css/sectionAnnonce.scss";
import offrePic2 from "../Assets/img/offres/defaultCover.webp";

const SectionAnnonce = () => {
  const effectRan = useRef(false);
  const { getUrl, urlFile } = useContext(AuthContext);

  const [offreGlobale, setOffreGlobale] = useState([]);
  const [isLoading, setIsLoading] = useState(" ");

  const getOffreValide = async () => {
    const idEntreprise = [];
    setIsLoading("Chargement ...");

    const getOffre = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/offre/valide/`,
    });

    for (let i = 0; i < getOffre.data.length; i++) {
      idEntreprise.push(getOffre.data[i].offreId);
    }
    const getEntreprise = await Promise.all(
      idEntreprise.map((i) =>
        axios({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
        })
      )
    );

    for (let i = 0; i < getOffre.data.length; i++) {
      setOffreGlobale((oldOffre) => [
        ...oldOffre,
        {
          _id: getOffre.data[i]._id,
          annonceAnonyme: getOffre.data[i].annonceAnonyme,
          intitulePoste: getOffre.data[i].intitulePoste,
          typeContrat: getOffre.data[i].typeContrat,
          localisation: getOffre.data[i].localisation,
          uploadCouverture: getOffre.data[i].uploadCouverture,
          nomEntreprise: getEntreprise[i].data.nomEntreprise,
        },
      ]);
    }

    offreGlobale.length === 0 && setIsLoading("Pas encore d'offre");
  };

  console.log(offreGlobale);
  useEffect(() => {
    getUrl();
    if (effectRan.current === false) {
      getOffreValide();
      AOS.init();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <>
      <h1 className="annonce">Les annonces du moment</h1>
      <div
        className="cardAnnonce"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-offset="2"
      >
        {offreGlobale.length > 0 ? (
          offreGlobale.slice(0, 3).map((val) => {
            return (
              <div className="card_offre" key={val._id}>
                <div className="image">
                  <img
                    src={
                      val && val.uploadCouverture
                        ? `${urlFile.split(".com/")[0]}.com/${
                            val.uploadCouverture
                          }`
                        : offrePic2
                    }
                    alt="couverture offres"
                  />
                  <h3>
                    {val.annonceAnonyme === true
                      ? "Skill of the world"
                      : val.nomEntreprise}
                  </h3>
                </div>
                <div className="titre">
                  <h5>{val.intitulePoste}</h5>

                  <h5 className="ville">{val.localisation}</h5>
                </div>
                <div className="calendar">
                  <IconContext.Provider
                    value={{
                      color: "#0000008f",
                      size: "13px",
                    }}
                  >
                    <FaRegCalendar />
                  </IconContext.Provider>
                  <h5>{val.typeContrat}</h5>
                </div>
                <div className="footer_offre">
                  <h5>
                    <Link to={`/detailOffreGlobale/${val._id}`}>
                      <button>
                        Voir détails {offreGlobale.uploadCouverture}
                      </button>
                    </Link>
                  </h5>
                </div>
              </div>
            );
          })
        ) : (
          <span style={{ margin: "10px auto" }}>{isLoading}</span>
        )}
      </div>
      <div className="btnAnnonce">
        <Link to="/offreEmploi">
          <button>Accès à toutes les annonces</button>
        </Link>
      </div>
    </>
  );
};

export default SectionAnnonce;
