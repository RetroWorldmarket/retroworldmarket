import './LoginModal.css';
import { post } from '../../api/post';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const LoginModal = ({ abierto, cerrarModal }) => {
  const handelModalContenedorClick = (e) => e.stopPropagation();
  return (
    <div className={`modal ${abierto && 'modal-Abrir'}`} onClick={cerrarModal}>
      <div className='contenedor-Modal' onClick={handelModalContenedorClick}>
        <h1>Login</h1>

        <button className='modal-Cerrar' onClick={cerrarModal}>
          X
        </button>

        <section>
          <form action='registro' method='post' id='registroLogin'>
            <label for='nombre'>Email:</label>
            <input
              type='text'
              name='email'
              placeholder='Escribe aquí tu email'
              id='email'
            ></input>

            <br />

            <label for='password'>Password:</label>
            <input
              type='text'
              name='password'
              placeholder='Escribe aquí tu password'
              id='password'
            ></input>
          </form>
        </section>

        <button>Enviar</button>
        <button>Cancelar</button>
      </div>
    </div>
  );
};

export default LoginModal;
