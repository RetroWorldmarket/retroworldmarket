const getDB = require('../../ddbb/getDB');

const sellRetro = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //obtenemos los datos del usuario vendedor
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = sellRetro;
