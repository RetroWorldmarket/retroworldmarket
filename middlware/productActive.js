///////////////////////////////////////////////////////////////////////
/// Middleware para comprobar que un producto esté activo en el BdD ///
///////////////////////////////////////////////////////////////////////

const getDB = require('../ddbb/getDB');

const productActive = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idProduct } = req.params;

    const [data] = await connection.query(
      `
    SELECT * FROM products WHERE id = ?
    `,
      [idProduct]
    );

    console.log('Data tiene: ', data);

    if (!data[0].active) {
      const error = new Error(
        'El producto seleccionado no está activo actualmente'
      );
      error.httpStatus = 404;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = productActive;
