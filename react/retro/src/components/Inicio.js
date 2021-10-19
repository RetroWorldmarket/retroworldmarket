import React, { useState, useEffect } from 'react';
import { InicioHeader } from './InicioHeader';
import { TarjetaArticulo } from './TarjetaArticulo';
import { Categorias } from './Categorias';

export const Inicio = () => {
  return (
    <div>
      <main id='mainPaginaPrincipal'>
        <Categorias />
        <aside id='botonesCompraVenta'>
          <button>
            <a href='/compras'>Compra tu retro</a>
          </button>
          <button>
            <a href='/ventas'>Vende tu retro</a>
          </button>
        </aside>
        <section id='productosAleatorios'>
          <TarjetaArticulo />
          <TarjetaArticulo />
          <TarjetaArticulo />
          <TarjetaArticulo />
        </section>
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

/* Sección del artículo:
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
          </article> */
