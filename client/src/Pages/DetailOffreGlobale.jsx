import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import 'moment/locale/fr';

import '../Assets/css/detailOffreGlogale.scss';
import logoParDefaut from '../Assets/img/SOTW_logo (5).webp';
import offreImg from '../Assets/img/global/defaultCover.webp';

const DetailOffreGlobale = () => {
  const redirect = useNavigate();

  const { uid, candidat, admin, getUrl, urlFile } = useContext(AuthContext);
  const [offre, setOffre] = useState([]);
  const [isPostuler, setIsPostuler] = useState(false);

  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [cvtheque, setCvtheque] = useState();
  const [lmtheque, setLmtheque] = useState();

  const [candidatCV, setCandidatCV] = useState([]);
  const [candidatLM, setCandidatLM] = useState([]);
  const [nombreAction, setNombreAction] = useState();

  const [societe, setSociete] = useState([]);
  const [checkIdCandidat, setCheckIdCandidat] = useState(false);
  const [checkOffreValidate, setCheckOffreValidate] = useState(false);

  const [uploadPC, setUploadPC] = useState(true);
  const [uploadCvLmTheque, setUploadCvLmTheque] = useState(false);

  const handlingUploadPC = () => {
    setUploadPC(true);
    setUploadCvLmTheque(false);
  };

  const handlingUploadCvLmTheque = () => {
    setUploadPC(false);
    setUploadCvLmTheque(true);
  };

  const { id } = useParams();

  const validationSuccess = () =>
    toast.success('Offre validée avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const postuleSuccess = () =>
    toast.success('Fichier envoyé avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const Valider = (IdOffre) => {
    axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}api/offre/update/${IdOffre}`,
      data: {
        isValidate: true,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          console.log(res.data.errors);
        } else {
          console.log(res.data);
          redirect('/validationOffre');
          validationSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const incrementeCandidat = async (idcandidat) => {
    const action = nombreAction + 1;
    await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}api/user/candidat/action/${idcandidat}`,
      data: {
        nombreAction: action,
      },
    })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitFile = (e, uid, id) => {
    confirmAlert({
      title: 'Validation',
      message: 'Merci de valider l’envoi de votre candidature',
      buttons: [
        {
          label: 'Envoyer',
          onClick: () => {
            incrementeCandidat(uid);
            postule(e, uid, id);
            redirect('/offreEmploiCandidat');
          },
        },
        {
          label: 'Annuler',
          onClick: () => console.log('Click No'),
        },
      ],
    });
  };

  const postule = async (e, idCandidat, IdOffre) => {
    e.preventDefault();

    if (file1 && file2) {
      const formData = new FormData();
      formData.append('file1', file1);
      formData.append('file2', file2);
      formData.append('candidatId', idCandidat);
      formData.append('resultat', 'envoye');
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}api/offre/${IdOffre}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            console.log(res.data);
            setIsPostuler(false);
            postuleSuccess();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (file1) {
      const formData = new FormData();
      formData.append('file1', file1);
      formData.append('candidatId', idCandidat);
      formData.append('resultat', 'envoye');
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}api/offre/cv/${IdOffre}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            console.log(res.data);
            setIsPostuler(false);
            postuleSuccess();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (cvtheque && lmtheque) {
      await axios({
        method: 'PATCH',
        url: `${process.env.REACT_APP_API_URL}api/offre/theque/${IdOffre}`,
        data: {
          candidatId: idCandidat,
          resultat: 'envoye',
          cvtheque: cvtheque,
          lmtheque: lmtheque,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            console.log(res.data);
            setIsPostuler(false);
            postuleSuccess();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (cvtheque) {
      console.log(cvtheque);
      console.log(idCandidat);
      await axios({
        method: 'PATCH',
        url: `${process.env.REACT_APP_API_URL}api/offre/cvtheque/${IdOffre}`,
        data: {
          candidatId: idCandidat,
          resultat: 'envoye',
          cvtheque: cvtheque,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            console.log(res.data.errors);
          } else {
            console.log(res.data);
            setIsPostuler(false);
            postuleSuccess();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getUrl();
    const getnombrecv = async (idCandidat) =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/candidat/${idCandidat}`)
        .then((res) => {
          console.log(res.data.listCV);
          setCandidatCV(res.data.listCV);
          setNombreAction(res.data.nombreAction);
        })
        .catch((err) => {
          console.log(err);
        });

    const getnombreLM = async (idCandidat) =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/candidat/${idCandidat}`)
        .then((res) => {
          setCandidatLM(res.data.listLM);
        })
        .catch((err) => {
          console.log(err);
        });

    const getOneOffre = async () => {
      const idCandidat = [];
      const getOffre = await axios.get(
        `${process.env.REACT_APP_API_URL}api/offre/${id}`
      );
      const getNameEntreprise = await axios.get(
        `${process.env.REACT_APP_API_URL}api/user/entreprise/${getOffre.data.offreId}`
      );

      for (let i = 1; i < getOffre.data.listCandidat.length; i++) {
        idCandidat.push(getOffre.data.listCandidat[i].candidatId);
      }

      if (getOffre.data.isValidate === true) {
        setCheckOffreValidate(true);
      }

      getnombreLM(uid);
      getnombrecv(uid);
      setSociete(getNameEntreprise.data);
      setOffre(getOffre.data);
    };
    const checkCandidat = async (idOffre, candidat) => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}api/offre/${idOffre}/candidat/${candidat}`
        )
        .then((res) => {
          if (res.data.length > 0) {
            setCheckIdCandidat(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getOneOffre();
    checkCandidat(id, uid);
  }, [uid, id]);

  return (
    <div className="outerDivDetail">
      <div className="innerDivDetail">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>
          {offre.annonceAnonyme === true
            ? 'Skill of the world'
            : societe.nomEntreprise}
        </h2>
        {/* TOP CARD */}
        <div className="topCard forPreview">
          <img
            src={
              offre && offre.uploadCouverture
                ? `${urlFile.split('.com/')[0]}.com/${offre.uploadCouverture}`
                : offreImg
            }
            alt="illustration Offre"
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
              <h4>{offre.intitulePoste}</h4>
              <h5 className="ville">{offre.localisation}</h5>
            </div>
            <h5>{offre.fonction}</h5>
            <h5>{offre.typeContrat}</h5>
            {/* <Link to="/modificationOffre">
              <button>Modifier</button>
            </Link> */}
          </div>
        </div>

        {/* BOTTOM CARD */}
        <div className="bottomCard">
          {/* LEFT */}
          <div className="bottomLeft">
            <h4>Niveau d'étude minimum</h4>
            <h5>{offre.niveauEtude}</h5>

            <h4>Date de début</h4>
            <h5>{moment(offre.dateDebut).locale('fr').format('LL')}</h5>

            <h4>Délai de recrutement</h4>
            <h5>{offre.delaisRecrutement}</h5>

            <h4>Télétravail</h4>
            <h5>{offre.typeTravail}</h5>

            <h4>Expérience souhaitée pour le poste</h4>
            <h5>{offre.expSouhaite}</h5>

            <h4>Site internet</h4>
            <h5>{offre.siteWeb}</h5>
          </div>
          {/* RIGHT */}
          <div className="bottomRight">
            <h4>Description de l'offre</h4>
            <p>{offre.descriptionOffre}</p>

            <h4>Les compétences attendues</h4>
            <p>{offre.competencesAttendues} </p>

            <h4>Le savoir-être idéal</h4>
            <p>{offre.savoirIdeal}</p>

            <h4>Pourquoi postuler ?</h4>
            <p>{offre.pourquoiPostuler}</p>

            <h4>Envoyer la candidature à </h4>
            <p>{offre.destinataire}</p>

            {admin && (
              <>
                <h4>Mode de paiement </h4>
                <p>{offre.modePaiement}</p>
              </>
            )}
          </div>
          <div className="forBtn">
            {admin && !checkOffreValidate && (
              <button
                style={{ marginRight: '10px' }}
                type="button"
                onClick={() => Valider(id)}
              >
                Valider
              </button>
            )}
            {/* {admin && checkOffreValidate && <button onClick={() => Valider(id)} disabled>Valider</button>} */}
            {admin && (
              <Link to={`/modificationOffre/${offre._id}`}>
                <button type="button">Modifier</button>
              </Link>
            )}

            {candidat && checkIdCandidat === false && (
              <button type="button" onClick={() => setIsPostuler(!isPostuler)}>
                {!isPostuler ? 'Postuler' : 'Annuler'}
              </button>
            )}
            {candidat && checkIdCandidat === true && (
              <button type="button">Vous avez déjà postulé </button>
            )}

            {!uid && (
              <button
                type="button"
                onClick={() => redirect('/inscriptionCandidat')}
              >
                S'inscrire
              </button>
            )}
          </div>
        </div>

        {/* FOR CV AND LM */}
        {isPostuler && (
          <div className="upload">
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
                      name="file1"
                      required
                      onChange={(event) => {
                        setFile1(event.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="lm" style={{ fontSize: '15px' }}>
                    <label htmlFor="lm">Télécharger LM</label>
                    <input
                      type="file"
                      id="lm"
                      name="file2"
                      onChange={(event) => {
                        setFile2(event.target.files[0]);
                      }}
                    />
                    <input type="text" required hidden />
                  </div>

                  <input
                    type="submit"
                    name="upload"
                    value="Postuler"
                    onClick={(e) => submitFile(e, uid, id)}
                  />
                </>
              )}
            </form>

            {/* DANS LA THEQUE */}
            {/* CV */}
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
                  <h4 style={{ marginTop: '20px' }}>Curriculum Vitae</h4>
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
                  <h4 style={{ marginTop: '25px' }}>Lettre de motivation</h4>
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
                            {val.file1_path.split('_')[1]}
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
                    onClick={(e) => submitFile(e, uid, id)}
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

export default DetailOffreGlobale;
