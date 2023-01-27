import React from "react";

import "../../Assets/css/loading.scss";

const Loading = () => {
  return (
    <div className="outerLoading">
      <div className="innerLoading">
        <h2>Chargement ...</h2>
        <span class="loader"></span>
      </div>
    </div>
  );
};

export default Loading;
