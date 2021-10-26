// Importamos la lógica de un Modal:
import { post } from '../../api/post';

import './RegistroModal.css';
import { useState } from 'react';

const RegistroModal = ({ abierto, cerrarModal }) => {
  const handelModalContenedorClick = (e) => e.stopPropagation();
  //recogemos los estados necesarios para el registro en la pagina
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [nombre, setNombre] = useState('');
  const [alias, setAlias] = useState('');
  const [provincia, setProvincia] = useState('');
  const [location, setLocation] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');

  // const [response, setResponse] = useState();

  //tambien recogemos el token para que nos lo dé una vez registrado
  //(por ahora) porque hay que validar
  // const [token, setToken] = useLocalStorage('', 'accesoToken');

  //creamos el evento para recoger los datos del body

  const onSubmit = (e) => {
    //para que no se envie por defecto
    e.preventDefault();
    console.log('e tiene:', e);
    // Limpiamos el form después del envío:
    // e.target.onreset;

    //sacamos el body de la peticion; debe coincidir con los nombres de la base de datos
    const body = {
      name: nombre,
      email: email,
      alias: alias,
      location: location,
      password: contrasena,
      province: provincia,
      postalCode: codigoPostal,
    };

    //creamos la función para hacer o enviar peticiones al servidor
    const funcionManejadoraDeRespuestaDelServidor = (body) => {
      if (body.status === 'ok') {
        alert(`${body.message}`);
      } else {
        alert(`${body.message}`);
      }
      console.log('Body: ', body);
    };
    post(
      'http://localhost:4000/users',
      body,
      funcionManejadoraDeRespuestaDelServidor
    );
  };

  //cuando se enrute se descomentara la siguiente linea

  // if (token) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className={`modal ${abierto && 'modal-Abrir'}`} onClick={cerrarModal}>
      <div className='contenedor-Modal' onClick={handelModalContenedorClick}>
        <h1>Formulario de registro</h1>

        <button className='modal-Cerrar' onClick={cerrarModal}>
          X
        </button>

        <form
          onSubmit={onSubmit}
          action='/users'
          method='post'
          id='formularioRegistro'
        >
          <ul>
            <li>
              <label htmlFor='name'>
                Nombre:
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </label>
            </li>

            <li>
              <label htmlFor='email'>
                Email:
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </li>

            <li>
              <label htmlFor='password'>
                Contraseña:
                {contrasena.length < 8 ? (
                  <span>Mínimo 8 caracteres</span>
                ) : null}
                <input
                  type='password'
                  name='password'
                  id='password'
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </label>
            </li>

            <li>
              <label htmlFor='alias'>
                Alias:
                <input
                  type='text'
                  name='alias'
                  id='alias'
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                />
              </label>
            </li>
            <li>
              <label htmlFor='location'>
                Localización:
                <input
                  type='text'
                  name='location'
                  id='location'
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </label>
            </li>

            <li>
              <label htmlFor='province'>
                Provincia:
                <input
                  type='text'
                  name='province'
                  id='province'
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                />
              </label>
            </li>

            <li>
              <label htmlFor='postalCode'>
                Código postal:
                <input
                  type='posta'
                  name='postalCode'
                  id='postalCode'
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                />
              </label>
            </li>
          </ul>
          <button type='submit'>Enviar</button>
          <button type='reset'>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

// Realizar Modal para respuesta de Backend sobre el formulario.
// Añadir al botón Enviar la función de limpieza del formulario.

export default RegistroModal;
