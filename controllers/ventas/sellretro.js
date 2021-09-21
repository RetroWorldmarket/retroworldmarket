const getDB = require('../../ddbb/getDB');
const { formatDate } = require('../../helpers');

const sellRetro = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idProduct, idUser } = req.params;

    const [sold] = await connection.query(
      `
      SELECT * FROM products WHERE id = ?
      `,
      [Number(idProduct)]
    );

    console.log(sold[0].sold);
    if (sold[0].sold === 1 || sold[0].reserved === 0) {
      const error = new Error(
        'El producto no está reservado previamente. O no se puede vender dos veces'
      );
      error.httpStatus = 409;
      throw error;
    }

    await connection.query(
      `
    UPDATE products SET reserved = ?, sold = ? 
    WHERE id = ?
    `,
      [0, 1, Number(idProduct)]
    );

    const [venta] = await connection.query(
      `
    INSERT INTO historialProducts (idProduct, idUser, dateSoldProduct)
    VALUES (?, ?, ?)
    `,
      [Number(idProduct), idUser, formatDate(new Date())]
    );

    res.send({
      status: 'ok',
      message: `Producto vendido a ${idUser}`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = sellRetro;
