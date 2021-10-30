import React, { useEffect } from 'react';
import { Link ,useLocation} from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { TarjetaArticulo } from '../TarjetaArticulo';
import './GaleriaProductos.css';
import { useState } from 'react';
import { get } from '../../api/get';


// Falta: componente de paginacion de cada galeria (boton Anterior y Siguiente)
//        componente Footer

export const GaleriaProductos = () => {
    function useQuery() {
   return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  console.log(query.get("category"));
    const [PeticionPorCategorias, setPeticionPorCategorias]=useState([])
    const categorias = query.get ("category")

    useEffect (()=>{
        get(
          `http://localhost:4000/category?category=${categorias}`,
        (body) =>{setPeticionPorCategorias(body.data.results)}
        )
     },[]) 
    console.log(PeticionPorCategorias)
  return (
    <div>
        <div className='centrado'>
        <h3>Lo último en llegar...</h3>
        <nav className='nav-galeria'>
          <TarjetaArticulo articulo={PeticionPorCategorias[0]} />
         
        </nav>
      </div>
      <div className='centrado'>
        <h3>Lo más buscado...</h3>
        <nav className='nav-galeria'>
          {/* <TarjetaArticulo />
          <TarjetaArticulo />
          <TarjetaArticulo /> */}
        </nav>
        <button>
          <Link to='/'>Volver al inicio</Link>
        </button>
      </div>
      <Footer />
    </div>
  );
};
