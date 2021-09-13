// Módulo para Iniciar la Base de Datos

// Traer el módulo getDB.js
const getDB = require('./getDB.js');

// FALTA IMPORTAR LA DEPENDENCIA FAKER para simular los usuarios

// FALTAN MÁS PASOS, VAMOS POCO A POCO...

// Crear la función principal donde se crearán las tablas:
async function main () {
    // Establecer la conexión con la Base de Datos:
    let connection;
    try {
        connnection = await getDB()

        // Crear la tabla de USUARIOS:
        await connection.query(`
        CREATE TABLE users
        `)
    }
}
