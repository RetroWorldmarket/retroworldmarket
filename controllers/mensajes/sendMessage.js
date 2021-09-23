const getDB = require('../../ddbb/getDB');

// requerimo formatDate para establecer la fecha de creación del mensaje
const { formatDate } = require('../../helpers');

const sendMessage = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // tests. Bernardo 19/9:
        //console.log('req.userAuth.id =', req.userAuth.id);
        console.log('req.params = ', req.params);
        console.log('req.params.id = ', req.params.idProduct);
        console.log('req.body =', req.body);
        console.log('req.userAuth tiene : ', req.userAuth);

        // Empezaremos con idUser el que escribe el mensaje:
        // idUser ha pasado ya por authUser y tiene un idReqUser...
        // Vamos a obtener ese idReqUser:
        const idReqUser = req.userAuth.id;

        // Necesitamos, también, obtener el id del producto al que hace referencia:
        const idProduct = req.params.idProduct;
        //const { idProduct } = req.body;

        // Ahora necesitamos el mensaje que ha enviado en el body:
        const { text } = req.body;

        // Preguntarle a la Base de Datos Quién es el dueño del producto:
        const [owner] = await connection.query(
            `
      SELECT idUser FROM products WHERE id = ?
      `,
            [idProduct]
        );

        idOwner = owner[0].idUser;
        console.log('idOwner = ', idOwner);
        console.log('idReqUser = ', idReqUser);

        // Para enviar un mensaje necesitaremos saber quién envía, a quién lo envía,
        // qué envía, cuándo lo envía...

        // Declaramos quien va a ser el remitente y el destinatario del primer mensaje:
        let emisor = idReqUser;
        let receptor = idOwner;

        //////////////////////////////////////////
        /// ANULADO. Pasa a responseMessage.js ///
        //////////////////////////////////////////

        // // Para obtener el idmessage, le preguntamos a la BdD por el id del mensaje que recibió
        // // el vendedor
        // let [data] = await connection.query(
        //   `
        //   SELECT * FROM messages WHERE idProduct = ? AND idOwner = ? AND idUser = ?
        // `,
        //   [idProduct, idOwner, idReqUser]
        // );

        // Test de data:
        //console.log('data tiene: ', data);
        //idUser = data[0].idUser;
        //idmessage = data[0].idmessage;

        // if (idOwner === idReqUser) {
        //   // Si el dueño del producto es quien escribe el mensaje, tenemos que obtener el
        //   // destinatario del mensaje, debemos preguntarle a la BdD:
        //   const [idUser] = await connection.query(
        //     `
        //     SELECT idUser FROM messages WHERE idmessage = ?
        //   `,
        //     [idmessage]
        //   );
        //   emisor = idOwner;
        //   receptor = idUser;
        // } else {
        //   emisor = idReqUser;
        //   receptor = idOwner;
        // }

        // Queremos que el primer mensaje lo envíe SIEMPRE el interesado en el
        // producto, NUNCA el vendedor. Si así fuera, lanzamos un error 409 (Conflict):
        if (idOwner === idReqUser) {
            const error = new Error(
                'Debe esperar que los interesados se comuniquen con Ud.'
            );
            error.httpStatus = 409;
            throw error;
        }

        // Por último enviamos el mensaje a la base de datos:
        await connection.query(
            `
      INSERT INTO messages (idProduct, idOwner, idUser, text, emisor, receptor, createdDateMessage)
      VALUES(?, ?, ?, ?, ?, ?, ?)
    `,
            [
                idProduct,
                idOwner,
                idReqUser,
                text,
                emisor,
                receptor,
                formatDate(new Date()),
            ]
        );

        res.send({
            status: 'ok',
            text: text,
            emisor: idReqUser,
            receptor: idOwner,
            product: idProduct,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = sendMessage;
