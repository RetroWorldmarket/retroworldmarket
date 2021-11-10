import { useContext, useEffect, useState } from 'react';
import { get } from '../api/get';
import { AuthTokenContext } from '..';
// import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export const VotosYProductos = () => {
  const [historialProductos, setHistorialProductos] = useState([]);
  const [token] = useContext(AuthTokenContext);
  const [idProduct, setIdProduct] = useState();
  const [p, setP] = useState([]);

  useEffect(() => {
    get(
      `http://localhost:4000/historial`,
      (body) => {
        return (
          setHistorialProductos(body.body), setIdProduct(body.body[0].idProduct)
        );
      },

      token
    );
  }, [token]);

  useEffect(() => {
    get(`http://localhost:4000/product/${idProduct}`, (body) => {
      setP(body.producto);
    });
  }, [idProduct]);

  console.log('product', idProduct);
  console.log(p, 'pppppppp');
  return (
    <section id='fotoPrecioNombre' className='productosAleatorios'>
      {historialProductos.length > 1 &&
        historialProductos.map((cat) => (
          <article id='productosAleatorios-TarjArticle'>
            <figure className='divImagenArticulo'>
              <img
                className='articuloImagen'
                src={`http://localhost:4000/${cat.articulo.namePhoto}`}
                alt={`${cat.articulo.namePhoto}`}
              />
            </figure>
            <h2>{`${cat.articulo.price} euros`}</h2>
            <h3>{`${cat.articulo.nameProduct}`}</h3>
            <h4>{`${cat.articulo.brand}`}</h4>
            <h5>{`${cat.articulo.status}`}</h5>

            <Link to={`/product/${cat.articulo.id}`}>Mira tu producto</Link>
          </article>
        ))}
    </section>
  );
};
