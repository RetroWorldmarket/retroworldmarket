import { useContext, useEffect, useState } from 'react';
import { get } from '../api/get';
import { AuthTokenContext } from '..';
import { toast } from 'react-toastify';

export const VotosYProductos = () => {
  const [historialProductos, setHistorialProductos] = useState([]);
  const [token] = useContext(AuthTokenContext);

  useEffect(() => {
    get(
      `http://localhost:4000/historial`,
      (body) => setHistorialProductos(body.body),
      token
    );
  }, [token]);
  console.log('usuario', historialProductos);
  return <p>Página de votos</p>;
};
