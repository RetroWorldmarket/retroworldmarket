import RegistroModal from './RegistroModal';

import { useModal } from '../../hooks/useModal';

const PlusRegistroModal = () => {
  const [abierto, abrirModal, cerrarModal] = useModal(false);

  return (
    <div>
      <button onClick={abrirModal}>Registro</button>
      <RegistroModal
        abierto={abierto}
        cerrarModal={cerrarModal}
      ></RegistroModal>
    </div>
  );
};

export default PlusRegistroModal;
