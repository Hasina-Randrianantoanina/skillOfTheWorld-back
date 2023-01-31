import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import SOTW from '../Pages/global/SOTW';
import Accueil from '../Pages/Accueil';

const ProtectedRouteEts = ({ children }) => {
  const { uid, candidat, entreprise, admin } = useContext(AuthContext);

  if (uid) {
    if (entreprise) {
      return children;
    } else if (candidat) {
      return <Accueil />;
    } else if (admin) {
      return <Accueil />;
    }
  }
  return <SOTW />;
};

export default ProtectedRouteEts;
