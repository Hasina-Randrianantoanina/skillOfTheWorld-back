import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";

import "../Assets/css/footer.scss";

const Footer = () => {
  let iconStylesFacebook = { color: "#ffffff", fontSize: "30px" };
  let iconStylesYoutube = { color: "#FF0000", fontSize: "30px" };
  let iconStylesLinkedin = { color: "#0e76a8", fontSize: "30px" };

  return (
    <footer>
      <div className="footer-content">
        <div className="block footer-help">
          <h3>Besoin d'aide ?</h3>
          <ul className="help-list">
            <li>
              <Link to="/contactezNous">Contactez-nous</Link>
            </li>
          </ul>
        </div>
        <div className="block footer-legal">
          <h3>Légal</h3>
          <ul className="legal-list">
            <li>
              <Link to="/cgu">Conditions générales d'utilisation</Link>
            </li>
            <li>
              <Link to="/politiqueDeConfidentialite">Politique de confidentialité</Link>
            </li>
          </ul>
        </div>
        <div className="block footer-media">
          <h3>Suivez-nous sur les réseaux</h3>
          <ul className="media-list">
              <li>
                <a href="https://www.facebook.com/profile.php?id=100086430912598" target="_blank" rel="noreferrer noopener">
                  <FaFacebook style={iconStylesFacebook}/>
                </a>
              </li>
              <li>
                <a href="https://youtube.com/channel/UCh5CyVwtFd0YB9m_wNqWSuQ" target="_blank" rel="noreferrer noopener">
                  <FaYoutube style={iconStylesYoutube}/>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/skill-of-the-world/" target="_blank" rel="noreferrer noopener">
                  <FaLinkedin style={iconStylesLinkedin}/>
                </a>
              </li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <span>
          site réalisé par &copy; <b>Retina</b>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
