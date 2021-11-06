import { CrearProducto } from '../crearProducto/CrearProducto';
import { useState } from 'react';
import { TusProductos } from '../tusProductos/TusProductos';

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
    <>
      <h3>Tus productos</h3>
      <TusProductos />
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
  );
};
