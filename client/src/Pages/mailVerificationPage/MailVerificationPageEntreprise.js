import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../../Assets/css/verificationPage.scss';

const MailVerificationPageEntreprise = () => {
  const [isVerifie, setIsVerifie] = useState(false);
  const redirect = useNavigate();
  const { id } = useParams();
  const effectRan = useRef(false);
  const uploadSuccess = () =>
    toast.success('Féliciation inscription avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  useEffect(() => {
    if (effectRan.current === false) {
      const updateEntreprise = async () => {
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}api/user/entreprise/verification/${id}`
          )
          .then((res) => {
            if (res.status === 200) {
              setIsVerifie(true);
              redirect(`/login`);
              uploadSuccess();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
      updateEntreprise();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);
  return (
    <div className="outerDivMailVerif">
      <div className="innerDivMailVerif">
        {isVerifie === true ? (
          <>
            <span>Email vérifié avec succès</span>
            <Link to="/login">
              <button className="se_connecter">Se connecter</button>
            </Link>
          </>
        ) : (
          <>
            <span>L'email n'est pas encore vérifié</span>
            <p>(Veuillez vérifier votre boîte mail)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MailVerificationPageEntreprise;
