import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { TarjetaArticulo } from '../TarjetaArticulo';
import './GaleriaProductos.css';
import { useState, useEffect } from 'react';
import { get } from '../../api/get';

export const GaleriaProductos = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const [Peticion, setPeticion] = useState([]);
  const [paginas, setPaginas] = useState([]);
  const [numPagina, setNumPagina] = useState(1);
  const [MasBuscado, setMasBuscado] = useState([]);
  const [LoUltimo, setLoUltimo] = useState([]);
  const categorias = query.get('category');
  const search = query.get('search');

  useEffect(() => {
    if (categorias) {
      get(
        `http://localhost:4000/category?category=${categorias}&page=${numPagina}`,
        (body) => {
          setPeticion([]);
          setPeticion(body.data.results);
          setPaginas(body.data.info);
        }
      );
    } else if (search) {
      get(
        `http://localhost:4000/search?search=${search}&page=${numPagina}`,
        (body) => {
          setPeticion([]);

          setPeticion(body.data.results);
          setPaginas(body.data.info);
        }
      );
    } else {
      get(`http://localhost:4000/inicio`, (body) => {
        setMasBuscado(body.productos);
      });
      get(`http://localhost:4000/inicio`, (body) => {
        setLoUltimo(body.productos);
      });
    }
  }, [categorias, search, numPagina]);

  const pasarSiguientePagina = (e) => {
    return setNumPagina(numPagina + 1);
  };

  const pasarPreviaPagina = (e) => {
    return setNumPagina(numPagina - 1);
  };

  return (
    <div>
      {(search || categorias) && (
        <div className='centrado'>
          <nav className='nav-galeria'>
            {Peticion.length > 0 &&
              Peticion.map((art) => {
                return (
                  <TarjetaArticulo
                    id='TarjetaArticulo'
                    key={art.id}
                    articulo={art}
                  />
                );
              })}
          </nav>
          {paginas.prev && (
            <button type='submit' onClick={pasarPreviaPagina}>
              PREVIO
            </button>
          )}
          {paginas.next && (
            <button type='submit' onClick={pasarSiguientePagina}>
              SIGUIENTE
            </button>
          )}
        </div>
      )}{' '}
      :
      {!categorias && !search && (
        <section>
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
          </div>
        </section>
      )}
      <button>
        <Link to='/'>Volver al inicio</Link>
      </button>
      <Footer />
    </div>
  );
};
