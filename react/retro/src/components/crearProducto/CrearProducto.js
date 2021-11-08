import { useState, useContext, useRef } from 'react';
import { AuthTokenContext } from '../../index';

//import { post } from '../../api/post';

export const CrearProducto = () => {
  const formulario = useRef();
  //
  // Obtenemos la informacion del usuario.
  const [token] = useContext(AuthTokenContext);
  const [file_1, setFile_1] = useState();
  const [file_2, setFile_2] = useState();
  const [file_3, setFile_3] = useState();

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
    // setFile_1(null);
    // setFile_2(null);
    // setFile_3(null);

    setForm({
      nameProduct: '',
      brand: '',
      yearOfProduction: '',
      status: '',
      category: '',
      description: '',
      price: '',
    });
    formulario.current.reset();
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
    const data = new FormData();
    data.append('nameProduct', form.nameProduct);
    data.append('brand', form.brand);
    data.append('yearOfProduction', form.yearOfProduction);
    data.append('status', form.status);
    data.append('category', form.category);
    data.append('description', form.description);
    data.append('price', form.price);

    if (file_1) {
      data.append('photo_1', file_1);
    }
    if (file_2) {
      data.append('photo_2', file_2);
    }
    if (file_3) {
      data.append('photo_3', file_3);
    }

    for (const p of data) {
      console.log(p);
    }
    // Peticion POST:
    async function postData(url, data) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: data,
        });
        return response.json();
      } catch (error) {
        console.log(error);
      }
    }

    postData(url, data).then((data) => {
      console.log(data);
      vaciarFormulario();
    });
  };

  return (
    <>
      <h3>Crear Producto</h3>
      <form onSubmit={onSubmit} ref={formulario}>
        <ul>
          <li>
            <label>Select file to upload</label>
            <input
              type='file'
              onChange={(e) => {
                setFile_1(e.target.files[0]);
              }}
            />
          </li>
          <li>
            <label>Select file to upload</label>
            <input
              type='file'
              onChange={(e) => {
                setFile_2(e.target.files[0]);
              }}
            />
          </li>
          <li>
            <label>Select file to upload</label>
            <input
              type='file'
              onChange={(e) => {
                setFile_3(e.target.files[0]);
              }}
            />
          </li>

          <li>
            <label htmlFor='nameProduct'>
              Nombre :
              <input
                required
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
                required
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
                type='number'
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
                required
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
                required
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
                required
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
                required
                type='number'
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
