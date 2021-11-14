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

  // console.log('Los productos del Usuario son: ', productos);

  // Antes de terminar, debemos definir el componente donde se va a renderizar cada resultado:
  function Producto() {
    return (
      <>
        <figure className='figure-producto'>
          {productos.map((el) => (
            <>
              {/* <li>
                <figure>
                  <img src={el.photos} alt='foto producto' />
                </figure>
              </li> */}
              <li>
                <p>
                  <span>Nombre :</span>
                  {el.nameProduct}
                </p>
                <p>
                  <span>Marca :</span>
                  {el.brand}
                </p>
                <p>
                  <span>Descripción :</span>
                  {el.description}
                </p>
                <p>
                  <span>Precio :</span>
                  {el.price}
                  <span>€</span>
                </p>
                <p>
                  <span>Estado :</span>
                  {el.status}
                </p>
                <p>
                  <span>Fabricación :</span>
                  {el.yearOfProduction}
                </p>
                <p>
                  <span>ID :</span>
                  {el.id}
                </p>
                <button onClick={desplegarEditarProducto}>
                  Editar producto
                </button>

                {mostrarEditarProducto && (
                  <>
                    <button
                      onClick={ocultarEditarProducto}
                      className='boton-publicar-producto'
                    >
                      Cerrar
                    </button>
                    <EditarProducto idProduct={el.id} producto={el} />
                  </>
                )}
              </li>
            </>
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
