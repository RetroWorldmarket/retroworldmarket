import './TarjetaArticulo.css';

export const TarjetaArticulo = () => {
  return (
    <div id='fotoPrecioNombre' className='productosAleatorios'>
      <div className='divImagenArticulo'>
        <img
          className='articuloImagen'
          src='../img/telefonos_images.jpeg'
          alt='Imagen de artículo'
        />
      </div>
      <span id='precio'>
        <h2>300€</h2>
      </span>
      <span id='nombreProducto'>Lote de teléfonos</span>
    </div>
  );
};
