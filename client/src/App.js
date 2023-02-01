import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './Components/ProtectedRoute';
import ProtectedRouteEts from './Components/ProtectedRouteEts';
import ProtectedRouteAdmin from './Components/ProtectedRouteAdmin';

import Accueil from './Pages/Accueil';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import NavbarAdmin from './Components/NavbarAdmin';
import NavbarCandidat from './Components/NavbarCandidat';
import NavbarEntreprise from './Components/NavbarEntreprise';
import AjoutOffre from './Pages/AjoutOffre';
import CandidatureOffre from './Pages/CandidatureOffre';
import DashAdmin from './Pages/DashAdmin';
import DashCandidat from './Pages/DashCandidat';
import DashEntreprise from './Pages/DashEntreprise';
import GestionCV from './Pages/GestionCV';
import GestionLM from './Pages/GestionLM';
import HistoriqueCandidat from './Pages/HistoriqueCandidat';
import HistoriqueEntreprise from './Pages/HistoriqueEntreprise';
import Inscription from './Pages/Inscription';
import InscriptionCandidat from './Pages/InscriptionCandidat';
import InscriptionEntreprise from './Pages/InscriptionEntreprise';
import ListeJobDatingGlobale from './Pages/ListeJobDatingGlobale';
import ListeEventEts from './Pages/ListeEventEts';
import ListeJdEts from './Pages/ListeJdEts';
import ListeOffreEts from './Pages/ListeOffreEts';
import LoginPage from './Pages/LoginPage';
import LoginPageAdmin from './Pages/LoginPageAdmin';
// import ListeOffreGlobale from './Pages/ListeOffreGlobale';
import ValidationEvent from './Pages/ValidationEvent';
import ValidationJD from './Pages/ValidationJD';
import ValidationOffre from './Pages/ValidationOffre';
import ListeEventGobale from './Pages/ListeEventGlobale';
import GoToTop from './Components/GoToTop';
import DetailOffreGlobale from './Pages/DetailOffreGlobale';
import UpdateOffreAdmin from './Pages/UpdateOffreAdmin';
import ListeBlogGlobale from './Pages/ListeBlogGlobale';
import PageErreur from './Pages/PageErreur';
import DetailsBlog from './Pages/DetailsBlog';
import ContactUs from './Pages/ContactUs';
import ModifierProfilCandidat from './Pages/candidat/ModifierProfilCandidat';
import ModifierProfilEntreprise from './Pages/entreprise/ModifierProfilEntreprise';
import ModifierProfilAdmin from './Pages/admin/ModifierProfilAdmin';
import ListeOffreGlobaleCandidat from './Pages/ListeOffreGlobaleCandidat';
import ValidationCvLm from './Pages/admin/ValidationCvLm';
import CandidatureAdmin from './Pages/admin/CandidatureAdmin';
import DetailCandidatureAdmin from './Pages/admin/DetailCandidatureAdmin';
import DetailEtsAdmin from './Pages/admin/DetailEtsAdmin';
import ListeEntrepriseAdmin from './Pages/admin/ListeEntrepriseAdmin';
import Loading from './Components/loading/Loading';
import axios from 'axios';

axios.defaults.withCredentials = true;

