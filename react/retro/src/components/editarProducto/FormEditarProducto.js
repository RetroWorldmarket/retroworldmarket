import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AuthTokenContext } from '../../index';
//import { post } from '../../api/post';

export const FormEditarProducto = (idProduct) => {
  //
  // Obtenemos la informacion del usuario.
  const [token, , tokenInfo] = useContext(AuthTokenContext);
  //console.log('tokenInfo tiene: ', tokenInfo.id);

  const item = idProduct.idProduct.producto;

  // Asignamos los valores por defecto. Serán los valores antiguos del usuario.

  ///////////////////////////////////////////////////////////////////
  // NOTA: Estoy teniendo dificultades para obtener "active"
  // de la BdD (no encuentro dónde se agregan a "tokenInfo").
  //  De manera PROVISIONAL voy a establecer que si "sold" es falso, "active"
  // es verdadero.
  if (!item.sold) {
    item.active = true;
  }

  const [value, setValue] = useState({
    active: `${item.active}`,
    idUser: `${tokenInfo.id}`,
    createdDate: `${item.createdDate}`,
    id: `${item.id}`,
    nameProduct: `${item.nameProduct}`,
    brand: `${item.brand}`,
    category: `${item.category}`,
    description: `${item.description}`,
    yearOfProduction: `${item.yearOfProduction}`,
    status: `${item.status}`,
    price: `${item.price}`,
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const url = 'http://localhost:4000';

  // Función que realiza la peticion PUT controlada por el submit del form
  // /sellretro/:idProduct
  const updateData = async (e) => {
    //e.preventDefault();
    try {
      let endpoint = `${url}/sellretro/${item.id}`;
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          value,
        }),
      });

      const respuesta = await response.json();
      console.log('Respuesta tiene :', respuesta);
    } catch (error) {
      console.error(error);
      //toast.error()
    } // finally {toast.info(respuesta.product.message)}
  };

  return (
    <>
      <form onSubmit={updateData()} className='crear-producto'>
        <ul className='editar-articulo'>
          <li>
            <label htmlFor='nameProduct'>
              Nombre del Artículo:
              <input
                type='text'
                name='nameProduct'
                id='nameProduct'
                value={value.nameProduct}
                onChange={handleChange}
              ></input>
            </label>
          </li>
          <li>
            <label htmlFor='brand'>
              Marca :
              <input
                type='text'
                name='brand'
                id='brand'
                value={value.brand}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label htmlFor='yearOfProduction'>
              Año de fabricación :
              <input
                type='text'
                name='yearOfProduction'
                id='yearOfProduction'
                placeholder='Año de fabricación...'
                value={value.yearOfProduction}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label htmlFor='status'>
              Estado del producto :
              <select
                name='status'
                id='status'
                value={value.status}
                onChange={handleChange}
              >
                <option value=''>-- Seleccione --</option>
                <option value='No funciona'>No funciona</option>
                <option value='A veces falla'>A veces falla</option>
                <option value='Bien'>Bien</option>
                <option value='Muy bien'>Muy bien</option>
                <option value='Excelente'>Excelente</option>
              </select>
            </label>
          </li>
          <li>
            <label htmlFor='category'>
              Categoría :
              <select
                name='category'
                id='category'
                value={value.category}
                onChange={handleChange}
              >
                <option value=''>-- Seleccione --</option>
                <option value='ordenadores'>Ordenadores</option>
                <option value='televisores'>Televisores</option>
                <option value='telefonia'>Telefonía</option>
                <option value='musica y radio'>Música y Radio</option>
                <option value='consolas y juegos'>Consolas y Juegos</option>
              </select>
            </label>
          </li>
          <li>
            <label htmlFor='description'>
              Descripción :
              <textarea
                type='text'
                name='description'
                id='description'
                placeholder='Describa el producto...'
                value={value.description}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label htmlFor='price'>
              Precio (€) :
              <input
                type='text'
                name='price'
                id='price'
                placeholder='Precio...'
                value={value.price}
                onChange={handleChange}
              />
            </label>
          </li>
        </ul>
        <button type='submit' className='boton-actualizar-datos-producto'>
          Actualizar datos del producto
        </button>
      </form>
    </>
  );
};
