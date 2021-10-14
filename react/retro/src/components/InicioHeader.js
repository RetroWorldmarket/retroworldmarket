import React, { useState } from 'react';

export const InicioHeader = () => {
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
            <button>
              <a href='/'>Registro</a>
            </button>
          </li>
          <li>
            <button>
              <a href='/'>Login</a>
            </button>
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
