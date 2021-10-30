import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { TarjetaArticulo } from '../TarjetaArticulo';
import './GaleriaProductos.css';
import { useState, useEffect } from 'react';
import { get } from '../../api/get';

// Falta: componente de paginacion de cada galeria (boton Anterior y Siguiente)
//        componente Footer

export const GaleriaProductos = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const [PeticionPorCategorias, setPeticionPorCategorias] = useState([]);
  const [PeticionSearch, setPeticionSearch] = useState([]);
  const categorias = query.get('category');
  const search = query.get('search');

  useEffect(() => {
    if (search === null) {
      get(`http://localhost:4000/category?category=${categorias}`, (body) => {
        setPeticionPorCategorias(body.data.results);
        setPeticionSearch([]);
      });
    } else {
      get(`http://localhost:4000/search?search=${search}`, (body) => {
        setPeticionSearch(body.data.results);
      });
    }
  }, [categorias, search]);

  return (
    <div>
      <div className='centrado'>
        <h3>Lo último en llegar...</h3>
        <nav className='nav-galeria'>
          {PeticionSearch.length > 0 &&
            PeticionSearch.map((art) => {
              return (
                <TarjetaArticulo
                  id='TarjetaArticulo'
                  key={art.id}
                  articulo={art}
                />
              );
            })}

          {PeticionPorCategorias.length > 0 &&
            PeticionPorCategorias.map((art) => {
              return (
                <TarjetaArticulo
                  id='TarjetaArticulo'
                  key={art.id}
                  articulo={art}
                />
              );
            })}
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
