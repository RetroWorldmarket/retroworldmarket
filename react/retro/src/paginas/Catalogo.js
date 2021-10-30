import React from 'react';
import { Categorias } from '../components/categorias/Categorias';
import { OrdenarPor } from '../components/ordenarPor/OrdenarPor';
import { GaleriaProductos } from '../components/galeriaProductos/GaleriaProductos';
import { useParams } from 'react-router';

export const Catalogo = () => {
  const { search } = useParams();
  return (
    <div>
      <Categorias />
      <OrdenarPor />
      <GaleriaProductos />
    </div>
  );
};
