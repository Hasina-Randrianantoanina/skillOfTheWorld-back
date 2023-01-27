import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment/moment';
import 'moment/locale/fr';
import { toast } from 'react-toastify';

import '../../Assets/css/detailEvent.scss';
import logoParDefaut from '../../Assets/img/SOTW_logo (5).webp';
import eventImg from '../../Assets/img/global/defaultCover.webp';

const DetailEvent = () => {
  const redirect = useNavigate();
  const { uid, getUrl, urlFile, entreprise, admin } = useContext(AuthContext);
  const [evenement, setEvenement] = useState([]);
  const [societe, setSociete] = useState([]);
  const [lien, setLien] = useState('');
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [email, setEmail] = useState();
  const [checkIdCandidat, setCheckIdCandidat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const participation = async () => {
    setIsLoading(true);
    await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}api/evenement/postule/${id}`,
      data: {
        theme: evenement.theme,
        nom: nom,
        prenom: prenom,
        email: email,
        candidatId: uid,
      },
    })
      .then((res) => {
        setIsLoading(false);
        postuleSuccess();
        redirect('/nosEvent');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('isPublie', true);
    if (lien !== '') {
      formData.append('lienEvenement', lien);
    }
    if (photoCouverture !== '') {
      formData.append('photoCouverture', photoCouverture);
    }
    await axios
      .patch(`${process.env.REACT_APP_API_URL}api/evenement/${id}`, formData)
      .then((res) => {
        redirect('/validationEvent');
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
          `${process.env.REACT_APP_API_URL}api/evenement/verification/${idevent}/candidat/${candidat}`
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
    const getOneEvent = async () => {
      const getEvent = await axios.get(
        `${process.env.REACT_APP_API_URL}api/evenement/${id}`
      );

      const getEntreprise = await axios.get(
        `${process.env.REACT_APP_API_URL}api/user/entreprise/${getEvent.data.idEntreprise}`
      );
      setEvenement(getEvent.data);
      setSociete(getEntreprise.data);
    };
    const getCandidat = async (idCandidat) => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/candidat/${idCandidat}`)
        .then((res) => {
          setEmail(res.data.email);
          res.data.nom ? setNom(res.data.nom) : setNom('');
          res.data.prenom ? setPrenom(res.data.prenom) : setPrenom('');
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCandidat(uid);
    getOneEvent();
    checkCandidat(id, uid);
  }, []);

  return (
    <div className="outerDivDetailEvent">
      <div className="innerDivDetailEvent">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>{societe ? societe.nomEntreprise : 'Skill of the world'}</h2>
        {/* TOP CARD */}
        <div className="topCard forPreview">
          <img
            src={
              evenement && evenement.photoCouverture
                ? `${urlFile.split('.com/')[0]}.com/${
                    evenement.photoCouverture
                  }`
                : eventImg
            }
            alt="illustration évènement"
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
              <h4>
                <b>{evenement.theme}</b>
              </h4>
            </div>
            <h5>
              Date de l'evènement :{' '}
              <b>{moment(evenement.dateEvenement).locale('fr').format('LL')}</b>
            </h5>
            <h5>
              Horaire : <b>{evenement.horaireSouhaite}</b>
            </h5>
            {admin && (
              <>
                <h5>Mode de paiement : {evenement.modePayement}</h5>
              </>
            )}
            {/* CANDIDAT */}
            {!admin && !entreprise && evenement.typeEvenement === 'Privée' ? (
              <div style={{ marginTop: '8px' }}>
                {uid && checkIdCandidat === true && (
                  <input
                    type="button"
                    value="Vous avez déjà envoyé une demande"
                  />
                )}

                {uid && checkIdCandidat === false && (
                  <>
                    <label style={{ color: '#202124b8' }}>
                      Cet événement est privé, pour demander à y participer
                    </label>
                    <input
                      type="button"
                      value={isLoading ? 'Patientez ...' : 'Cliquer ici'}
                      onClick={participation}
                    />
                  </>
                )}

                {!uid && (
                  <>
                    <label style={{ color: '#202124b8' }}>
                      Pour participer aux évènements, veuillez
                    </label>
                    <input
                      type="button"
                      value="S'inscrire"
                      onClick={() => redirect('/inscriptionCandidat')}
                    />
                  </>
                )}
              </div>
            ) : (
              <span>
                <p style={{ color: '#202124b8' }}>
                  Lien de l'évènement :&nbsp;
                  {evenement.lienEvenement ? (
                    <a
                      href={evenement.lienEvenement}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {evenement.lienEvenement}
                    </a>
                  ) : (
                    'Pas encore de lien'
                  )}
                </p>
              </span>
            )}

            {/* ADMIN */}
            {admin && (
              <form onSubmit={handleOnSubmit} style={{ marginTop: '8px' }}>
                <label
                  htmlFor="uploadCouverture"
                  style={{ fontSize: '13.28px' }}
                >
                  Telecharger photo de couverture de l'évènement
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
                  style={{ padding: '0.7rem 10px' }}
                  type="text"
                  placeholder="Veuillez inserer le lien de l'évènement"
                  onChange={(event) => {
                    setLien(event.target.value);
                  }}
                />
                <input type="submit" value="Valider" />
              </form>
            )}

            {/* ENTREPRISE et CANDIDAT*/}
            {/* {!admin &&
              (evenement.lienEvenement ? (
                <span>
                  <p style={{ color: '#202124b8' }}>
                    Lien de l'évènement :&nbsp;
                  </p>
                  <a
                    href={evenement.lienEvenement}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {evenement.lienEvenement}
                  </a>
                </span>
              ) : (
                <span style={{ display: 'flex' }}>
                  <p style={{ color: '#202124b8' }}>
                    Lien de l'évènement :&nbsp;
                  </p>
                  <b>Pas encore de liens</b>
                </span>
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEvent;
