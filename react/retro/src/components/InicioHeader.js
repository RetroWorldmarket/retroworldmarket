import React, { useState, useContext } from 'react';
import PlusRegistroModal from './registro/PlusRegistroModal';
import PlusLoginModal from './login/PlusLoginModal';
import { Link } from 'react-router-dom';
// Importamos la información token
import { AuthTokenContext } from '../index';

// Importamos la lógica que va a tener ese Modal (desarrollada en el hook useModal.js)
import { useModal } from '../hooks/useModal';
import { UsuarioLogueado } from './UsuarioLogueado/UsuarioLogueado';

export const InicioHeader = () => {
  // Modal:
  const [abierto, abrirModal, cerrarModal] = useModal(false);

  // Definimos el token
  const [token, setToken] = useContext(AuthTokenContext);

  console.log(token);

  return (
    <header id='cabeceraPrincipalSinLogo'>
      <nav>
        <ul>
          <li>
            <button>
              <Link to='/'>Logo</Link>
            </button>
          </li>

          {token ? (
            <li>
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
        <form action='/'>
          <label for='search'>
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
        <button>
          <img src='./img/menu-line.png' alt='img menu' />
        </button>
      </section>
    </header>
  );
};
