require('dontenv').config();

const express = require('express');

const { PORT } = process.env;

const app = express();

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
  console.log('conectado');
});
