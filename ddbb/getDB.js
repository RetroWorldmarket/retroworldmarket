// Requerir .env
require('dotenv').config();

// Requerir mysql2
const mysql = require('mysql2/promise');

// Definir las variables del .env con destructuring
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

// Declarar contenedor de conexiones con la variable pool.
let pool;

// Creamos la función asíncrona, donde cogemos una conexión a la Base de Datos.
const getDB = async () => {
  if (!pool) {
    // Método para crear una conexión con mySQL dentro de la variable pool.
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      timezone: 'Z',
    });
  }
  // La función retorna una conexión:
  return await pool.getConnection();
};

// Exportar Módulo:
module.exports = getDB;
