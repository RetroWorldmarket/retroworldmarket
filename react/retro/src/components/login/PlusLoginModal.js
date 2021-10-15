import LoginModal from './LoginModal';

import { useModal } from '../../hooks/useModal';

const PlusLoginModal = () => {
  const [abierto, abrirModal, cerrarModal] = useModal(false);

  return (
    <div>
      <button onClick={abrirModal}>Login</button>
      <LoginModal abierto={abierto} cerrarModal={cerrarModal}></LoginModal>
    </div>
  );
};

export default PlusLoginModal;
