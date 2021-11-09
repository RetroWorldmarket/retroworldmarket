const getDB = require('../../ddbb/getDB');

const historial = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    const idReqUser = req.userAuth.id;
    const [historial] = await connection.query(
      `
        SELECT * FROM historialProducts WHERE idUser = ? AND votado = false;
        `,
      [idReqUser]
    );

    res.send({
      status: 'ok',
      body: historial,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = historial;
