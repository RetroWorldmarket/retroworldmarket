/////////////////////////////////////////////////////////////////
/// Función controladora para subir un nuevo producto a la BD ///
/////////////////////////////////////////////////////////////////

// Necesitamos conectarnos a la BD (getDB)
const getDB = require('../ddbb/getDB.js');

// Ahora creamos la función asíncrona newProduct:
const newProduct = async (req, res) => {
  // Primero: Solicitar una conexión con la DB (declaramos la variable vacía):
  let connection;

  try {
    // Establecer la conexión con la DB:
    connection = await getDB();

    // Qué solicitamos para subir un nuevo producto??
    // Respuesta:
    // idUser INT NOT NULL,
    // FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
    // nameProduct VARCHAR(50) NOT NULL,
    // brand VARCHAR(50) NOT NULL,
    // yearOfProduction VARCHAR(4),
    // status ENUM('No funciona', 'A veces falla', 'Bien', 'Muy bien', 'Excelente') NOT NULL,
    // category ENUM('Todas las Categorías', 'Ordenadores', 'Televisores', 'Telefonía', 'Música y Rádio', 'Consolas y Juegos') NOT NULL,
    // description VARCHAR(200) NOT NULL,
    // price MEDIUMINT NOT NULL,
    // createdDate DATETIME NOT NULL,
    // modifiedDate DATETIME,
    // deletedDate DATETIME,
    // active BOOLEAN DEFAULT true,
    // sold BOOLEAN DEFAULT false,
    // reserved BOOLEAN DEFAULT false,
    // reservedDate DATETIME,
    // deleted BOOLEAN DEFAULT false,
    // chatRoom VARCHAR(250)

    // (***) El idUser debemos obtenerlo del TOKEN, pero aún no hemos llegado a ese nivel...
    // así que vamos a hacer una trampita momentaneamente con el idUser, vamos a mandarlo
    // por el Body.

    // De todos los datos de la BD, al usuario SOLO le vamos a pedir:
    // idUser(***), nameProduct, brand, yearOfProduction, status, category, description y price.

    // Obtenemos del Body (lo que nos envía el cliente en la REQUEST) los valores que necesitamos con destructuring:
    const {
      idUser,
      nameProduct,
      brand,
      yearOfProduction,
      status,
      category,
      description,
      price,
    } = req.body;

    // Para confirmar si funciona: vamos a devolver (response) los mismos datos que pedimos:
    res.send(req.body);
  } catch (error) {
    console.error(error.message);
  } finally {
    // Pase lo que pase con la función, debemos liberar la conexión establecida:
    if (connection) connection.release();
  }
};

// Exportamos la función:
module.exports = newProduct;
