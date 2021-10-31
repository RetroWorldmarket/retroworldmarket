import './Categorias.css';
import {Link} from "react-router-dom";
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
              <button className='boton-telefonía' type="submit">
              <Link to="/catalogo?category=telefonia">Telefonía</Link>
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
            <button className='boton-categoria' type="submit">
            <Link to="/catalogo?category=consolas%20y%20juegos">consolas</Link>
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
            <button className='boton-categoria' type="submit">
            <Link to="/catalogo?category=musica%20y%20radio">Música</Link>
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
            <button className='boton-categoria' type="submit">
            <Link to="/catalogo?category=ordenadores">Ordenadores</Link> 
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
            <button className='boton-categoria' type="submit">
            <Link to="/catalogo?category=">Todas las categorias</Link> 
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
