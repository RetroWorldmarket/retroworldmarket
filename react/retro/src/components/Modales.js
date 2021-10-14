// Importamos el Modal que vamos a usar:
import Modal from './Modal';

// Importamos la lógica que va a tener ese Modal (desarrollada en el hook useModal.js)
import { useModal } from '../hooks/useModal';

const Modales = () => {
  // Aquí declaramos el hook del Modal (viene en un array, ojo al destructurar)
  // Recuerda que esto es para controlar CADA UNO de los componentes INDIVIDUALMENTE
  const [abierto, abrirModal, cerrarModal] = useModal(false);

  // Le tenemos que pasar las funciones de useModal donde
  // queremos que trabajen:
  return (
    <div>
      <h2>Modales</h2>
      <button onClick={abrirModal}>Modal 1</button>
      <Modal abierto={abierto} cerrarModal={cerrarModal}>
        <h3>Modelo de Modal</h3>
        <p>Aquí va el contenido del Modelo de Modal</p>
        <img src='http://placeimg.com/400/400/animals' alt='Animales'></img>
      </Modal>
    </div>
  );
};

export default Modales;
