import './Categorias.css';

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
            </div>
            <button className='boton-categoria'>Telefonía</button>
          </li>
          <li className='li-icono'>
            <div className='marco-icono'>
              <img
                className='icono'
                src='../img/consola-de-juego.png'
                alt='telefono-retro'
              />
            </div>
            <button className='boton-categoria'>Consolas</button>
          </li>
          <li className='li-icono'>
            <div className='marco-icono'>
              <img
                className='icono'
                src='../img/gramofono.png'
                alt='telefono-retro'
              />
            </div>
            <button className='boton-categoria'>Música</button>
          </li>
          <li className='li-icono'>
            <div className='marco-icono'>
              <img
                className='icono'
                src='../img/computer.png'
                alt='telefono-retro'
              />
            </div>
            <button className='boton-categoria'>Ordenadores</button>
          </li>
          <li className='li-icono'>
            <div className='marco-icono'>
              <img
                className='icono'
                src='../img/lista.png'
                alt='telefono-retro'
              />
            </div>
            <button className='boton-categoria'>Todas las categorías</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
