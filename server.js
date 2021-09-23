require('dotenv').config();

const express = require('express');
//para que se puedan leer los archivos en express
const fileUpload = require('express-fileupload');

// Requerimos la dependencia morgan, que sirve, básicamente,  para registrar
// los detalles de las solicitudes al servidor. Es un "Logger".
const morgan = require('morgan');

// eslint-disable-next-line no-undef
const { PORT } = process.env;

const app = express();

// Usamos morgan como "Logger":
app.use(morgan('dev'));

//usamos upload
app.use(fileUpload());

// La información de las Request nos llegan a través del Body y, necesariamente,
// tenemos que ¡¡¡¡¡DESERIALIZARLO!!!!! Para ello usamos el método json de express:
// ** (Como las peticiones vendrán en las líneas siguientes, ya estarán deserializadas.)
app.use(express.json());

//////////////////////////////////
/// Controladores de Usuarios: ///
//////////////////////////////////
const {
  createUser,
  validateUser,
  login,
  getUser,
  editUser,
  userVotes,
} = require('./controllers/users/index.js');

//////////////////////////////////
/// Controladores de Mensajes: ///
//////////////////////////////////
const {
  sendMessage,
  getMessage,
  responseMessage,
} = require('./controllers/mensajes/index.js');

/*
 **********************************
 ***Controladores de compras*******
 **********************************
 */

const { categoryProduct } = require('./controllers/compras/index.js');

/*
 ***********************************
 ***Controladores de busqueda*******
 ***********************************
 */
const { search } = require('./controllers/compras/index.js');

/*******************
 * ***MIDDLEWARES***
 * *****************
 */

const {
  authUser,
  userExists,
  userCanEdit,
  productExist,
  productActive,
} = require('./middlware/index.js');

/////////////////////////////////////////////////////////////////////////////////
// Aquí IMPORTAREMOS las funciones controladoras desde la carpeta CONTROLERS: ///
/////////////////////////////////////////////////////////////////////////////////
const {
  newProduct,
  editProduct,
  addPhotoProduct,
  deleteProduct,
  sellRetro,
  reservedProduct,
  requestReserve,
  rejectReserve,
  deletePhoto,
} = require('./controllers/ventas/index.js');

/////////////////////
///// ENDPOINTS /////
/////////////////////

//      POST /sellretro-----> Esta es la función CONTROLADORA. La función estará definida
//      en la carpeta CONTROLLERS para hacer el código más limpio y organizado:

// Endpoint para subir un producto:
app.post('/sellretro', authUser, newProduct);
// Editar un producto
app.put('/sellretro/:idProduct', authUser, userCanEdit, editProduct);
//Agregar foto al producto
app.post(
  '/sellretro/:idProduct/photos',
  authUser,
  userCanEdit,
  addPhotoProduct
);
//borrar producto
app.delete('/sellretro/:idProduct', authUser, userCanEdit, deleteProduct);

app.get('/sellretro/:idProduct', authUser, userCanEdit, sellRetro);

// Solicitud de reserva de producto al vendedor
app.post(
  '/sellretro/reqReserve/:idProduct',
  authUser,
  productActive,
  requestReserve
);

// Rechazar la solicitud de reserva del producto (por el vendedor)
app.post(
  '/sellretro/reject/:idProduct',
  authUser,
  productActive,
  rejectReserve
);

//venta de producto
app.put('/sellretro/:idProduct/sell/:idUser', authUser, userCanEdit, sellRetro);

//Boton de reserva de producto

app.put(
  '/sellretro/:idProduct/reserved',
  authUser,
  userCanEdit,
  reservedProduct
);
//borrar foto de producto
app.delete(
  '/sellretro/:idProduct/photos/:idPhoto',
  authUser,
  userCanEdit,
  deletePhoto
);
/**
 *
 * ***********************
 * **ENDPOINTS USUARIOS***
 * ***********************
 */
//crear usuario
app.post('/users', createUser);

//validar código de verificación
app.get('/users/validate/:verifiedCode', validateUser);

// Hacer login y retornar token
app.post('/users/login', login);

// Obtener un usuario en concreto:
app.get('/users/:idUser', userExists, authUser, getUser);

//Editar un Usuario:

app.put('/users/:idUser', authUser, userExists, editUser);

//creo boton de votos
app.post('/sellretro/:idProduct/votes', authUser, productExist, userVotes);

/*
 ************************
 ***BARRAS DE BÚSQUEDA***
 ************************
 */

// Barra de busqueda
app.get('/search', search);

//    · GET /products -----> Obtener los productos filtrados en la BARRA de BUSQUEDA
app.post('/product', categoryProduct);

/**
 *
 * ****************************
 * ** ENDPOINTS DE MENSAJES ***
 * ****************************
 */
// Botón para enviar mensaje al vendedor (mediante producto)
app.post('/messages/:idProduct', authUser, sendMessage);

// Botón ENVIAR para contestar mensajes (mediante producto)
app.post('/messages/chat/:idProduct', authUser, responseMessage);

// Obtener los mensajes un usuario:
app.get('/messages/list/:idProduct', authUser, getMessage);

//////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////
/// Middleware de error ///
///////////////////////////

// Aquí llega si entra un "next(error)"
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error(error);
  // Definimos el status de la respuesta al cliente: Si el error tiene un status code, lo
  // enviamos, sino le asignamos el code 500 (El servidor ha encontrado una situación que
  // no sabe cómo manejarla.)
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

///////////////////////////////
/// Middleware de not found ///
///////////////////////////////
app.use((req, res) => {
  res.status(404).send({
    estatus: 'error',
    message: 'Not found',
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Función para poner a funcionar el servido en el puerto dado:
app.listen(PORT, () => {
  console.log(`Conectado al puerto: ${PORT}`);
});
