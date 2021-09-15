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
// tenemos que DESERIALIZARLO. Para ello usamos el método json de express:
app.use(express.json());

/////////////////////
///// ENDPOINTS /////
/////////////////////

// Endpoint para subir un producto:
//  POST /sellretro/-----> Botón PUBLICAR

app.use((req, res) => {
  res.send('clarinete');
  console.log('vamos');
});

app.use((req, res) => {
  res.status(404).send({
    estatus: 'error',
    message: 'Not found',
  });
});

app.listen(PORT, () => {
  console.log(`Conectado al puerto: ${PORT}`);
});
