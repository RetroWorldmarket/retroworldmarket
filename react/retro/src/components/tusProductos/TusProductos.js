import React, { useState, useEffect, useContext } from 'react';
import { AuthTokenContext } from '../../index';
import { EditarProducto } from '../editarProducto/EditarProducto';

//Pasos:
//  1) Obtener la informacion del usuario. Allí vendrá un array (products) con
//      los Productos del usuario.
//  2) Mostrar esos productos en pantalla.
//  3) Modificarlo en un formulario y enviarlos.

export const TusProductos = () => {
  const [token, , tokenInfo] = useContext(AuthTokenContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [productos, setProductos] = useState([]);

  const [mostrarEditarProducto, setMostrarEditarProducto] = useState(false);

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

        //console.log('data tiene :', data);

        if (!response.ok) {
          throw new Error(data.message);
        }

        // Guardamos la información del Usuario
        setUser(data.userInfo);

        // Guardamos en un array los Productos del Usuario.
        setProductos(data.userInfo.products);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    if (tokenInfo.id) {
      getUserInfo();
    }
  }, [tokenInfo.id, token]);

  const desplegarEditarProducto = (e) => {
    e.preventDefault();
    setMostrarEditarProducto(true);
  };
  const ocultarEditarProducto = (e) => {
    e.preventDefault();
    setMostrarEditarProducto(false);
  };

  console.log('Los productos del Usuario son: ', productos);

  // Antes de terminar, debemos definir el componente donde se va a renderizar cada resultado:
  function Producto() {
    return (
      <>
        <figure>
          {productos.map((el) => (
            <li>
              <p>Nombre :{el.nameProduct}</p>
              <p>Marca :{el.brand}</p>
              <p>Descripción :{el.description}</p>
              <p>Precio :{el.price}</p>
              <p>Estado :{el.status}</p>
              <p>Fabricación :{el.yearOfProduction}</p>
              <p>ID :{el.id}</p>
              <button onClick={desplegarEditarProducto}>Editar producto</button>

              {mostrarEditarProducto && (
                <>
                  <EditarProducto idProduct={el.id} producto={el} />
                  <button onClick={ocultarEditarProducto}>
                    Ocultar Editar producto
                  </button>
                </>
              )}
            </li>
          ))}
        </figure>
      </>
    );
  }

  return (
    <>
      <h4>Estos son tus productos activos actualmente:</h4>
      <ul>
        <Producto />
      </ul>
    </>
  );
};
