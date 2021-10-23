import { AuthTokenContext } from '../../index';
import { useContext, useEffect } from 'react';

// Importamos GET para la peticion de datos a la BdD
import { get } from '../../api/get';

export const UsuarioLogueado = () => {
  const [token, setToken] = useContext(AuthTokenContext);

  get('http://localhost:4000/users/15', (body) => console.log(body), token);

  return (
    <>
      <figure>
        <img src='/img/avatar-por-defecto.svg' alt='usuario logueado'></img>
      </figure>
    </>
  );
};
