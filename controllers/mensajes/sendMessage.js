const getDB = require('../../ddbb/getDB');

const sendMessage = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Para enviar un mensaje necesitaremos saber quién envía, a quién lo envía,
    // qué envía, cuándo lo envía...
    // Vamos por partes:

    // Quién envia??? --> idUser(comprador) o idOwner(dueño)

    // tests. Bernardo 19/9:
    //console.log('req.userAuth.id =', req.userAuth.id);
    console.log('req.params = ', req.params);
    console.log('req.params.id = ', req.params.idProduct);
    console.log('req.body =', req.body);

    // Empezaremos con idUser el que escribe el mensaje:
    // idUser ha pasado ya por authUser y tiene un idReqUser... Aunque en los tests aún no lo tiene
    // Vamos a obtener ese idReqUser:
    // const idReqUser = req.userAuth.id;

    // Necesitamos, también obtener el id del producto al que hace referencia:
    const idProduct = req.params.idProduct;
    //const { idProduct } = req.body;

    // Ahora necesitamos el mensaje que ha enviado en el body:
    const { text } = req.body;

    // Preguntarle a la Base de Datos Quién es el dueño del producto:
    const [idOwner] = await connection.query(
      `
        SELECT idUser FROM products WHERE id = ?
    `,
      [idProduct]
    );

    console.log('idOwner = ', idOwner);

    // CREATE TABLE messages (
    //     idProducts  INT NOT NULL,
    //     FOREIGN KEY (idProducts) REFERENCES products(id),
    //     idOwner INT NOT NULL,
    //     FOREIGN KEY (IdUser) REFERENCES products (idUser),
    //     idUser INT NOT NULL,
    //     FOREIGN KEY (IdUser) REFERENCES users (id),
    //     text VARCHAR(255),
    //     idmessage INT PRIMARY KEY AUTO_INCREMENT,
    //     createdDateMessage DATETIME NOT NULL
    //   )

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

module.exports = sendMessage;
