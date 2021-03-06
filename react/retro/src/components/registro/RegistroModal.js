// Importamos la lógica de un Modal:
import { post } from '../../api/post';
import { toast } from 'react-toastify';

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
  const [terminos, setTerminos] = useState(false);

  const vaciarFormulario = () => {
    setEmail('');
    setContrasena('');
    setNombre('');
    setAlias('');
    setProvincia('');
    setLocation('');
    setCodigoPostal('');
    setTerminos(false);
  };

  // const [response, setResponse] = useState();

  //tambien recogemos el token para que nos lo dé una vez registrado
  //(por ahora) porque hay que validar
  // const [token, setToken] = useLocalStorage('', 'accesoToken');

  //creamos el evento para recoger los datos del body

  const onSubmit = (e) => {
    //para que no se envie por defecto
    e.preventDefault();

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
        toast.success(`${body.message}`);
      } else {
        toast.error(`${body.message}`);
      }
      console.log('Body: ', body);
    };
    post(
      'http://localhost:4000/users',
      body,
      funcionManejadoraDeRespuestaDelServidor
    );
    // Resetear el formulario:
    //e.target.reset();
    vaciarFormulario();
    cerrarModal();
  };

  //cuando se enrute se descomentara la siguiente linea

  // if (token) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className={`modal ${abierto && 'modal-Abrir'}`} onClick={cerrarModal}>
      <div
        id='Form-Reg'
        className='contenedor-Modal'
        onClick={handelModalContenedorClick}
      >
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
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Escribe tu Nombre'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </li>

            <li>
              <input
                type='text'
                name='alias'
                id='alias'
                placeholder='Selecciona tu Nombre de usuario'
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
              />
            </li>

            <li>
              {/* <label htmlFor='email'>Email</label> */}
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Escribe tu Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>

            <li>
              <input
                type='password'
                name='Escribe tu password'
                id='password'
                placeholder='Escribe tu Contraseña'
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
              />
            </li>

            <li>
              <input
                type='text'
                name='location'
                id='location'
                placeholder='Escribe tu Localidad'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </li>

            <li>
              <select
                name='province'
                id='province'
                placeholder='Selecciona tu Provincia'
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
              >
                <option value=''>Selecciona Provincia </option>
                <option value='a coruña'>A Coruña</option>
                <option value='alava'>Álava</option>
                <option value='albacete'>Albacete</option>
                <option value='alicante'>Alicante</option>
                <option value='almeria'>Almería</option>
                <option value='asturias'>Asturias</option>
                <option value='avila'>Ávila</option>
                <option value='badajoz'>Badajoz</option>
                <option value='baleares'>Baleares</option>
                <option value='barcelona'>Barcelona</option>
                <option value='burgos'>Burgos</option>
                <option value='caceres'>Cáceres</option>
                <option value='cadiz'>Cádiz</option>
                <option value='cantabria'>Cantabria</option>
                <option value='castellon'>Castellón</option>
                <option value='ceuta'>Ceuta</option>
                <option value='ciudad real'>Córdoba</option>
                <option value='cuenca'>Cuenca</option>
                <option value='girona'>Girona</option>
                <option value='granada'>Granada</option>
                <option value='guadalajara'>Guadalajara</option>
                <option value='gipuzkoa'>Gipuzkoa</option>
                <option value='huelva'>Huelva</option>
                <option value='huesca'>Huesca</option>
                <option value='jaen'>Jaén</option>
                <option value='la rioja'>La Rioja</option>
                <option value='las palmas'>Las Palmas</option>
                <option value='leon'>León</option>
                <option value='lerida'>Lérida</option>
                <option value='lugo'>Lugo</option>
                <option value='madrid'>Madrid</option>
                <option value='malaga'>Málaga</option>
                <option value='melilla'>Melilla</option>
                <option value='murcia'>Múrcia</option>
                <option value='navarra'>Navarra</option>
                <option value='ourense'>Ourense</option>
                <option value='palencia'>Palencia</option>
                <option value='pontevedra'>Pontevedra</option>
                <option value='salamanca'>Salamanca</option>
                <option value='segovia'>Segovia</option>
                <option value='sevilla'>Sevilla</option>
                <option value='soria'>Soria</option>
                <option value='tarragona'>Tarragona</option>
                <option value='santa cruz de tenerife'>
                  Santa Cruz de Tenerife
                </option>
                <option value='teruel'>Teruel</option>
                <option value='toledo'>Toledo</option>
                <option value='valencia'>Valencia</option>
                <option value='valladolid'>Valladolid</option>
                <option value='vizcaya'>Vizcaya</option>
                <option value='zamora'>Zamora</option>
                <option value='zaragoza'>Zaragoza</option>
              </select>
            </li>

            <li>
              <input
                type='text'
                name='postalCode'
                id='postalCode'
                placeholder='Escribe tu Código Postal'
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
              />
            </li>
            <br />
            <li id='terminos-check'>
              <label htmlFor='terminos'>
                Acepto términos y cóndiciones
                <input
                  type='checkbox'
                  name='terminos'
                  id='terminos'
                  value={terminos}
                  onChange={(e) => setTerminos(e.target.checked)}
                />
              </label>
            </li>
          </ul>
          <div id='botones-registro'>
            <button type='submit'>Enviar</button>
            <button type='reset'>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Realizar Modal para respuesta de Backend sobre el formulario.
// Añadir al botón Enviar la función de limpieza del formulario.

export default RegistroModal;
