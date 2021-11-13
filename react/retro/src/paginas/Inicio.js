import { SeccionListaArticulos } from '../components/seccion-lista-articulos/SeccionListaArticulos';
import { Categorias } from '../components/categorias/Categorias';
import { Footer } from '../components/footer/Footer';
import { Link } from 'react-router-dom';

// Falta ubicar PlusArticuloModal en los productos
// importar Categorias

export const Inicio = ({ articulo }) => {
  return (
    <div>
      <main id='mainPaginaPrincipal'>
        <aside id='botonesCompraVenta'>
          <button className='botones-compra-vende'>
            <Link to='/catalogo'>
              <h3>Compra un retro</h3>
            </Link>
          </button>
          <button className='botones-compra-vende'>
            <Link to='/ventas'>
              <h3>Vende tu retro</h3>
            </Link>
          </button>
        </aside>
        <SeccionListaArticulos articulo={articulo} />
        <Categorias />
      </main>
      <Footer />
    </div>
  );
};
