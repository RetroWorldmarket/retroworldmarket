const getDB = require('../../ddbb/getDB');

const newName = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = newName;

// /////////////////////////////////////////////////////////////////
// /// Función controladora para subir un nuevo producto a la BD ///
// /////////////////////////////////////////////////////////////////

// // Necesitamos conectarnos a la BD (getDB)
// const getDB = require('../ddbb/getDB.js');

// // Ahora creamos la función asíncrona newProduct:
// const newProduct = async (req, res) => {
//   // Primero: Solicitar una conexión con la DB (declaramos la variable vacía):
//   let connection;

//   try {
//     // Establecer la conexión con la DB:
//     connection = await getDB();
//   } catch (error) {
//     console.error(error.message);
//   } finally {
//     // Pase lo que pase con la función, debemos liberar la conexión establecida:
//     if (connection) connection.release();
//   }
// };

// // Exportamos la función:
// module.exports = newProduct;
