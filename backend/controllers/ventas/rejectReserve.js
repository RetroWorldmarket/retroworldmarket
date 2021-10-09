///////////////////////////////////////////////////////////////////////
/// Función para que el Dueño pueda RECHAZAR una reserva solicitada ///
///////////////////////////////////////////////////////////////////////

const getDB = require('../../ddbb/getDB');

const { formatDate } = require('../../helpers');

// Fecha de reserva
const fechadereserva = formatDate(new Date());

const rejectReserve = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Obtenemos el id del producto de Path Params
    const { idProduct } = req.params;

    // Comprobamos que el producto existe en la base de datos, sino existe lanzamos error el producto no fue encontrado

    const [product] = await connection.query(
      `
        SELECT * FROM products WHERE id = ?`,
      [idProduct]
    );

    console.log(product);

    if (product.length < 1) {
      const error = new Error('El producto no fue encontrado');
      error.httpStatus = 400;
      throw error;
    }

    // Verificar si el producto ya fue reservado:
    if (idProduct[0].reserved === 1) {
      const error = new Error('El producto ya fue reservado');
      error.httpStatus = 400;
      throw error;
    }

    // Esta función de RECHAZO en sí no realiza ningún cambio en los
    // estados del producto en la BdD, simplemente devuelve al interesado
    // un mensaje "Su solicitud fue rechazada por el vendedor"

    res.send({
      status: 'ok',
      Messages: 'Su solicitud de reserva fue rechazada por el vendedor',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = rejectReserve;
