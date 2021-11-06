import { useState, useContext, useEffect } from 'react';
import { AuthTokenContext } from '../../index';
//import { post } from '../../api/post';

export const CrearProducto = () => {
  //
  // Obtenemos la informacion del usuario.
  const [token, , tokenInfo] = useContext(AuthTokenContext);
  console.log('tokenInfo tiene: ', tokenInfo);

  // Asignamos al objeto "form" los valores que va a tener el formulario
  const [form, setForm] = useState({
    nameProduct: '',
    brand: '',
    yearOfProduction: '',
    status: '',
    category: '',
    description: '',
    price: '',
  });

  // Asignamos el reset del formulario
  const vaciarFormulario = () => {
    setForm({
      nameProduct: '',
      brand: '',
      yearOfProduction: '',
      status: '',
      category: '',
      description: '',
      price: '',
    });
  };

  const url = 'http://localhost:4000/sellretro';

  // Funciona que permite que el usuario pueda cambiar los valores iniciales del form.
  const handleChange = (e) => {
    setForm((valor) => ({
      ...valor,
      [e.target.name]: e.target.value,
    }));
  };

  // El botón "enviar" activa estas funcionalidades:
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('e tiene:', e);

    // Definimos el body de la petición.
    const body = {
      nameProduct: form.nameProduct,
      brand: form.brand,
      yearOfProduction: form.yearOfProduction,
      status: form.status,
      category: form.category,
      description: form.description,
      price: form.price,
    };
    //console.log('body tiene:', body);

    // Peticion POST:
    async function postData(url = '', data = {}) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        return response.json();
      } catch (error) {
        console.log(error);
      }
    }

    postData(url, { body }).then((data) => {
      console.log(data);
    });
    vaciarFormulario();
  };

  return (
    <>
      <h3>Crear Producto</h3>
      <form onSubmit={onSubmit}>
        <ul>
          <li>
            <label htmlFor='nameProduct'>
              Nombre :
              <input
                type='text'
                name='nameProduct'
                id='nameProduct'
                placeholder='Nombre...'
                value={form.nameProduct}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label htmlFor='brand'>
              Marca :
              <input
                type='text'
                name='brand'
                id='brand'
                placeholder='Marca...'
                value={form.brand}
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
                value={form.yearOfProduction}
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
                value={form.status}
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
                value={form.category}
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
                value={form.description}
                onChange={handleChange}
              />
            </label>
          </li>
          <li>
            <label htmlFor='price'>
              Precio :
              <input
                type='text'
                name='price'
                id='price'
                placeholder='Precio...'
                value={form.price}
                onChange={handleChange}
              />
            </label>
          </li>
        </ul>
        <button type='submit'>Publicar producto</button>
      </form>
    </>
  );
};
