require('dotenv').config();

const express = require('express');
//para que se puedan leer los archivos en express
const fileUpload = require('express-fileupload');
//requerios cors para la politica de cors
const cors = require('cors');
// Requerimos la dependencia morgan, que sirve, básicamente,  para registrar
// los detalles de las solicitudes al servidor. Es un "Logger".
const morgan = require('morgan');

// eslint-disable-next-line no-undef
const { PORT } = process.env;

const app = express();

//activamos cors de uso simple

app.use(cors());

// Usamos morgan como "Logger":
app.use(morgan('dev'));

//usamos upload
app.use(fileUpload());

// La información de las Request nos llegan a través del Body y, necesariamente,
// tenemos que ¡¡¡¡¡DESERIALIZARLO!!!!! Para ello usamos el método json de express:
// ** (Como las peticiones vendrán en las líneas siguientes, ya estarán deserializadas.)
app.use(express.json());

//para poder acceder a la carpeta static

app.use(express.static('static/upload'));

//////////////////////////////////
/// Controladores de Usuarios: ///
//////////////////////////////////
const {
  historial,
  createUser,
  validateUser,
  login,
  getUser,
  editUser,
  userVotes,
  deleteUser,
  User,
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

const {
  pagInicio,
  categoryProduct,
  search,
  getProduct,
} = require('./controllers/compras/index.js');

/*
 ***********************************
 ***Controladores de busqueda*******
 ***********************************
 */

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
  addFirstPhoto,
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
app.put(
  '/sellretro/:idProduct',
  productExist,
  productActive,
  authUser,
  userCanEdit,
  editProduct
);
//agregar primera foto
app.post('/sellretro/photos', addFirstPhoto);

//Agregar foto al producto
app.post(
  '/sellretro/:idProduct/photos',
  productExist,
  authUser,
  userCanEdit,
  addPhotoProduct
);
//borrar producto

app.delete(
  '/sellretro/:idProduct',
  productExist,
  productActive,
  authUser,
  userCanEdit,
  deleteProduct
);

// Solicitud de reserva de producto al vendedor
app.post(
  '/sellretro/reqReserve/:idProduct',
  productExist,
  productActive,
  authUser,
  productActive,
  requestReserve
);

// Rechazar la solicitud de reserva del producto (por el vendedor)
app.post(
  '/sellretro/reject/:idProduct',
  productExist,
  productActive,
  authUser,
  productActive,
  rejectReserve
);

//venta de producto
app.put(
  '/sellretro/:idProduct/sell/:idUser',
  productExist,
  authUser,
  userCanEdit,
  sellRetro
);

//Boton de reserva de producto

app.put(
  '/sellretro/:idProduct/reserved',
  productExist,
  productActive,
  authUser,
  userCanEdit,
  reservedProduct
);
//borrar foto de producto
app.delete(
  '/sellretro/:idProduct/photos/:idPhoto',
  productExist,
  productActive,
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

//historial de compras
app.get('/historial', authUser, historial);

//creo boton de votos
app.post('/sellretro/:idProduct/votes', authUser, productExist, userVotes);
//eliminar usuario
app.delete('/users/:idUser', authUser, userExists, deleteUser);

//un solo usuario
app.get('/users', authUser, User);

/*
 ************************
 ***BARRAS DE BÚSQUEDA***
 ************************
 */
//Página de inicio
app.get('/inicio', pagInicio);

// Barra de busqueda
app.get('/search', search);

//    · GET /products -----> Obtener los productos filtrados en la BARRA de BUSQUEDA
app.get('/category', categoryProduct);

//    · GET /products -----> Obtener un producto en concreto
app.get('/product/:idProduct', productExist, productActive, getProduct);

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
//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////
/// Middleware de error ///
///////////////////////////

// Aquí llega si entra un "next(error)"
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

//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
// Función para poner a funcionar el servido en el puerto dado: //
//////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Conectado al puerto: ${PORT}`);
});
