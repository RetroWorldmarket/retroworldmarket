import React, { useState, useEffect } from 'react';
import { get } from '../../api/get';
import { Link } from 'react-router-dom';

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
            <article key={art.id}>
              <figure>
                <img src={`img/${art.namePhoto}`} alt='Imagen de artículo' />
              </figure>
              <h2>{`${art.price} euros`}</h2>
              <h3>{art.nameProduct}</h3>
              <h4>{art.brand}</h4>
              <button>
                <Link to={`/products/${art.id}`}>Mira tu producto</Link>
              </button>
            </article>
          );
        })}
    </section>
  );
};
