import React from "react";
import { useNavigate } from "react-router-dom";

import "../../Assets/css/Notification.scss";

const NotificationEntreprise = () => {
    const redirect = useNavigate();
  
    return (
      <div className="outerDivNotif">
        <div className="innerDivNotif">
          <p className="linkRetour" onClick={() => redirect(-1)}>
            {" "}
            &#60; Retour
          </p>
          <h2>Notifications</h2>
  
          <div className="allNotif">
            <div className="notif">
              <h4>Lorem ipsum</h4>
              <span>
                <p>
                  Lorem ipsum shemnt kluter gurtinad frustad kaled obey rishtum
                  oclapet nahmet joomla
                  Lorem ipsum shemnt kluter gurtinad frustad kaled obey rishtum
                  oclapet nahmet joomla
                </p>
                <p>10 septembre 2022</p>
              </span>
            </div>
            <div className="notif">
              <h4>Lorem ipsum</h4>
              <span>
                <p>
                  Lorem ipsum shemnt kluter gurtinad frustad kaled obey rishtum
                  oclapet nahmet joomla
                </p>
                <p>10 septembre 2022</p>
              </span>
            </div>
            <div className="notif">
              <h4>Lorem ipsum</h4>
              <span>
                <p>
                  Lorem ipsum shemnt kluter gurtinad frustad kaled obey rishtum
                  oclapet nahmet joomla
                </p>
                <p>10 septembre 2022</p>
              </span>
            </div>
            <div className="notif">
              <h4>Lorem ipsum</h4>
              <span>
                <p>
                  Lorem ipsum shemnt kluter gurtinad frustad kaled obey rishtum
                  oclapet nahmet joomla
                </p>
                <p>10 septembre 2022</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default NotificationEntreprise;