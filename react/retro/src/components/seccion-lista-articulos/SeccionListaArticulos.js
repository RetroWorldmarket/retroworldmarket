import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { get } from '../../api/get';

export const SeccionListaArticulos = () => {
  //Subo el estado articulos para poderla pasar por props a seccion
  // y a producto, con la llamada al servidor
  const [articulo, setArticulos] = useState([]);
  const listaArtiulosDelServidor = (body) => setArticulos(body.productos);
  useEffect(() => {
    get('http://localhost:4000/inicio', listaArtiulosDelServidor);
  }, []);

  return (
    <section id='productosAleatorios'>
      {articulo.length > 0 &&
        articulo.map((art) => {
          return (
            <article key={art.id}>
              <figure>
                <img
                  src={`http://localhost:4000/${art.namePhoto}`}
                  alt='Imagen de artículo'
                />
              </figure>
              <h2>{`${art.price} euros`}</h2>
              <h3>{art.nameProduct}</h3>
              <h4>{art.brand}</h4>
              <button>
                <Link to={`/product/${art.id}`}>Mira tu producto</Link>
              </button>
            </article>
          );
        })}
    </section>
  );
};
