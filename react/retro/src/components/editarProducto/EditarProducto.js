import React, { useState } from 'react';
import { FormEditarProducto } from './FormEditarProducto';

export const EditarProducto = (idProduct, el) => {
  const [mostrarEditarProducto, setMostrarEditarProducto] = useState(true);

  // console.log('idProduct por children tiene:', idProduct);
  // console.log('El producto tiene en EditarProducto ', idProduct.producto);

  return (
    <>
      <p>Formulario Editar Producto</p>

      {mostrarEditarProducto ? (
        <FormEditarProducto idProduct={idProduct} producto={el} />
      ) : null}
    </>
  );
};
