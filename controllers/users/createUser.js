const getDB = require('../../ddbb/getDB');
const { formatDate, validar } = require('../../helpers');
const schemaUserCreate = require('../../schema/createUserSchema');

const createUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    //VALIDAMOS DATOS CON JOI DE LOS QUE NO ENVIA EL SERVIDOR
    // await validar(schemaUserCreate, req.body);

    //OBTENEMOS LOS CAMPOS NECESARIOS PARA CREAR USUARIO

    const {
      name,
      email,
      alias,
      avatar,
      password,
      location,
      province,
      postalCode,
    } = req.body;
    //COMPROBAMOS SI EXISTE EL EMAIL Y EL ALIAS EN LA BASE DE DATOS

    const [user] = await connection.query(
      `
    SELECT id FROM users WHERE email = ?
`,
      [email]
    );

    const [apodo] = await connection.query(
      `
      SELECT id FROM users WHERE alias = ?
      `,
      [alias]
    );

    if (user.length > 0 || apodo.length > 0) {
      const error = new Error('email o alias existen');
      error.httpStatus = 409;
      throw error;
    }

    console.log('hola');
    res.send(req.body);
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createUser;
