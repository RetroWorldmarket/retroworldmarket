import { AuthTokenContext } from '../../index';
import { useContext, useEffect, useState } from 'react';

// Importamos GET para la peticion de datos a la BdD
import { get } from '../../api/get';

export const UsuarioLogueado = () => {
  const [token, setToken] = useContext(AuthTokenContext);
  //   const [user, setUser] = useState([]);

  //   useEffect(() => {
  //     get('http://localhost:4000/users/15', (body) => setUser(body));
  //   }, []);

  console.log('token', token);

  get('http://localhost:4000/users/15', (body) => console.log(body), token);

  return (
    <>
      <figure>
        <img src='/img/avatar-por-defecto.svg' alt='usuario logueado'></img>
      </figure>
    </>
  );
};
