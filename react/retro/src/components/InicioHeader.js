import React, { useState } from 'react';
import PlusRegistroModal from './registro/PlusRegistroModal';
import PlusLoginModal from './login/PlusLoginModal';

// Importamos la lógica que va a tener ese Modal (desarrollada en el hook useModal.js)
import { useModal } from '../hooks/useModal';

export const InicioHeader = () => {
  // Modal:
  const [abierto, abrirModal, cerrarModal] = useModal(false);
  return (
    <header id='cabeceraPrincipalSinLogo'>
      <nav>
        <ul>
          <li>
            <button>
              <a href='/'>Logo</a>
            </button>
          </li>
          <li>
            <PlusRegistroModal abierto={abierto} cerrarModal={cerrarModal} />
          </li>
          <li>
            <PlusLoginModal />
          </li>
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
