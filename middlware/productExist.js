const getDB = require('../ddbb/getDB');

const productExist = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idProduct } = req.params;

    console.log(idProducts)
    
    const [exist] = await connection.query(
      `
    SELECT * FROM products WHERE id = ?
    `,
      [idProduct]
    );
      console.log(exist[0])

    if (exist[0] < 1) {
      const error = new Error('El producto seleccionado no existe');
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

module.exports = productExist;
