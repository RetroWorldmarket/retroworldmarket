const getDB = require('../../ddbb/getDB');

//requerimos jwt para que nos cree un token nuevo

const jwt = require('jsonwebtoken');
const { SECRETO } = process.env;

const login = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //pedimos el email y la contraseña en body de la petición
    const { email, password } = req.body;

    //comprobamos que están todos los datos(se puede hacer con JOI pero es más coñazo)

    if (!email || !password) {
      const error = new Error('Falta campos por rellenar');
      error.httpStatus = 400;
      throw error;
    }

    //IMPORTANTE comprobar si existe el usuario;
    //IMPORTANTE en la petición a la base de datos no olvidarse desencriptarla
    //con el mismo código de encriptación de sql--> SHA2 y 512

    const [usuario] = await connection.query(
      `
    SELECT id, rol, active FROM users WHERE email = ? AND password = SHA2(?, 512)
    `,
      [email, password]
    );

    //IMPORTANTE saber si los datos son correctos y que el usuario está activo
    if (usuario.length < 1) {
      const error = new Error('Usuario o contraseña incorrectos');
      error.httpStatus = 401;
      throw error;
    } else if (usuario[0].active === false) {
      //usamos user[0] porque nos devuelve
      const error = new Error('El usuario no está validado');
      error.httpStatus = 400;
      throw error;
    }
    console.log(usuario);

    //tenemos que pasarle al token información del usuario para que se cree
    //le pasamos la información como un objeto
    const tokenInfo = {
      id: usuario[0].id,
      rol: usuario[0].rol,
    };

    //creamos el token le añadimos el SECRETO de .env , la información del token
    //y cuando expira con expiresIn

    const token = jwt.sign(tokenInfo, SECRETO, {
      expiresIn: '60d',
    });

    //una vez listo el servidor responde con el token y con el estatus ok

    res.send({
      status: 'ok',
      token,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = login;