const JeRecrute = React.lazy(() => import('./Pages/entreprise/JeRecrute'));
const QuiSommesNous = React.lazy(() => import('./Pages/QuiSommesNous'));
const JeChercheEmploie = React.lazy(() =>
  import('./Pages/candidat/JeChercheEmploie')
);
const ResetMdpCandidat = React.lazy(() =>
  import('./Pages/candidat/ResetMdpCandidat')
);
const ResetMdpAdmin = React.lazy(() => import('./Pages/admin/ResetMdpAdmin'));
const ResetMdpEntreprise = React.lazy(() =>
  import('./Pages/entreprise/ResetMdpEntreprise')
);
const MesFormations = React.lazy(() =>
  import('./Pages/entreprise/MesFormations')
);
const ParticiperJD = React.lazy(() => import('./Pages/ParticiperJD'));
const ParticiperEvent = React.lazy(() => import('./Pages/ParticiperEvent'));
const CGU = React.lazy(() => import('./Pages/CGU/CGU'));
const Politique = React.lazy(() => import('./Pages/CGU/Politique'));
const EmailConfirmation = React.lazy(() =>
  import('./Pages/forgotPassword/EmailConfirmation')
);
const ResetPasswordCandidat = React.lazy(() =>
  import('./Pages/forgotPassword/ResetPasswordCandidat')
);
const ResetPasswordEntreprise = React.lazy(() =>
  import('./Pages/forgotPassword/ResetPasswordEntreprise')
);
const MailVerificationPageCandidat = React.lazy(() =>
  import('./Pages/mailVerificationPage/MailVerificationPageCandidat')
);
const MailVerificationPageEntreprise = React.lazy(() =>
  import('./Pages/mailVerificationPage/MailVerificationPageEntreprise')
);
const NotificationCandidat = React.lazy(() =>
  import('./Pages/notification/NotificationCandidat')
);
const NotificationEntreprise = React.lazy(() =>
  import('./Pages/notification/NotificationEntreprise')
);
const NotificationAdmin = React.lazy(() =>
  import('./Pages/notification/NotificationAdmin')
);
const AjoutJD = React.lazy(() => import('./Pages/entreprise/AjoutJD'));
const AjoutEvent = React.lazy(() => import('./Pages/entreprise/AjoutEvent'));
const OrganiserEvent = React.lazy(() => import('./Pages/admin/OrganiserEvent'));
const OrganiserJD = React.lazy(() => import('./Pages/admin/OrganiserJD'));
const OrgEventEts = React.lazy(() => import('./Pages/entreprise/OrgEventEts'));
const OrgJdEts = React.lazy(() => import('./Pages/entreprise/OrgJdEts'));
const Evenement = React.lazy(() => import('./Pages/Evenement'));
const DetailEvent = React.lazy(() => import('./Pages/global/DetailEvent'));
const DetailJD = React.lazy(() => import('./Pages/global/DetailJD'));
const ListeArticle = React.lazy(() => import('./Pages/admin/ListeArticle'));
const AjoutArticle = React.lazy(() => import('./Pages/admin/AjoutArticle'));
const ModificationArticle = React.lazy(() =>
  import('./Pages/admin/ModificationArticle')
);
const ModificationTitre = React.lazy(() =>
  import('./Pages/admin/ModificationTitre')
);
const SOTW = React.lazy(() => import('./../src/Pages/global/SOTW'));

