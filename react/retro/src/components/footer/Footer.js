import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
    return (
        <div className='footer'>
            <p>
                <Link to='/politicaPrivacidad'>Política de Privacidad</Link>
            </p>
            <p>Preguntas frecuentes</p>
            <p>
                <Link to='/contacto'>Contacto</Link>
            </p>
            <div>
                <img
                    src='../img/facebook.png'
                    alt='icono Facebook'
                    className='redes-sociales'
                ></img>
                <img
                    src='../img/twitter.png'
                    alt='icono Twitter'
                    className='redes-sociales'
                ></img>
                <img
                    src='../img/instagram.png'
                    alt='icono Instagram'
                    className='redes-sociales'
                ></img>
            </div>
        </div>
    );
};
