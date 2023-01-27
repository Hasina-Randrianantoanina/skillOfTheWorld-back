import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import AuthContextProvider from "./context/AuthContext";

import "./Assets/css/index.scss";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Suspense fallback="Chargement ...">
        <App />
      </Suspense>
    </AuthContextProvider>
  </React.StrictMode>
);
