const getDB = require('../ddbb/getDB');

///////////////////////////////////////////////////////////////////////////////////////
/// Middleware para comprobar que un usuario en concreto exista en la Base de Datos ///
///////////////////////////////////////////////////////////////////////////////////////

const userExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Primero obtenemos el id del usuario de los Path Params que nos envía la petición:
    const { idUser } = req.params;

    // Luego obtenemos el usuario de la Base de Datos con una query:
    const [user] = await connection.query(
      `
      SELECT id FROM users WHERE id = ?
    `,
      [idUser]
    );

    // En caso que el usuario no exista en la BD lanzamos un error:
    if (user.length < 1) {
      const error = new Error('El usuario seleccionado no existe');
      error.httpStatus = 404;
      throw error;
    }

    // Si existe, va todo fenomenal y le damos el poder a next():

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userExists;
