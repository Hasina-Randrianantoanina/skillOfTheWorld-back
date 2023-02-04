import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

import './../../Assets/css/candidatureOffre.scss';

const ValidationCvLm = () => {
  const { uid, candidat, entreprise, admin, getUrl, urlFile } =
    useContext(AuthContext);
  const { id } = useParams();
  const [offre, setOffre] = useState([]);
  const [listCandidat, setListCandidat] = useState([]);
  const effectRan = useRef(false);
  const redirect = useNavigate();

  const [showCv, setShowCv] = useState(true);
  const [showLm, setShowLm] = useState(false);

  const acceptedSucces = () =>
    toast.success('Changement ajouté avec succèss', {
      position: 'top-right',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const handleClickCv = () => {
    if (setShowCv) {
      setShowCv(true);
    } else {
      setShowCv(true);
    }
    setShowLm(false);
  };

  const handleClickLm = () => {
    if (setShowLm) {
      setShowLm(true);
    } else {
      setShowLm(true);
    }
    setShowCv(false);
  };
  const valideCV = async (response, candida, offreId) => {
    await axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}api/offre/validatecv/${offreId}`,
      data: {
        candidatId: candida,
        isValideCV: response,
      },
    })
      .then((res) => {
        if (res.data.errors) {
        } else {
          redirect(`/validationCvLm/${id}`);
          window.location.reload(false);
          acceptedSucces();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const valideLM = async (response, candida, offreId) => {
    await axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}api/offre/validatelm/${offreId}`,
      data: {
        candidatId: candida,
        isValideLM: response,
      },
    })
      .then((res) => {
        if (res.data.errors) {
        } else {
          redirect(`/validationCvLm/${id}`);
          window.location.reload(false);
          acceptedSucces();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUrl();
    const getOffreWithCandidat = async (idOffre) => {
      const idCandidat = [];

      const getOffre = await axios.get(
        `${process.env.REACT_APP_API_URL}api/offre/${idOffre}`
      );
      for (let i = 0; i < getOffre.data.listCandidat.length; i++) {
        idCandidat.push(getOffre.data.listCandidat[i].candidatId);
      }
      const getInfoCandidat = await Promise.all(
        idCandidat.map((i) =>
          axios.get(`${process.env.REACT_APP_API_URL}api/user/candidat/${i}`)
        )
      );
      for (let i = 0; i < getInfoCandidat.length; i++) {
        setListCandidat((list) => [
          ...list,
          {
            _id: getOffre.data.listCandidat[i]._id,
            idCandidat: getInfoCandidat[i].data._id,
            nom: getInfoCandidat[i].data.nom,
            prenom: getInfoCandidat[i].data.prenom,
            resultat: getOffre.data.listCandidat[i].resultat,
            cv_path: getOffre.data.listCandidat[i].file1_path,
            cv_mimetype: getOffre.data.listCandidat[i].file1_mimetype,
            lm_path: getOffre.data.listCandidat[i].file2_path,
            lm_mimetype: getOffre.data.listCandidat[i].file2_mimetype,
            isValideCV: getOffre.data.listCandidat[i].isValideCV,
            isValideLM: getOffre.data.listCandidat[i].isValideLM,
          },
        ]);
      }

      setOffre(getOffre.data);
    };
    if (effectRan.current === false) {
      getOffreWithCandidat(id);
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <div className="divCandidature">
      <div className="innerCandidature">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Validation des CV et LM</h2>
        <div className="navAndTable">
          <div className="navigation">
            <h4
              onClick={handleClickCv}
              className={showCv ? 'active' : undefined}
            >
              Les CV {/*[07] */}
            </h4>
            <h4
              onClick={handleClickLm}
              className={showLm ? 'active' : undefined}
            >
              Les LM {/*[07] */}
            </h4>
          </div>

          {/* CV */}
          {showCv && (
            <div className="divTable">
              <table className="innerTable">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: '75%',
                        textAlign: 'left',
                        paddingLeft: '15px',
                      }}
                    >
                      Validation des CVs
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listCandidat.length > 0 ? (
                    listCandidat.map((val) => (
                      <tr key={val._id}>
                        {!val.isValideCV && (
                          <td
                            style={{ textAlign: 'left', paddingLeft: '15px' }}
                          >
                            <span>
                              <h4 style={{ fontFamily: 'poppinsBold' }}>
                                {val.cv_path.split('-')[1]}
                              </h4>
                              {/* <h4>E-tech</h4> */}
                            </span>
                            <a
                              download
                              href={`${urlFile.split('.com/')[0]}.com/${
                                val.cv_path
                              }`}
                            >
                              Telecharger le CV
                            </a>
                          </td>
                        )}

                        {!val.isValideCV && (
                          <td className="action">
                            <button
                              onClick={() => valideCV(true, val.idCandidat, id)}
                              style={{ border: 'none' }}
                            >
                              Acceptée
                            </button>
                            <button
                              onClick={() =>
                                valideCV(false, val.idCandidat, id)
                              }
                              style={{ border: 'none' }}
                            >
                              Refusée
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>Aucun CV</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* LM */}
          {showLm && (
            <div className="divTable">
              <table className="innerTable">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: '75%',
                        textAlign: 'left',
                        paddingLeft: '15px',
                      }}
                    >
                      Validation des LMs
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listCandidat.length > 0 ? (
                    listCandidat.map((val) => (
                      <tr key={val._id}>
                        {val.lm_path && !val.isValideLM && (
                          <td
                            style={{ textAlign: 'left', paddingLeft: '15px' }}
                          >
                            <span>
                              <h4 style={{ fontFamily: 'poppinsBold' }}>
                                {val.lm_path.split('-')[1]}
                              </h4>
                              {/* <h4>E-tech</h4> */}
                            </span>
                            {/* <span> CvCompta.pdf </span> */}
                            <a
                              download
                              href={`${urlFile.split('.com/')[0]}.com/${
                                val.lm_path
                              }`}
                            >
                              Telecharger la LM
                            </a>
                          </td>
                        )}
                        {val.lm_path && !val.isValideLM && (
                          <td className="action">
                            <button
                              onClick={() => valideLM(true, val.idCandida, id)}
                              style={{ border: 'none' }}
                            >
                              Acceptée
                            </button>
                            <button
                              onClick={() => valideLM(false, val.idCandida, id)}
                              style={{ border: 'none' }}
                            >
                              Refusée
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>Aucune LM</td>
                    </tr>
                  )}

                  {/* <tr>
                    <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
                      <span>
                        <h4 style={{ fontFamily: 'poppinsBold' }}>Fullstack</h4>
                        <h4>E-tech</h4>
                      </span>
                      <span> LmCompta.pdf </span>
                      <a href="#">Telecharger la LM</a>
                    </td>
                    <td className="action">
                      <button style={{ border: 'none' }}>Acceptée</button>
                      <button style={{ border: 'none' }}>Refusée</button>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidationCvLm;
