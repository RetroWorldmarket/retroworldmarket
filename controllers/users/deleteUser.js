const getDB = require('../../ddbb/getDB');
const { formatDate } = require('../../helpers');

const deleteUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    const { idUser } = req.params;
    const idReqUser = req.userAuth.id;
    const [data] = await connection.query(
      `
    SELECT * FROM users WHERE id = ?
    `,
      [idUser]
    );

    if (data[0].rol === 'administrador') {
      const error = new Error('No se pueden eliminar administradores');
      error.httpStatus = 401;
      throw error;
    }
    if (idReqUser !== Number(idUser)) {
      const error = new Error('No eres este usuario');
      error.httpStatus = 401;
      throw error;
    }
    await connection.query(
      `
UPDATE users SET 
active = 0 , deleted = 1 , modifiedDate = ?
WHERE id = ?
`,
      [formatDate(new Date()), idUser]
    );

    res.send({
      status: 'ok',
      message: 'Usuario eliminado correctamente',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteUser;
