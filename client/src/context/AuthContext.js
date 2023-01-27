import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

// on créé notre contexte
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [uid, setUid] = useState('');
  const [candidat, setCandidat] = useState(false);
  const [entreprise, setEntreprise] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [urlFile, setUrlFile] = useState('');

  const getUrl = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}getURL`)
      .then((res) => {
        setUrlFile(res.data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  const fetchUser = async () => {
    let adminUrl = `${process.env.REACT_APP_API_URL}api/user/admin/loggedInAdmin`;
    let entrepriseUrl = `${process.env.REACT_APP_API_URL}api/user/entreprise/loggedInEntreprise`;
    let candidatUrl = `${process.env.REACT_APP_API_URL}api/user/candidat/loggedInCandidat`;

    const checkAdmin = await axios.get(adminUrl);
    const checkEntreprise = await axios.get(entrepriseUrl);
    const checkCandidat = await axios.get(candidatUrl);

    axios
      .all([checkAdmin, checkEntreprise, checkCandidat])
      .then(
        axios.spread((...responses) => {
          const reponseAdmin = responses[0];
          const reponseEntreprise = responses[1];
          const reponseCandidat = responses[2];
          if (reponseAdmin.data !== false) {
            setUid(reponseAdmin.data.id);
            setAdmin(true);
          } else if (reponseEntreprise.data !== false) {
            setUid(reponseEntreprise.data.id);
            setEntreprise(true);
          } else if (reponseCandidat.data !== false) {
            setUid(reponseCandidat.data.id);
            setCandidat(true);
          }
        })
      )
      .catch((errors) => {
        console.log(errors);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ uid, entreprise, candidat, admin, fetchUser, getUrl, urlFile }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

// import axios from 'axios';
// import React, { createContext, useState, useEffect } from 'react';

// // on créé notre contexte
// export const AuthContext = createContext();

// const AuthContextProvider = (props) => {
//   const [uid, setUid] = useState(null);
//   const [candidat, setCandidat] = useState(false);
//   const [entreprise, setEntreprise] = useState(false);
//   const [admin, setAdmin] = useState(false);
//   const fetchUser = async () => {
//     const response = await axios({
//       method: 'get',
//       url: `${process.env.REACT_APP_API_URL}jwtidentreprise`,
//       withCredentials: true,
//     })
//       .then((res) => {
//         setUid(res.data);
//         setEntreprise(true);
//       })
//       .catch((err) => {
//         //console.log(err);
//         const response = axios({
//           method: 'get',
//           url: `${process.env.REACT_APP_API_URL}jwtidcandidat`,
//           withCredentials: true,
//         })
//           .then((res) => {
//             setUid(res.data);
//             setCandidat(true);
//           })
//           .catch((error) => {
//             console.log(error);
//             const response = axios({
//               method: 'get',
//               url: `${process.env.REACT_APP_API_URL}jwtidAdmin`,
//               withCredentials: true,
//             })
//               .then((res) => {
//                 setUid(res.data);
//                 setAdmin(true);
//               })
//               .catch((error) => {
//                 console.log(error);
//               });
//           });
//       });
//   };
//   useEffect(() => {
//     fetchUser();
//   }, [uid, candidat, entreprise, admin]);
//   return (
//     <AuthContext.Provider value={{ uid, candidat, entreprise, admin }}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
