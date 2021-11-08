import React, { useState } from 'react';
import { subirFoto } from '../../api/subirFoto';

const PrimeraFoto = (props) => {
  const [file, setFile] = useState();
  const [serverImg, setServerImg] = useState('');
  console.log('serverimg:', serverImg);
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0], 'lo que tiene el target');
  };

  const Enviar = (e) => {
    e.preventDefault();
    const onSuccess = (jsonResponse) => {
      console.log(jsonResponse);
      setServerImg(jsonResponse.filename);
    };
    subirFoto(`http://localhost:4000/sellretro`, file, onSuccess);
  };
  return (
    <div className='App'>
      <form onSubmit={Enviar}>
        <div>
          <label>Select file to upload</label>
          <input type='file' onChange={onFileChange} />
        </div>
        <button type='submit'>Upload</button>
      </form>
      {/* {serverImg && (
        <img src={`http://localhost:4000/${serverImg}`} alt='server avatar' />
      )} */}
    </div>
  );
};

export default PrimeraFoto;
