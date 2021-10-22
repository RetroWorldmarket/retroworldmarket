import React, { useState, useEffect } from 'react';
import { InicioHeader } from '../components/InicioHeader';
import { Categorias } from '../components/categorias/Categorias';
import { OrdenarPor } from '../components/ordenarPor/OrdenarPor';
import { GaleriaProductos } from '../components/galeriaProductos/GaleriaProductos';

export const Catalogo = () => {
  return (
    <div>
      <InicioHeader />
      <Categorias />
      <OrdenarPor />
      <GaleriaProductos />
    </div>
  );
};
