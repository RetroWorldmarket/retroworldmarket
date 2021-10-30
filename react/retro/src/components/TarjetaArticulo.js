import './TarjetaArticulo.css'; 
import {Link} from 'react-router-dom'

export const TarjetaArticulo = ({ articulo }) => {
  return (
    <div id='fotoPrecioNombre' className='productosAleatorios'>
      <div className='divImagenArticulo'>
        <img
          className='articuloImagen'
          src='../img/telefonos_images.jpeg'
          alt='Imagen de artículo'
        />
      </div>
      <span id='precio'>
        <h2>300€</h2>
      </span>
      <span id='nombreProducto'>Lote de teléfonos</span>
    </div>
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
