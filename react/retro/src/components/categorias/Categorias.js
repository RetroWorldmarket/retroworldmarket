import './Categorias.css';
import { Link } from 'react-router-dom';
export const Categorias = () => {
  return (
    <div id='marcoNavegacionCategorias'>
      <nav id='navegacionCategorias'>
        <ul>
          <li className='li-icono'>
            <div className='marco-icono'>
              <img
                className='icono'
                src='../img/telefono-viejo.png'
                alt='telefono-retro'
              />
              <button className='boton-telefonía' type='submit'>
                <Link to={`/catalogo?category=telefonia&page=1`}>
                  Telefonía
                </Link>
              </button>
            </div>
          </li>
          <li className='li-icono'>
            <div className='marco-icono'>
              <img
                className='icono'
                src='../img/consola-de-juego.png'
                alt='telefono-retro'
              />
            </div>
            <button className='boton-categoria' type='submit'>
              <Link to='/catalogo?category=consolas%20y%20juegos&page=1'>
                consolas
              </Link>
            </button>
          </li>
          <li className='li-icono'>
            <div className='marco-icono'>
              <img
                className='icono'
                src='../img/gramofono.png'
                alt='telefono-retro'
              />
            </div>
            <button className='boton-categoria' type='submit'>
              <Link to='/catalogo?category=musica%20y%20radio&page=1'>
                Música
              </Link>
            </button>
          </li>
          <li className='li-icono'>
            <div className='marco-icono'>
              <img
                className='icono'
                src='../img/computer.png'
                alt='telefono-retro'
              />
            </div>
            <button className='boton-categoria' type='submit'>
              <Link to='/catalogo?category=ordenadores'>Ordenadores</Link>
            </button>
          </li>
          <li className='li-icono'>
            <div className='marco-icono'>
              <img
                className='icono'
                src='../img/lista.png'
                alt='telefono-retro'
              />
            </div>
            <button className='boton-categoria' type='submit'>
              <Link to='/catalogo?category=todos&page=1'>
                Todas las categorias
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
