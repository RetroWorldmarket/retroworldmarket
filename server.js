require('dotenv').config();

const express = require('express');

// Requerimos la dependencia morgan, que sirve, básicamente,  para registrar
// los detalles de las solicitudes al servidor. Es un "Logger".
const morgan = require('morgan');

const { PORT } = process.env;

const app = express();

// Usamos morgan como "Logger":
app.use(morgan('dev'));

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
} = require('./controllers/users/index.js');

/*
 **********************************
 ***Controladores de compras*******
 **********************************
 */

const { categoryProduct } = require('./controllers/compras/index.js');

/*******************
 * ***MIDDLEWARES***
 * *****************
 */

const { authUser, userExists } = require('./middlware/index.js');

/////////////////////////////////////////////////////////////////////////////////
// Aquí IMPORTAREMOS las funciones controladoras desde la carpeta CONTROLERS: ///
/////////////////////////////////////////////////////////////////////////////////
const newProduct = require('./controllers/ventas/newProduct.js');
const editProduct = require('./controllers/ventas/editProduct.js');

/////////////////////
///// ENDPOINTS /////
/////////////////////

//      POST /sellretro-----> Esta es la función CONTROLADORA. La función estará definida
//      en la carpeta CONTROLLERS para hacer el código más limpio y organizado:

// Endpoint para subir un producto:
app.post('/sellretro', newProduct);
// Editar un producto
app.put('/sellretro/:idProduct', editProduct);

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

/*
************************
***BARRAS DE BÚSQUEDA***
************************

*/

//    · GET /products -----> Obtener los productos filtrados en la BARRA de BUSQUEDA

app.get('/product', categoryProduct);

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
