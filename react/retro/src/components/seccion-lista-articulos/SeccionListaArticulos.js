import React, { useState, useEffect } from 'react';
import { get } from '../../api/get';
import { TarjetaArticulo } from '../TarjetaArticulo';

export const SeccionListaArticulos = () => {
  const [articulo, setArticulos] = useState([]);
  const listaArtiulosDelServidor = (body) => setArticulos(body.data.results);

  useEffect(() => {
    get('http://localhost:4000/category', listaArtiulosDelServidor);
  }, []);

  return (
    <section id='productosAleatorios'>
      {articulo.length > 0 &&
        articulo.map((art) => {
          return <TarjetaArticulo />;
        })}
    </section>
  );
};
