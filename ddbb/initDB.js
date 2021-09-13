// Módulo para Iniciar la Base de Datos

// Traer el módulo getDB.js
const getDB = require('./getDB.js');

// FALTA IMPORTAR LA DEPENDENCIA FAKER para simular los usuarios

// FALTAN MÁS PASOS, VAMOS POCO A POCO...

// Crear la función principal donde se crearán las tablas:
async function main() {
  // Establecer la conexión con la Base de Datos:
  let connection;
  try {
    connnection = await getDB();

    // Crear la tabla de USUARIOS con las respectivas columnas:
    await connection.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                alias VARCHAR(50) UNIQUE NOT NULL,
                avatar VARCHAR(50),
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(512) NOT NULL,
                localidad VARCHAR(50) NOT NULL,
                provincia VARCHAR(50) NOT NULL,
                codigoPostal INT(5) NOT NULL,
                rol ENUM('usuario','administrador') DEFAULT 'usuario' NOT NULL,
                activo BOOLEAN DEFAULT false,
                eliminado BOOLEAN DEFAULT false,
                verifiedCode VARCHAR(100),
                recoverCode VARCHAR(100),
                createdDate DATETIME NOT NULL,
                modifiedDate DATETIME
            )
    `);
    // Creamos la tabla de PRODUCTOS (brand = Marca; yearOfProduction = Año de Fabricación;
    // status = Estado de funcionamiento; MEDIUMINT = Nº entre 0 y 16.777.215)
    await connection.query(`
            CREATE TABLE products (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id),
                nameProduct VARCHAR(50) NOT NULL,
                brand VARCHAR(50) NOT NULL,
                yearOfProduction VARCHAR(4),
                status ENUM('No funciona', 'Aveces falla', 'Bien', 'Muy bien', 'Excelente') NOT NULL,
                category ENUM('Todas las Categorías', 'Ordenadores', 'Televisores', 'Telefonía', 'Música y Rádio', 'Consolas y Juegos') NOT NULL,
                descroption VARCHAR(200) NOT NULL,
                price MEDIUMINT NOT NULL,
                createdDate DATETIME NOT NULL,
                modifiedDate DATETIME,
                
            )
    `);

    // Capturamos TODOS los errores en el CATCH.
  } catch (error) {
    console.error(error.message);
  } finally {
    // Bloque FINALLY obligatorio. Tanto si todo va PERFECTO como si hay ERRORES se ejecutará
    // para terminar la conexión:
    if (connection) connection.release();
    process.exit(0);
  }
}
