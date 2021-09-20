const Joi = require('joi');

const messageSchema = Joi.object().keys({
  text: Joi.string()
    .required()
    .min(1)
    .max(255)
    .alphanum()
    .error((errors) => {
      if (
        errors[0].code === 'any.required' ||
        errors[0].code === 'string.empty'
      )
        return new Error('Se requiere un mensaje');

      return new Error(
        'El mensaje debe tener entre 1 y 255 caracteres. Solo puede contener letras y números.'
      );
    }),

  // CREATE TABLE messages (
  //     idProducts  INT NOT NULL,
  //     FOREIGN KEY (idProducts) REFERENCES products(id),
  //     idOwner INT NOT NULL,
  //     FOREIGN KEY (IdUser) REFERENCES products (idUser),
  //     idUser INT NOT NULL,
  //     FOREIGN KEY (IdUser) REFERENCES users (id),
  //     text VARCHAR(255),
  //     idmessage INT PRIMARY KEY AUTO_INCREMENT,
  //     createdDateMessage DATETIME NOT NULL
  //   )
});

module.exports = messageSchema;
