import axios from "axios";
import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import "moment/locale/fr";
import { AuthContext } from "../context/AuthContext";

import "../Assets/css/sectionJobDating.scss";
import eventPic1 from "../Assets/img/event/event (1).webp";
import eventProfile1 from "../Assets/img/SOTW_logo (5).webp";

const SectionEvent = () => {
  const effectRan = useRef(false);
  const { getUrl, urlFile } = useContext(AuthContext);

  const [eventValide, setEventValide] = useState([]);
  const [isLoading, setIsLoading] = useState(" ");

  const getEventPublie = async () => {
    const idEntreprise = [];
    setIsLoading("Chargement ...");

    const getEventPublie = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}api/evenement/publie`,
    });

    for (let i = 0; i < getEventPublie.data.length; i++) {
      idEntreprise.push(getEventPublie.data[i].idEntreprise);
    }
    const getEntreprise = await Promise.all(
      idEntreprise.map((i) =>
        axios({
          method: "GET",
          url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
        })
      )
    );
    for (let i = 0; i < getEventPublie.data.length; i++) {
      setEventValide((oldOffre) => [
        ...oldOffre,
        {
          _id: getEventPublie.data[i]._id,
          theme: getEventPublie.data[i].theme,
          dateEvenement: getEventPublie.data[i].dateEvenement,
          photoCouverture: getEventPublie.data[i].photoCouverture,
          uploadLogo: getEntreprise[i].data.uploadLogo,
          nomEntreprise: getEntreprise[i].data.nomEntreprise
            ? getEntreprise[i].data.nomEntreprise
            : "Skill of The World",
        },
      ]);
    }
    eventValide.length === 0 && setIsLoading("Pas encore d'évènement");
  };
  useEffect(() => {
    getUrl();
    if (effectRan.current === false) {
      getEventPublie();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  return (
    <>
      <h1 className="jd" style={{ color: "#112443" }}>
        Les évènements
      </h1>
      <div
        className="cardJD"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-offset="2"
      >
        {eventValide.length > 0 ? (
          eventValide.slice(0, 4).map((val) => {
            return (
              <div className="card_jd" key={val._id}>
                <div className="image">
                  <img
                    src={
                      val.photoCouverture
                        ? `${urlFile.split(".com/")[0]}.com/${
                            val.photoCouverture
                          }`
                        : eventPic1
                    }
                    alt="job dating cover Illustration"
                  />
                  <div className="profile">
                    <div className="profile_jd">
                      <img
                        src={
                          val.uploadLogo
                            ? `${urlFile.split(".com/")[0]}.com/${
                                val.uploadLogo
                              }`
                            : eventProfile1
                        }
                        alt="job dating Profil Illustration"
                      />
                    </div>
                    <h3>{val.theme}</h3>
                  </div>
                  <h4>
                    Organisé par <b>{val.nomEntreprise}</b>
                  </h4>
                </div>
                <div className="footer_jd">
                  <h5>{moment(val.dateEvenement).locale("fr").format("LL")}</h5>
                  <h5>
                    <Link to={`/detailEvent/${val._id}`}>Participer</Link>
                  </h5>
                </div>
              </div>
            );
          })
        ) : (
          <span
            style={{
              display: "block",
              width: "max-content",
              margin: "35px auto",
            }}
          >
            {isLoading}
          </span>
        )}
        <div className="btnJD">
          <Link to="/nosEvent">
            <button>Accès à tous nos évènements</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SectionEvent;
