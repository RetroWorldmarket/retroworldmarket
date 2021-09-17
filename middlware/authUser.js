//requerimos el jasonwebtoken que nos generará un token diferente,
//cada vez que se loggee;  pero cuidado porque este token se puede adivinar

const jwt = require('jsonwebtoken');
//empezamos la función para saber si un usuario tiene autorización
//por su token
const authUser = async (req, res, next) => {
  try {
    //obtenemos la autorización de la petición por medio del headers
    const { autorizacion } = req.headers;

    //si no existe,  lanzamos un error

    if (!autorizacion) {
      const error = new Error('Error, falta la cabecera de autorización');
      error.httpStatus = 401;
      throw error;
    }

    //almacenamos el token; la variable es let porque cada vez que se loggee
    //obtendrá un nuevo token

    let token;

    //hacemos otro try por si el token no es válido o es repetido etc...
    try {
      //Para que nos cree un token correcto le debemos pasar la cabecera de
      //autentificación y un número secreto que lo guadaremos en .env
      token = jwt.verify(autorizacion, process.env.SECRET);
    } catch (_) {
      //este errror preguntarselo a david
      const error = new Error('el token no es válido');
      error.httpStatus = 401;
      throw error;
    }

    //añadimos una nueva variable a la cabecera de peticiones con
    //la información del nuevo token (es decir el idUser y el rol)

    req.userAuth = token;

    //le enviamos el next para el siguiente middlware si todo está correcto
    next();
  } catch (error) {
    next(error);
  }
};

//exportamos la función
module.exports = authUser;
