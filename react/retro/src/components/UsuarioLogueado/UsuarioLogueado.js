import { AuthTokenContext } from '../../index';
import { useContext, useEffect, useState } from 'react';

// Importamos GET para la peticion de datos a la BdD
import { get } from '../../api/get';
import { Link } from 'react-router-dom';
import { EditarUsuario } from '../editarUsuario/EditarUsuario';

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

  console.log('infoUsuario tiene: ', infoUsuario);

  return (
    <>
      <figure>
        <img src={`img/${infoUsuario.avatar}`} alt='usuario logueado'></img>
      </figure>
      {infoUsuario ? <p>Bienvenido {infoUsuario.alias}!!!</p> : null}
      <Link to='./editarUsuario'>Editar perfil</Link>
    </>
  );
};
