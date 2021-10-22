import React, { useState, useEffect } from 'react';
import { InicioHeader } from '../components/InicioHeader';
import { Categorias } from '../components/barra-categorias/Categorias';
import { PlusArticuloModal } from '../components/articulo/PlusArticuloModal';
import { SeccionListaArticulos } from '../components/seccion-lista-articulos/SeccionListaArticulos';
// Falta ubicar PlusArticuloModal en los productos
// importar InicioHeader
// importar Categorias

export const Inicio = () => {
  return (
    <div>
      <InicioHeader />
      <main id='mainPaginaPrincipal'>
        <aside id='botonesCompraVenta'>
          <button>
            <a href='/compras'>Compra tu retro</a>
          </button>
          <button>
            <a href='/ventas'>Vende tu retro</a>
          </button>
        </aside>
        <PlusArticuloModal />
        <SeccionListaArticulos />
        <Categorias />
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
