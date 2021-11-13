import { CrearProducto } from '../crearProducto/CrearProducto';
import { useState } from 'react';
import { TusProductos } from '../tusProductos/TusProductos';
<<<<<<< Updated upstream
import './ventas.css';
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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
=======
      <button onClick={desplegarCrearProducto}>Publicar nuevo producto</button>

      {mostrarCrearProducto ? (
        <>
          <CrearProducto />
          <button onClick={esconderCrearProducto}>
            Cerrar Publicar Nuevo Producto
          </button>
        </>
      ) : null}
    </>
>>>>>>> Stashed changes
  );
};
