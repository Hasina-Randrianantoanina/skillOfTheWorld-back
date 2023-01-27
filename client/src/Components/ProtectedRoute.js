import React, { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import SOTW from "../Pages/global/SOTW";
import Accueil from "../Pages/Accueil";

const ProtectedRoute = ({ children }) => {
  const { uid, candidat, entreprise, admin } = useContext(AuthContext);

  if (uid) {
    if(candidat) {
      return children;
    } else if (entreprise) {
      return <Accueil />
    } else if (admin) {
      return <Accueil />
    }
  }
  return <SOTW />
};

export default ProtectedRoute;
