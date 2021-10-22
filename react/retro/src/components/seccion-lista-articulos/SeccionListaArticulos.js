import React, { useState, useEffect } from 'react';
import { get } from '../../api/get';

export const SeccionListaArticulos = () => {
  const [articulo, setArticulos] = useState([]);
  const listaArtiulosDelServidor = (body) => setArticulos(body);
  console.log('pintado primero', articulo);

  useEffect(() => {
    get('http://localhost:4000/category', listaArtiulosDelServidor);
    console.log('este es el useEffect', articulo);
  }, []);

  console.log('pintado segundo');
  // const { results } = articulo.data;

  return (
    <section id='productosAleatorios'>
      {/* {articulo.map((art) => {
        <TarjetaArticulo />;
      })} */}
    </section>
  );
};
