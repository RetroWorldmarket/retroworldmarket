// Falta importar CSS del componente
import './OrdenarPor.css';
import { useLocation } from 'react-router-dom';

export const OrdenarPor = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const q = query.toString();
  const ff = `?${q}`;
  const final = new URLSearchParams(ff);
  console.log('primera query', ff);

  const clikar = (e) => {
    final.append('order', 'ASC');
    console.log(query.toString());
  };

  return (
    <div className='ordenarPor'>
      <form action={`/catalogo${q}`} method='GET'>
        <label htmlFor='precio'>
          Precio
          <select name='precio' id='precio'>
            <option value='0-5'>0-5</option>
            <option value='5-10'>5-10</option>
            <option value='10-20'>10-20</option>
            <option value='20-50'>20-50</option>
            <option value='50-100'>50-100</option>
            <option value='100-200'>100-200</option>
            <option value='200-500'>200-500</option>
            <option value='+500'>+500</option>
          </select>
        </label>

        <label htmlFor='estado'>
          {' '}
          Estado
          <select name='estado' id='estado'>
            <option value='1 estrella'>
              &#11088; &#9734; &#9734; &#9734; &#9734;
            </option>
            <option value='2 estrella'>
              &#11088; &#11088; &#9734; &#9734; &#9734;
            </option>
            <option value='3 estrella'>
              &#11088; &#11088; &#11088; &#9734; &#9734;
            </option>
            <option value='4 estrella'>
              &#11088; &#11088; &#11088; &#11088; &#9734;
            </option>
            <option value='5 estrella'>
              &#11088; &#11088; &#11088; &#11088; &#11088;
            </option>
          </select>
        </label>

        <label htmlFor='ubicacion'>
          {' '}
          Provincia
          <select name='ubicacion' id='ubicacion'>
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
        <button onClick={clikar} type='submit'>
          eeeeee
        </button>
      </form>
    </div>
  );
};

//export default OrdenarPor;
