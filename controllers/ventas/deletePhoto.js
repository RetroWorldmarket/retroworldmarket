const getDB = require('../../ddbb/getDB');

const borrarFoto =  require('../../helpers.js');

const deletePhoto = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    //Obtenemos el id de la foto y el producto 

    const { idProduct, idPhoto } = req.params;

    //Obtenemos la foto de la query

    const [data ] = await connection.query(`
        SELECT namePhoto FROM photos WHERE id = ? AND idProducts = ?
        
    `
    [idPhoto, idProduct ])

    if (data.length < 1){
        const error = new Error ( "La foto seleccionada no existe")
        error.http.status = 404
        throw error;
    }

    await borrarFoto(data[0].namePhoto)

    await connection.query(
        `DELETE FROM photos WHERE idProducts = ? AND namePhoto = ?`,

        [idProduct , namePhoto]
    )

    res.send({
        status: 'ok',
        menssage: 'La foto ha sido eliminada correctamente'
    })

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePhoto;

