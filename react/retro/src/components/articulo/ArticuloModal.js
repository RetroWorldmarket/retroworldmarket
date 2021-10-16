import './ArticuloModal.css';
import { TarjetaArticulo } from '../TarjetaArticulo';
import { PropiedadesArticulo } from '../propiedadesArticulo/PropiedadesArticulo';

const ArticuloModal = ({ children, abierto, cerrarModal }) => {
  const handelModalContenedorClick = (e) => e.stopPropagation();
  return (
    <div className={`modal ${abierto && 'modal-Abrir'}`} onClick={cerrarModal}>
      <div className='contenedor-Modal' onClick={handelModalContenedorClick}>
        <button className='modal-Cerrar' onClick={cerrarModal}>
          X
        </button>
        <div id='contenedorDelModalDelArticulo'>
          <div id='modalDelArticulo'>
            <button>
              <a href='./index.html'>Volver al catálogo</a>
            </button>
            {/* <!-- Aquí irá el producto en sí --> */}
            <section id='articulo'>
              <TarjetaArticulo></TarjetaArticulo>
              <PropiedadesArticulo></PropiedadesArticulo>
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
      </div>
    </div>
  );
};

export default ArticuloModal;
