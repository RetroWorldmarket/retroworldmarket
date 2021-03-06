const getDB = require('../../ddbb/getDB');

const getUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Antes que nada tenemos que acceder al usuario (idUser). Esto se hace mediante
    // el PathParam (:idProduct).
    // Obtenemos los PathParams del objeto req.params y, mediante destructuring, nos quedamos con
    // el id del usuario:
    const { idUser } = req.params;

    // Test 17 Setiembre, Bernardo.
    /////////////////////////////////////////////////////////////////////////////////////////
    ///   AQUÍ TENEMOS UNA DUDA ANOTADA: POR QUÉ el .id de req.userAuth para recoger el   ///
    ///   id del usuario. Es imprescindible??? Cómo funciona realmente??                  ///
    /////////////////////////////////////////////////////////////////////////////////////////

    // Declarar la autorización en una constante. La autorización viene del middleware authUser.js
    // Este es el usuario que hace la request
    const idReqUser = req.userAuth.id;

    // Test 17 Setiembre, Bernardo.

    // Ahora vamos a obtener de la Base de Datos la información del usuario solicitado por
    // Path Params y la guardaremos en un array:
    const [user] = await connection.query(
      `
      SELECT users.id, users.name, users.alias, users.avatar, users.email, users.location,
      users.province, users.postalCode, users.rol, users.createdDate, votes.vote
      FROM users 
      LEFT JOIN votes ON (votes.idUser = users.id)
      WHERE users.id = ?

    `,
      [idUser]
    );

    const [products] = await connection.query(
      `
    
    SELECT id, nameProduct, brand, yearOfProduction, description, price, status, category, createdDate, sold FROM products
    WHERE idUser = ?
    `,
      [idUser]
    );

    // Ahora hay solo dos opciones: que el usuario sea el dueño de idUser y quiera ver
    // su perfíl (le daremos casi toda su información), o que no lo sea y quiera ver el
    // perfíl de otro usuario (le daremos información básica del otro usuario).
    // A mayores, los ADMINISTRADORES también podrán ver la información más completa.
    // Para ello creamos un paquete de información básica que un usuario ajeno puede ver, y si
    // el usuario es propio agregamos más información (privada) a ese paquete.

    // Creamos un OBJETO con información básica de un usuario (la obtenemos del array guardado antes):
    const userInfo = {
      alias: user[0].alias,
      avatar: user[0].avatar,
      province: user[0].province,
      votos: user[0].vote,
    };

    // Si el usuario es propio (el dueño de idUser, que lo tenemos aquí como idReqUser) o es
    // un ADMINISTRADOR le mostramos más información:
    if (user[0].id === idReqUser || req.userAuth.rol === 'administrador') {
      userInfo.name = user[0].name;
      userInfo.email = user[0].email;
      userInfo.location = user[0].location;
      userInfo.postalCode = user[0].postalCode;
      userInfo.createDate = user[0].createdDate;
    }

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

module.exports = getUser;
