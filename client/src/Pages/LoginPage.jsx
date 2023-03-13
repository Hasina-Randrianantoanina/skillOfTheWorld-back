import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../Assets/css/loginPage.scss';
import loginPic from '../Assets/img/global/connexion.svg';

const LoginPage = () => {
  const redirect = useNavigate();
  const { fetchUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('enTantQue');

  const [passwordType, setPasswordType] = useState('password');
  const [icon, setIcon] = useState(<FaRegEyeSlash />);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowPassword = () => {
    if (passwordType === 'password') {
      setIcon(<FaRegEye />);
      setPasswordType('text');
    } else {
      setIcon(<FaRegEyeSlash />);
      setPasswordType('password');
    }
  };

  const errorTantQue = () =>
    toast.warning(
      'Veuillez choisir entre candidat ou entreprise pour se connecter',
      {
        position: 'top-center',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      }
    );

  const mailVerification = (a) =>
    toast.warning(a, {
      position: 'top-center',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const errorLogin = (a, b) =>
    toast.error(a + b, {
      position: 'top-center',
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    // const emailError = document.querySelector(".email.error");
    // const passwordError = document.querySelector(".password.error");
    if (type === 'entreprise') {
      try {
        const loginD = {
          email,
          password,
        };
        const connexionEntreprise = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/entreprise/login`,
          loginD
        );
        if (connexionEntreprise.status === 202) {
          errorLogin(
            connexionEntreprise.data.errors.email,
            connexionEntreprise.data.errors.password
          );
          setIsLoading(false);
        } else if (connexionEntreprise.status === 201) {
          mailVerification(connexionEntreprise.data);
          setIsLoading(false);
        } else {
          await fetchUser();
          redirect('/dashEntreprise');
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    } else if (type === 'candidat') {
      try {
        const loginData = {
          email,
          password,
        };
        const connexionCandidat = await axios.post(
          `${process.env.REACT_APP_API_URL}api/user/candidat/login`,
          loginData
        );
        if (connexionCandidat.data.errors) {
          errorLogin(
            connexionCandidat.data.errors.email,
            connexionCandidat.data.errors.password
          );
          setIsLoading(false);
        } else if (connexionCandidat.status === 201) {
          mailVerification(connexionCandidat.data);
          setIsLoading(false);
        } else {
          await fetchUser();
          redirect('/dashCandidat');
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    } else if (type === 'enTantQue') {
      errorTantQue();
    }
  };
  return (
    <div className="divLogin">
      <div className="innerLogin">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <div className="left">
          <a
            href="https://storyset.com/user"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={loginPic} alt="Login" />
          </a>
        </div>
        <div className="right">
          <h2>
            <b>SKILL</b> of the <b>WORLD</b>
          </h2>
          <h2>Se connecter</h2>
          <div className="box">
            <form onSubmit={handleLogin}>
              {/* Se connecter En Tant Que */}
              <select
                name="enTantQue"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                required
              >
                <option selected disabled value="">
                  En tant que ...
                </option>
                <option value={`candidat`}>Candidat</option>
                <option value={`entreprise`}>Entreprise</option>
              </select>

              {/* EMAIL */}
              <div className="inputBox">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  pattern="[A-Za-z0-9._+-]+@[A-Za-z0-9 -]+\.[a-z]{2,}"
                  title="Veuillez entrer une adresse e-mail valide"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <label>Email</label>
                {/* <div className="email error"></div> */}
              </div>

              {/* PASSWORD */}
              <div className="inputBox">
                <span className="passHint" onClick={handleShowPassword}>
                  {icon}
                </span>
                <input
                  type={passwordType}
                  className="fontSizeInput"
                  name="text"
                  id="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  minLength="6"
                />
                <label>Mot de passe</label>
                {/* <div className="password error"></div> */}
              </div>
              <p style={{ fontSize: '0.9rem' }}>
                Pas de compte ?{' '}
                <Link to="/inscription" style={{ fontSize: '0.9rem' }}>
                  S'inscrire
                </Link>
              </p>
              <p>
                <Link to="/emailConfirmation" style={{ fontSize: '0.9rem' }}>
                  Mots de passe oublié ?
                </Link>
              </p>
              <input type="submit" name="sign-in" disabled={isLoading && true} value={isLoading ? "Chargement ...":"Connexion"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
