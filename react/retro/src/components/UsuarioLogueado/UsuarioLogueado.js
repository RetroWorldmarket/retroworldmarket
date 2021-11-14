import { AuthTokenContext } from '../../index';
import { useContext, useEffect, useState } from 'react';

// Importamos GET para la peticion de datos a la BdD
import { get } from '../../api/get';
import { Link } from 'react-router-dom';
import { CerrarSesion } from '../cerrarSesion/CerrarSesion';
import { useModal } from '../../hooks/useModal';
import { NewMenu } from '../menu/Menu';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';


export const UsuarioLogueado = () => {
  const [abierto, abrirModal, cerrarModal] = useModal(false);
  const [token, setToken] = useContext(AuthTokenContext);
  const [infoUsuario, setInfoUsuario] = useState([]);
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const history = useHistory()

  useEffect(() => {
    get(
      'http://localhost:4000/users',
      (body) => setInfoUsuario(body.userInfo),
      token
    );
  }, [token]);

  //  const cerrarSesion = (e) => {
  //   e.preventDefault();
  //  <CerrarSesion />;
  // };
  const cerrarSesion = (e) => {
    e.preventDefault();
    setToken('');
    toast.success('Hasta pronto!!');

    

    history.push ("/")
  };


  const desplegarMenu = (e) => {
    e.preventDefault();
    setMostrarMenu(!mostrarMenu);
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
      <button onClick={desplegarMenu }>
        <h3>Menu</h3>
      </button>
      {mostrarMenu && (
        <ul>
          <li><Link to="/editarUsuario">Editar Usuario</Link></li>
          <li><Link to="/perfil">Tus Productos</Link></li>
          <li><Link to="/buzon">Buzon de Mensajes</Link></li>
          <li><Link to="/votos">Votos</Link></li>
          <li onClick={cerrarSesion}>Cerrar Sesion</li>
        </ul>
      )}
    </>
  );
};
