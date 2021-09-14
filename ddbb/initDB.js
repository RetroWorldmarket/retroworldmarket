////////////////////////////////////////////
/// Módulo para Iniciar la Base de Datos ///
////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
// Mensaje para Desarrolladores:
//
// Está pendiente:
//                  - Crear al menos un AVATAR por default
//                  - Confirmar si tabla de Productos tiene productos dentro (Workbench)
//
// Creo que si no hay fallos hasta este punto podemos empezar con los Endpoints.
//    Ya que tanto las fotos, como los mensajes y sala de chat, como los votos
//    en principio van por body, igual me equivoco.
//
/////////////////////////////////////////////////////////////////////////////////////

// Traer el módulo getDB.js

const getDB = require('./getDB.js');

const faker = require('faker/locale/es');

// Traemos la función formatDate creada en helpers con destructuring:
const { formatDate } = require('../helpers.js');

// Crear la función principal donde se crearán las tablas:
async function main() {
  // Establecer la conexión con la Base de Datos:
  let connection;
  try {
    connection = await getDB();

    //////////////////////////
    /// Creación de Tablas ///
    //////////////////////////

    //Eliminamos tablas si existen

    await connection.query('DROP TABLE IF EXISTS historialProducts');
    await connection.query('DROP TABLE IF EXISTS votes');
    await connection.query('DROP TABLE IF EXISTS messages');
    await connection.query('DROP TABLE IF EXISTS photos');
    await connection.query('DROP TABLE IF EXISTS products');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('funcionas');

    console.log('tablas eliminadas');

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
                postalCode VARCHAR(5) NOT NULL,
                rol ENUM('usuario','administrador') DEFAULT 'usuario' NOT NULL,
                active BOOLEAN DEFAULT false,
                deleted BOOLEAN DEFAULT false,
                verifiedCode VARCHAR(100),
                recoverCode VARCHAR(100),
                createdDate DATETIME NOT NULL,
                modifiedDate DATETIME
            )
    `);

    console.log('tabla usuarios creada');
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

    console.log('tabla productos creada');

    // Creamos la tabla de Photos (idphoto, idProducts, idUsers, datePublications)
    await connection.query(`
            CREATE TABLE photos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idProducts INT NOT NULL,
                FOREIGN KEY (idProducts) REFERENCES products(id),
                namePhoto VARCHAR(50) NOT NULL,
                createdDate DATETIME NOT NULL
            )
    `);

    console.log('tabla fotos creada');

    //Creamos la tabla de mensajes entre usuarios

    await connection.query(`
              CREATE TABLE messages (
                idProducts  INT NOT NULL,
                FOREIGN KEY (idProducts) REFERENCES products(id),
                idUser INT NOT NULL,
                FOREIGN KEY (IdUser) REFERENCES users (id),
                text VARCHAR(255),
                idmessage INT PRIMARY KEY AUTO_INCREMENT,
                createdDateMessage DATETIME NOT NULL 
              )
    `);

    console.log('tabla mensajes creada');

    // Creamos la Tabla de Votos de los Vendedores (FALTARÍA EL ID DEL DUEÑO DEL PRODUCTO, es decir, a quién vota??):
    await connection.query(`
              CREATE TABLE votes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUsers INT NOT NULL,
                FOREIGN KEY (idUsers) REFERENCES users (id) ON DELETE CASCADE,
                vote ENUM('1','2', '3', '4', '5'),
                idproduct INT NOT NULL,
                FOREIGN KEY (idproduct) REFERENCES products (id) ON DELETE CASCADE
              )
    `);
    console.log('Tabla de Votos de Vendedores creada correctamente');
    // Creamos la tabla de HistorialProducts (idProducto, idUsers, datePublications, dateSoldProducts, dateDeletedProducts)
    await connection.query(`
            CREATE TABLE historialProducts (
                id INT PRIMARY KEY,
                idProduct INT NOT NULL,
                FOREIGN KEY (idProduct) REFERENCES products (id),
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id),
                dateSoldProduct DATETIME
            )
    `);
    console.log('Tabla de Historial de productos Creada correctamente');

    ///////////////////////////////////////
    ///Creamos usuarios administradores///
    /////////////////////////////////////

    await connection.query(`
    INSERT INTO users (name, alias, email, password, location, province, postalCode, rol, active, deleted, createdDate)
    VALUES (
      "retroworldmarket",
      "retroworld",
      "retroworldmarket2021@gmail.com",
      "000000",
      "PONTEVEDRA",
      "PONTEVEDRA",
      "36002",
      "administrador",
      true,
      false,
      "${formatDate(new Date())}"
      )

    `);

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
      //falta avatar que lo crearemos manualmente
      const name = faker.name.findName();
      const alias = faker.internet.userName();
      const email = faker.internet.email();
      const password = faker.internet.password();
      const location = faker.address.city();
      const province = faker.address.state();
      const postalCode = faker.address.zipCode('#####');

      // Creamos la Query para insertarlos:
      await connection.query(`
          INSERT INTO users (name, alias, email, password, location, province, postalCode, active, deleted, createdDate)
          VALUES (
            "${name}",
            "${alias}",
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

    const PRODUCTS = 50;

    for (let i = 0; i < PRODUCTS; i++) {
      const idUser = Math.ceil(Math.random() * USERS + 1);
      const nameProduct = faker.commerce.productName();
      const brand = faker.company.companyName();
      const yearOfProduction = Math.round(Math.random() * 50 + 1960);
      ////////  Comprobar si funcionan STATUS y CATEGORY   /////////////////////////
      const arrayStatus = [
        'No funciona',
        'A veces falla',
        'Bien',
        'Muy bien',
        'Excelente',
      ];
      const status =
        arrayStatus[
          Number(Math.floor(Math.random() * (arrayStatus.length - 1)))
        ];

      const arrayCategories = [
        'Todas las Categorías',
        'Ordenadores',
        'Televisores',
        'Telefonía',
        'Música y Rádio',
        'Consolas y Juegos',
      ];
      const category =
        arrayCategories[
          Number(Math.floor(Math.random() * (arrayStatus.length - 1)))
        ];

      //    Comfirmar si .productDescription va bien, sino podemos sustituirlo
      // por faker.lorem.paragraph()
      const description = faker.commerce.productDescription();
      const price = faker.commerce.price();

      await connection.query(`
        INSERT INTO products (idUser, nameProduct, brand, yearOfProduction, status, category, description, price, createdDate, active, deleted)
        VALUES (
          "${idUser}",
          "${nameProduct}",
          "${brand}",
          "${yearOfProduction}",
          "${status}",
          "${category}",
          "${description}",
          "${price}",
          "${formatDate(new Date())}",
          true,
          false
        )

      `);
    }

    console.log('productos creados satisfactoriamente');

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
main();
