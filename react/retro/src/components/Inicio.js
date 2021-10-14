import React, { useState, useEffect } from 'react';
import { InicioHeader } from './InicioHeader';

export const Inicio = () => {
  return (
    <div>
      <main id='mainPaginaPrincipal'>
        <aside id='botonesCompraVenta'>
          <button>
            <a href='/compras'>Compra tu retro</a>
          </button>
          <button>
            <a href='/ventas'>Vende tu retro</a>
          </button>
        </aside>
        <section id='productosAleatorios'>
          <article>
            <figure>
              <a href='/'>
                <img src='/img/telefonos_images.jpeg' alt='Telefonos' />
              </a>
            </figure>
            <h3>Nombre Producto</h3>
          </article>
          <article>
            <figure>
              <a href='/'>
                <img src='/img/telefonos_images.jpeg' alt='' />
              </a>
            </figure>
            <h3>Nombre Producto</h3>
          </article>
          <article>
            <figure>
              <a href='/'>
                <img src='/img/telefonos_images.jpeg' alt='' />
              </a>
            </figure>
            <h3>Nombre Producto</h3>
          </article>
          <article>
            <figure>
              <a href='/img/telefonos_images.jpeg'>
                <img src='/img/telefonos_images.jpeg' alt='' />
              </a>
            </figure>
            <h3>Nombre Producto</h3>
          </article>
        </section>
        <nav id='navegacionCategorias'>
          <ul>
            <li>
              <button>
                <a href='/'>moviles</a>
              </button>
            </li>
            <li>
              <button>
                <a href='/'>consolas</a>
              </button>
            </li>
            <li>
              <button>
                <a href='/'>moviles</a>
              </button>
            </li>
            <li>
              <button>
                <a href='/'>ordenadores</a>
              </button>
            </li>
            <li>
              <button>
                <a href='/'>telefonos</a>
              </button>
            </li>
            <li>
              <button>
                <a href='/'>todos productos</a>
              </button>
            </li>
          </ul>
        </nav>
      </main>
      <footer id='footerPaginaPrincipal'>
        <nav>
          <ul>
            <li>
              <a href='/'>fac</a>
            </li>
            <li>
              <a href='/'>twi</a>
            </li>
            <li>
              <a href='/'>link</a>
            </li>
            <li>
              <a href='/'>inst</a>
            </li>
          </ul>
        </nav>
        <nav>
          <ul>
            <li>
              <a href='/'>politica legal</a>
            </li>
            <li>
              <a href='/'>preguntas</a>
            </li>
            <li>
              <a href='email'>contacto</a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};
