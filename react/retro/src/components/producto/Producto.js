import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get } from '../../api/get';

export const Producto = () => {
  const [producto, setProducto] = useState({});
  const { idProduct } = useParams();

  useEffect(() => {
    get(`http://localhost:4000/product/${idProduct}`, (body) => {
      setProducto(body.producto);
    });
  }, [idProduct]);
  console.log(producto);

  return (
    <section id='contenedorDelModalDelArticulo'>
      {Object.values(producto).length && (
        <section id='articulo'>
          <figure>
            <img
              src={`http://localhost:4000/${producto.fotos[0].namePhoto}`}
              alt='Imagen de artículo'
            />
          </figure>
          <article>
            <ul>
              <li>Nombre:</li>
              <li>Precio:</li>
              <li>Categoría:</li>
              <li>Estado:</li>
              <li>
                Descripción:
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
              </li>
              <li>Marca:</li>
              <li>Año de fabricación:</li>
              <li>Provincia</li>
              <li>Vendido por:</li>
              <li>Valoraciones:</li>
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
