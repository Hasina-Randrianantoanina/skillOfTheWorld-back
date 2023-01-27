import React from "react";

import "../../Assets/css/loading.scss";
import logoSotw from "../../Assets/img/SOTW_logo (2).webp";

const SOTW = () => {
  return (
    <div className="outerLoading">
      <div className="innerLoading">
        <div className="logoSotw">
          <img src={logoSotw} alt="Logo de Skill of the World" />
        </div>
        <h2>SKILL Of The World</h2>
        <span class="loader"></span>
      </div>
    </div>
  );
};

export default SOTW;
