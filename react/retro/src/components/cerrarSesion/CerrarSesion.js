import { useEffect, useState, useContext } from 'react';
import { AuthTokenContext } from '../../index';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import '../login/LoginModal.css';

export const CerrarSesion = ({ abierto, cerrarModal }) => {
  const [token, setToken] = useContext(AuthTokenContext);

  const cerrarSesion = (e) => {
    e.preventDefault();
    setToken('');

    console.log('token tiene:', token);

    //localStorage.removeItem(Storage.accesoToken);
    console.log('localStorage ahora tiene: ', localStorage);

    console.log('Sesión finalizada');
  };

  return (
    <>
      <div
        className={`modal ${abierto && 'modal-Abrir'}`}
        onClick={cerrarModal}
      >
        <h3>
          <button>¿Seguro que quiere cerrar la sesión?</button>
        </h3>
        <h4>
          <button className='modal-Cerrar' onClick={cerrarModal}>
            Continuar en sesión
          </button>
          <br />
          <button className='modal-Cerrar' onClick={cerrarSesion}>
            Terminar sesión
          </button>
        </h4>
      </div>
    </>
  );
};

// const [token] = useContext(AuthTokenContext);
