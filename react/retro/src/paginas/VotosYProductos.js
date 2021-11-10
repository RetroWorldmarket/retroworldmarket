import { useContext, useEffect, useState } from 'react';
import { get } from '../api/get';
import { AuthTokenContext } from '..';
import { post } from '../api/post';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

// import { toast } from 'react-toastify';

export const VotosYProductos = () => {
  const [historialProductos, setHistorialProductos] = useState([]);
  const [token] = useContext(AuthTokenContext);
  const [idOwner, setIdOwner] = useState(null);
  const [p, setP] = useState([]);
  const [votos, setVotos] = useState();
  const history = useHistory();

  useEffect(() => {
    get(
      `http://localhost:4000/historial`,
      (body) => {
        return (
          setHistorialProductos(body.body), setIdOwner(body.body[0].idOwner)
        );
      },

      token
    );
  }, [token]);
  useEffect(() => {
    if (idOwner) {
      get(
        `http://localhost:4000/users/${idOwner}`,
        (body) => {
          setP(body.userInfo);
        },
        token
      );
    }
  }, [idOwner, token]);

  const votar = (e) => {
    e.preventDefault();
    const funcionManejadoraDeRespuestaDelServidor = (body) => {
      if (body.status === 'ok') {
        toast.success(`${body.message}`);
      } else {
        toast.error(`${body.message}`);
      }
      console.log('Body: ', body);
    };
    const body = {
      vote: votos,
    };
    post(
      `http://localhost:4000/sellretro/${historialProductos[0].idProduct}/votes`,
      body,
      funcionManejadoraDeRespuestaDelServidor,
      token
    );
    history.push('/');
  };

  return (
    <section id='fotoPrecioNombre' className='productosAleatorios'>
      {Object.values(p).length > 1 && (
        <>
          <article id='productosAleatorios-TarjArticle'>
            <figure className='divImagenArticulo'>
              <img
                className='articuloImagen'
                src={`http://localhost:4000/${p.avatar}`}
                alt={`${p.avatar}`}
              />
            </figure>
            <h2>{`${p.alias} euros`}</h2>
            <h3>{`${p.province}`}</h3>
          </article>
          <form action='' method='POST' onSubmit={votar}>
            <label htmlFor='votos'>
              votos
              <select
                onChange={(e) => setVotos(e.target.value)}
                value={votos}
                name='votos'
                id='votos'
              >
                <option value=''>selecciona</option>

                <option value='1'>
                  &#11088; &#9734; &#9734; &#9734; &#9734;
                </option>
                <option value='2'>
                  &#11088; &#11088; &#9734; &#9734; &#9734;
                </option>
                <option value='3'>
                  &#11088; &#11088; &#11088; &#9734; &#9734;
                </option>
                <option value='4'>
                  &#11088; &#11088; &#11088; &#11088; &#9734;
                </option>
                <option value='5'>
                  &#11088; &#11088; &#11088; &#11088; &#11088;
                </option>
              </select>
            </label>

            <button type='submit'>VOTAR</button>
          </form>
        </>
      )}
    </section>
  );
};
