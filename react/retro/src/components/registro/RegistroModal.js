// Importamos la lógica de un Modal:
import { useModal } from '../../hooks/useModal';

import './RegistroModal.css';

const RegistroModal = ({ abierto, cerrarModal }) => {
  const handelModalContenedorClick = (e) => e.stopPropagation();
  return (
    <div className={`modal ${abierto && 'modal-Abrir'}`} onClick={cerrarModal}>
      <div className='contenedor-Modal' onClick={handelModalContenedorClick}>
        <h1>Formulario de registro</h1>

        <button className='modal-Cerrar' onClick={cerrarModal}>
          X
        </button>

        <form action='registro' method='post' id='formularioRegistro'>
          <ul>
            <li>
              <label for='nombre'>
                Nombre:
                <input type='text' name='nombre' />
              </label>
            </li>

            <li>
              <label for='email'>
                Email:
                <input type='text' name='email' />
              </label>
            </li>

            <li>
              <label for='password'>
                Contraseña:
                <input type='text' name='password' />
              </label>
            </li>

            <li>
              <label for='alias'>
                Nombre de usuario:
                <input type='text' name='alias' />
              </label>
            </li>

            <li>
              <label for='avatar'>
                Avatar:
                <input type='text' name='avatar' />
              </label>
            </li>

            <li>
              <label for='provincia'>
                Provincia:
                <input type='text' name='provincia' />
              </label>
            </li>

            <li>
              <label for='localidad'>
                Localidad:
                <input type='text' name='localidad' />
              </label>
            </li>

            <li>
              <label for='codigoPostal'>
                Código postal:
                <input type='text' name='codigoPostal' />
              </label>
            </li>
          </ul>
        </form>
        <button>Enviar</button>
        <button>Cancelar</button>
      </div>
    </div>
  );
};

export default RegistroModal;
