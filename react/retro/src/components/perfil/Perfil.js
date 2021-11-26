import { AuthTokenContext } from '../../index';
import React, { useState, useEffect, useContext } from 'react';
import { get } from '../../api/get';
export const Perfil = () => {
  // Recogemos el token del hook Context:
  const [token] = useContext(AuthTokenContext);
  // Definimos una variable donde almacenaremos los datos actuales del usuario.
  // Definimos una variable para almacenar el error, si lo hubiere.
  // Las inicializamos como null (no hay info al inicio).
  const [user, setUser] = useState([]);
  const [products, setProduct] = useState([]);

  // La petición GET para tomar la información del Usuario.
  useEffect(() => {
    // Usamos el método get que recibe una url, y devuelve una promesa

    get(
      'http://localhost:4000/users',
      (body) => {
        return setUser(body.userInfo), setProduct(body.userInfo.products);
      },
      token
    );
  }, [token]);
  // console.log('user tiene', user);
  // console.log(Object.values(user).length);
  // console.log('=========>>>>>>', user.products);
  return (
    <>
      {Object.values(user).length > 0 && (
        <>
          <h1>Tu perfil :</h1>
          <ul>
            {/* <li>Avatar:{user.avatar}</li> */}
            <li>Nombre: {user.name}</li>
            <li>Usuario:{user.alias}</li>
            <li>Valoraciones:{user.votos}</li>
          </ul>
        </>
      )}
      {Object.values(user).length > 0 ? (
        <>
          <h3>Tus Productos en venta :</h3>
          <ul>
            {products.map((el) => (
              <li>
                <ul>
                  <li>Nombre :{el.nameProduct}</li>
                  <li>Marca :{el.brand}</li>
                  <li>Descripción :{el.description}</li>
                  <li>Precio :{el.price}</li>
                  <li>Estado :{el.status}</li>
                  <li>Fabricación :{el.yearOfProduction}</li>
                  <li>Fecha de publicación:{el.createdDate}</li>
                  <li>ID :{el.id}</li>
                  <hr></hr>
                </ul>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Aún no has publicado ningún articulo? Vamos, a qué esperas?</p>
      )}
    </>
  );
};
