import { CrearProducto } from '../crearProducto/CrearProducto';
import { useState } from 'react';
import { TusProductos } from '../tusProductos/TusProductos';
import './ventas.css';

export const Ventas = () => {
  const [mostrarCrearProducto, setMostrarCrearProducto] = useState(false);

  const desplegarCrearProducto = (e) => {
    e.preventDefault();
    setMostrarCrearProducto(true);
  };

  const esconderCrearProducto = (e) => {
    e.preventDefault();
    setMostrarCrearProducto(false);
  };

  return (
    <div className='contenedor-nuevo-producto'>
      <h3>Tus productos</h3>
      <TusProductos />
      <button
        onClick={desplegarCrearProducto}
        className='boton-publicar-producto'
      >
        Publicar nuevo producto
      </button>

      {mostrarCrearProducto ? (
        <figure className='crear-producto'>
          <button
            onClick={esconderCrearProducto}
            className='boton-publicar-producto'
          >
            Cerrar
          </button>
          <CrearProducto />
        </figure>
      ) : null}
    </div>
  );
};
