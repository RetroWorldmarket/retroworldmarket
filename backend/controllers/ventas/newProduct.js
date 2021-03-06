/////////////////////////////////////////////////////////////////
/// Función controladora para subir un nuevo producto a la BD ///
/////////////////////////////////////////////////////////////////

// Necesitamos conectarnos a la BD (getDB)
const getDB = require('../../ddbb/getDB.js');

// Importamos la función que hicimos para formatear fechas desde helpers.js:
const { formatDate, guardarFoto } = require('../../helpers.js');

// Ahora creamos la función asíncrona newProduct:
const newProduct = async (req, res, next) => {
  // Primero: Solicitar una conexión con la DB (declaramos la variable vacía):
  let connection;

  try {
    // Establecer la conexión con la DB:
    connection = await getDB();

    // Qué solicitamos para subir un nuevo producto??
    // Respuesta:
    // idUser, brand, yearOfProduction, status, category, description, price, createdDate ,active

    // De todos los datos de la BD, al usuario SOLO le vamos a pedir:
    // idUser(***), nameProduct, brand, yearOfProduction, status, category, description y price.

    // (***) El idUser debemos obtenerlo del TOKEN, pero aún no hemos llegado a ese nivel...
    // así que vamos a hacer una trampita momentaneamente con el idUser, vamos a mandarlo
    // por el Body.

    // Obtenemos del Body (lo que nos envía el cliente en la REQUEST) los valores que
    // necesitamos con destructuring:
    const idUser = req.userAuth.id;

    const {
      nameProduct,
      brand,
      yearOfProduction,
      status,
      category,
      description,
      price,
    } = req.body;

    console.log(req.body, 'back');
    console.log(req.files, 'imagen');

    // Para confirmar que el usuario nos dé todos los datos que le pedimos, vamos a
    // hacer que si faltan datos se lance un error y creamos el status del error:
    if (
      !nameProduct ||
      !brand ||
      !yearOfProduction ||
      !status ||
      !category ||
      !description ||
      !price
    ) {
      // Creamos la variable error, le asignamos un status code y lanzamos el error.
      // Este error sera recogido por el CATCH, y enviado al Middleware de error en server.js
      // que lo administrará.
      const error = new Error('Falta algún campo');
      error.httpStatus = 400;
      throw error;
    }

    // Vamos a comprobar que el usuario ya exista en la BD (si no existe, no puede subir un producto):
    const [user] = await connection.query(
      `
        SELECT * FROM users WHERE id = ?
    `,
      [idUser]
    );
    // Si no existe lanzamos un mensaje de error:
    if (user.length < 1) {
      const error = new Error('El usuario seleccionado no existe');
      error.httpStatus = 400;
      throw error;
    }
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Si la acción llega hasta aquí es porque no hay errores, así que vamos a crear
    // la entrada en la tabla productos:

    // Para crear la entrada nos hace falta darle una fecha de creación (createdDate).
    // Y tenemos que requerir la función que formatea la fecha (formatDate) de helpers.js
    const createdDate = formatDate(new Date());
    //
    ////////////////////////////////////////////////////////////
    /// Ahora sí definitivamente creamos la entrada a la BD: ///
    ////////////////////////////////////////////////////////////
    const [nuevoProducto] = await connection.query(
      `
        INSERT INTO products (idUser, nameProduct, brand, yearOfProduction, status, category, description, price, createdDate, active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        idUser,
        nameProduct,
        brand,
        Number(yearOfProduction),
        status,
        category,
        description,
        Number(price),
        createdDate,
        true,
      ]
    );

    const idProduct = nuevoProducto.insertId;

    //////////////////////////

    if (req.files && Object.keys(req.files).length > 0) {
      // Recorremos los valores de "req.files".
      for (const photo of Object.values(req.files).slice(0, 3)) {
        // Variable que almacenará el nombre de la imagen.
        let photoName;

        try {
          // Guardamos la foto en el servidor y obtenemos el nombre de la misma.
          photoName = await guardarFoto(photo);
        } catch (_) {
          const error = new Error('Formato de archivo incorrecto');
          error.httpStatus = 400;
          throw error;
        }

        // Guardamos la foto.
        await connection.query(
          `INSERT INTO photos (namePhoto, idProduct, createdDate) VALUES (?, ?, ?)`,
          [photoName, idProduct, formatDate(new Date())]
        );
      }
    }

    // Para confirmar si funciona: vamos a devolver (response) un OBJETO con status:200
    // y un mensaje de confirmación:
    res.send({
      status: 'Ok',
      message: 'El producto ha sido creado correctamente',
    });
  } catch (error) {
    next(error);
  } finally {
    // Pase lo que pase con la función, debemos liberar la conexión establecida:
    if (connection) connection.release();
  }
};

// Exportamos la función:
module.exports = newProduct;
