// Falta importar CSS del componente
import './Modal.css';

// Recuerda que children hace referencia al contenido del componente, y no hace
// falta importarlo, viene automáticamente del Padre.
// También le vamos a pasar el "abierto" y la función que lo cierra.

// Luego haremos un CSS condicional a si el Modal está abierto o cerrado

// Para cerrar el Modal hay que agregarle la función de cerrar al evento onClick del botón.
// También se lo debemos asignar al fondo (para que al clickar fuera se cierre el modal)
//  Esto provoca, por propagación, que se cierre el Modal al clickar en él.
// Para evitarlo ponemos una funcion manejadora "handelModalContenedorClick" que impida la
// propagación (método stopPropagation() de JavaScript)
const Modal = ({ children, abierto, cerrarModal }) => {
  const handelModalContenedorClick = (e) => e.stopPropagation();
  return (
    <div className={`modal ${abierto && 'modal-Abrir'}`} onClick={cerrarModal}>
      <div className='contenedor-Modal' onClick={handelModalContenedorClick}>
        <button className='modal-Cerrar' onClick={cerrarModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
