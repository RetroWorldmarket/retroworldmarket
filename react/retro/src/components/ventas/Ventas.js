import { CrearProducto } from '../crearProducto/CrearProducto';
import { useState } from 'react';

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
      <button onClick={desplegarCrearProducto}>Publicar nuevo producto</button>
      <button onClick={esconderCrearProducto}>
        Cerrar Publicar Nuevo Producto
      </button>
      {mostrarCrearProducto ? <CrearProducto /> : null}
    </>
  );
};
