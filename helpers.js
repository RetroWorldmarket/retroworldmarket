// Creamos una función que se encarga de formatear una fecha(dependencia date-fns)
//porque el DATETIME de la base de datos no entiende el formato newDate()

// Importamos solo la función FORMATEAR de date-fns con destructuring:
const { format } = require('date-fns');
//importamos la dependencia de encriptación(ya está en desuso
//pero no se de otra)

const crypto = require('crypto');
require('dotenv').config();

function formatDate(date) {
  // La función retorna la fecha dada en formato Año, Mes, Día, Horas, Minutos y Segundos
  return format(date, 'yyyy-MM-dd-HH-mm-ss');
}

/*

*******************************
**CREAR UN STRING ENCRIPTADO***
*******************************

*/

function generateCryptoString(length) {
  //la propiedad 'hex' es la forma en la que nos retorna el string
  //en este caso formato hexadecimal
  return crypto.randomBytes(length).toString('hex');
}

/*
 ***********************************************
 **ENVIO DE EMAIL CON CÓDIGO DE VERIFICACIÓN****
 ***********************************************
 */

async function emailVerification(email, registerCode, name) {
  //mensaje

  const emailBody = `
  Hola ${name} te has registrado en Retro World Market.
  Por favor pulsa este enlace para verificar tu cuenta:
  ${process.env.PUBLIC_HOST}/users/validation/${registerCode}

  `;
  //no se utiliza el try catch porque ya se utilizará en el módulo
  //createUser.js
}

/***
 * *****************
 * **VALIDAR DATOS**
 *******************
 
 */

async function validar(schema, data) {
  try {
    await schema.validateAsync(data);
  } catch (error) {
    error.httpStatus = 404;
    throw error;
  }
}
// Exportamos la función:
module.exports = {
  formatDate,
  validar,
  generateCryptoString,
  emailVerification,
};
