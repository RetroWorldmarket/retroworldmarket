import React, { useContext } from 'react';
import PlusRegistroModal from './registro/PlusRegistroModal';
import PlusLoginModal from './login/PlusLoginModal';
import { Link } from 'react-router-dom';
// Importamos la información token
import { AuthTokenContext } from '../index';

// Importamos la lógica que va a tener ese Modal (desarrollada en el hook useModal.js)
import { useModal } from '../hooks/useModal';
import { UsuarioLogueado } from './UsuarioLogueado/UsuarioLogueado';
//import { useLocalStorage } from '../hooks/useLocalStorage';
import { ContactoProducto } from '../App';

export const InicioHeader = () => {
  // Interes: Array con id de productos con mensaje enviado
  const [interes, setInteres] = useContext(ContactoProducto);
  // Modal:
  const [abierto, cerrarModal] = useModal(false);

  // Definimos el token
  const [token] = useContext(AuthTokenContext);

  return (
    <header id='cabeceraPrincipalSinLogo'>
      <nav>
        <ul>
          <li>
            <button id='loguito'>
              <Link to='/'>
                <img
                  src='../../img/retroWlogo.png'
                  alt='Logo'
                  width='180px'
                  height='80px'
                ></img>
              </Link>
            </button>
          </li>

          {token ? (
            <li id='contenedor-avatar'>
              <UsuarioLogueado />
            </li>
          ) : (
            <>
              <li>
                <PlusRegistroModal
                  abierto={abierto}
                  cerrarModal={cerrarModal}
                />
              </li>
              <li>
                <PlusLoginModal />
              </li>
            </>
          )}
        </ul>
      </nav>
      <section>
        <form id='contenedor-busqueda' action='/catalogo'>
          <label htmlFor='search'>
            <input
              id='barraBusqueda'
              type='text'
              name='search'
              placeholder='Busca aqui tu producto o categoria'
            />
            <button>
              <img src='./img/search_black_24dp.svg' alt='lupa de busqueda' />
            </button>
          </label>
        </form>
      </section>
    </header>
  );
};
