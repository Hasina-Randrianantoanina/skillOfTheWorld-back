import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import '../Assets/css/CVandLM.scss';

const GestionLM = () => {
  const redirect = useNavigate();
  const { uid, getUrl, urlFile } = useContext(AuthContext);
  const [file1, setFile1] = useState();
  const [candidatLM, setCandidatLM] = useState([]);
  const effectRan = useRef(false);

  const deleteFile = (uid, _id) => {
    confirmAlert({
      title: 'Suppression',
      message: 'Etes-vous sûr de vouloir supprimer ce CV ?',
      buttons: [
        {
          label: 'Supprimer',
          onClick: () => deleteLM(uid, _id),
        },
        {
          label: 'Annuler',
          onClick: () => console.log('Click No'),
        },
      ],
    });
  };

  // SUPRESSION LM
  const deleteLM = async (idCandidat, idlm) => {
    await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}api/user/candidat/removeLM/${idCandidat}/idlm/${idlm}`,
    })
      .then((res) => {
        redirect('/myLM');
        window.location.reload(true);
      })
      .then((error) => {
        console.log(error);
      });
  };

  const uploadSuccess = () =>
    toast.success('LM uploadée avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  // UPLOAD LM
  const addLM = async (e) => {
    e.preventDefault();
    const getnombrelm = await axios.get(
      `${process.env.REACT_APP_API_URL}api/user/candidat/${uid}`
    );

    if (file1 && 2 >= getnombrelm.data.listLM.length) {
      const formData = new FormData();
      formData.append('file1', file1);
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}api/user/candidat/addLM/${uid}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          uploadSuccess();
          redirect('/myLM');
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getUrl();
    const nombreCV = [];
    if (effectRan.current === false) {
      const getnombreLM = async (idCandidat) =>
        await axios
          .get(
            `${process.env.REACT_APP_API_URL}api/user/candidat/${idCandidat}`
          )
          .then((res) => {
            setCandidatLM(res.data.listLM);
          })
          .catch((err) => {
            console.log(err);
          });

      getnombreLM(uid);
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <div className="outterDiv">
      <div className="innerDiv">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Lettre de motivation</h2>
        <form encType="multipart/form-data" onSubmit={addLM}>
          <label htmlFor="lm">Télécharger ma LM</label>
          <p style={{ marginTop: '10px', fontSize: '12px' }}>
            * Votre LM ne doit pas dépasser 1 Mo et doit être en format jpg,
            docx, pdf
          </p>
          <input
            type="file"
            id="lm"
            name="uploadLM"
            onChange={(event) => {
              setFile1(event.target.files[0]);
            }}
          />
          <input type="submit" name="upload" value="Telecharger" />
        </form>

        <div className="divTable">
          <table className="innerTable">
            <thead>
              <tr>
                <th
                  style={{
                    width: '70%',
                    textAlign: 'left',
                    paddingLeft: '15px',
                  }}
                >
                  Liste des LM téléchargées
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidatLM.length > 0 ? (
                candidatLM.map((val, key) => {
                  return (
                    <tr key={val._id}>
                      <td style={{ textAlign: 'left', paddingLeft: '15px' }}>
                        <span>{val.file1_path.split('-')[1]}</span>

                        <br />
                        <a
                          download
                          href={`${urlFile.split('.com/')[0]}.com/${
                            val.file1_path
                          }`}
                        >
                          Telecharger le LM
                        </a>
                      </td>
                      <td>
                        <button
                          // onClick={() => deleteLM(uid, val._id)}
                          onClick={() => deleteFile(uid, val._id)}
                          style={{ border: 'none' }}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>Pas encore de Lettre de motivation</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionLM;
