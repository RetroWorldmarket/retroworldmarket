const getDB = require('../../ddbb/getDB.js');

const { formatDate } = require('../../helpers');

const userVotes = async (req, res, next) => {
  let connection;

  try {
    //establecemos la conexion a la DB
    connection = await getDB();

    //obtenemos el identificador unico de la entrada

    const idReqUser = req.userAuth.id;

    //obtenemos la entrada de datos
    const { vote } = req.body;
    const { idProduct } = req.params;

    //si todo es correcto debemos avanzar sin problema
    //si falla es porque olvidamos algun dato de la userVotes
    //por lo que arrojamos un Error

    if (!idReqUser || !vote) {
      const error = new Error('Faltan Datos para Validar Entry');
      error.httpStatus = 403;
      throw error;
    }
    //debemos comprobar que el voto es realizado entre el 1 y el 5 correctamente
    //si es mayo a 5 lanzamos error
    if (vote < 1 || vote > 5) {
      const error = new Error('el voto realizado debe ser entre 1 y 5');
      error.httpStatus = 400;
      throw error;
    }
    //comprobamos que el usuario exista en la DB
    const [user] = await connection.query(
      `
        SELECT * FROM users WHERE id = ?`,
      [idReqUser]
    );

    // Si el user no existe lanzamos un error.
    if (user.length < 1) {
      const error = new Error('Usuario no definido o no Existe');
      error.httpStatus = 404;
      throw error;
    }

    // Obtenemos la entrada.
    const [entry] = await connection.query(
      `SELECT idUser FROM products WHERE id = ?`,
      [idProduct]
    );

    // Comprobamos que el user no vote sus propias entradas y si lo hace lanzamos error.
    if (entry[0].idUser === Number(idReqUser)) {
      const error = new Error('No es posible votar sobre tu propia Entrada');
      error.httpStatus = 403;
      throw error;
    }

    // verificamos que el user no pueda valorar una entrada dos veces.
    const [alreadyVote] = await connection.query(
      `SELECT id FROM votes WHERE idUser = ? AND idProduct = ?`,
      [idReqUser, idProduct]
    );

    // Si ya se ha votado la entrada arrojamos Error.
    if (alreadyVote.length > 0) {
      const error = new Error('Ya existe un voto para esta entrada');
      error.httpStatus = 403;
      throw error;
    }

    //Si todo esta correcto procedemos a Añadir el voto
    await connection.query(
      `INSERT INTO votes (vote, idUser, idProduct, createdAt) VALUES (?, ?, ? ,?)`,
      [vote, idReqUser, idProduct, formatDate(new Date())]
    );

    const [historial] = await connection.query(
      `SELECT id FROM historialProducts WHERE idProduct = ?`,
      [idProduct]
    );

    if (historial.length < 1) {
      const error = new Error('No has adquirido dicho producto');
      error.httpStatus = 403;
      throw error;
    }

    await connection.query(
      `
            UPDATE historialProducts SET votado = 1 WHERE id = ? 
            `,
      [idProduct]
    );

    res.send({
      status: 'ok',
      message: 'La votación se ha realizado con éxito',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
module.exports = userVotes;
