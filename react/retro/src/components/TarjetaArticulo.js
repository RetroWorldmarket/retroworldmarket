import './TarjetaArticulo.css';
import { Link } from 'react-router-dom';

export const TarjetaArticulo = (cat) => {
    return (
        <section id='fotoPrecioNombre' className='productosAleatorios'>
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
        </section>
    );
};
