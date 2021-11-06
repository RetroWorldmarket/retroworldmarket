const getDB = require('../../ddbb/getDB');
const { guardarFoto, formatDate } = require('../../helpers.js');

const addFirstPhoto = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //SIEMPRE DEBE HABER AL MENOS UNA FOTO, por lo tanto si no hay foto lanzamos error
    //miraremos siempre en la petición en add form data
    if (!req.files || !req.files.photo) {
      const error = new Error(
        'No se ha encontrado ninguna foto, es indispensable al menos una'
      );
      error.httpStatus = 400;
      throw error;
    }

    let photoName;

    //guardamos la foto en el servidor con la funcion de helpers

    try {
      photoName = await guardarFoto(req.files.photo);
    } catch (_) {
      const error = new Error(
        'Formato del archivo incorrecto, por favor incluya formato .jpg'
      );
      error.httpStatus = 400;
      throw error;
    }

    //guardamos la "foto" en la base de datos, seria el nombre de la foto

    await connection.query(
      `
  INSERT INTO photos (namePhoto, idProduct, createdDate)
  VALUES (?, ?, ?)
  `,
      [photoName, 12, formatDate(new Date())]
    );

    //mandamos la respuesta

    res.send({
      status: 'perfecto',
      message: 'La foto ha sido guardada correctamente',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = addFirstPhoto;
