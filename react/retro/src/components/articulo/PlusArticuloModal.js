import ArticuloModal from './ArticuloModal';
import { useModal } from '../../hooks/useModal';

// FALTA   Añadir al boton la imagen del producto.
export const PlusArticuloModal = () => {
  const [abierto, abrirModal, cerrarModal] = useModal(false);
  return (
    <div>
      <button onClick={abrirModal}>Modal 1</button>
      <ArticuloModal
        abierto={abierto}
        cerrarModal={cerrarModal}
      ></ArticuloModal>
    </div>
  );
};
