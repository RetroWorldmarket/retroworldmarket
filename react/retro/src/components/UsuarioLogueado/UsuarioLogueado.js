import { AuthTokenContext } from '../../index';
import { useContext, useEffect, useState } from 'react';

// Importamos GET para la peticion de datos a la BdD
import { get } from '../../api/get';

export const UsuarioLogueado = () => {
  const [token] = useContext(AuthTokenContext);
  const [infoUsuario, setInfoUsuario] = useState([]);
  useEffect(() => {
    get(
      'http://localhost:4000/users',
      (body) => setInfoUsuario(body.userInfo),
      token
    );
  }, [token]);

  return (
    <>
      <figure>
        <img src={`img/${infoUsuario.avatar}`} alt='usuario logueado'></img>
      </figure>
      {infoUsuario ? <p>{infoUsuario.alias}</p> : null}
    </>
  );
};
