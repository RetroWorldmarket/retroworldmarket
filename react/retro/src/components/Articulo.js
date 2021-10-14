import React, { useState } from 'react';

export const Articulo = () => {
  return (
    <div id='contenedorDelModalDelArticulo'>
      <div id='modalDelArticulo'>
        <button>
          <a href='./index.html'>Volver al catálogo</a>
        </button>
        {/* <!-- Aquí irá el producto en sí --> */}
        <section id='articulo'>
          <div id='fotoPrecioNombre'>
            <div id='marcoImagen'>
              <img
                class='articuloImagen'
                src='./img/telefonos_images.jpeg'
                alt='Imagen de artículo'
              />
            </div>
            <span id='precio'>
              <h2>300€</h2>
            </span>
            <span id='nombreProducto'>Lote de teléfonos</span>
          </div>
          <article id='propiedadesProducto'>
            <ul>
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

        <section id='sectionMensajeAlVendedor'>
          <aside id='asideMensajeAlVendedor'>
            <caption>Mensaje al Vendedor</caption>
            <form action='/message'>
              <label for=''>
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
          </aside>
        </section>

        <section id='articuloPaginacion'>
          <button>
            <a href='/'>Artículo siguiente</a>
          </button>
          <button>
            <a href='/'>Artículo prévio</a>
          </button>
        </section>
      </div>
    </div>
  );
};
