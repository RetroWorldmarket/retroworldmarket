const getDB = require('../../ddbb/getDB');

const User = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const idReqUser = req.userAuth.id;

    const [user] = await connection.query(
      `
      SELECT users.id, users.name, users.alias, users.avatar, users.email, users.location,
      users.province, users.postalCode, users.rol, users.createdDate, votes.vote
      FROM users 
      LEFT JOIN votes ON (votes.idUser = users.id)
      WHERE users.id = ?

    `,
      [idReqUser]
    );

    const [products] = await connection.query(
      `
    
    SELECT nameProduct, brand, description, price, status FROM products
    WHERE idUser = ?
    `,
      [idReqUser]
    );

    // Creamos un OBJETO con información básica de un usuario (la obtenemos del array guardado antes):
    const userInfo = {
      id: idReqUser,
      alias: user[0].alias,
      avatar: user[0].avatar,
      province: user[0].province,
      votos: user[0].vote,
    };

    // Enviamos la respuesta con OK y el paquete de información del usuario
    // solicitado según corresponda (userInfo)
    res.send({
      status: 'Ok',
      userInfo: {
        ...userInfo,
        products,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = User;
