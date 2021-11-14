// Falta importar CSS del componente
import './OrdenarPor.css';
import { useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

export const OrdenarPor = () => {
  const location = useLocation();

  const search = location.search;
  const history = useHistory();

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const category = params.get('category');
  const searchString = params.get('search');

  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState('');
  const [provincia, setProvincia] = useState('');

  const [filter, setFilter] = useState(search);

  useEffect(() => {
    setPrecio('');
    setEstado('');
    setProvincia('');
  }, [category, searchString]);

  useEffect(() => {
    //const params = new URLSearchParams(search);

    if (precio) {
      params.set('precio', precio);
    }

    if (estado) {
      params.set('estado', estado);
    }

    if (provincia) {
      params.set('provincia', provincia);
    }

    setFilter(params.toString());
  }, [precio, estado, provincia, params]);

  return (
    <div className='ordenarPor'>
      <form action='' method='GET'>
        <label htmlFor='precio'>
          Precio
          <input
            type='number'
            step='10'
            min='0'
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            name='precio'
            id='precio'
          ></input>
        </label>

        <label htmlFor='estado'>
          Estado
          <select
            onChange={(e) => setEstado(e.target.value)}
            value={estado}
            name='estado'
            id='estado'
          >
            <option value=''>selecciona</option>

            <option value='No funciona'>No funciona</option>
            <option value='A veces falla'>A veces falla</option>
            <option value='Bien'>Bien</option>
            <option value='Muy bien'>Muy bien</option>
            <option value='Excelente'>Excelente</option>
          </select>
        </label>

        <label htmlFor='ubicacion'>
          Provincia
          <select
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            name='ubicacion'
            id='ubicacion'
          >
            <option value=''>selecciona</option>

            <option value='cualquiera'>Cualquiera</option>
            <option value='a coruña'>A Coruña</option>
            <option value='alava'>Álava</option>
            <option value='albacete'>Albacete</option>
            <option value='alicante'>Alicante</option>
            <option value='almeria'>Almería</option>
            <option value='asturias'>Asturias</option>
            <option value='avila'>Ávila</option>
            <option value='badajoz'>Badajoz</option>
            <option value='baleares'>Baleares</option>
            <option value='barcelona'>Barcelona</option>
            <option value='burgos'>Burgos</option>
            <option value='caceres'>Cáceres</option>
            <option value='cadiz'>Cádiz</option>
            <option value='cantabria'>Cantabria</option>
            <option value='castellon'>Castellón</option>
            <option value='ceuta'>Ceuta</option>
            <option value='ciudad real'>Ciudad Real</option>
            <option value='cordoba'>Córdoba</option>
            <option value='cuenca'>Cuenca</option>
            <option value='girona'>Girona</option>
            <option value='granada'>Granada</option>
            <option value='guadalajara'>Guadalajara</option>
            <option value='gipuzkoa'>Gipuzkoa</option>
            <option value='huelva'>Huelva</option>
            <option value='hesca'>Huesca</option>
            <option value='jaen'>Jaén</option>
            <option value='la rioja'>La Rioja</option>
            <option value='las palmas'>Las Palmas</option>
            <option value='leon'>León</option>
            <option value='lerida'>Lérida</option>
            <option value='lugo'>Lugo</option>
            <option value='madrid'>Madrid</option>
            <option value='malaga'>Málaga</option>
            <option value='melilla'>Melilla</option>
            <option value='murcia'>Murcia</option>
            <option value='navarra'>Navarra</option>
            <option value='ourense'>Ourense</option>
            <option value='palencia'>Palencia</option>
            <option value='pontevedra'>Pontevedra</option>
            <option value='salamanca'>Salamanca</option>
            <option value='segovia'>Segovia</option>
            <option value='sevilla'>Sevilla</option>
            <option value='soria'>Soria</option>
            <option value='tarragona'>Tarragona</option>
            <option value='santa cruz de tenerife'>
              Santa Cruz de Tenerife
            </option>
            <option value='teruel'>Teruel</option>
            <option value='toledo'>Toledo</option>
            <option value='valencia'>Valencia</option>
            <option value='valladolid'>Valladolid</option>
            <option value='vizcaya'>Vizcaya</option>
            <option value='zamora'>Zamora</option>
            <option value='zaragoza'>Zaragoza</option>
          </select>
        </label>
        <button
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            history.push(`${location.pathname}?${filter}`);
          }}
        >
          Filtrar
        </button>
      </form>
    </div>
  );
};

//export default OrdenarPor;
