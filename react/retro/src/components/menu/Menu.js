import React, { useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { CerrarSesion } from '../cerrarSesion/CerrarSesion';
import { useModal } from '../../hooks/useModal';
import { useContext } from 'react';
import { AuthTokenContext } from '../../index';

export const Menu = () => {
  const [abierto, abrirModal, cerrarModal] = useModal(false);
  const [dropdown, setDropdown] = useState(false);
  const [, setToken] = useContext(AuthTokenContext);

  const abrirCerrarDropdown = () => {
    setDropdown(!dropdown);
  };

  const cerrarSesion = (e) => {
    e.preventDefault();
    setToken('');
  };

  return (
    <div className='DesplegarMenu'>
      <Dropdown isOpen={dropdown} toggle={abrirCerrarDropdown}>
        <DropdownMenu>
          <DropdownItem>
            <Link to='/editarUsuario'>Editar Usuario</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to='/ventas'>Vender tu producto</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to='/buzon'>Buzon de Mensajes</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to='/votos'>Votos</Link>
          </DropdownItem>

          <DropdownItem onClick={cerrarSesion}>Cerrar Sesion</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <CerrarSesion abierto={abierto} cerrarModal={cerrarModal}></CerrarSesion>
    </div>
  );
};
