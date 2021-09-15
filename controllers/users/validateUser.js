const getDB = require('../../ddbb/getDB');

const validateUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //obtenemos el código de registrocode
    const { verifiedCode } = req.params;

    //Hacemos una petición a la base de datos para saber si hay algun registro pendiente

    const [user] = await connection.query(
      `
        SELECT id FROM users  WHERE verifiedCode = ?
    `[verifiedCode]
    );
    // Vemos si hay algun codigo de verificacion pendiente para ese usuario

    if (user.length < 1) {
      const error = new Error('No hay usuario con este código de verificación');
      error.httpStatus = 404;
      throw error;
    }

    //activamos el usuario y eliminamos el código

    await connection.query(
      `
    UPDATE users SET active = true,
    verifiedCode = null WHERE verifiedCode = ?
    
    `,
      [verifiedCode]
    );

    res.send({
      status: 'ok',
      message: 'Usuario activado satisfactoriamente',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = validateUser;
