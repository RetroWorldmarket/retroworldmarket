////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////   En CONSTRUCCIÓN   /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//  FALLOS:
// - Nota 21/9 de Bernardo: No lee la función getMessage, aunque la ruta es correcta (a priori)
//                          Carga los console.log de sendMessage.js, pero no los propios de getMessage

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
    //const idReqUser = req.userAuth.id;

    // Para tests vamos a enviar el idUser por el body, a ver si lo lee y procesa la query:
    const idUser = req.body;

    // Comprobar:
    console.log('idUser = ', idUser);

    // Ahora le preguntamos a la BdD por los mensajes donde esté idUser como vendedor:
    const [data] = await connection.query(
      `
        SELECT * FROM messages
        WHERE idOwner = ?
    `,
      [idUser]
    );
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getMessage;
