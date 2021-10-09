// primero nos conectamos a la BD (getDB)
const getDB = require('../../ddbb/getDB.js');
//importamos la fecha de eliminacion de producto
//const { formatDate } = require('../../helpers.js');
const { borrarFoto } = require('../../helpers');

//creamos la funcion de DeleteProduct y establecemos la conecction
const deleteProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //obtenemos el idProduct a eliminar
    const { idProduct } = req.params;

    //comprobamos que el idProduct exista
    const [product] = await connection.query(
      `
SELECT * FROM products WHERE id = ?`,
      [idProduct]
    );

    if (product.length < 1) {
      const error = new Error('El producto no fue encontrado');
      error.httpStatus = 404;
      throw error;
    }

    //verificamos que el usuario que desea eliminar el producto sea administrador
    if (
      req.userAuth.id !== Number(product[0].idUser) &&
      req.userAuth.rol !== 'administrador'
    ) {
      //si no es administrador de producto lanzamos error
      const error = new Error(
        'Debe ser Aministrador o el creador del producto para poder eliminarlo'
      );

      error.httpStatus = 401;
      throw error;
    }
    //eliminamos fotos de la tabla de fotos
    //recogemos informacion de base de datos
    const [data] = await connection.query(
      `
              SELECT namePhoto FROM photos WHERE idProduct = ?
              
          `,
      [idProduct]
    );
    console.log(data[0].namePhoto);
    for (const d of data) {
      await borrarFoto(d.namePhoto);

      await connection.query(
        `DELETE FROM photos WHERE idProduct = ?`,

        [idProduct]
      );
    }

    // ya identificado el producto borramos producto
    await connection.query(
      `
DELETE FROM products WHERE id = ?
`,
      [idProduct]
    );

    res.send({
      status: 'ok',
      message: 'Producto eliminado',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteProduct;
