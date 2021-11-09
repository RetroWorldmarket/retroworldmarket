import './Categorias.css';
import { Link } from 'react-router-dom';
export const Categorias = () => {
    return (
        <nav id='navegacionCategorias'>
            <ul>
                <li className='li-icono'>
                    <Link to={`/catalogo?category=telefonia&page=1`}>
                        <img
                            className='icono'
                            src='../img/telefono-viejo.png'
                            alt='telefono-retro'
                        />
                        Telefonía
                    </Link>
                </li>
                <li className='li-icono'>
                    <Link to='/catalogo?category=consolas%20y%20juegos&page=1'>
                        <img
                            className='icono'
                            src='../img/consola-de-juego.png'
                            alt='telefono-retro'
                        />
                        consolas
                    </Link>
                </li>
                <li className='li-icono'>
                    <Link to='/catalogo?category=musica%20y%20radio&page=1'>
                        <img
                            className='icono'
                            src='../img/gramofono.png'
                            alt='telefono-retro'
                        />
                        Música
                    </Link>
                </li>
                <li className='li-icono'>
                    <Link to='/catalogo?category=ordenadores'>
                        <img
                            className='icono'
                            src='../img/computer.png'
                            alt='telefono-retro'
                        />
                        Ordenadores
                    </Link>
                </li>
                <li className='li-icono'>
                    <Link to='/catalogo?category=todos&page=1'>
                        <img
                            className='icono'
                            src='../img/lista.png'
                            alt='telefono-retro'
                        />
                        Todas las categorias
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
