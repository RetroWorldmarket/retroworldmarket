// Aquí abstraemos la lógica del Modal

// ¿Dónde lo usaremos??
// Allí donde llamemos al Modal!! (en esta plantilla será Modales.js)

// Importamos useState de react
import { useState } from 'react';

// Creamos la función y le damos un valor inicial (para Modal cerrado)
export const useModal = (inicial = false) => {
  // Creamos la variable de estado y la funcion que la modifica.
  const [abierto, setAbierto] = useState(inicial);

  // Nos hace falta un método para abrir el Modal:
  // (declaramos una función y le decimos que ponga "abierto" a TRUE con
  // el método setAbierto)
  const abrirModal = () => setAbierto(true);

  // Hacemos algo similar para cerrar el Modal:
  const cerrarModal = () => setAbierto(false);

  // ¿Qué retorna el hook???
  return [abierto, abrirModal, cerrarModal];
};
