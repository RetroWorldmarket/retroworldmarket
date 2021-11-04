// Función para que un usuario edite su perfil.
import React, { useState, useEffect, useContext } from 'react';
import Message from '../footer/contacto/Message';
import { AuthTokenContext } from '../../index';
import { FormEditarUsuario } from './FormEditarUsuario';

// Pasos:
//  Obtener la informacion actual del usuario.
//    Cuando el usuario está logueado recibe un token y un objeto (infoUsuario) donde viene
//    {id: 17, alias: 'Felipe 2', avatar: 'defaultAvatar.jpg', province: 'Lugo', votos: null, …}
//    De aquí usaremos el id para hacer un peticion de toda la informacion del usuario a la BdD.
//  Mostrarla.
//  El usuario modifica los campos.
//  Se actualiza la informacion en la base de datos.

export const EditarUsuario = (data) => {
  // Recogemos el token del hook Context:
  const [token, , tokenInfo] = useContext(AuthTokenContext);

  // Definimos una variable donde almacenaremos los datos actuales del usuario.
  // Definimos una variable para almacenar el error, si lo hubiere.
  // Las inicializamos como null (no hay info al inicio).
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // ////////////////////////////////////////////////////////////////////////////////////

  // //tests:
  // console.log(
  //   'token en EditarUsuario tiene: ***************************',
  //   token
  // );
  // console.log(
  //   'tokenInfo en EditarUsuario tiene: +++++++++++++++++++++++++',
  //   tokenInfo
  // );

  // //////////////////////////////////////////////////////////////////////////////////////

  // La petición GET para tomar la información del Usuario.
  useEffect(() => {
    // Usamos el método get que recibe una url, y devuelve una promesa
    const getUserInfo = async () => {
      try {
        const url = `http://localhost:4000/users/${tokenInfo.id}`;
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        console.log('data tiene :', data);

        if (!response.ok) {
          throw new Error(data.message);
        }

        setUser(data.userInfo);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    if (tokenInfo.id) {
      getUserInfo();
    }
  }, [tokenInfo.id, token]);

  // console.log('tokenInfo tiene:  ', tokenInfo);
  // console.log('user tiene: ', user);

  return (
    <>
      <h2>Editar Usuario</h2>

      {user ? (
        <FormEditarUsuario user={{ user }} tokenInfo={tokenInfo} />
      ) : null}

      {error ? <Message msg={error} bgColor={'red'} /> : null}
    </>
  );
};

//<pre>{JSON.stringify(user, null, 4)}</pre>

//<pre>{JSON.stringify(user, null, 4)}</pre>

/* <form
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
                <select
                  name='province'
                  id='province'
                  //value={value.province}
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                >
                  <option value=''>- Seleccione -</option>
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
            <br />
            
          </ul>
          <button type='submit'>Enviar</button>
          <button type='reset'>Cancelar</button>
        </form> */

//////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { helpHttp } from "../helpers/helpHttp";
// import CrudForm from "./CrudForm";
// import CrudTable from "./CrudTable";
// import Loader from "./Loader";
// import Message from "./Message";

// const CrudApi = () => {
//   const [db, setDb] = useState(null);
//   const [dataToEdit, setDataToEdit] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   let api = helpHttp();
//   let url = "http://localhost:5000/santos";

//   useEffect(() => {
//     setLoading(true);
//     helpHttp()
//       .get(url)
//       .then((res) => {
//         //console.log(res);
//         if (!res.err) {
//           setDb(res);
//           setError(null);
//         } else {
//           setDb(null);
//           setError(res);
//         }
//         setLoading(false);
//       });
//   }, [url]);

//   const createData = (data) => {
//     data.id = Date.now();
//     //console.log(data);

//     let options = {
//       body: data,
//       headers: { "content-type": "application/json" },
//     };

//     api.post(url, options).then((res) => {
//       //console.log(res);
//       if (!res.err) {
//         setDb([...db, res]);
//       } else {
//         setError(res);
//       }
//     });
//   };

//   const updateData = (data) => {
//     let endpoint = `${url}/${data.id}`;
//     //console.log(endpoint);

//     let options = {
//       body: data,
//       headers: { "content-type": "application/json" },
//     };

//     api.put(endpoint, options).then((res) => {
//       //console.log(res);
//       if (!res.err) {
//         let newData = db.map((el) => (el.id === data.id ? data : el));
//         setDb(newData);
//       } else {
//         setError(res);
//       }
//     });
//   };

//   const deleteData = (id) => {
//     let isDelete = window.confirm(
//       `¿Estás seguro de eliminar el registro con el id '${id}'?`
//     );

//     if (isDelete) {
//       let endpoint = `${url}/${id}`;
//       let options = {
//         headers: { "content-type": "application/json" },
//       };

//       api.del(endpoint, options).then((res) => {
//         //console.log(res);
//         if (!res.err) {
//           let newData = db.filter((el) => el.id !== id);
//           setDb(newData);
//         } else {
//           setError(res);
//         }
//       });
//     } else {
//       return;
//     }
//   };

//   return (
//     <div>
//       <h2>CRUD API</h2>
//       <article className="grid-1-2">
//         <CrudForm
//           createData={createData}
//           updateData={updateData}
//           dataToEdit={dataToEdit}
//           setDataToEdit={setDataToEdit}
//         />
//         {loading && <Loader />}
//         {error && (
//           <Message
//             msg={`Error ${error.status}: ${error.statusText}`}
//             bgColor="#dc3545"
//           />
//         )}
//         {db && (
//           <CrudTable
//             data={db}
//             setDataToEdit={setDataToEdit}
//             deleteData={deleteData}
//           />
//         )}
//       </article>
//     </div>
//   );
// };

// export default CrudApi;
