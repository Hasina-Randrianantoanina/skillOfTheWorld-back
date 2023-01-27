import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosArrowDropupCircle } from "react-icons/io";

import "../../Assets/css/cgu.scss";

const CGU = () => {
  const redirect = useNavigate();

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="outerCGU">
      <div className="innerCGU">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          &#60; Retour
        </p>
        <h2>Conditions générales d'utilisation</h2>
        <div className="texte">
          <h4>En vigueur au 01/01/2022</h4>
          <p>
            Les présentes conditions générales d'utilisation (dites « <b>CGU</b>
            ») ont pour objet l'encadrement juridique des modalités de mise à
            disposition du site et des services par SKILL OF THE WORLD et de
            définir les conditions d’accès et d’utilisation des services par «
            l'<b>Utilisateur</b> ». Les présentes CGU sont accessibles sur le
            site à la rubrique « <b>CGU</b> ».
          </p>
          <br />
          <p>
            Toute inscription ou utilisation du site implique l'acceptation sans
            aucune réserve ni restriction des présentes CGU par l’utilisateur.
            En cas de non-acceptation des CGU stipulées dans le présent contrat,
            l'Utilisateur se doit de renoncer à l'accès des services proposés
            par le site. <b>www.skilloftheworld.com</b> se réserve le droit de
            modifier unilatéralement et à tout moment le contenu des présentes
            CGU.
          </p>
          <br />
          <h3>Article 1 : Les mentions légales</h3>
          <p>
            L'édition du site www.skilloftheworld.com est assurée par la Société
            Société à responsabilité limitée unipersonnelle SKILL OF THE WORLD
            au capital de 500 euros, immatriculée au RCS de ANTANANARIVO sous le
            numéro 0249184, dont le siège social est situé au Lot 4 P 7 Bis D
            Antsahalovana Antohomadinika Adresse e-mail :
            contact@skilloftheworld.com.
          </p>
          <br />
          <h3>ARTICLE 2 : Accès au site</h3>
          <p>
            Le site internet propose les services suivants :Conseil RH aux
            entreprises et appui à la recherche d’emplois pour les Talents Le
            site est accessible gratuitement en tout lieu à tout Utilisateur
            ayant un accès à Internet. Tous les frais supportés par
            l'Utilisateur pour accéder au service (matériel informatique,
            logiciels, connexion Internet, etc.) sont à sa charge. Des services
            sont payants dans le site et l’utilisateur est informé de cela.
          </p>
          <br />
          <p>
            L’Utilisateur non membre n'a pas accès aux services réservés. Pour
            cela, il doit s’inscrire en remplissant le formulaire. En acceptant
            de s’inscrire aux services réservés, l’Utilisateur membre s’engage à
            fournir des informations sincères et exactes concernant son état
            civil et ses coordonnées, notamment son adresse email. Pour accéder
            aux services, l’Utilisateur doit ensuite s'identifier à l'aide de
            son identifiant et de son mot de passe qui lui seront communiqués
            après son inscription.
          </p>
          <br />
          <p>
            Tout Utilisateur membre régulièrement inscrit pourra également
            solliciter sa désinscription en envoyant un mail à
            contact@skilloftheworld.com. Celle-ci sera effective dans un délai
            raisonnable. Tout événement dû à un cas de force majeure ayant pour
            conséquence un dysfonctionnement du site ou serveur et sous réserve
            de toute interruption ou modification en cas de maintenance,
            n'engage pas la responsabilité de www.skilloftheworld.com. Dans ces
            cas, l’Utilisateur accepte ainsi ne pas tenir rigueur à l’éditeur de
            toute interruption ou suspension de service, même sans préavis.
            L'Utilisateur a la possibilité de contacter le site par messagerie
            électronique à l’adresse email de l’éditeur communiqué à l’ARTICLE
            1.
          </p>
          <br />
          <h3>ARTICLE 3 : Collecte des données</h3>
          <p>
            Le site est exempté de déclaration à la Commission Nationale
            Informatique et Libertés (CNIL) dans la mesure où son siège est basé
            à Madagascar et n’y est donc pas soumis. Cependant, le site internet
            s’engage à ne divulguer aucune information en lien avec la politique
            de confidentialité mentionnée sur le site.
          </p>
          <br />
          <h3>ARTICLE 4 : Propriété intellectuelle</h3>
          <p>
            Les marques, logos, signes ainsi que tous les contenus du site
            (textes, images, son…) font l'objet d'une protection par le Code de
            la propriété intellectuelle et plus particulièrement par le droit
            d'auteur.
          </p>
          <br />
          <p>
            La marque SKILL OF THE WORLD est une marque déposée par SKILL OF THE
            WORLD.Toute représentation et/ou reproduction et/ou exploitation
            partielle ou totale de cette marque, de quelque nature que ce soit,
            est totalement prohibée
          </p>
          <br />
          <p>
            L'Utilisateur doit solliciter l'autorisation préalable du site pour
            toute reproduction, publication, copie des différents contenus. Il
            s'engage à une utilisation des contenus du site dans un cadre
            strictement privé, toute utilisation à des fins commerciales et
            publicitaires est strictement interdite. Toute représentation totale
            ou partielle de ce site par quelque procédé que ce soit, sans
            l’autorisation expresse de l’exploitant du site Internet
            constituerait une contrefaçon sanctionnée par l’article L 335-2 et
            suivants du Code de la propriété intellectuelle. Il est rappelé
            conformément à l’article L122-5 du Code de propriété intellectuelle
            que l’Utilisateur qui reproduit, copie ou publie le contenu protégé
            doit citer l’auteur et sa source.
          </p>
          <br />
          <h3>ARTICLE 5 : Responsabilité</h3>
          <p>
            Les sources des informations diffusées sur le site
            www.skilloftheworld.com sont réputées fiables mais le site ne
            garantit pas qu’il soit exempt de défauts, d’erreurs ou d’omissions.
            Les informations communiquées sont présentées à titre indicatif et
            général sans valeur contractuelle. Malgré des mises à jour
            régulières, le site www.skilloftheworld.com ne peut être tenu
            responsable de la modification des dispositions administratives et
            juridiques survenant après la publication. De même, le site ne peut
            être tenue responsable de l’utilisation et de l’interprétation de
            l’information contenue dans ce site.
          </p>
          <br />
          <p>
            L'Utilisateur s'assure de garder son mot de passe secret. Toute
            divulgation du mot de passe, quelle que soit sa forme, est
            interdite. Il assume les risques liés à l'utilisation de son
            identifiant et mot de passe. Le site décline toute responsabilité.
            Le site www.skilloftheworld.com ne peut être tenu pour responsable
            d’éventuels virus qui pourraient infecter l’ordinateur ou tout
            matériel informatique de l’Internaute, suite à une utilisation, à
            l’accès, ou au téléchargement provenant de ce site. La
            responsabilité du site ne peut être engagée en cas de force majeure
            ou du fait imprévisible et insurmontable d'un tiers.
          </p>
          <br />
          <h3>ARTICLE 6 : Liens hypertextes</h3>
          <p>
            Des liens hypertextes peuvent être présents sur le site.
            L’Utilisateur est informé qu’en cliquant sur ces liens, il sortira
            du site www.skilloftheworld.com. Ce dernier n’a pas de contrôle sur
            les pages web sur lesquelles aboutissent ces liens et ne saurait, en
            aucun cas, être responsable de leur contenu.
          </p>
          <br />
          <h3>ARTICLE 7 : Cookies</h3>
          <p>
            L’Utilisateur est informé que lors de ses visites sur le site, un
            cookie peut s’installer automatiquement sur son logiciel de
            navigation. Les cookies sont de petits fichiers stockés
            temporairement sur le disque dur de l’ordinateur de l’Utilisateur
            par votre navigateur et qui sont nécessaires à l’utilisation du site
            www.skilloftheworld.com. Les cookies ne contiennent pas
            d’information personnelle et ne peuvent pas être utilisés pour
            identifier quelqu’un. Un cookie contient un identifiant unique,
            généré aléatoirement et donc anonyme. Certains cookies expirent à la
            fin de la visite de l’Utilisateur, d’autres restent. L’information
            contenue dans les cookies est utilisée pour améliorer le site
            www.skilloftheworld.com. En naviguant sur le site, L’Utilisateur les
            accepte. L’Utilisateur pourra désactiver ces cookies par
            l’intermédiaire des paramètres figurant au sein de son logiciel de
            navigation.
          </p>
          <br />
          <h3>ARTICLE 8 : Droit applicable et juridiction compétente</h3>
          <p>
            La législation malgache s'applique au présent contrat. En cas
            d'absence de résolution amiable d'un litige né entre les parties,
            les tribunaux à Madagascar seront seuls compétents pour en
            connaître. Pour toute question relative à l’application des
            présentes CGU, vous pouvez joindre l’éditeur aux coordonnées
            inscrites à l’ARTICLE 1.
          </p>
          <IconContext.Provider value={{ color: "#112443", size: "50px" }}>
            <div
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
              style={{
                display:"flex",
                background:"white",
                position: "fixed",
                bottom: "40px",
                right: "40px",
                textAlign: "center",
                borderRadius:"50px",
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

export default CGU;
