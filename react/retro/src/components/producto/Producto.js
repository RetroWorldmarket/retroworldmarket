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
            <div className='slide-fotos-articulo'>
              <button className='boton-anterior' onClick={fotoPrevia}>
                Anterior
              </button>

              {producto.fotos.length &&
                producto.fotos.map((nombre, posicion) => (
                  <figure key={posicion}>
                    {posicion === foto && (
                      <div className='contenedor-imagen-articulo'>
                        <img
                          className='imagen-del-articulo'
                          src={`http://localhost:4000/${producto.fotos[posicion].namePhoto}`}
                          alt='Imagen de artículo'
                        />
                      </div>
                    )}
                  </figure>
                ))}

              <button className='boton-siguiente' onClick={fotoSiguiente}>
                Siguiente
              </button>
            </div>
          )}

          <article>
            <ul>
              <li className='li-producto'>
                <span>Nombre:</span>
                <p>{`${producto[0].nameProduct}`}</p>
              </li>

              <li className='li-producto'>
                <span>Marca:</span>
                {`${producto[0].brand}`}
              </li>

              <li className='li-producto'>
                <span>Precio: </span>
                {`${producto[0].price}€`}
              </li>

              <li className='li-producto'>
                <span>Categoria: </span>
                {`${producto[0].category}`}
              </li>

              <li className='li-producto'>
                <span>Estado de funcionamiento: </span>
                {`${producto[0].status}`}
              </li>

              <li className='li-producto'>
                <span>Descripción:</span>

                <p>{`${producto[0].description}`}</p>
              </li>

              <li className='li-producto'>
                <span>Año de Fabricación: </span>
                {`${producto[0].yearOfProduction}`}
              </li>

              <li className='li-producto'>
                <span>Vendido por: </span>
                {`${producto[0].name}`}
              </li>

              <li className='li-producto'>
                <span>Provincia: </span>
                {`${producto[0].province}`}
              </li>
            </ul>
          </article>
        </section>
      )}
      {token ? (
        <section id='sectionMensajeAlVendedor'>
          <legend>Envíale un mensaje al Vendedor</legend>
          {!interes.includes(Number(idProduct)) ? (
            <form id='EnviarMensaje' onSubmit={envioDelMensaje}>
              {Object.values(usuario).length && (
                <figure id='imagen-usuario-mensaje'>
                  <h4>{usuario.alias} dice:</h4>
                  <img
                    src={`http://localhost:4000/${usuario.avatar}`}
                    alt={`${usuario.name}`}
                    style={{ width: '50px' }}
                  />
                </figure>
              )}

              <label htmlFor='enviar-mensaje'>
                <textarea
                  type='text'
                  name='enviar-mensaje'
                  id='description-mensaje'
                  value={inputMensaje}
                  onChange={cambioEnElMensaje}
                />
              </label>

              <button
                className='boton-actualizar-datos-producto'
                id='enviar-mensaje-vendedor'
                type='submit'
              >
                Enviar
              </button>
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
