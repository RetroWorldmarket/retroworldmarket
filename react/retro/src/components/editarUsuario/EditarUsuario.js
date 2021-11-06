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
