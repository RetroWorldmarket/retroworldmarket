const joi = require('joi');

const schemaUserCreate = joi.object().keys({
  email: joi
    .string()
    .required()
    .email()
    .error((errors) => {
      return new Error('del  schema email');
    }),

  password: joi
    .string()
    .required()
    .min(6)
    .max(20)
    .error((errors) => {
      return new Error('del  schema contraseña');
    }),
  alias: joi.string().required(),
  location: joi.string().required(),
  province: joi.string(),
  postalCode: joi.string().required(),
  name: joi.string(),
  avatar: joi.string(),
});

module.exports = schemaUserCreate;
