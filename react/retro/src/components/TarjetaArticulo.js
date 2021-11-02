import './TarjetaArticulo.css';
import { Link } from 'react-router-dom';

export const TarjetaArticulo = (cat) => {
    return (
        <section id='fotoPrecioNombre' className='productosAleatorios'>
            <article>
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
                <button>
                    <Link to={`/product/${cat.articulo.id}`}>
                        Mira tu producto
                    </Link>
                </button>
            </article>
        </section>
    );
};

/* <section id='TarjetaArticulo'>
{Object.values(art.articulo.id) > 0 && (
  <article key={art.articulo.id} id='tarjetaArticulo'>
    <figure>
      <img
        src={`http://localhost:4000/${art.articulo.namePhoto}`}
        alt={`${art.articulo.namePhoto}`}
      />
    </figure>
    <h2>{`${art.articulo.price} euros`}</h2>
    <h3>{art.articulo.nameProduct}</h3>
    <h4>{art.articulo.brand}</h4>
    <button>
      <Link to={`/product/${art.articulo.id}`}>Mira tu producto</Link>
    </button>
  </article>
)}
</section> */
