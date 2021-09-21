// Creamos una función que se encarga de formatear una fecha(dependencia date-fns)
//porque el DATETIME de la base de datos no entiende el formato newDate()

// Importamos solo la función FORMATEAR de date-fns con destructuring:
const { format } = require('date-fns');

//importamos la dependencia de encriptación(ya está en desuso
//pero no se de otra)
const crypto = require('crypto');
//importamos la dependencia sharp(para fotos) te codifica las fotos y también necesitaremos el
//uuid que crea un nombre único para los documentos
const sharp = require('sharp');
const uuid = require('uuid');

const path = require('path');

// Importamos las variables de .env
require('dotenv').config();
const { ensureDir, unlink } = require('fs-extra');

//requerimos las variables del dontenv
//sacamos las rutas del upload de .env q crearemos nosotros
const { SENDGRID_API_KEY, SENDGRID_FROM, UPLOAD_PATH } = process.env;
// Requerimos la dependencia SENGRID para enviar el mail de verificación al usuario
const sgMail = require('@sendgrid/mail');
// Asignamos el API Key a Sendgrid.
sgMail.setApiKey(SENDGRID_API_KEY);

//SACAMOS LA RUTA DE LAS FOTOS(DONDE IRŃ GUARDADAS)
const uploadPath = path.join(__dirname, UPLOAD_PATH);

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

/*
 *************************
 ****GUARDAR FOTOS********
 *************************
 */

async function guardarFoto(imagen) {
  //¿Existe directorio de imágenes?
  await ensureDir(uploadPath);

  //convertimos imagen con sharp

  const sharpImage = sharp(imagen.data);

  //Accedemos a los metadatos de la imagen para ver su anchura
  const infoImage = await sharpImage.metadata();

  //definimos el ancho máximo
  const maxWidth = 1000;

  //redimensionamos si supera el ancho

  if (infoImage.width > maxWidth) {
    sharpImage.resize(maxWidth);
  }

  //generamos un nombre único para la imagen

  const nameImage = `${uuid.v4()}.jpg`;

  //creamos la ruta absoluta de la imagen

  const pathImage = path.join(uploadPath, nameImage);

  //guardamos la imagen como string
  await sharpImage.toFile(pathImage);

  //retornamos el nombre del fichero
  return nameImage;
}

/*
 ***********************
 *****BORRAR FOTO*******
 ***********************
 */
async function borrarFoto(nameImage) {
  // Creamos la ruta absoluta al archivo.
  const photoPath = path.join(uploadPath, nameImage);

  // Eliminamos la foto del disco.
  await unlink(photoPath);
}

// Exportamos la función:
module.exports = {
  formatDate,
  validar,
  generateCryptoString,
  emailVerification,
  guardarFoto,
  borrarFoto,
};
