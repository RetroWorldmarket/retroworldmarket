///////////////////////////////////////////////////////////////////////////
////////////////////////// EN CONSTRUCCIÓN ////////////////////////////////
///////////////////////////////////////////////////////////////////////////

const getDB = require('../../ddbb/getDB');

// Importamos la función que hicimos para formatear fechas desde helpers.js:
const { formatDate } = require('../../helpers.js');

const responseMessage = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Para enviar un mensaje de respuesta necesitaremos saber quién envió el sendMessage (idReqUser),
    // a quién lo envía, qué envía, cuándo lo envía... Sabiendo que hay datos previos en la BdD, esto
    // sería una continuación de ese mensaje, (respuesta).
    // Vamos por partes:

    // Quién envió??? --> idReqUser(comprador) a idOwner(dueño) A TRAVÉS DEL PRODUCTO

    // Necesitamos obtener el id del producto al que se hace referencia:
    const idProduct = req.params.idProduct;

    // Empezaremos por hacer la consulta a la base de datos preguntando por ese producto en concreto:
    const [data] = await connection.query(
      `
        SELECT * FROM messages WHERE idProducts = ?
        `,
      [idProduct]
    );
    console.log(data);

    // Extraemos todos los datos que nos interesan de la respuesta de la BdD:
    const idOwner = data[0].idOwner;
    const idUser = data[0].idUser;
    const idMessage = data[0].idmessage;

    // Establecemos la fecha actual, para pasarle la fecha de creación del mensaje:
    const createdDateMessage = formatDate(new Date());

    // Ahora necesitamos el mensaje que ha enviado en el body:
    const { text } = req.body;

    //////////////////////
    /// Comprobaciones ///
    //////////////////////

    // Comprobaremos que el nadie se envíe mensajes a sí mismo:
    // Si fuera así, lanzaríamos un error 409 (conflict)
    if (idOwner === idUser) {
      const error = new Error(
        'El remitente y el destinatario del mensaje son el mismo usuario'
      );
      error.httpStatus = 409;
      throw error;
    }

    // Comprobaremos que el mensaje es una respuesta a un mensaje anterior al vendedor:
    if (idMessage.length < 1 || !idOwner) {
      const error = new Error(
        'Tiene que esperar a que los interesados le escriban para responderle'
      );
      error.httpStatus = 409;
      throw error;
    }

    // Solo si hubo un mensaje previo al vendedor, este puede contestar
    if (idMessage.length > 0) {
      await connection.query(
        `
              INSERT INTO messages (idProducts, idOwner, idUser, text, createdDateMessage)
              VALUES (?, ?, ?, ?, ?)
          `,
        [idProduct, idOwner, idUser, text, createdDateMessage]
      );
    }

    // // Empezaremos con idUser el que escribe el mensaje:
    // // idUser ha pasado ya por authUser y tiene un idReqUser... Aunque en los tests aún no lo tiene

    // // Guardamos la autorización en una constante. La autorización viene del middleware authUser.js
    // // Este es el usuario que hace la request
    // const idReqUser = req.userAuth.id;

    res.send({
      status: 'ok',
      text: text,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = responseMessage;
