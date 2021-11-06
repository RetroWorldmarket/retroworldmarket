import { AuthTokenContext } from '../../index';
import { useContext, useEffect, useState } from 'react';

// Importamos GET para la peticion de datos a la BdD
import { get } from '../../api/get';
import { Link } from 'react-router-dom';
import { CerrarSesion } from '../cerrarSesion/CerrarSesion';
import { useModal } from '../../hooks/useModal';

export const UsuarioLogueado = () => {
  const [abierto, abrirModal, cerrarModal] = useModal(false);
  const [token] = useContext(AuthTokenContext);
  const [infoUsuario, setInfoUsuario] = useState([]);
  useEffect(() => {
    get(
      'http://localhost:4000/users',
      (body) => setInfoUsuario(body.userInfo),
      token
    );
  }, [token]);

  const cerrarSesion = (e) => {
    e.preventDefault();
    <CerrarSesion />;
  };

  return (
    <>
      <figure>
        <img src={`img/${infoUsuario.avatar}`} alt='usuario logueado'></img>
      </figure>
      {infoUsuario ? <p>Bienvenido {infoUsuario.alias}!!!</p> : null}
      <Link to='./editarUsuario'>Editar perfil</Link>
      <button onClick={cerrarSesion}></button>
      <button onClick={abrirModal}>Cerrar sesión</button>
      <CerrarSesion abierto={abierto} cerrarModal={cerrarModal}></CerrarSesion>
    </>
  );
};
