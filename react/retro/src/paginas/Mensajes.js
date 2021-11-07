import React, { useState, useEffect, useContext } from 'react';
import { AuthTokenContext } from '../index';
import { useParams } from 'react-router-dom';
import { get } from '../api/get';
import { useListaDeMensajes } from '../hooks/useListaMensajes';
import { post } from '../api/post';

export const Mensajes = () => {
  const [producto, setProducto] = useState([]);
  const [usuario, setUsuario] = useState([]);
  const [token] = useContext(AuthTokenContext);
  const [inputMensaje, setInputMensaje] = useState('');
  const { idProduct } = useParams();
  const [listaDeMensajes] = useListaDeMensajes(idProduct);
  const [mensajes, setMensajes] = useState([]);

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

  useEffect(() => {
    if (!listaDeMensajes.data) {
      setMensajes([]);
    } else {
      setMensajes(listaDeMensajes.data);
    }
  }, [listaDeMensajes]);

  const envioDelMensaje = async (e) => {
    e.preventDefault();
    const nuevoMensaje = { text: inputMensaje };
    const cambiaStorageNuevoMensaje = (nuevoMensaje) => {
      setInputMensaje(nuevoMensaje);
    };
    if (producto[0].idUser !== usuario.id) {
      post(
        `http://localhost:4000/messages/${idProduct}`,
        nuevoMensaje,
        cambiaStorageNuevoMensaje,
        token,
        (response) => console.log(response.status)
      );
    } else {
      post(
        `http://localhost:4000/messages/chat/${idProduct}`,
        nuevoMensaje,
        cambiaStorageNuevoMensaje,
        token,
        (response) => console.log(response.status)
      );
    }
  };

  // console.log(producto[0].idUser, 'usuario Producto');
  // console.log(usuario.id, 'usuario');

  const cambioEnElMensaje = (e) => {
    setInputMensaje(e.target.value);
  };
  return (
    <main>
      {Object.values(producto).length && (
        <section>
          {/* <figure id='img-prod'>
            <img
              src={`http://localhost:4000/${producto.fotos[0].namePhoto}`}
              alt={`${producto[0].nameProduct}`}
            />
          </figure> */}
          <article>
            <ul>
              <li>{`${producto[0].nameProduct}`}</li>
              <li>{`${producto[0].brand}`}</li>

              <li className='Descript-1'>Descripcion</li>
              <p>{`${producto[0].description}`}</p>
            </ul>
          </article>
        </section>
      )}
      <section>
        <h1 className='Hist-men'>historial mensajes</h1>
        <div>
          <ul>
            {mensajes.length > 0 &&
              mensajes.map((msg) => {
                return (
                  <li className='list-1' key={msg.idmessage}>
                    <p> {msg.text} </p>
                    <img
                      src={`http://localhost:4000/${usuario.avatar}`}
                      alt={`${usuario.name}`}
                      style={{ width: '30px' }}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
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
      </section>

      <button className='solic-1'>solicitar reserva</button>
    </main>
  );
};
