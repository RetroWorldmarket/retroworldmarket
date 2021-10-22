import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { TarjetaArticulo } from '../TarjetaArticulo';
import './GaleriaProductos.css';

// Falta: componente de paginacion de cada galeria (boton Anterior y Siguiente)
//        componente Footer

export const GaleriaProductos = () => {
  return (
    <div>
      <div className='centrado'>
        <h3>Lo último en llegar...</h3>
        <nav className='nav-galeria'>
          <TarjetaArticulo />
          <TarjetaArticulo />
          <TarjetaArticulo />
        </nav>
      </div>
      <div className='centrado'>
        <h3>Lo más buscado...</h3>
        <nav className='nav-galeria'>
          <TarjetaArticulo />
          <TarjetaArticulo />
          <TarjetaArticulo />
        </nav>
        <button>
          <Link to='/'>Volver al inicio</Link>
        </button>
      </div>
      <Footer />
    </div>
  );
};
