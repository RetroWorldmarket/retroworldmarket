// Creamos una función que se encarga de formatear una fecha(dependencia date-fns)
//porque el DATETIME de la base de datos no entiende el formato newDate()

// Importamos solo la función FORMATEAR de date-fns con destructuring:
const { format } = require('date-fns');

//importamos la dependencia de encriptación(ya está en desuso
//pero no se de otra)
const crypto = require('crypto');

// Importamos las variables de .env
require('dotenv').config();

//requerimos las variables del dontenv
const { SENDGRID_API_KEY, SENDGRID_FROM } = process.env;
// Requerimos la dependencia SENGRID para enviar el mail de verificación al usuario
const sgMail = require('@sendgrid/mail');
// Asignamos el API Key a Sendgrid.
sgMail.setApiKey(SENDGRID_API_KEY);

//////////////////////////
/// función formatDate ///
//////////////////////////
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
 ********************************************************
 ** VERIFICACIÓN DE EMAIL, CON CÓDIGO DE VERIFICACIÓN****
 ********************************************************
 */

// Declaramos la función que va a enviar el CONTENIDO del mail al usuario:
async function emailVerification(email, registerCode, name) {
  //mensaje

  const emailBody = `
  Hola ${name} te has registrado en Retro World Market.
  Por favor pulsa este enlace para verificar tu cuenta: 
   ${process.env.PUBLIC_HOST}/users/validate/${registerCode}

  `;
  //para enviar el correo usamos la función siguiente:
  try {
    // esperamos a que se envie el email incluyendo nuestros comandos de envio
    // es decir sus propiedades y valores
    await sendMail({
      to: email,
      subject: `${name} por favor activa tu cuenta`,
      body: emailBody,
    });
  } catch (error) {
    //si no se ha podido enviar lanzamos un error
    throw new Error('Error a la hora de enviar el mensaje de verificación');
  }
}

/////////////////////////////////////////////////////////////////
/// Envío de email de verificación(CON DEPENDENCIA @SENDGRID) ///
/////////////////////////////////////////////////////////////////
async function sendMail({ to, subject, body }) {
  // Aquí el mensaje que enviaremos que contiene los parametros dados (to, subject, body):
  // Estos parámetros vienen definidos de las funciónes anteriores.
  const message = {
    to,
    from: SENDGRID_FROM,
    subject,
    text: body,
    html: `
    <div>
      <h1>${subject}</h1>
      <p>${body}</p>
    </div>
    `,
  };
  // Llamar a la función que envía el mensaje:
  await sgMail.send(message);
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
