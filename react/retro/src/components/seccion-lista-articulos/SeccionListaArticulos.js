import React, { useState, useEffect } from 'react';
import { get } from '../../api/get';

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
          return (
            <div
              id='fotoPrecioNombre'
              className='productosAleatorios'
              key={art.id}
            >
              <div className='divImagenArticulo'>
                <img
                  className='articuloImagen'
                  src={`img/${art.namePhoto}`}
                  alt='Imagen de artículo'
                />
              </div>
              <span id='precio'>
                <h2>{`${art.price} euros`}</h2>
              </span>
              <span id='nombreProducto'>{art.nameProduct}</span>
            </div>
          );
        })}
    </section>
  );
};
