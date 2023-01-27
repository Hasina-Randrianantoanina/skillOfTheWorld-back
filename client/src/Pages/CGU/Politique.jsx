import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosArrowDropupCircle } from "react-icons/io";

import "../../Assets/css/cgu.scss";

const Politique = () => {
  const redirect = useNavigate();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="outerCGU">
      <div className="innerCGU">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {" "}
          &#60; Retour
        </p>
        <h2>Politique de confidentialité de SKILL of the WORLD</h2>
        <div className="texte">
          <h3>I - L’objectif de la politique de confidentialité</h3>
          <p>
            Cette politique de confidentialité est établie dans le but
            d’informer les utilisateurs du site SkilloftheWorld possédé et géré
            par SkilloftheWorld des modalités suivantes :
          </p>
          <ul>
            <li>
              - Les données personnelles recueillies par le site internett
            </li>
            <li>- L’utilisation faite de ces données</li>
            <li>- L’accès à ces données</li>
            <li>- Les droits que possèdent les utilisateurs du site</li>
            <li>- La politique liée à l’utilisation de cookies</li>
          </ul>
          <br />
          <p>
            Cette politique de confidentialité fonctionne parallèlement aux
            conditions générales du site SkilloftheWorld.
          </p>
          <br />
          <h3>II - Lois applicables</h3>
          <p>
            Conformément au Règlement Général sur la Protection des Données,
            cette politique de confidentialité est sujette aux règlements
            suivants :
          </p>
          <br />
          <p>Les données personnelles sont :</p>
          <ul>
            <li>- traitées de manière licite et transparente ;</li>
            <li>
              - collectées à des fins déterminées, explicites et légitimes, et
              ne seront pas traitées ultérieurement d’une manière incompatible
              avec ces fins. Conformément à l’article 89, paragraphe 1 du RGPD,
              le stockage et le traitement de ces données à des fins
              archivistiques dans l’intérêt public, à des fins de recherche
              scientifique ou historique ou à des fins statistiques, n’est pas
              considéré comme incompatible avec les finalités initiales ;
            </li>
            <li>
              - adéquates, pertinentes et limitées à ce qui est nécessaire dans
              le cadre des finalités pour lesquelles elles sont traitées ;
            </li>
            <li>
              - exactes, et si nécessaires tenues à jour. Toutes les mesures
              raisonnables seront prises pour corriger des données incorrectes
              au regard de la finalité pour laquelle celles-si sont collectées ;
            </li>
            <li>
              - conservées sous une forme permettant l’identification des
              personnes concernées pour une durée suffisante pour leur
              traitement ;
            </li>
            <li>
              - traitées d’une façon qui garantit la sécurité de celles-ci, y
              compris en ce qui concerne le traitement non-autorisé ou illicite,
              la perte ou la destruction de ces données, accidentelle ou
              volontaire.
            </li>
          </ul>
          <br />
          <p>
            Le traitement des données collectées n’est licite que si au moins
            l’une des conditions suivantes est remplie:
          </p>
          <ul>
            <li>
              - La personne concernée par les données à consenti au traitement
              de celles-ci pour une ou plusieurs finalités spécifiques.
            </li>
            <li>
              - Le traitement des données est nécessaire à l’exécution d’un
              contrat dont la personne concernée est partie ou à l’exécution des
              mesures précontractuelles prises à la demande de celui-ci
            </li>
            <li>
              - Le traitement est nécessaire à la réalisation d’une obligation
              légale à laquelle le responsable,SkilloftheWorld, est soumis.
            </li>
            <li>
              - Le traitement est nécessaire à la sauvegarde des intérêts vitaux
              de toute personne physique.
            </li>
            <li>
              - Le traitement est nécessaire à la réalisation d’une mission
              d’intérêt public dont est investi SkilloftheWorld.
            </li>
            <li>
              - Le traitement est nécessaire aux fins des intérêts légitimes
              poursuivis par le responsable du traitement ou par un tiers, à
              moins que ne prévalent les intérêts, libertés ou droits
              fondamentaux de la personne concernée.
            </li>
          </ul>
          <br />
          <h3>III - Consentement</h3>
          <p>
            En utilisant le site SkilloftheWorld les utilisateurs consentent à :
          </p>
          <ul>
            <li>
              - Toutes les conditions incluses dans la présente politique de
              confidentialité ;
            </li>
            <li>
              - La collecte, l’utilisation et la conservation des données
              listées dans la présente politique de confidentialité.
            </li>
          </ul>
          <br />
          <h3>IV - Données personnelles collectées</h3>
          <p>
            Lors de la navigation du site SkilloftheWorld, différentes données
            personnelles au sujet des utilisateurs sont collectées.
          </p>
          <br />
          <p>
            Les données liées aux formulaires d’inscriptions sont collectées de
            manière automatique (Nom – Prénom – Lieu d’habitation –
            mailettéléphone – date de naissance si renseignée)
          </p>
          <br />
          <p>
            Aucune donnée supplémentaire n’est collectée sans vous en informer
            au préalable.
          </p>
          <br />
          <h3>V - Traitement de ces données</h3>
          <p>
            Les données personnelles recueillies sur le site SkilloftheWorldne
            sont collectées et traitées que dans le cadre des fins précisées
            dans la présente politique de confidentialité et / ou dans les pages
            pertinentes du site. Les données personnelles que nous collectons ne
            seront pas utilisées à d’autres fins.
          </p>
          <br />
          <h3>VI - Partage des données personnelles recueillies</h3>
          <p>
            Les candidats qui postulent aux offres d’emplois auront leurs
            coordonnées ainsi que les documents qu’ils joignent à leurs
            candidatures <b>(CV et LM)</b> qui seront transmis aux entreprises
            qui recherchent un talent.
          </p>
          <br />
          <p>
            Par ailleurs, les données personnelles collectées pourront être
            partagées :
          </p>
          <ul>
            <li>
              - Si l’entreprise SkilloftheWorld y est contrainte par la loi
            </li>
            <li>
              - Si les informations sont requises pour toute procédure
              judiciaire
            </li>
            <li>
              - Afin de protéger les droits légaux de l’entreprise
              SkilloftheWorld
            </li>
          </ul>
          <br />
          <p>
            En dehors des situations prévues dans cette présente politique, les
            informations personnelles ne seront en aucun cas divulguées ou
            partagées à des tiers.
          </p>
          <br />
          <h3>VII - Stockage et protection des données personnelles</h3>
          <p>
            L’entreprise SkilloftheWorld ne conserve pas les données
            personnelles plus longtemps que ce qui est nécessaire à la
            réalisation des fins pour lesquelles elles sont collectées.
          </p>
          <br />
          <h3>VIII - Droits de l’utilisateur</h3>
          <p>
            Conformément au chapitre 3, art 12-23 du RGPD, les utilisateurs du
            site SkilloftheWorldont, en ce qui concerne leurs données
            personnelles, les droits suivants :
          </p>
          <ul>
            <li>- Droit d’accès</li>
            <li>- Droit de rectification</li>
            <li>- Droit à l’effacement</li>
            <li>- Droit de restreindre le traitement</li>
            <li>- Droit à la portabilité des données</li>
            <li>- Droit d’objection</li>
          </ul>
          <br />
          <p>
            Pour faire valoir l’un de ses droits, accéder à vos données, les
            modifier ou les supprimer d’une quelconque manière, vous pouvez
            communiquer avec notre Responsable :{" "}
            <b>contact@skilloftheworld.com</b>
          </p>
          <br />
          <h3>IX - Politique au sujet des cookies</h3>
          <p>
            Un cookie est un fichier stocké sur le disque dur d’un utilisateur
            lorsqu’il navigue sur un site web. Ce cookie permet de mieux
            connaître les données relatives aux habitudes de navigation de
            l’utilisateur afin de lui proposer une meilleure expérience
            d’utilisation.
          </p>
          <br />
          <p>Le site SkilloftheWorld n’utilise pas à ce jour de cookies.</p>
          <br />
          <h3>XI / Modification de la politique de confidentialité</h3>
          <p>
            Afin de rester en accord avec la loi ou de refléter tout changement
            dans notre processus de gestion des données personnelles, la
            présente politique de confidentialité peut être amenée à changer et
            à être modifiée régulièrement. Il est recommandé aux utilisateurs de
            vérifier régulièrement cette politique afin de se tenir informés de
            notre politique en termes de collecte et de traitement de données
            personnelles.
          </p>
          <br />
          <h3>XII / Contact</h3>
          <p>contact@skilloftheworld.com</p>
          <IconContext.Provider value={{ color: "#112443", size: "50px" }}>
            <div
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
              style={{
                display: "flex",
                background: "white",
                position: "fixed",
                bottom: "40px",
                right: "40px",
                textAlign: "center",
                borderRadius: "50px",
                zIndex: "5",
              }}
            >
              <IoIosArrowDropupCircle />
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Politique;
