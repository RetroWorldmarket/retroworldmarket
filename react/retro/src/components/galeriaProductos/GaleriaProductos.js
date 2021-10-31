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
  const [MasBuscado,setMasBuscado] = useState([]);
  const [LoUltimo,setLoUltimo]= useState([]);
  const categorias = query.get('category');
  const search = query.get('search');

  useEffect(() => {
    if (categorias) {
      get(`http://localhost:4000/category?category=${categorias}`, (body) => {
        setPeticionPorCategorias(body.data.results);
        setPeticionSearch([]);
      });
    } else if (search) {
      get(`http://localhost:4000/search?search=${search}`, (body) => {
        setPeticionSearch(body.data.results);
      })} else {
        get(`http://localhost:4000/inicio`, (body) => {setMasBuscado (body.productos)});
        get(`http://localhost:4000/inicio`, (body) => {setLoUltimo (body.productos)});
        

      }
      
    
  }, [categorias, search]);
  
  return (
    <div>
      {(search || categorias ) && 
      <div className='centrado'>
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
          } :
      {(!categorias && !search) && <section>
         <div className='centrado'>
         <h3>Lo último en llegar...</h3>
         <nav className='nav-galeria'>
         {LoUltimo.length > 0 &&
            LoUltimo.map((art) => {
              return (
                <TarjetaArticulo
                  id='TarjetaArticulo'
                  key={art.id}
                  articulo={art}
                />
              );
            })}
         </nav>
         <button>
           <Link to='/'>Volver al inicio</Link>
         </button>
       </div>
      <div className='centrado'>
        <h3>Lo más buscado...</h3>
        <nav className='nav-galeria'>
        {MasBuscado.length > 0 &&
            MasBuscado.map((art) => {
              return (
                <TarjetaArticulo
                  id='TarjetaArticulo'
                  key={art.id}
                  articulo={art}
                />
              );
            })}
        </nav>
        <button>
          <Link to='/'>Volver al inicio</Link>
        </button>
      </div>
      </section>
}
      <Footer />
    </div>
  );
};
