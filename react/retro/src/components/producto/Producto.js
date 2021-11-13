import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { get } from '../../api/get';
import { AuthTokenContext } from '../..';
import { post } from '../../api/post';
import { ContactoProducto } from '../../App';
import './producto.css';

export const Producto = ({ articulo }) => {
  const history = useHistory();
  const [token] = useContext(AuthTokenContext);
  const [inputMensaje, setInputMensaje] = useState('');
  const [usuario, setUsuario] = useState([]);
  const [interes, setInteres] = useContext(ContactoProducto);

  const [producto, setProducto] = useState({});
  //creamos un estado para cambiar las fotos con las posiciones del array
  //empieza por 0 porque es la posición inicial del array
  const [foto, setFoto] = useState(0);
  const { idProduct } = useParams();

  useEffect(() => {
    get(`http://localhost:4000/product/${idProduct}`, (body) => {
      setProducto(body.producto);
    });
    if (token) {
      get(
        'http://localhost:4000/users',
        (body) => setUsuario(body.userInfo),
        token
      );
    }
  }, [idProduct, token]);

  //hacemos componente boton

  // Ir a la foto anterior. En caso de estar en la primera , pasamos a la última
  const fotoPrevia = (e) => {
    e.stopPropagation();
    setFoto(foto === 0 ? producto.fotos.length - 1 : foto - 1);
  };

  // Ir a la foto siguiente. En caso de estar en la última  pasamos a la primera
  const fotoSiguiente = (e) => {
    e.stopPropagation();
    setFoto(foto === producto.fotos.length - 1 ? 0 : foto + 1);
  };
  ////////////////////////////////MENSJES/////////////
  const envioDelMensaje = async (e) => {
    if (e) e.preventDefault();
    const nuevoMensaje = { text: inputMensaje };
    const cambiaStorageNuevoMensaje = (nuevoMensaje) => {
      setInputMensaje(nuevoMensaje.text);
    };
    post(
      `http://localhost:4000/messages/${idProduct}`,
      nuevoMensaje,
      cambiaStorageNuevoMensaje,
      token,
      (response) => {
        console.log(response.status);
      }
    );
    if (interes.length < 1) {
      setInteres([producto[0].id]);
    } else {
      setInteres([...interes, producto[0].id]);
    }
  };

  const cambioEnElMensaje = (e) => {
    setInputMensaje(e.target.value);
  };

  return (
    <section id='contenedorDelModalDelArticulo'>
      <button onClick={() => history.goBack()}>X</button>
      {Object.values(producto).length && (
        <section id='articulo'>
          {producto.fotos.length > 1 && (
            <>
              <button onClick={fotoPrevia}>previa</button>
              <button onClick={fotoSiguiente}>anterior</button>
            </>
          )}

          {producto.fotos.length &&
            producto.fotos.map((nombre, posicion) => (
              <figure key={posicion}>
                {posicion === foto && (
                  <>
                    <img
                      src={`http://localhost:4000/${producto.fotos[posicion].namePhoto}`}
                      alt='Imagen de artículo'
                    />
                  </>
                )}
              </figure>
            ))}
          <article>
            <ul>
              <li>{`Nombre: ${producto[0].nameProduct}`} </li>
              <li>{`Marca: ${producto[0].brand}`}</li>
              <li>{`Precio: ${producto[0].price}`}</li>
              <li>{`Categoria: ${producto[0].category}`}</li>
              <li>{`Estado: ${producto[0].status}`}</li>
              <li>
                Descripción:
                <p>{`${producto[0].description}`}</p>
              </li>
              <li>{`Año de Fabricación: ${producto[0].yearOfProduction}`}</li>
              <li>{`Vendido por: ${producto[0].name}`}</li>
              <li>{`Valoración: ${producto[0].status}`}</li>
              <li>{`Lugar: ${producto[0].province}`}</li>
            </ul>
          </article>
        </section>
      )}
      {token ? (
        <section id='sectionMensajeAlVendedor'>
          <legend>Mensaje al Vendedor</legend>
          {!interes.includes(Number(idProduct)) ? (
            <form id='EnviarMensaje' onSubmit={envioDelMensaje}>
              {Object.values(usuario).length && (
                <figure>
                  <img
                    src={`http://localhost:4000/${usuario.avatar}`}
                    alt={`${usuario.name}`}
                    style={{ width: '50px' }}
                  />
                  <h1 style={{ fontSize: '10px' }}>{usuario.alias}</h1>
                </figure>
              )}

              <label htmlFor='enviar-mensaje'>
                <input
                  type='text'
                  name='enviar-mensaje'
                  value={inputMensaje}
                  onChange={cambioEnElMensaje}
                />
              </label>

              <button type='submit'>enviar</button>
            </form>
          ) : (
            <p>{`Mensaje enviado , comprueba tu bandeja de entrada`}</p>
          )}
        </section>
      ) : (
        <p>Tienes que logearte</p>
      )}
    </section>
  );
};
