////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////   En CONSTRUCCIÓN   /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

const getDB = require('../../ddbb/getDB');

////////////////////////////
/// Obtener los mensajes ///
////////////////////////////

const getMessage = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Empezaremos por saber quién quiere obtener los mensajes:
    // Vamos a obtener ese idReqUser:
    const idReqUser = req.userAuth.id;

    const idProduct = req.params.idProduct;

    // Ahora le preguntamos a la BdD por los mensajes donde estén idReqUser
    // (como comprador o vendedor) y el producto en cuestión:
    const [data] = await connection.query(
      `
        SELECT * FROM messages
        WHERE idOwner = ? OR idUser = ? AND idProducts = ?
    `,
      [idReqUser, idReqUser, idProduct]
    );
    console.log('data tiene : ', data);

    res.send({
      status: 'ok',
      data: data,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getMessage;
