import React from 'react';
import { Categorias } from '../components/categorias/Categorias';
import { OrdenarPor } from '../components/ordenarPor/OrdenarPor';
import { GaleriaProductos } from '../components/galeriaProductos/GaleriaProductos';

export const Catalogo = () => {
  return (
    <div>
      <Categorias />
      <OrdenarPor />
      <GaleriaProductos />
    </div>
  );
};
