///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////         EN CONSTRUCCIÓN         /////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

const getDB = require('../../ddbb/getDB');

// Traemos la función formatDate creada en helpers para establecer la fecha de modificación:
const { formatDate } = require('../../helpers.js');

const editUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Antes que nada tenemos que acceder al usuario (idUser). Esto se hace mediante
    // el PathParam (:idProduct).
    // Obtenemos los PathParams del objeto req.params y, mediante destructuring, nos quedamos con
    // el id del usuario:
    const { idUser } = req.params;

    /////////////////////////////////////////////////////////////////////////////////////////
    ///   AQUÍ TENEMOS UNA DUDA ANOTADA: POR QUÉ el .id de req.userAuth para recoger el   ///
    ///   id del usuario. Es imprescindible??? Cómo funciona realmente??                  ///
    /////////////////////////////////////////////////////////////////////////////////////////

    // Declarar la autorización en una constante. La autorización viene del middleware authUser.js
    //
    const idReqUser = req.userAuth.id;
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUser;
