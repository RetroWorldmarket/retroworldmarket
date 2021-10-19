/**
 *
 * JOI es una dependencia que le añade "atributos" a las propiedades de
 * un objeto como si fuera el html
 *
 *
 */

//requerimos joi
const joi = require('joi');

//creamos la constante como un objeto con object.keys
//

const schemaUserCreate = joi.object().keys({
  //incluimos todas las propiedades que se le piden al usuario
  //todas y le concatenamos los "atributos" necesarios para validar
  //los datos
  email: joi
    .string()
    .required()
    .email()
    .error((errors) => {
      return new Error('Error en validación de email');
    }),

  password: joi
    .string()
    .required()
    .min(8)
    .max(100)
    .error((errors) => {
      return new Error('Error de validación de la contraseña');
    }),
  alias: joi.string().required(),
  location: joi.string().allow(''),
  province: joi.string().required(),
  postalCode: joi.string().required(),
  name: joi.string().required(),
  avatar: joi.string().allow(''),
});

module.exports = schemaUserCreate;
