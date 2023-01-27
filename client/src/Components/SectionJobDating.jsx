import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import 'moment/locale/fr';
import { AuthContext } from '../context/AuthContext';

import '../Assets/css/sectionJobDating.scss';
import jdPic1 from '../Assets/img/jobDating/jd (1).webp';
// import jdPic2 from '../Assets/img/jobDating/jd (2).webp';
// import jdPic3 from '../Assets/img/jobDating/jd (3).webp';
// import jdPic4 from '../Assets/img/jobDating/jd (4).webp';
import jdProfile1 from '../Assets/img/SOTW_logo (5).webp';
// import jdProfile2 from '../Assets/img/jobDating/logo (2).webp';
// import jdProfile3 from '../Assets/img/jobDating/logo (3).webp';
// import jdProfile4 from '../Assets/img/jobDating/logo (4).webp';

const SectionJobDating = () => {
  const { getUrl, urlFile } = useContext(AuthContext);
  const effectRan = useRef(false);
  const [jobdatingPublie, setJobdatingPublie] = useState([]);
  const getJDpublie = async () => {
    const idEntreprise = [];

    const getJDPublie = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_URL}api/jobdating/publie/`,
    });

    for (let i = 0; i < getJDPublie.data.length; i++) {
      idEntreprise.push(getJDPublie.data[i].entrepriseId);
    }
    const getEntreprise = await Promise.all(
      idEntreprise.map((i) =>
        axios({
          method: 'GET',
          url: `${process.env.REACT_APP_API_URL}api/user/entreprise/${i}`,
        })
      )
    );

    for (let i = 0; i < getJDPublie.data.length; i++) {
      setJobdatingPublie((oldOffre) => [
        ...oldOffre,
        {
          _id: getJDPublie.data[i]._id,
          intitulePoste: getJDPublie.data[i].intitulePoste,
          dateDebut: getJDPublie.data[i].dateDebut,
          photoCouverture: getJDPublie.data[i].photoCouverture,
          uploadLogo: getEntreprise[i].data.uploadLogo,
          nomEntreprise: getEntreprise[i].data.nomEntreprise
            ? getEntreprise[i].data.nomEntreprise
            : 'Skill of The World',
        },
      ]);
    }
  };
  useEffect(() => {
    getUrl();
    if (effectRan.current === false) {
      getJDpublie();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  return (
    <div className="sectJD">
      <h1 className="jd">Les job dating</h1>
      <div
        className="cardJD"
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-offset="2"
      >
        {jobdatingPublie.length > 0 ? (
          jobdatingPublie.slice(0, 4).map((val) => {
            return (
              <div className="card_jd" key={val._id}>
                <div className="image">
                  <img
                    src={
                      val.photoCouverture
                        ? `${urlFile.split('.com/')[0]}.com/${
                            val.photoCouverture
                          }`
                        : jdPic1
                    }
                    alt="job dating cover "
                  />
                  <div className="profile">
                    <div className="profile_jd">
                      <img
                        src={
                          val.uploadLogo
                            ? `${urlFile.split('.com/')[0]}.com/${
                                val.uploadLogo
                              }`
                            : jdProfile1
                        }
                        alt="job dating Profil "
                      />
                    </div>
                    <h3>{val.intitulePoste}</h3>
                  </div>
                  <h4>
                    Organisé par <b>{val.nomEntreprise}</b>
                  </h4>
                </div>
                <div className="footer_jd">
                  <h5>{moment(val.dateDebut).locale('fr').format('LL')}</h5>
                  <h5>
                    <Link to={`/detailJD/${val._id}`}>Participer</Link>
                  </h5>
                </div>
              </div>
            );
          })
        ) : (
          <span
            style={{
              display: 'block',
              width: 'max-content',
              margin: '35px auto',
              color: 'white',
            }}
          >
            {jobdatingPublie ? "Chargement ...." : "Pas encore de job dating"}
          </span>
        )}

        <div className="btnJD">
          <Link to="/nosJobDating">
            <button>Accès à tous nos job dating</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionJobDating;
