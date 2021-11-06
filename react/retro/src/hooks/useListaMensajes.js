import { useEffect, useState, useContext } from 'react';
import { AuthTokenContext } from '../index';

import { get } from '../api/get';

export const useListaDeMensajes = (idProduct) => {
  const [token] = useContext(AuthTokenContext);
  const [listaDeMensajes, setListaDeMensajes] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState();

  function respuestaListaServidor(body) {
    setListaDeMensajes(body);
    setErrorMensaje();
  }
  function respuestaErrorListaServidor() {
    setErrorMensaje('Error de petición');
  }

  // const anadirMensaje = (nuevoMensaje) => {
  //   setListaDeMensajes([...listaDeMensajes, nuevoMensaje]);
  // };

  const respuestaMensajesChat = async (e) => {
    get(
      `http://localhost:4000/messages/${idProduct}`,
      respuestaListaServidor,
      token
    );
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      get(
        `http://localhost:4000/messages/list/${idProduct}`,
        respuestaListaServidor,
        token,
        respuestaErrorListaServidor
      );
    }, 5000);
    get(
      `http://localhost:4000/messages/list/${idProduct}`,
      respuestaListaServidor,
      token,
      respuestaErrorListaServidor
    );

    return () => {
      clearInterval(intervalo);
    };
  }, [token, idProduct]);
  return [listaDeMensajes, errorMensaje, respuestaMensajesChat];
};
