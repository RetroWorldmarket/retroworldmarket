import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../api/get';
import { ContactoProducto } from '../App';
import { AuthTokenContext } from '../index';
import './buzonEntrada.css';

//Pasos:
//  1) Obtener la informacion del usuario. Allí vendrá un array (products) con
//      los Productos del usuario.
//  2) Mostrar esos productos en pantalla.
//  3) Modificarlo en un formulario y enviarlos.

export const BuzonEntrada = () => {
  const [token, , tokenInfo] = useContext(AuthTokenContext);
  const [, setError] = useState(null);
  const [interes] = useContext(ContactoProducto);

  const [productos, setProductos] = useState([]);
  const [mensajesEnviado, setMensajesEnviado] = useState(null);

  // La petición GET para tomar la información del Usuario.
  useEffect(() => {
    // Usamos el método get que recibe una url, y devuelve una promesa
    const getUserInfo = async () => {
      try {
        const url = `http://localhost:4000/users`;
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
    interes.map((m) =>
      get(`http://localhost:4000/product/${m}`, (body) => {
        setMensajesEnviado([body.producto]);
      })
    );
  }, [tokenInfo.id, token, interes]);

  console.log('Los productos del Usuario son: ', mensajesEnviado);

  // Antes de terminar, debemos definir el componente donde se va a renderizar cada resultado:
  function Producto() {
    return (
      <>
        {productos.map((el) => (
          <section className='section-buzon-mensajes' key={el.id}>
            <span>Nombre :{el.nameProduct}</span>

            <span>Precio :{el.price}€</span>
            <br />
            <button>
              <Link to={`/mensajes/${el.id}`}>Ir a mensajes</Link>
            </button>
          </section>
        ))}
      </>
    );
  }
  //   function ProductoInteres() {
  //     return (
  //       <>
  //         {mensajesEnviado.lenght > 0 &&
  //           mensajesEnviado.map((el) => (
  //             <li key={el[0].id}>
  //               <p>Nombre :{el[0].nameProduct}</p>
  //               <p>Precio :{el[0].price}</p>
  //               <button>
  //                 <Link to={`/mensajes/${el}`}>ir a mensajes</Link>
  //               </button>
  //             </li>
  //           ))}
  //       </>
  //     );
  //   }

  return (
    <section>
      <>
        <h3>Estos son tus productos activos actualmente:</h3>
        <ul>
          <Producto />
        </ul>
      </>
      <>
        <h3>MENSAJES ENVIADOS:</h3>
        <ul>
          {mensajesEnviado &&
            mensajesEnviado.map((el) => (
              <li className='section-buzon-mensajes' key={el[0].id}>
                <span>Nombre :{el[0].nameProduct}</span>
                <span>Precio :{el[0].price}€</span>
                <br />
                <button>
                  <Link to={`/mensajes/${el[0].id}`}>Ir a mensajes</Link>
                </button>
              </li>
            ))}
        </ul>
      </>
    </section>
  );
};
