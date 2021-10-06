const getDB = require('../../ddbb/getDB');

const {
  formatDate,
  validar,
  generateCryptoString,
  emailVerification,
} = require('../../helpers');
const schemaUserCreate = require('../../schema/createUserSchema');

const createUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    //VALIDAMOS DATOS CON JOI DE LOS QUE NO ENVIA EL SERVIDOR
    await validar(schemaUserCreate, req.body);

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

    if (user.length > 0) {
      const error = new Error('el email introducido ya existe');
      error.httpStatus = 409;
      throw error;
    } else if (apodo.length > 0) {
      const error = new Error('el alias introducido ya existe');
      error.httpStatus = 409;
      throw error;
    }

    //vamos a enviar un mensaje de verificación al email del usuario
    //creando un string codificado con la función hecha en helpers
    //30 dígitos, una función síncrona ya que no debemos esperar ninguna respuesta
    const codeRegister = generateCryptoString(30);
    //mensaje

    await emailVerification(email, codeRegister, name);

    //guardamos usuario en la base de datos y el código de registro
    //importante ya que lo necesitaremos para la verificación, despues lo borraremos
    await connection.query(
      `
    INSERT INTO users (name, email, alias, avatar, password, location, province, postalCode, verifiedCode, createdDate)
    VALUES (?, ?, ?, ?, SHA2(?,512), ?, ?, ?, ?, ?)
    
    `,
      [
        name,
        email,
        alias,
        'defaultAvatar.jpg',
        password,
        location,
        province,
        postalCode,
        codeRegister,
        formatDate(new Date()),
      ]
    );

    console.log('hola');
    res.send({
      status: 'ok',
      message: `Usuario registrado como ${name}, necesaria la activación; compruebe su email`,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createUser;
