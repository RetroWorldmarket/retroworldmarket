import { AuthTokenContext } from '../../index';
import { useContext, useEffect, useState } from 'react';

// Importamos GET para la peticion de datos a la BdD
import { get } from '../../api/get';
import { Link } from 'react-router-dom';
import { CerrarSesion } from '../cerrarSesion/CerrarSesion';
import { useModal } from '../../hooks/useModal';
import { Menu } from '../menu/Menu';

export const UsuarioLogueado = () => {
  const [abierto, abrirModal, cerrarModal] = useModal(false);
  const [token] = useContext(AuthTokenContext);
  const [infoUsuario, setInfoUsuario] = useState([]);
  const [mostrarMenu, setMostrarMenu] = useState(false);

  useEffect(() => {
    get(
      'http://localhost:4000/users',
      (body) => setInfoUsuario(body.userInfo),
      token
    );
  }, [token]);

  // const cerrarSesion = (e) => {
  //   e.preventDefault();
  //   <CerrarSesion />;
  // };
  console.log(infoUsuario);

  const desplegarMenu = (e) => {
    e.preventDefault();
    setMostrarMenu(true);
  };

  const ocultarMenu = (e) => {
    e.preventDefault();
    setMostrarMenu(false);
  };

  return (
    <>
      <figure id='imagen-avatar'>
        <img
          id='imagen-avatar-usuario'
          src={`http://localhost:4000/${infoUsuario.avatar}`}
          alt='usuario logueado'
        ></img>
      </figure>
      {infoUsuario ? (
        <h4 id='bienvenido'>Bienvenido {infoUsuario.alias}</h4>
      ) : null}
      <button onClick={desplegarMenu}>
        <h3>Menu</h3>
      </button>
      {mostrarMenu && (
        <>
          <Menu />
          <button onClick={ocultarMenu}>Ocultar Menu</button>
        </>
      )}
    </>
  );
};
