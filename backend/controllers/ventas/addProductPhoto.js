const getDB = require('../../ddbb/getDB');
const { guardarFoto, formatDate } = require('../../helpers.js');

const addPhotoProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //obtenemos el id del producto
    const { idProduct } = req.params;

    //SIEMPRE DEBE HABER AL MENOS UNA FOTO, por lo tanto si no hay foto lanzamos error
    //miraremos siempre en la petición en add form data
    if (!req.files || !req.files.photo) {
      const error = new Error(
        'No se ha encontrado ninguna foto, es indispensable al menos una'
      );
      error.httpStatus = 400;
      throw error;
    }

    //comprobamos cuantas fotos tiene el producto, nosotros como máximo el colocaremos 3
    const [manyPhotos] = await connection.query(
      `
    SELECT id FROM photos WHERE idProduct = ?
    `,
      [idProduct]
    );

    //si hay más de tres fotos lanzamos un erros
    if (manyPhotos.length >= 3) {
      const error = new Error(
        'Este producto tiene más de 3 fotos, por favor modifique su producto.'
      );
      error.httpStatus = 400;
      throw error;
    }

    //definimos la variable que almacenará el nombre de la foto que nos permitirá
    //guardarla en nuestra base de datos

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
      [photoName, idProduct, formatDate(new Date())]
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

module.exports = addPhotoProduct;
