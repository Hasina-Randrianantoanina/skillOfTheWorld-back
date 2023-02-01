import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import SOTW from '../Pages/global/SOTW';
import Accueil from '../Pages/Accueil';

const ProtectedRouteAdmin = ({ children }) => {
  const { uid, candidat, entreprise, admin } = useContext(AuthContext);

  if (uid) {
    if (admin) {
      return children;
    } else if (candidat) {
      return <Accueil />;
    } else if (entreprise) {
      return <Accueil />;
    }
  }
  return <SOTW />;
};

export default ProtectedRouteAdmin;
