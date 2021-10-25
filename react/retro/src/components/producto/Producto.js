import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get } from '../../api/get';

export const Producto = () => {
  const [producto, setProducto] = useState({});
  //creamos un estado para cambiar las fotos con las posiciones del array
  //empieza por 0 porque es la posición inicial del array
  const [foto, setFoto] = useState(0);
  const { idProduct } = useParams();

  useEffect(() => {
    get(`http://localhost:4000/product/${idProduct}`, (body) => {
      setProducto(body.producto);
    });
  }, [idProduct]);

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

  return (
    <section id='contenedorDelModalDelArticulo'>
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
      <section id='sectionMensajeAlVendedor'>
        <button>
          <Link to='/' />
        </button>
        <legend>Mensaje al Vendedor</legend>
        <form action='/message'>
          <label htmlFor=''>
            <input
              id='inputMensajeAlVendedor'
              type='text'
              placeholder='Escribe tu mensaje...'
            />
          </label>
          <button>Enviar</button>
        </form>
        <div id='divSolicitarReserva'>
          <button id='botonSolicitarReserva'>Solicitar reserva</button>
        </div>
      </section>
      <aside>
        <button>
          <a href='/'>Artículo siguiente</a>
        </button>
        <button>
          <a href='/'>Artículo prévio</a>
        </button>
      </aside>
    </section>
  );
};
