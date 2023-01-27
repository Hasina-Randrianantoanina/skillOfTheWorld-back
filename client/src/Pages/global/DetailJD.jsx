import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import 'moment/locale/fr';

import '../../Assets/css/detailEvent.scss';
import logoParDefaut from '../../Assets/img/SOTW_logo (5).webp';
import jdImg from '../../Assets/img/global/defaultCover.webp';

const DetailJD = () => {
  const redirect = useNavigate();
  const { uid, admin, entreprise, getUrl, urlFile } = useContext(AuthContext);
  const [jobdating, setJobDating] = useState([]);
  const [email, setEmail] = useState();
  const [lien, setLien] = useState('');
  const [isPostuler, setIsPostuler] = useState(false);

  const [uploadPC, setUploadPC] = useState(true);
  const [uploadCvLmTheque, setUploadCvLmTheque] = useState(false);
  const [checkIdCandidat, setCheckIdCandidat] = useState(false);
  const [societe, setSociete] = useState();
  const [cv, setCV] = useState();
  const [lm, setLM] = useState();
  const [candidatCV, setCandidatCV] = useState([]);
  const [candidatLM, setCandidatLM] = useState([]);

  const [cvtheque, setCvtheque] = useState();
  const [lmtheque, setLmtheque] = useState();
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [photoCouverture, setPhotoCouverture] = useState('');

  const postuleSuccess = () =>
    toast.success('Votre demande de participation a été envoyée avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  const updateSuccess = () =>
    toast.success('Mise à jour avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const validationSuccess = () =>
    toast.success('Validation avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const postule = async (e, idJD) => {
    e.preventDefault();
    if (cv && lm) {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('email', email);
      formData.append('intitulePoste', jobdating.intitulePoste);
      formData.append('cv', cv);
      formData.append('lm', lm);
      formData.append('candidatId', uid);
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}api/jobdating/postulecvlm/${idJD}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          redirect('/nosJobDating');
          postuleSuccess();
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (cvtheque && lmtheque) {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('email', email);
      formData.append('intitulePoste', jobdating.intitulePoste);
      formData.append('cv', `${urlFile.split('.com/')[0]}.com/${cvtheque}`);
      formData.append('lm', `${urlFile.split('.com/')[0]}.com/${lmtheque}`);
      formData.append('candidatId', uid);
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}api/jobdating/postulecvlm/${idJD}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          redirect('/nosJobDating');
          postuleSuccess();
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (cvtheque) {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('email', email);
      formData.append('intitulePoste', jobdating.intitulePoste);
      formData.append('cv', `${urlFile.split('.com/')[0]}.com/${cvtheque}`);
      formData.append('candidatId', uid);
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}api/jobdating/postule/${idJD}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          redirect('/nosJobDating');
          postuleSuccess();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('email', email);
      formData.append('intitulePoste', jobdating.intitulePoste);
      formData.append('cv', cv);
      formData.append('candidatId', uid);
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}api/jobdating/postule/${idJD}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          redirect('/nosJobDating');
          postuleSuccess();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlingUploadPC = () => {
    setUploadPC(true);
    setUploadCvLmTheque(false);
  };

  const handlingUploadCvLmTheque = () => {
    setUploadPC(false);
    setUploadCvLmTheque(true);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('isPublie', true);
    if (lien !== '') {
      formData.append('lienJobDating', lien);
    }
    if (photoCouverture !== '') {
      formData.append('photoCouverture', photoCouverture);
    }
    await axios
      .patch(`${process.env.REACT_APP_API_URL}api/jobdating/${id}`, formData)
      .then((res) => {
        redirect('/validationJD');
        updateSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { id } = useParams();
  useEffect(() => {
    getUrl();
    const checkCandidat = async (idevent, candidat) => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}api/jobdating/verification/${idevent}/candidat/${candidat}`
        )
        .then((res) => {
          if (res.status === 201) {
            setCheckIdCandidat(true);
          }
          if (res.status === 200) {
            setCheckIdCandidat(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getOneJobDating = async () => {
      const getJD = await axios.get(
        `${process.env.REACT_APP_API_URL}api/jobdating/${id}`
      );
      const getEntreprise = await axios.get(
        `${process.env.REACT_APP_API_URL}api/user/entreprise/${getJD.data.entrepriseId}`
      );
      setJobDating(getJD.data);
      setSociete(getEntreprise.data);
    };

    const getCandidat = async (idCandidat) => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/candidat/${idCandidat}`)
        .then((res) => {
          setEmail(res.data.email);
          setCandidatLM(res.data.listLM);
          setCandidatCV(res.data.listCV);
          res.data.nom ? setNom(res.data.nom) : setNom('');
          res.data.prenom ? setPrenom(res.data.prenom) : setPrenom('');
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getOneJobDating();
    getCandidat(uid);
    checkCandidat(id, uid);
  }, [uid]);

  return (
    <div className="outerDivDetail">
      <div className="innerDivDetail">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>{societe ? societe.nomEntreprise : 'Skill of The World'}</h2>

        {/* TOP CARD */}
        <div className="topCard forPreview">
          <img
            src={
              jobdating && jobdating.photoCouverture
                ? `${urlFile.split('.com/')[0]}.com/${
                    jobdating.photoCouverture
                  }`
                : jdImg
            }
            alt="illustration Job Dating"
          />
        </div>

        <div className="topCard">
          {/* LEFT */}
          <div className="topLeft">
            <img
              src={
                societe && societe.uploadLogo
                  ? `${urlFile.split('.com/')[0]}.com/${societe.uploadLogo}`
                  : logoParDefaut
              }
              alt="logo de l'entreprise"
            />
          </div>

          {/* RIGHT */}
          <div className="topRight">
            <div className="titre">
              <h4>{jobdating.intitulePoste}</h4>
              <h5 className="ville">{jobdating.localisation}</h5>
            </div>
            <h5>{jobdating.fonction}</h5>
            <h5>{jobdating.typeContrat}</h5>
          </div>
        </div>

        {/* BOTTOM CARD */}
        <div className="bottomCard">
          {/* LEFT */}
          <div className="bottomLeft">
            <h4>Niveau d'étude minimum</h4>
            <h5>{jobdating.intitulePoste}</h5>

            <h4>Date de début</h4>
            <h5>{moment(jobdating.dateDebut).locale('fr').format('LL')}</h5>

            <h4>Délai de recrutement</h4>
            <h5>{jobdating.delaisRecrutement}</h5>

            <h4>Télétravail</h4>
            <h5>{jobdating.typeTravail}</h5>

            <h4>Expérience souhaitée pour le poste</h4>
            <h5>{jobdating.expSouhaite}</h5>

            <h4>Site internet</h4>
            <h5>{jobdating.siteWeb}</h5>
          </div>
          {/* RIGHT */}
          <div className="bottomRight">
            <h4>Description de job dating</h4>
            <p>{jobdating.description}</p>

            <h4>Les compétences attendues</h4>
            <p>{jobdating.competencesAttendues} </p>

            <h4>Le savoir-être idéal</h4>
            <p>{jobdating.savoirIdeal}</p>

            <h4>Pourquoi postuler ?</h4>
            <p>{jobdating.pourquoiPostuler}</p>
            {admin && (
              <>
                <h4>Mode de paiement </h4>
                <p>{jobdating.modePaiement}</p>
              </>
            )}
          </div>
          <div className="forBtn">
            {/* ADMIN */}
            {admin && (
              <form onSubmit={handleOnSubmit}>
                <label
                  htmlFor="uploadCouverture"
                  style={{ fontSize: '13.28px' }}
                >
                  Telecharger photo de couverture du job dating
                </label>
                <br />
                <input
                  type="file"
                  id="uploadCouverture"
                  name="uploadCouverture"
                  onChange={(event) => {
                    setPhotoCouverture(event.target.files[0]);
                  }}
                />{' '}
                <br />
                <input
                  type="text"
                  placeholder="Veuillez inserer le lien de job dating"
                  onChange={(event) => {
                    setLien(event.target.value);
                  }}
                />
                <input type="submit" value="Valider" />
              </form>
            )}
            {/* CANDIDAT */}
            {!admin &&
              !entreprise &&
              (jobdating.lienJobDating ? (
                <>
                  {uid && checkIdCandidat === true && (
                    <button type="button">
                      Vous avez déjà envoyé une demande
                    </button>
                  )}

                  {uid && checkIdCandidat === false && (
                    <>
                      <span style={{ display: 'flex' }}>
                        <p style={{ color: '#202124b8' }}>
                          Pour participer au job dating, merci de nous faire
                          parvenir votre <b>CV</b> et <b>LM</b>
                        </p>
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsPostuler(!isPostuler)}
                      >
                        {!isPostuler ? 'Participer' : 'Annuler'}
                      </button>
                    </>
                  )}
                  {!uid && (
                    <button
                      type="button"
                      onClick={() => redirect('/inscriptionCandidat')}
                    >
                      S'inscrire
                    </button>
                  )}
                </>
              ) : (
                <span style={{ display: 'flex' }}>
                  <p style={{ color: '#202124b8' }}>
                    Lien de job dating :&nbsp;
                  </p>
                  <b>Pas encore de liens</b>
                </span>
              ))}
          </div>
        </div>
        {isPostuler && (
          <div className="upload">
            {/* DANS MON ORDI */}
            <form encType="multipart/form-data">
              <h3 onClick={handlingUploadPC}> Télécharger de mon PC </h3>

              {uploadPC && (
                <>
                  <p>
                    * Si vous téléchargez le CV de votre PC, cliquez sur choisir
                    un fichier pour le CV et la LM puis cliquez sur postuler
                  </p>
                  <div className="cv">
                    <label htmlFor="cv" style={{ fontSize: '15px' }}>
                      Télécharger CV *
                    </label>
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      required
                      onChange={(event) => {
                        setCV(event.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="lm" style={{ fontSize: '15px' }}>
                    <label htmlFor="lm">Télécharger LM</label>
                    <input
                      type="file"
                      id="lm"
                      name="LM"
                      onChange={(event) => {
                        setLM(event.target.files[0]);
                      }}
                    />
                  </div>
                  <input
                    type="submit"
                    name="upload"
                    value="Postuler"
                    onClick={(e) => postule(e, id)}
                  />
                </>
              )}
            </form>

            {/* DANS THEQUE */}
            <form encType="multipart/form-data">
              <input type="text" required hidden />
              <h3
                style={{ marginTop: '20px' }}
                onClick={handlingUploadCvLmTheque}
              >
                {' '}
                Ou choisir dans ma cv-thèque et Lm-thèque
              </h3>

              {uploadCvLmTheque && (
                <>
                  <h4>Curriculum Vitae</h4>
                  {candidatCV.length > 0 ? (
                    <select
                      className="selectFiles"
                      name="cvthèque"
                      required
                      onChange={(event) => {
                        setCvtheque(event.target.value);
                      }}
                    >
                      <option defaultValue value=" ">
                        Choisir parmis mes CV
                      </option>
                      {candidatCV.map((val, index) => {
                        return (
                          <option key={index} value={`${val.file1_path}`}>
                            {val.file1_path.split('-')[1]}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <span>Vous n'avez pas encore de CV</span>
                  )}

                  {/* LM */}
                  <h4>Lettre de motivation</h4>
                  {candidatLM.length > 0 ? (
                    <select
                      className="selectFiles"
                      name="lmhèque"
                      required
                      onChange={(event) => {
                        setLmtheque(event.target.value);
                      }}
                    >
                      <option defaultValue value=" ">
                        Choisir parmis mes LM
                      </option>
                      {candidatLM.map((val, index) => {
                        return (
                          <option key={index} value={`${val.file1_path}`}>
                            {val.file1_path.split('-')[1]}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <span>Vous n'avez pas encore de LM</span>
                  )}
                  <input
                    type="submit"
                    name="upload"
                    value="Postuler"
                    onClick={(e) => postule(e, id)}
                  />
                </>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailJD;
