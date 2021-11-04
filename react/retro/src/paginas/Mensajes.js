import React, { useState, useEffect, useContext } from 'react';
import { AuthTokenContext } from '../index';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useParams } from 'react-router-dom';
import { get } from '../api/get';
import { useListaDeMensajes } from '../hooks/useListaMensajes';
import { post } from '../api/post';

export const Mensajes = () => {
  const [producto, setProducto] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [token] = useContext(AuthTokenContext);
  const [inputMensaje, setInputMensaje] = useLocalStorage('', 'mensaje');
  const [, anadirMensaje] = useListaDeMensajes();

  const { idProduct } = useParams();

  useEffect(() => {
    get(`http://localhost:4000/product/${idProduct}`, (body) =>
      setProducto(body.producto)
    );
    get(
      'http://localhost:4000/users',
      (body) => setUsuario(body.userInfo),
      token
    );
  }, [idProduct, token]);

  const envioDelMensaje = async (e) => {
    e.preventDefault();
    const nuevoMensaje = { body: inputMensaje };
    const cambiaStorageNuevoMensaje = (nuevoMensaje) => {
      anadirMensaje(nuevoMensaje);
      setInputMensaje('');
    };
    post(
      `http://localhost:4000/messages/${idProduct}`,
      nuevoMensaje,
      cambiaStorageNuevoMensaje,
      token,
      (response) => console.log(response.status)
    );
  };

  const cambioEnElMensaje = (e) => {
    setInputMensaje(e.target.value);
  };

  return (
    <main>
      {Object.values(producto).length && (
        <section>
          <figure id='img-prod'>
            <img
              src={`http://localhost:4000/${producto.fotos[0].namePhoto}`}
              alt={`${producto[0].nameProduct}`}
            />
          </figure>
          <article>
            <ul>
              <li>{`${producto[0].nameProduct}`}</li>
              <li>{`${producto[0].brand}`}</li>

              <li class='Descript-1'>Descripcion</li>
              <p>{`${producto[0].description}`}</p>
            </ul>
          </article>
        </section>
      )}
      <section>
        <h1 class='Hist-men'>historial mensajes</h1>
        <ul>
          <li class='list-1'>lista de mensajes</li>
        </ul>
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

          <label for='enviar-mensaje'>
            <input
              type='text'
              name='enviar-mensaje'
              value={inputMensaje}
              onChange={cambioEnElMensaje}
            />
          </label>
          <button type='submit'>enviar</button>
        </form>
      </section>

      <button class='solic-1'>solicitar reserva</button>
    </main>
  );
};
