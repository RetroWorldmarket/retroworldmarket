import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export const Paginar = (props) => {
  const { idProduct } = useParams();
  const [numProducto, setNumProducto] = useState(idProduct);
  const pasarProducto = (e) => {
    if (numProducto === props.articulo.length - 1) {
      setNumProducto(0);
    }

    setNumProducto(Number(numProducto) + 1);
  };
  const pasarProductoAtras = (e) => {
    setNumProducto(Number(numProducto) - 1);
  };
  console.log('numproduc', props.articulo.length);

  return (
    <>
      {props.articulo.length > 0 && (
        <>
          <button onClick={pasarProductoAtras}>
            <Link to={`/product/${props.articulo[numProducto].id}`}>
              anterior PRODUCTO
            </Link>
          </button>

          <button onClick={pasarProducto}>
            <Link to={`/product/${props.articulo[numProducto].id}`}>
              SIGUIENTE PRODUCTO
            </Link>
          </button>
        </>
      )}
    </>
  );
};
