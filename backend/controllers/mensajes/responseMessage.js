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

        // Empezaremos por saber quién quiere obtener los mensajes:
        // Vamos a obtener ese idReqUser:
        const idReqUser = req.userAuth.id;

        // Necesitamos obtener el id del producto al que se hace referencia:
        const idProduct = req.params.idProduct;

        // Ahora le preguntamos a la BdD por los mensajes donde estén idReqUser
        // (como comprador o vendedor) y el producto en cuestión:
        const [data] = await connection.query(
            `
        SELECT * FROM messages
        WHERE idOwner = ? OR idUser = ? AND idProduct = ?
    `,
            [idReqUser, idReqUser, idProduct]
        );

        // Si no tenemos respuesta de la BdD o está vacía, es porque no hubo mensaje
        // previo, y no queremos eso, así que lanzamos un error 409 (Conflict)
        if (!data) {
            const error = new Error('Aún no hay mensajes para contestar');
            error.httpStatus = 409;
            throw error;
        }

        ////////////////////////////////
        /// PREPARANDO EL MENSAJE... ///
        ////////////////////////////////

        // Ahora necesitamos el mensaje que ha enviado en el body:
        const { text } = req.body;

        // Declaramos las variables de manera global para poder acceder a ellas más adelante
        const idOwner = data[0].idOwner;
        const idUser = data[0].idUser;
        let emisor;
        let receptor;

        // Comprobaremos que el nadie se envíe mensajes a sí mismo:
        // Si fuera así, lanzaríamos un error 409 (conflict)
        if (idOwner === idUser) {
            const error = new Error(
                'El remitente y el destinatario del mensaje son el mismo usuario'
            );
            error.httpStatus = 409;
            throw error;
        }

        // Vamos a definir quién envía el mensaje y quién lo recibe y si hay conflicto
        // lanzamos un error:
        if (idReqUser === idOwner) {
            emisor = idReqUser;
            receptor = idUser;
        } else if (idReqUser === idUser) {
            receptor = idReqUser;
            emisor = idUser;
        } else {
            const error = new Error('Usuario no autorizado');
            error.httpStatus = 409;
            throw error;
        }

        // Si todo ha ido bien, enviamos en mensaje a la base de datos:
        await connection.query(
            `
      INSERT INTO messages (idProduct, idOwner, idUser, text, emisor, receptor, createdDateMessage)
      VALUES(?, ?, ?, ?, ?, ?, ?)
    `,
            [
                idProduct,
                idOwner,
                idUser,
                text,
                emisor,
                receptor,
                formatDate(new Date()),
            ]
        );

        //////////////////////////////////////////////////////////////////////////

        res.send({
            status: 'ok',
            text: text,
            emisor: emisor,
            receptor: receptor,
            product: idProduct,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = responseMessage;
