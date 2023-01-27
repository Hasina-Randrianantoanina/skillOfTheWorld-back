import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { AuthContext } from '../context/AuthContext';
import '../Assets/css/CVandLM.scss';

// const fileTypes = ['PDF', 'DOCX'];

const GestionCV = () => {
  const redirect = useNavigate();

  const { uid, getUrl, urlFile } = useContext(AuthContext);
  const [file1, setFile1] = useState();
  const [candidatCV, setCandidatCV] = useState([]);
  const [file, setFile] = useState(null);

  const effectRan = useRef(false);

  const handleChange = (file) => {
    setFile(file);
  };

  const deleteFile = (uid, _id) => {
    confirmAlert({
      title: 'Suppression',
      message: 'Etes-vous sûr de vouloir supprimer ce CV ?',
      buttons: [
        {
          label: 'Supprimer',
          onClick: () => deleteCV(uid, _id),
        },
        {
          label: 'Annuler',
          onClick: () => console.log('Click No'),
        },
      ],
    });
  };

  const uploadSuccess = () =>
    toast.success('CV uploadé avec succès', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

  const deleteCV = async (idCandidat, idcv) => {
    await axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}api/user/candidat/removeCV/${idCandidat}/idcv/${idcv}`,
    })
      .then((res) => {
        window.location.reload(false);
        redirect('/myCV');
      })
      .then((error) => {
        console.log(error);
      });
  };

  const addCV = async (e) => {
    e.preventDefault();

    const getnombrecv = await axios.get(
      `${process.env.REACT_APP_API_URL}api/user/candidat/${uid}`
    );
    if (file1 && getnombrecv.data.listCV.length <= 2) {
      const formData = new FormData();
      formData.append('file1', file1);
      await axios
        .patch(
          `${process.env.REACT_APP_API_URL}api/user/candidat/addCV/${uid}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        .then((res) => {
          uploadSuccess();
          redirect('/myCV');
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getUrl();
    const getnombrecv = async (idCandidat) =>
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/user/candidat/${idCandidat}`)
        .then((res) => {
          console.log(res.data.listCV);
          setCandidatCV(res.data.listCV);
        })
        .catch((err) => {
          console.log(err);
        });

    getnombrecv(uid);
  }, []);

  return (
    <div className="outterDiv">
      <div className="innerDiv">
        <p className="linkRetour" onClick={() => redirect(-1)}>
          {' '}
          &#60; Retour
        </p>
        <h2>Curriculum vitae</h2>

        <form encType="multipart/form-data" onSubmit={addCV}>
          <label htmlFor="cv">Télécharger mon CV</label>
          <p style={{ marginTop: '10px', fontSize: '12px' }}>
            * Votre CV ne doit pas dépasser 1 Mo et doit être en format docx,
            pdf
          </p>
          <input
            type="file"
            filename="uploadCV"
            onChange={(event) => {
              setFile1(event.target.files[0]);
            }}
          />
          {/* <FileUploader
            handleChange={handleChange}
            hoverTitle=" "
            filename="uploadCV"
            types={fileTypes}
            children={
              <div className="dragAndDrop">
                <IconContext.Provider
                  value={{ color: "#112443", size: "20px" }}
                >
                  <span>
                    <FiUpload />
                    <p>{file ? `${file[0].name}` : "Téléchargez ou déposez un fichier ici"}</p>
                  </span>
                </IconContext.Provider>
              </div>
            }
          /> */}
          <input type="submit" name="upload" value="Télécharger" />
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
                  Liste des CV téléchargés
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidatCV.length > 0 ? (
                candidatCV.map((val, key) => {
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
                          Telecharger le CV
                        </a>
                      </td>
                      <td>
                        <button
                          style={{ border: 'none' }}
                          // onClick={() => deleteCV(uid, val._id)}
                          onClick={() => deleteFile(uid, val._id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>Pas encore de CV</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionCV;