const App = () => {
  const { uid, candidat, entreprise, admin } = useContext(AuthContext);

  document.addEventListener('contextmenu', (event) => event.preventDefault());

  // redirecting http://
  if (window.location.href.includes('http://'))
    window.location.href = window.location.href.replace('http://', 'https://');

  return (
    <React.Suspense fallback={<Loading />}>
      <BrowserRouter>
        <GoToTop />
        <ToastContainer />

        {entreprise && <NavbarEntreprise />}
        {candidat && <NavbarCandidat />}
        {admin && <NavbarAdmin />}
        {!uid && <Navbar />}

        <Routes>
          {/* ERROR PAGE */}
          <Route path="*" element={<PageErreur />} />

          {/* SOTW */}
          <Route exact path="/pageSotw" element={<SOTW />} />

          {/* GLOBAL */}
          <Route exact path="/" element={<Accueil />} />
          <Route
            exact
            path="/offreEmploi"
            element={<ListeOffreGlobaleCandidat />}
          />
          <Route exact path="/nosEvent" element={<ListeEventGobale />} />
          <Route
            exact
            path="/nosJobDating"
            element={<ListeJobDatingGlobale />}
          />
          <Route
            exact
            path="/detailOffreGlobale/:id"
            element={<DetailOffreGlobale />}
          />
          <Route exact path="/detailBlog/:id" element={<DetailsBlog />} />
          <Route exact path="/contactezNous" element={<ContactUs />} />
          <Route exact path="/quiSommesNous" element={<QuiSommesNous />} />
          <Route exact path="/participerJD" element={<ParticiperJD />} />
          <Route exact path="/participerEvent" element={<ParticiperEvent />} />
          <Route exact path="/orgEventEts" element={<OrgEventEts />} />
          <Route exact path="/orgJdEts" element={<OrgJdEts />} />
          <Route exact path="/evenement" element={<Evenement />} />
          <Route exact path="/detailEvent/:id" element={<DetailEvent />} />
          <Route exact path="/detailJD/:id" element={<DetailJD />} />

          {/* BLOG ou ARTICLE */}
          <Route exact path="/blog" element={<ListeBlogGlobale />} />

          {/* LOGIN */}
          <Route
            exact
            path="/login"
            element={uid ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            exact
            path="/loginAdmin"
            element={uid ? <Navigate to="/" /> : <LoginPageAdmin />}
          />

          {/* INSCRIPTION */}
          <Route exact path="/inscription" element={<Inscription />} />
          <Route
            exact
            path="/inscriptionEntreprise"
            element={<InscriptionEntreprise />}
          />
          <Route
            exact
            path="/inscriptionCandidat"
            element={<InscriptionCandidat />}
          />

          {/* DASHBOARD ENTREPRISE */}

          <Route
            exact
            path="/dashEntreprise"
            element={
              <ProtectedRouteEts>
                <DashEntreprise />
              </ProtectedRouteEts>
            }
          />
          <Route
            exact
            path="/ajoutOffre"
            element={
              <ProtectedRouteEts>
                <AjoutOffre />
              </ProtectedRouteEts>
            }
          />
          <Route
            exact
            path="/ajoutJD"
            element={
              <ProtectedRouteEts>
                <AjoutJD />
              </ProtectedRouteEts>
            }
          />
          <Route
            exact
            path="/ajoutEvent"
            element={
              <ProtectedRouteEts>
                <AjoutEvent />
              </ProtectedRouteEts>
            }
          />
          <Route
            exact
            path="/listeOffreEts"
            element={
              <ProtectedRouteEts>
                <ListeOffreEts />
              </ProtectedRouteEts>
            }
          />
          <Route
            exact
            path="/candidatureOffre/:id"
            element={entreprise || admin ? <CandidatureOffre /> : <SOTW />}
          />
          <Route
            exact
            path="/profilEntreprise"
            element={
              <ProtectedRouteEts>
                <ModifierProfilEntreprise />
              </ProtectedRouteEts>
            }
          />
          <Route
            exact
            path="/mdpResetEntreprise"
            element={
              <ProtectedRouteEts>
                <ResetMdpEntreprise />
              </ProtectedRouteEts>
            }
          />

          <Route
            exact
            path="/listeJdEts"
            element={
              <ProtectedRouteEts>
                <ListeJdEts />
              </ProtectedRouteEts>
            }
          />
          <Route
            exact
            path="/listeEventEts"
            element={
              <ProtectedRouteEts>
                <ListeEventEts />
              </ProtectedRouteEts>
            }
          />
          <Route
            exact
            path="/historiqueEntreprise"
            element={
              <ProtectedRouteEts>
                <HistoriqueEntreprise />
              </ProtectedRouteEts>
            }
          />
          <Route exact path="/jeRecrute" element={<JeRecrute />} />
          <Route
            exact
            path="/notificationEntreprise"
            element={
              <ProtectedRouteEts>
                <NotificationEntreprise />
              </ProtectedRouteEts>
            }
          />

          {/* ECOLE */}
          <Route exact path="/mesFormations" element={<MesFormations />} />

          {/* DASHBOARD ADMIN */}
          <Route
            exact
            path="/dashAdmin"
            element={
              <ProtectedRouteAdmin>
                <DashAdmin />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/validationOffre"
            element={
              <ProtectedRouteAdmin>
                <ValidationOffre />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/modificationOffre/:id"
            element={
              <ProtectedRouteAdmin>
                <UpdateOffreAdmin />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/validationJD"
            element={
              <ProtectedRouteAdmin>
                <ValidationJD />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/validationEvent"
            element={
              <ProtectedRouteAdmin>
                <ValidationEvent />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/CandidatureAdmin"
            element={
              <ProtectedRouteAdmin>
                <CandidatureAdmin />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/detailCandidatureAdmin/:id"
            element={
              <ProtectedRouteAdmin>
                <DetailCandidatureAdmin />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/detailEtsAdmin/:id"
            element={
              <ProtectedRouteAdmin>
                <DetailEtsAdmin />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/listeEntrepriseAdmin"
            element={
              <ProtectedRouteAdmin>
                <ListeEntrepriseAdmin />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/profilAdmin"
            element={
              <ProtectedRouteAdmin>
                <ModifierProfilAdmin />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/validationCvLm/:id"
            element={
              <ProtectedRouteAdmin>
                <ValidationCvLm />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/mdpResetAdmin"
            element={
              <ProtectedRouteAdmin>
                <ResetMdpAdmin />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/notificationAdmin"
            element={
              <ProtectedRouteAdmin>
                <NotificationAdmin />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/organiserEvent"
            element={
              <ProtectedRouteAdmin>
                <OrganiserEvent />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/organiserJD"
            element={
              <ProtectedRouteAdmin>
                <OrganiserJD />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/listeArticle"
            element={
              <ProtectedRouteAdmin>
                <ListeArticle />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/ajoutArticle"
            element={
              <ProtectedRouteAdmin>
                <AjoutArticle />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/modificationArticle/:id"
            element={
              <ProtectedRouteAdmin>
                <ModificationArticle />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            exact
            path="/modificationTitre"
            element={
              <ProtectedRouteAdmin>
                <ModificationTitre />
              </ProtectedRouteAdmin>
            }
          />

          {/* DASHBOARD CANDIDAT */}
          <Route
            exact
            path="/dashCandidat"
            element={
              <ProtectedRoute>
                <DashCandidat />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/myCV"
            element={
              <ProtectedRoute>
                <GestionCV />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/myLM"
            element={
              <ProtectedRoute>
                <GestionLM />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profilCandidat"
            element={
              <ProtectedRoute>
                <ModifierProfilCandidat />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/mdpResetCandidat"
            element={
              <ProtectedRoute>
                <ResetMdpCandidat />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/offreEmploiCandidat"
            element={
              <ProtectedRoute>
                <ListeOffreGlobaleCandidat />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/historiqueCandidat"
            element={
              <ProtectedRoute>
                <HistoriqueCandidat />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/jeChercheEmploie"
            element={<JeChercheEmploie />}
          />
          <Route
            exact
            path="/notifCandidat"
            element={
              <ProtectedRoute>
                <NotificationCandidat />
              </ProtectedRoute>
            }
          />

          {/* CGU */}
          <Route exact path="/cgu" element={<CGU />} />
          <Route
            exact
            path="/politiqueDeConfidentialite"
            element={<Politique />}
          />

          {/* Mots de passe Oublier */}
          <Route
            exact
            path="/emailConfirmation"
            element={<EmailConfirmation />}
          />
          <Route
            exact
            path="/resetPasswordCandidat/:id"
            element={<ResetPasswordCandidat />}
          />
          <Route
            exact
            path="/resetPasswordEntreprise/:id"
            element={<ResetPasswordEntreprise />}
          />

          {/* Mail verification Page */}
          <Route
            exact
            path="/api/user/candidat/verification/:id"
            element={<MailVerificationPageCandidat />}
          />
          <Route
            exact
            path="/api/user/entreprise/verification/:id"
            element={<MailVerificationPageEntreprise />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
