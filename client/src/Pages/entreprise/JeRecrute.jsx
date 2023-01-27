import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./../../Assets/css/jeRecrute.scss";
import ets_img from '../../Assets/img/SOTW_logo (2).webp';
import jeRecruteImg from "./../../Assets/img/entreprise/jeRecrute.svg";
import interview from "./../../Assets/img/global/Interview.svg";

const JeRecrute = () => {
  const redirect = useNavigate();

  return (
    <div className="divJeRecrute">
      <div className="innerJeRecrute">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <div className="left">
          <a
            href="https://storyset.com/phone"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={jeRecruteImg} alt="Sign in Illustration" />
          </a>
        </div>
        <div className="right">

          <h2>
            <b>Détendez-vous, on recrute pour vous</b>
          </h2>
          <br />
          <h3>Parce que nous savons que sélectionner les CV - Réaliser le premier choix de candidats
            et vérifier les expériences prend du temps;
          </h3>
          <br />
          <h3>Vous faire <span>gagner du temps</span> tout en assurant votre <span>marque employeur</span> c'est notre mission.</h3>
          <br />
          <div className="btnRecruit">
          <Link to="/inscriptionEntreprise">
            <button>S'inscrire</button>
          </Link>
          <Link to="/login">
                  <button>Se connecter</button>
          </Link>
          </div>
          
          {/* <h3>
            Fini le tri de CV fastidieux et la perte de temps en recrutement. <br/>
            Terminer les offres d'emplois diluées parmi les autres qui ne mettent pas en avant vos valeurs et votre marque employeur ! <br/> <br/>
            Avec SOTW, c'est simple : nous trions les CV pour vous et vous ne recevrez que les Talents adaptés à vos besoins en compétences.<br/>
            Une offre d'emploi anonyme, c'est possible aussi ! Vous décidez. <br/> <br/>
            Alors parfois, nous vous proposerons des talents atypiques ... mais c'est aussi cela savoir recruter. Et c'est aussi ce que les Entreprises demandent : de la diversité.<br/> <br/>
            Pour diffuser votre offre d'emploi et recevoir les Talents qui correspondent à votre demande c'est simple :
          </h3> */}
          {/* <div className="divForH4">
            <ul>
              <li>
                <Link to="/inscriptionEntreprise">
                  <button>S'inscrire</button>
                </Link>
              </li>
              <li style={{marginTop:"5px"}}>
                Déjà inscrit ? {" "}
                <Link to="/login">
                  <button>Se connecter</button>
                </Link>
              </li>
              <li>Vous rédigez votre offre.</li>
              <li>
                Un Expert RH vous présentera notre offre commerciale et si elle est acceptée, il validera votre offre.<br/>
                SI besoin, il vous recontactera pour la rendre encore plus attractive ! Parce que à SOTW l'humain rencontre l'Humain.<br/>
                Et notre offre s'adapte à tous vos besoins.
              </li>
              <li>Une fois votre offre validée et le paiement réalisé, votre offre d'emploi sera en ligne pour 1 mois.</li>
              <li>L'expert RH vous fera parvenir les candidatures adaptées à votre besoin.</li>
              <li>Vous recevez les CV via la plateforme et par un tableau de bord, vous pourrez directement contacter les candidats et leur donner une réponse !</li>
              <li>
                Vous souhaitez que nous fassions la totalité du recrutement ?{" "}
                <Link to="/contactezNous">
                  <button>Contactez-nous</button> 
                </Link> 
              </li>
            </ul>
          </div> */}
        </div>

        <div className="divBottom">
          <h2>
            <b>EXTERNALISEZ VOS RECRUTEMENTS</b>
          </h2>
          <div className="divCardRecruit">
            <div className="divTopRecruit">
              <div className="cardObjectif cardJdObjectif">
                <div className="value">
                  <div
                    className="imgValue imgJdValue"
                    style={{ height: '145px' }}
                  >
                    <img src={ets_img} alt="Logo de Skill of the world" />
                  </div>
                  <h4><b>Pré-sélection des CV</b></h4>
                  <br />
                  <p>
                    Nous vous présentons les candidats adaptés à vos besoins uniquement.
                  </p>
                </div>
              </div>
            </div>
            <div className="divTopRecruit divTop_2">
              <div className="cardObjectif cardJdObjectif">
                <div className="value">
                  <div
                    className="imgValue imgJdValue"
                    style={{ height: '145px' }}
                  >
                    <img src={ets_img} alt="Logo de Skill of the world" />
                  </div>
                  <h4><b>Entretien téléphonique</b></h4>
                  <br />
                  <p>
                    Nous réalisons le premier entretien avec les candidats et vous recevez un compte-rendu détaillé.
                  </p>
                </div>
              </div>
            </div>
            <div className="divTopRecruit divTop_3">
              <div className="cardObjectif cardJdObjectif">
                <div className="value">
                  <div
                    className="imgValue imgJdValue"
                    style={{ height: '145px' }}
                  >
                    <img src={ets_img} alt="Logo de Skill of the world" />
                  </div>
                  <h4><b>Marque Employeur</b></h4>
                  <br />
                  <p>
                    Notre équipe de professionnels organise des évènements en ligne
                     avec pré-sélection de candidats
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="divBottomList">
            <div className="left_2">
              <a
                href="https://storyset.com/work"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img src={interview} alt="Sign in Illustration" />
              </a>
            </div>
            <div className="right_2">

              <h2>
                <b>Mettre l'Humain au coeur du process de recrutement</b>
              </h2>
              <br />
              <h3>Les candidats sont valorisés tout au long de leur parcours par 
                un <span>contact humain</span> et <span>professionnel.</span>
              </h3>
              <br />
              <div className="bottomRight">
                <ul>
                  <li>
                    <div className="puce"></div>
                    <h3>Recrutement local et international</h3>
                  </li>
                  <li>
                    <div className="puce"></div>
                    <h3>Remote work possible sur métiers en tension (SI)</h3>
                  </li>

                </ul>
              </div>
              <br />
              <h3>Contactez-nous : <span>contact@skilloftheworld.com</span>
              </h3>
            </div>
        </div>
      </div>

      </div>
      
    </div>
  );
};

export default JeRecrute;
