// La solicitud de reserva de producto, es un trámite donde el usuario (idReqUser)
// le solicita al vendedor (idOwner) que le reserve para sí el producto (idProduct)

const getDB = require('../../ddbb/getDB');

// Requerimos formatDate para establecer la fecha de creación del mensaje que enviaremos
const { formatDate } = require('../../helpers');

const requestReserve = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Empezaremos por averiguar QUIÉN lo solicita (idReqUser) y qué PRODUCTO quiere:
    const idReqUser = req.userAuth.id;
    const idProduct = req.params.idProduct;

    // Ahora con estos datos, podemos preguntarle a la BdD quién es el dueño del
    // producto, para enviarle esta solicitud:

    const [data] = await connection.query(
      `
        SELECT * FROM products WHERE id = ?
    `,
      [idProduct]
    );

    const idOwner = data[0].idUser;
    const emisor = idReqUser;
    const receptor = idOwner;
    ///////////////////////////////////////////////////////////////////////////////////

    // Ahora enviaríamos una notificación por mensaje (O POR PANTALLA???) a idOwner diciendole
    // que idReqUser quiere reservar idProduct.

    ///////////////////////////////////////////////////////////////////////////
    /////////////////////////     IMPORTANTE!!!!!!    /////////////////////////
    /// Podríamos enviar en el mensaje al vendedor dos enlaces:
    /// 1) Para aceptar la propuesta de Reserva.
    /// 2) Para rechazar la propuesta de Reserva.
    ///
    /// ... y cómo se haría??????
    ///
    ////////////////////////////////////////////////////////////////////////////

    // Preparamos el mensaje:
    const text = `El usuario ${idReqUser} solicita que le reserves tu retro `;

    await connection.query(
      `
        INSERT INTO messages (idProducts, idOwner, idUser, text, emisor, receptor, createdDateMessage)
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

    //Tests:
    console.log('idReqUser :', idReqUser);
    console.log('idProduct :', idProduct);
    console.log('data tiene :', data);
    console.log('idOwner tiene :', idOwner);
    console.log('text tiene :', text);

    res.send({
      status: 'ok',
      Messages: 'La solicitud se ha enviado correctamente',
      text: text,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = requestReserve;
