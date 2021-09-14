////////////////////////////////////////////
/// Módulo para Iniciar la Base de Datos ///
////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
// Mensaje para Desarrolladores:
//
// Está pendiente:
//                  - Crear al menos un AVATAR por default
//                  - Insertar datos en tabla de Productos...
//
/////////////////////////////////////////////////////////////////////////////////////

// Traer el módulo getDB.js
const getDB = require('./getDB.js');

// Importamos de helpers.js la función para formatear fechas para que las acepte DATETIME:
const { formatDate } = require('../helpers.js');

// Requerimos la API Faker para simular los datos de usuarios locales de España:
const faker = require('faker/locale/es');

//////////////////////////
/// Creación de Tablas ///
//////////////////////////

// Crear la función principal donde se crearán las tablas:
async function main() {
  // Establecer la conexión con la Base de Datos:
  let connection;

  try {
    connection = await getDB();

    //Eliminamos tablas si existen

    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS products');
    await connection.query('DROP TABLE IF EXISTS votes');
    await connection.query('DROP TABLE IF EXISTS messages');
    await connection.query('DROP TABLE IF EXISTS photos');
    await connection.query('DROP TABLE IF EXISTS historyProducts');

    console.log('Tablas eliminadas');

    // Crear la tabla de USUARIOS con las respectivas columnas (location = localidad):
    await connection.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                alias VARCHAR(50) UNIQUE NOT NULL,
                avatar VARCHAR(50),
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(512) NOT NULL,
                location VARCHAR(50) NOT NULL,
                province VARCHAR(50) NOT NULL,
                postalCode INT(5) NOT NULL,
                rol ENUM('usuario','administrador') DEFAULT 'usuario' NOT NULL,
                active BOOLEAN DEFAULT false,
                deleted BOOLEAN DEFAULT false,
                verifiedCode VARCHAR(100),
                recoverCode VARCHAR(100),
                createdDate DATETIME NOT NULL,
                modifiedDate DATETIME
            )
    `);
    console.log('Tabla usuarios creada');

    // Creamos la tabla de PRODUCTOS (brand = Marca; yearOfProduction = Año de Fabricación;
    // status = Estado de funcionamiento; MEDIUMINT = Nº entre 0 y 16.777.215)
    await connection.query(`
            CREATE TABLE products (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
                nameProduct VARCHAR(50) NOT NULL,
                brand VARCHAR(50) NOT NULL,
                yearOfProduction VARCHAR(4),
                status ENUM('No funciona', 'A veces falla', 'Bien', 'Muy bien', 'Excelente') NOT NULL,
                category ENUM('Todas las Categorías', 'Ordenadores', 'Televisores', 'Telefonía', 'Música y Rádio', 'Consolas y Juegos') NOT NULL,
                description VARCHAR(200) NOT NULL,
                price MEDIUMINT NOT NULL,
                createdDate DATETIME NOT NULL,
                modifiedDate DATETIME,
                deletedDate DATETIME,
                active BOOLEAN DEFAULT true,
                sold BOOLEAN DEFAULT false,
                reserved BOOLEAN DEFAULT false,
                reservedDate DATETIME,
                deleted BOOLEAN DEFAULT false,
                chatRoom VARCHAR(250)
            )
    `);
    console.log('Tabla productos creada');

    // Creamos la tabla de Photos
    // ****************************   namePhoto FALTA UUID    *****************************
    await connection.query(`
            CREATE TABLE photos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idProducts INT NOT NULL,
                FOREIGN KEY (idProducts) REFERENCES products(id),
                namePhoto VARCHAR(50) NOT NULL,
                createdDate DATETIME NOT NULL
            )
    `);

    console.log('Tabla fotos creada');

    // Creamos la tabla de mensajes entre usuarios
    //  *********   Modifiqué el nombre de createdMsg por el que está ahora, para mayor claridad  14/9 *******************
    await connection.query(`
              CREATE TABLE messages (
                idmessage PRIMARY KEY AUTO_INCREMENT,
                idProducts  INT NOT NULL,
                FOREIGN KEY (idProducts) REFERENCES products(id),
                idUser INT NOT NULL,
                FOREIGN KEY (IdUser) REFERENCES users (id),
                text VARCHAR(255),
                createdDateMessage DATETIME NOT NULL
              )
    `);

    console.log('Tabla mensajes creada');

    // Creamos la Tabla de Votos de los Vendedores (FALTARÍA EL ID DEL DUEÑO DEL PRODUCTO, es decir, a quién vota??):
    await connection.query(`
              CREATE TABLE votes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUsers INT NOT NULL,
                FOREIGN KEY (idUsers) REFERENCES users (id) ON DELETE CASCADE,
                vote ENUM('1','2', '3', '4', '5'),
                idproduct INT NOT NULL,
                FOREIGN KEY (idproduct) REFERENCES product (id) ON DELETE CASCADE
              )
    `);
    console.log('Tabla de Votos de Vendedores creada correctamente');

    // Creamos la tabla de HistorialProducts (idProducto, idUsers, datePublications, dateSoldProducts, dateDeletedProducts)
    await connection.query(`
            CREATE TABLE historialProductos (
                id INT PRIMARY KEY,
                idProducts INT NOT NULL,
                FOREIGN KEY (idProduct) REFERENCES products (id),
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                dateSoldProduct DATETIME,
            )
    `);
    console.log('Tabla de Hostorial de productos Creada correctamente');

    // Ahora vamos a crear el usuario administrador:
    // Problema con el formato de FECHA ---> Solución: crear función formatDate()
    await connection.query(`
              INSERT INTO users (name, alias, avatar, email, password, location, province, postalCode, rol, active, deleted, createdDate)
              VALUES (
                "Admin",
                "Admin",
                "retroworldmarket@gmail.com",
                "123456",
                "Pontevedra",
                "Pontevedra",
                "36002",
                "administrador",
                true,
                false,
                "${formatDate(new Date())}"
              )
    `);

    console.log('Creado correctamente el usuario Administrador');

    ///////////////////////////////////////////////////////////////////////////
    /////////////// Insertar Datos en las Tablas, con Faker ///////////////////
    ///////////////////////////////////////////////////////////////////////////

    /////////////////////////
    /// Tabla de Usuarios ///
    /////////////////////////

    // Declaramos una variable con el Nº de usuarios que queremos introducir:
    const USERS = 10;

    // Insertamos los usuarios con un bucle for:
    for (let i = 0; i < USERS; i++) {
      // Pedirle datos concretos de los usuarios usando los métodos de la API Faker, almacenarlos en variables:
      const name = faker.name.findName();
      const alias = faker.internet.userName();
      const avatar = faker.internet.avatar();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const location = faker.address.city();
      const province = faker.address.state();
      const postalCode = faker.address.zipCode();

      // Creamos la Query para insertarlos:
      await connection.query(`
          INSERT INTO users (name, alias, avatar, email, password, location, province, postalCode, active, deleted, createdDate)
          VALUES (
            "${name}",
            "${alias}",
            "${avatar}",
            "${email}",
            "${password}",
            "${location}",
            "${province}",
            "${postalCode}",
            true,
            false,
            "${formatDate(new Date())}"
         )
      `);
    }
    console.log('Usuarios creados correctamente en la Tabla de usuarios');

    //////////////////////////
    /// Tabla de Productos ///
    //////////////////////////

    // Capturamos TODOS los errores en el CATCH.
  } catch (error) {
    console.error(error.message);

    // Bloque FINALLY obligatorio. Tanto si todo va PERFECTO como si hay ERRORES se ejecutará
  } finally {
    // para terminar la conexión:
    if (connection) connection.release();
    process.exit(0);
  }
}
main();
