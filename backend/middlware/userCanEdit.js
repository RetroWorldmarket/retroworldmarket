const getDB = require('../ddbb/getDB');

const userCanEdit = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id de la entrada.
    const { idProduct } = req.params;

    // Obtenemos el id de usuario de la entrada.
    const [owner] = await connection.query(
      `SELECT idUser FROM products WHERE id = ?`,
      [idProduct]
    );
    console.log(owner[0]);

    // Si el usuario que hace la request no es el propietario o no
    // es el administrador lanzamos un error.
    if (
      owner[0].idUser !== req.userAuth.id &&
      req.userAuth.role !== 'administrador'
    ) {
      const error = new Error('No tienes suficientes permisos');
      error.httpStatus = 401;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = userCanEdit;
