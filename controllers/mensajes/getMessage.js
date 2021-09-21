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

    // Empezaremos por saber quén quiere obtener los mensajes:
    // Vamos a obtener ese idReqUser:
    const idReqUser = req.userAuth.id;

    const idProduct = req.params.idProduct;

    console.log('idProduct tiene : ', idProduct);

    console.log('idReqUser tiene : ', idReqUser);

    // Ahora le preguntamos a la BdD por los mensajes donde esté idReqUser como vendedor:
    const [data] = await connection.query(
      `
        SELECT * FROM messages
        WHERE idUser = ? AND idProducts = ?
    `,
      [idReqUser, idProduct]
    );
    console.log('data tiene : ', data);

    //
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getMessage;
