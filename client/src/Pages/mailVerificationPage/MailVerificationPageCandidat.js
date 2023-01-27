import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams, Link } from 'react-router-dom';

import '../../Assets/css/verificationPage.scss';

const MailVerificationPageCandidat = () => {
  const [isVerifie, setIsVerifie] = useState(false);
  const effectRan = useRef(false);
  const redirect = useNavigate();
  const { id } = useParams();
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
    }
    const updateCandidat = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_API_URL}api/user/candidat/verification/${id}`
        )
        .then((res) => {
          if (res.status === 200) {
            setIsVerifie(true);
            redirect('/login');
            uploadSuccess();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    updateCandidat();
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

export default MailVerificationPageCandidat;
