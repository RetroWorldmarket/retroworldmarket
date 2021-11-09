import React, { useState, useContext } from 'react';
import { AuthTokenContext } from '../../index';
//import Message from '../footer/contacto/Message';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/////////////////////////////////
/// Falta modificar el avatar ///
/////////////////////////////////

const url = 'http://localhost:4000';

// Definimos los datos actuales del usuario como el valor inicial del mismo.

export const FormEditarUsuario = ({ user, tokenInfo }) => {
  //
  const [token] = useContext(AuthTokenContext);
  //
  // Almacenamos en "data" los valores antiguos del usuario.
  const data = user.user;
  console.log('data ---------- >', data);

  // Crearemos un estado (variable) para almacenar los errores (si hubiera)
  // const { errors, setErrors } = useState({});

  ////////////////////////////////////////////////////////////
  // Toastify no hace caso a "autoClose"
  //  --------------->>>>>>>>>>>>>  PREGUNTARLE A SAMUEL

  // Importamos toastify para los mensajes al usuario:
  // Guardaremos la respuesta de la base de datos en una variable
  // fuera de la función para poder mostrarle un mensage al usuario
  const [mensajeOk, setMensajeOk] = useState(false);
  // const [mensajeKo, setMensajeKo] = useState(false);
  const [mensaje, setMensaje] = useState({});
  const notificacion = () => {
    toast.success(`${mensaje}`);
    setMensajeOk(true);
  };

  // Asignamos los valores por defecto. Serán los valores antiguos del usuario.
  const [value, setValue] = useState({
    email: `${data.email}`,
    name: `${data.name}`,
    alias: `${data.alias}`,
    province: `${data.province}`,
    location: `${data.location}`,
    postalCode: `${data.postalCode}`,
  });

  // Test:
  console.log('value tiene //////////////////', value);

  //
  // Asignamos el id del usuario para enviar en la ruta (endpoint).
  const id = tokenInfo.id;

  // Función manejadora de cambios en los inputs:
  // Recibe un evento (cada letra que se modifique en los inputs dispara un nuevo evento)
  const handleChange = (e) => {
    //

    // Función que actualiza los valores antiguos del usuario y los agrupa en la variable "value".
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  ////////////////////////////////////////////////////////
  ///             Validar los datos nuevos             ///
  ////////////////////////////////////////////////////////
  // Solo validaremos el nombre, ya que en los demás inputs, si vienen vacíos, se usa la info antigua.
  // const validaciones = (value) => {
  //   // Para "name": le decimos que acepte mayusculas, minúsculas, tíldes, dieresis y espacio(\s):
  //   let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;

  //   if (!regexName.test(value.name)) {
  //     setErrors(
  //       (errors.name =
  //         "El campo 'Nombre' sólo acepta letras y espacios en blanco")
  //     );
  //   }
  //   return errors;
  // };

  /////////////////////////////////////////////////////////
  //         Funcion updateData. La petición PUT         //
  /////////////////////////////////////////////////////////
  // endpoint: app.put('/users/:idUser'

  const updateData = async (e) => {
    //e.preventDefault();
    // setErrors(validaciones(value));
    // if (Object.keys(errors).length === 0) {
    try {
      let endpoint = `${url}/users/${id}`;
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          value,
        }),
      });

      const respuesta = await response.json();
      console.log('RESPUESTA : ', respuesta);

      if (respuesta.status === 'Ok') {
        console.log(respuesta.message);
        setMensajeOk(true);
        setMensaje(respuesta.message);
        // setMensajeOk(false);
      } else {
        throw new Error(respuesta.message);
      }
    } catch (error) {
      console.error(error);
      // setMensajeKo(true);
      // setMensaje('No se ha realizado la actualización');
      // setMensajeKo(false);
    }
    //    }
  };

  // {respuesta.status === 'Ok' ? <Message msg={respuesta.message} bgColor={'#BAFF96'} /> : <Message/>}
  //
  //
  return (
    <>
      {/* {mensajeOk ? <Message msg={mensaje} bgColor={'#BAFF96'} /> : null}
      {mensajeKo ? <Message msg={mensaje} bgColor={'#FE6C55'} /> : null} */}
      {/* {mensajeOk ? <ToastContainer autoClose={15000} /> : null} */}
      <h3>Editar perfil</h3>
      <p>Editar datos :</p>
      <form onSubmit={updateData()}>
        <ul>
          <li>
            <label htmlFor='email'>
              Email:
              <input type='email' name='email' value={value.email} />
            </label>
          </li>
          <li>
            <label htmlFor='nombre'>
              Nombre :
              <input
                type='text'
                name='name'
                // placeholder={user.user.name}
                value={value.name}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label htmlFor='alias'>
              Nombre de Usuario :
              <input
                type='text'
                name='alias'
                value={value.alias}
                onChange={handleChange}
              ></input>
            </label>
          </li>
          <li>
            <label htmlFor='location'>
              Localidad :
              <input
                type='text'
                name='location'
                value={value.location}
                onChange={handleChange}
              ></input>
            </label>
          </li>
          <li>
            <label htmlFor='province'>
              Provincia :
              <select
                name='province'
                value={value.province}
                onChange={handleChange}
              >
                <option value=''>{user.user.province}</option>
                <option value='a coruña'>A Coruña</option>
                <option value='alava'>Alaba</option>
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
            </label>
          </li>
          <li>
            <label htmlFor='postalCode'>
              Código Postal :
              <input
                type='text'
                name='postalCode'
                value={value.postalCode}
                onChange={handleChange}
              ></input>
            </label>
          </li>
          <button type='submit' onClick={notificacion}>
            Editar
          </button>
        </ul>
      </form>
    </>
  );
};
