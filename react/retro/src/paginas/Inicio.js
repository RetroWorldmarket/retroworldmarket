import React, { useState, useEffect } from 'react';
import { InicioHeader } from '../components/InicioHeader';
import { PlusArticuloModal } from '../components/articulo/PlusArticuloModal';
import { SeccionListaArticulos } from '../components/seccion-lista-articulos/SeccionListaArticulos';
import { TarjetaArticulo } from '../components/TarjetaArticulo';
import { Categorias } from '../components/categorias/Categorias';
import { Footer } from '../components/footer/Footer';
import { Link } from 'react-router-dom';

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
            <Link to='/catalogo'>Compra tu retro</Link>
          </button>
          <button>
            <a href='/ventas'>Vende tu retro</a>
          </button>
        </aside>
        <PlusArticuloModal />
        <SeccionListaArticulos />
        <Categorias />
      </main>
      <Footer />
    </div>
  );
};
