import { useState, useEffect } from 'react';
import { get } from '../../api/get';
import { TarjetaArticulo } from '../TarjetaArticulo';

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
            <TarjetaArticulo
              id='TarjetaArticulos'
              key={art.id}
              articulo={art}
            />
          );
        })}
    </section>
  );
};
