import './Footer.css';

export const Footer = () => {
  return (
    <div className='footer'>
      <p>Política de Privacidad</p>
      <p>Preguntas frecuentes</p>
      <p>Contacto</p>
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
