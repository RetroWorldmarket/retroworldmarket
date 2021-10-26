////////////////////////////////////////////
/// Módulo para Iniciar la Base de Datos ///
////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////
// Mensaje para Desarrolladores:
//
//  Nota 17/9: Debido al problema dado en tests de login.js, hemos modificado el encriptado
//              de la contraseña del usuario Administrador (línea 167).
//              Si da fallos al meter los datos de administrador, probablemente sea por esta
//              causa. Se puede reestablecer al parámetro sin codificar.
//
// Está pendiente:
//                  - Crear al menos un AVATAR por default
//
//
/////////////////////////////////////////////////////////////////////////////////////

// Traer el módulo getDB.js
const getDB = require('./getDB.js');

// Traer el faker.js para simular las entradas de datos de usuarios y productos a la BD:
const faker = require('faker/locale/es');

// Traemos la función formatDate creada en helpers con destructuring:
const { formatDate } = require('../helpers.js');
const { productos } = require('../Template/productos');

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

    console.log('Tablas anteriores eliminadas correctamente');

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

    console.log('Tabla usuarios creada correctamente');
    // Creamos la tabla de PRODUCTOS (brand = Marca; yearOfProduction = Año de Fabricación;
    // status = Estado de funcionamiento; MEDIUMINT = Nº entre 0 y 16.777.215)
    await connection.query(`
            CREATE TABLE products (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE,
                nameProduct VARCHAR(50) NOT NULL,
                brand VARCHAR(30) NOT NULL,
                yearOfProduction BIGINT(4),
                status ENUM('No funciona', 'A veces falla', 'Bien', 'Muy bien', 'Excelente') NOT NULL,
                category ENUM('ordenadores', 'televisores', 'telefonia', 'musica y radio', 'consolas y juegos') NOT NULL,
                description VARCHAR(400) NOT NULL,
                price MEDIUMINT NOT NULL,
                createdDate DATETIME NOT NULL,
                modifiedDate DATETIME,
                deletedDate DATETIME,
                active BOOLEAN DEFAULT true,
                sold BOOLEAN DEFAULT false,
                reserved BOOLEAN DEFAULT false,
                reservedDate DATETIME,
                deleted BOOLEAN DEFAULT false
            )
    `);

    console.log('Tabla productos creada correctamente');

    // Creamos la tabla de Photos (idphoto, idProduct, idUser, datePublications)
    await connection.query(`
            CREATE TABLE photos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idProduct INT NOT NULL,
                FOREIGN KEY (idProduct) REFERENCES products(id),
                namePhoto VARCHAR(50) NOT NULL,
                createdDate DATETIME NOT NULL
            )
    `);

    console.log('Tabla fotos creada correctamente');

    //Creamos la tabla de mensajes entre usuarios

    await connection.query(`
              CREATE TABLE messages (
                idProduct  INT NOT NULL,
                FOREIGN KEY (idProduct) REFERENCES products(id),
                idOwner INT NOT NULL,
                FOREIGN KEY (IdUser) REFERENCES products (idUser),
                emisor INT NOT NULL,
                FOREIGN KEY (IdUser) REFERENCES products (idUser),
                receptor INT NOT NULL,
                FOREIGN KEY (IdUser) REFERENCES products (idUser),
                idUser INT NOT NULL,
                FOREIGN KEY (IdUser) REFERENCES users (id),
                text VARCHAR(255),
                idmessage INT PRIMARY KEY AUTO_INCREMENT,
                createdDateMessage DATETIME NOT NULL
              )
    `);

    console.log('Tabla mensajes creada correctamente');

    // Creamos la Tabla de Votos de los Vendedores (FALTARÍA EL ID DEL DUEÑO DEL PRODUCTO, es decir, a quién vota??):
    await connection.query(`
              CREATE TABLE votes (
                id INT PRIMARY KEY AUTO_INCREMENT,
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES users (id) ON DELETE CASCADE,
                vote ENUM('1','2', '3', '4', '5'),
                idproduct INT NOT NULL,
                FOREIGN KEY (idproduct) REFERENCES products (id) ON DELETE CASCADE,
                createdAt DATETIME NOT NULL
              )
    `);
    console.log('Tabla de Votos de Vendedores creada correctamente');
    // Creamos la tabla de HistorialProducts (idProducto, idUser, datePublications, dateSoldProducts, dateDeletedProducts)
    await connection.query(`
            CREATE TABLE historialProducts (
                id INT PRIMARY KEY AUTO_INCREMENT,
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
      SHA2("00000000", 512),
      "PONTEVEDRA",
      "PONTEVEDRA",
      "36002",
      "administrador",
      true,
      false,
      "${formatDate(new Date())}"
      )
     
    `);
    console.log('Usuario Administrador creado correctamente en Tabla usuarios');

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
          INSERT INTO users (name, alias, avatar, email, password, location, province, postalCode, active, deleted, createdDate)
          VALUES (
            "${name}",
            "${alias}",
            "defaultAvatar.jpg",
            "${email}",
            SHA2("${password}", 512),
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

    for (let i = 0; i < prod.length; i++) {
      const idUser = Math.ceil(Math.random() * USERS + 1);

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

      await connection.query(`
        INSERT INTO products (idUser, nameProduct, brand, yearOfProduction, status, category, description, price, createdDate, active, deleted)
        VALUES (
          "${idUser}",
          "${prod[i].nameProduct}",
          "${prod[i].brand}",
          "${prod[i].yearOfProduction}",
          "${status}",
          "${prod[i].category}",
          "${prod[i].description}",
          "${prod[i].price}",
          "${formatDate(new Date())}",
          true,
          false
        )

      `);
      //con el objeto OBJECT.VALUES saca un array de las propiedades de un objeto
      //por lo tanto podemos recorrer sus posiciones con j para que coincidan
      const valores = Object.values(prod[i].namePhoto);

      for (let j = 0; j < 2; j++) {
        await connection.query(`
        INSERT INTO photos (IdProduct, namePhoto, createdDate)
        VALUES (
          "${i + 1}",
          "${valores[j]}",
          "${formatDate(new Date())}"

        )

        `);
      }
    }

    console.log('Productos creados satisfactoriamente');

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
const prod = [
  {
    nameProduct: 'Family Game',
    brand: 'Nintendo',
    yearOfProduction: 1990,
    category: 'Consolas y Juegos',
    description: 'Consola clásica / (Lorem Ipsum)',
    price: '100',
    namePhoto: {
      1: 'consola1-1.jpeg',
      2: 'consola1-2.jpeg',
    },
  },
  {
    nameProduct: 'Play Station 1',
    brand: 'Sony',
    yearOfProduction: 1994,
    category: 'Consolas y Juegos',
    description: 'Consola clásica / (Lorem Ipsum)',
    price: '150',
    namePhoto: {
      1: 'consolas2-1.jpeg',
      2: 'consolas2-2.jpeg',
    },
  },
  {
    nameProduct: 'Play Station ',
    brand: 'Sony',
    yearOfProduction: 1999,
    category: 'Consolas y Juegos',
    description: 'Consola clásica con 64 juegos',
    price: '100',
    namePhoto: {
      1: 'consolas3-1.jpeg',
      2: 'consolas3-2.jpeg',
    },
  },
  {
    nameProduct: 'Play Station 3',
    brand: 'Sony',
    yearOfProduction: 2008,
    category: 'Consolas y Juegos',
    description: 'Consola clásica / (Lorem Ipsum)',
    price: '80',
    namePhoto: {
      1: 'consolas4-1.jpeg',
      2: 'consolas4-2.jpeg',
    },
  },
  {
    nameProduct: 'Game Cube',
    brand: 'SNintendo',
    yearOfProduction: 2003,
    category: 'Consolas y Juegos',
    description: 'Consola clásica con juego',
    price: '100',
    namePhoto: {
      1: 'consolas5-1.jpeg',
      2: 'consolas5-2.jpeg',
    },
  },
  {
    nameProduct: 'Xbox',
    brand: 'Microsoft',
    yearOfProduction: 2003,
    category: 'Consolas y Juegos',
    description: 'Consola clásica con 2 mandos',
    price: '90',
    namePhoto: {
      1: 'consolas6-1.jpeg',
      2: 'consolas6-2.jpeg',
    },
  },
  {
    nameProduct: 'Atari 2600',
    brand: 'Atari',
    yearOfProduction: 1986,
    category: 'Consolas y Juegos',
    description: 'Consola histórica con 2 mandos y juegos',
    price: '500',
    namePhoto: {
      1: 'consolas7-1.jpeg',
      2: 'consolas7-2.jpeg',
    },
  },
  {
    nameProduct: 'Game Boy',
    brand: 'Nintendo',
    yearOfProduction: 2000,
    category: 'Consolas y Juegos',
    description: 'Consola clásica de viaje con juegos',
    price: '50',
    namePhoto: {
      1: 'consolas8-1.jpeg',
      2: 'consolas8-2.jpeg',
    },
  },
  {
    nameProduct: 'Super Nintendo',
    brand: 'Nintendo',
    yearOfProduction: 1998,
    category: 'Consolas y Juegos',
    description: 'Consola clásica con 2 mandos',
    price: '90',
    namePhoto: {
      1: 'consolas9-1.jpeg',
      2: 'consolas9-2.jpeg',
    },
  },
  {
    nameProduct: 'PSP',
    brand: 'Sony',
    yearOfProduction: 2006,
    category: 'Consolas y Juegos',
    description: 'Consola clásica de viaje',
    price: '50',
    namePhoto: {
      1: 'consolas10-1.jpeg',
      2: 'consolas10-2.jpeg',
    },
  },
  {
    nameProduct: 'Rockola tocadiscos',
    brand: 'Jukebox',
    yearOfProduction: 1999,
    category: 'musica y radio',
    description: 'También sirve de portapapeles, también de posavasos',
    price: '1500',
    namePhoto: {
      1: 'musica1-1.jpg',
      2: 'musica1-2.jpg',
    },
  },
  {
    nameProduct: 'tocadiscos edad de Jhon Travolta',
    brand: 'Jukebox',
    yearOfProduction: 1985,
    category: 'musica y radio',
    description:
      'No hay nada mejor que bailar al ritmo de Jhon Travolta en Pulp Fiction, con este trasto eres parecido',
    price: '2500',
    namePhoto: {
      1: 'musica2-1.jpg',
      2: 'musica2-2.jpg',
    },
  },
  {
    nameProduct: 'Amplificador guapisimo',
    brand: 'liston',
    yearOfProduction: 1989,
    category: 'musica y radio',
    description: 'Para reventarte los oidos al ritmo de Ximo Bayo',
    price: '1495',
    namePhoto: {
      1: 'musica3-1.jpg',
      2: 'musica3-2.jpg',
    },
  },
  {
    nameProduct: 'Radio Retro con Bluetooth',
    brand: 'Adler',
    yearOfProduction: 1968,
    category: 'musica y radio',
    description:
      'Ideal para llevar en el bolsillo, o junto a la oreja, hay gente para todo',
    price: '450',
    namePhoto: {
      1: 'musica4-1.jpg',
      2: 'musica4-2.jpg',
    },
  },
  {
    nameProduct: 'PSP Audioware',
    brand: 'Warmer2',
    yearOfProduction: 1962,
    category: 'musica y radio',
    description:
      'Lo ideal para hackear el reggeaton, pero para eso necesitan primero un bootcamp',
    price: '6500',
    namePhoto: {
      1: 'musica5-1.jpg',
      2: 'musica5-2.webp',
    },
  },
  {
    nameProduct: 'Madiso VR-60',
    brand: 'Madison',
    yearOfProduction: 1992,
    category: 'musica y radio',
    description: 'Lo ideal para recrear al Príncipe de Bel-Air',
    price: '70',
    namePhoto: {
      1: 'musica6-1.jpg',
      2: 'musica6-2.jpg',
    },
  },
  {
    nameProduct: 'Radio retro control',
    brand: 'Toshiba',
    yearOfProduction: 1950,
    category: 'musica y radio',
    description: 'No veas la de raven que nos hemos pegado con este cacharro',
    price: '955',
    namePhoto: {
      1: 'musica7-1.jpg',
      2: 'musica7-2.jpg',
    },
  },
  {
    nameProduct: 'Mini radio cincuentera',
    brand: 'Adler',
    yearOfProduction: 1955,
    category: 'musica y radio',
    description:
      'Lo ideal para ir vacilando de rapero con esta maravilla en el hombro',
    price: '700',
    namePhoto: {
      1: 'musica8-1.jpg',
      2: 'musica8-2.jpg',
    },
  },
  {
    nameProduct: 'Radio St Louis',
    brand: 'Adler',
    yearOfProduction: 1970,
    category: 'musica y radio',
    description:
      'No se como describirla, pero para hacer botellon era mi mejor amiga; me gustan los pareados',
    price: '200',
    namePhoto: {
      1: 'musica9-1.jpg',
      2: 'musica9-2.jpg',
    },
  },
  {
    nameProduct: 'Gramofono con bocina',
    brand: 'Hack a Boss',
    yearOfProduction: 1900,
    category: 'musica y radio',
    description:
      'Hace que escuchar a Paquirrin sea lo me...... no puedo mentir Paquerrin sigue gritando igual que un cerdo degollao',
    price: '480',
    namePhoto: {
      1: 'musica10-1.jpg',
      2: 'musica10-2.jpg',
    },
  },
  {
    nameProduct: 'ordenador',
    brand: 'toshiba',
    yearOfProduction: 2002,
    category: 'ordenadores',
    description: 'ordenador clasico / (Lorem Ipsum)',
    price: '80',
    namePhoto: {
      1: '1.jpg',
      2: '11.jpg',
    },
  },

  {
    nameProduct: 'ordenador',
    brand: 'Hewlett-Packard 100LX ',
    yearOfProduction: 1993,
    category: 'ordenadores',
    description: 'ordenador clasico / (Lorem Ipsum)',
    price: '100',
    namePhoto: {
      1: '2.jpg',
      2: '12.jpg',
    },
  },

  {
    nameProduct: 'ordenador',
    brand: 'apple ',
    yearOfProduction: 2002,
    category: 'ordenadores',
    description: 'ordenador clasico / (Lorem Ipsum)',
    price: '120',
    namePhoto: {
      1: '3.jpg',
      2: '13.jpg',
    },
  },

  {
    nameProduct: 'ordenador',
    brand: 'sony ',
    yearOfProduction: 1998,
    category: 'ordenadores',
    description: 'ordenador clasico / (Lorem Ipsum)',
    price: '150',
    namePhoto: {
      1: '4.jpg',
      2: '14.jpg',
    },
  },

  {
    nameProduct: 'ordenador',
    brand: 'ibm personal ',
    yearOfProduction: 1981,
    category: 'ordenadores',
    description: 'ordenador clasico / (Lorem Ipsum)',
    price: '130',
    namePhoto: {
      1: '5.jpg',
      2: '15.jpg',
    },
  },

  {
    nameProduct: 'ordenador',
    brand: 'columbia data ',
    yearOfProduction: 1982,
    category: 'ordenadores',
    description: 'ordenador clasico / (Lorem Ipsum)',
    price: '160',
    namePhoto: {
      1: '6.jpg',
      2: '16.jpg',
    },
  },

  {
    nameProduct: 'ordenador',
    brand: 'sony ',
    yearOfProduction: 2000,
    category: 'ordenadores',
    description: 'ordenador clasico / (Lorem Ipsum)',
    price: '145',
    namePhoto: {
      1: '7.jpg',
      2: '17.jpg',
    },
  },

  {
    nameProduct: 'ordenador',
    brand: 'apple ',
    yearOfProduction: 2001,
    category: 'ordenadores',
    description: 'ordenador clasico / (Lorem Ipsum)',
    price: '155',
    namePhoto: {
      1: '8.jpg',
      2: '18.jpg',
    },
  },

  {
    nameProduct: 'ordenador',
    brand: 'ibm ',
    yearOfProduction: 1999,
    category: 'ordenadores',
    description: 'ordenador clasico / (Lorem Ipsum)',
    price: '165',
    namePhoto: {
      1: '9.jpg',
      2: '19.jpg',
    },
  },

  {
    nameProduct: 'ordenador',
    brand: 'toshiba ',
    yearOfProduction: 2005,
    category: 'ordenadores',
    description: 'ordenador clasico / (Lorem Ipsum)',
    price: '175',
    namePhoto: {
      1: '10.jpg',
      2: '20.jpg',
    },
  },
  {
    nameProduct: 'Movil Alcatel One Touch',
    brand: 'Alcatel',
    yearOfProduction: 2014,
    category: 'telefonia',
    description:
      'Movil antiguo, para recordar el pasado, buena conexion y manejo facil',
    price: '60',
    namePhoto: {
      1: 'telefonia-Alcatel-One-Touch_1.jpg',
      2: 'telefonia-Alcatel-One-Touch_2.jpg',
    },
  },
  {
    nameProduct: 'Movil Micro tac',
    brand: 'Motorola',
    yearOfProduction: 1989,
    category: 'telefonia',
    description:
      'Telefono Movil muy antiguo, pero de gran belleza y con una cobertura increible, movil todo terreno',
    price: '75',
    namePhoto: {
      1: 'telefonia-micro-tac-1.jpg',
      2: 'telefonia-micro-tac-2.jpg',
    },
  },
  {
    nameProduct: 'Movil Motorola Razr',
    brand: 'Motorola',
    yearOfProduction: 2004,
    category: 'telefonia',
    description:
      'Movil muy versatil, de grandes lineas de estilo, version mejorada, facil uso, muy facil de guardar, un movil increible',
    price: '70',
    namePhoto: {
      1: 'telefonia-motorola_razr_1.jpg',
      2: 'telefonia-motorola_razr_2.jpg',
    },
  },
  {
    nameProduct: 'Movil Nokia 3210',
    brand: 'Nokia',
    yearOfProduction: 1999,
    category: 'telefonia',
    description:
      'Movil modelo clásico, y que tuvo grandes ventas en su lanzamiento',
    price: '90',
    namePhoto: {
      1: 'telefonia-nokia1.jpg',
      2: 'telefonia-nokia1.jpg',
    },
  },
  {
    nameProduct: 'Movil Nokia 1100',
    brand: 'Nokia',
    yearOfProduction: 2003,
    category: 'telefonia',
    description:
      'Movil que batió récord en unidades vendidas llegando a los 250 millones',
    price: '85',
    namePhoto: {
      1: 'telefonia-nokia_1.jpg',
      2: 'telefonia-nokia_2.jpg',
    },
  },
  {
    nameProduct: 'Movil Nokia 3220',
    brand: 'Nokia',
    yearOfProduction: 2004,
    category: 'telefonia',
    description:
      'Movil deportivo, gran iluminacion, se adapta a tus estados de animo',
    price: '60',
    namePhoto: {
      1: 'telefonia-nokiaLuz1.jpg',
      2: 'telefonia-nokiaLuz1.jpeg',
    },
  },
  {
    nameProduct: 'Movil Nokia 5510',
    brand: 'Nokia',
    yearOfProduction: 2001,
    category: 'telefonia',
    description:
      'Movil Predecesor de la N-Gage. Se lanzó en el año 2001 y contaba con un total de 41 teclas.',
    price: '85',
    namePhoto: {
      1: 'telefonia-nokia_teclado.jpg',
      2: 'telefonia-nokia_teclado_2.jpg',
    },
  },
  {
    nameProduct: 'Movil Samsung p200',
    brand: 'Samsung',
    yearOfProduction: 2006,
    category: 'telefonia',
    description:
      'Es un teléfono celular GSM tribanda con factor de forma slider. Sus funciones principales incluyen pantalla TFT de 256k colores, UMA, WiFi, cámara de 1.3 megapixels, navegador WAP y reproductor de música.',
    price: '45',
    namePhoto: {
      1: 'telefonia-samsung-sgh-p200-1.jpg',
      2: 'telefonia-samsung-sgh-p200-2.jpg',
    },
  },
  {
    nameProduct: 'Movil Siemens A55',
    brand: 'Siemens',
    yearOfProduction: 1998,
    category: 'telefonia',
    description: 'Es un teléfono muy facil de usar, no consume mucha bateria',
    price: '45',
    namePhoto: {
      1: 'telefonia-siemens_1.jpg',
      2: 'telefonia-siemens_2.jpg',
    },
  },
  {
    nameProduct: 'Movil Siemens M65',
    brand: 'Siemens',
    yearOfProduction: 2004,
    category: 'telefonia',
    description:
      'Si quieres un movil resistente, que aguante el polvo, el agua y todos los impactos, aqui lo tienes, muy buen movil',
    price: '90',
    namePhoto: {
      1: 'telefonia-siemens_65.jpg',
      2: 'telefonia-siemens-M65_2.jpeg',
    },
  },
  {
    nameProduct: 'Movil Siemens M55',
    brand: 'Siemens',
    yearOfProduction: 2003,
    category: 'telefonia',
    description:
      'Es un teléfono con mucha autonomía de bateria, economico y muy versatil',
    price: '50',
    namePhoto: {
      1: 'telefonia-siemens-m55.jpg',
      2: 'telefonia-siemens-m55_2.jpg',
    },
  },
  {
    nameProduct: 'Movil Sony ERICSSON T10',
    brand: 'Sony Ericsson',
    yearOfProduction: 1999,
    category: 'telefonia',
    description:
      'Es un teléfono que ha hecho historia, y el cual es buscado por coleccionistas y amantes de lo bueno, Perteneciente a la segunda generación de telefonia móvil (2G).',
    price: '50',
    namePhoto: {
      1: 'telefonia-sony_E1.jpg',
      2: 'telefonia-sony_E2.jpg',
    },
  },
  {
    nameProduct: 'Akura CX4 15',
    brand: 'Akura',
    yearOfProduction: 1970,
    category: 'televisores',
    description:
      'Retro televisor, aqui puedes conectar la play 5 sin problemas, se ve mejor que el digital',
    price: '150',
    namePhoto: {
      1: 'televisores1-1',
      2: 'televisores1-2',
    },
  },
  {
    nameProduct: 'TV century',
    brand: 'Mid',
    yearOfProduction: 1973,
    category: 'televisores',
    description:
      'Para los amantes de las series antiguas, el peluche es mi único amigo',
    price: '1200',
    namePhoto: {
      1: 'televisores2-1.jpg',
      2: 'televisores2-1.jpg',
    },
  },
  {
    nameProduct: 'Crt tv réplica',
    brand: 'NovaVision',
    yearOfProduction: 1950,
    category: 'televisores',
    description:
      'Si quieres dejarte los ojos, pero siempre vintagmente hablando',
    price: '950',
    namePhoto: {
      1: 'televisores3-1.jpg',
      2: 'televisores3-2.jpg',
    },
  },
  {
    nameProduct: 'Vintage Portable TV Set',
    brand: 'Kapsch',
    yearOfProduction: 1981,
    category: 'televisores',
    description:
      'Un televisor 3d vintage, no necesitas ni gafas, muy útil para tirarlo por la ventana',
    price: '200',
    namePhoto: {
      1: 'televisores4-1.jpg',
      2: 'televisores4-2.jpg',
    },
  },
  {
    nameProduct: 'Televisor portatil Yugoslavia',
    brand: 'Iskra Trim',
    yearOfProduction: 1983,
    category: 'televisores',
    description:
      'Para ser el más chulo de la playa, hasta puedes hacer de dj con sus controles',
    price: '350',
    namePhoto: {
      1: 'televisores5-1.jpg',
      2: 'televisores5-2.jpg',
    },
  },
  {
    nameProduct: 'Televisor portátil',
    brand: 'Iskra Tv',
    yearOfProduction: 1982,
    category: 'televisores',
    description:
      'Mega televisor con corona, para cuando no sabes que ver en la tele, metes la cabeza y te entretienes',
    price: '225',
    namePhoto: {
      1: 'televisores6-1.jpg',
      2: 'televisores6-2.jpg',
    },
  },
  {
    nameProduct: 'Mini tv portátil',
    brand: 'Junost',
    yearOfProduction: 1991,
    category: 'televisores',
    description:
      'He escogido esta panorámica para que parezca más grande, pero no mide ni el índice de mi dedo',
    price: '60',
    namePhoto: {
      1: 'televisores7-1.jpg',
      2: 'televisores7-2.jpg',
    },
  },
  {
    nameProduct: 'CLUZEVELECTRONIC',
    brand: 'Toshiba',
    yearOfProduction: 1974,
    category: 'televisores',
    description: 'De regalo te llevas un episodeo de star trek',
    price: '182',
    namePhoto: {
      1: 'televisores8-1.jpg',
      2: 'televisores8-2.jpg',
    },
  },
  {
    nameProduct: 'Televisor VHS',
    brand: 'Zenith',
    yearOfProduction: 1995,
    category: 'televisores',
    description:
      'Televisor con VHS, pero también le puedes meter discos a la fuerza todo depende de las neuronas que tengas',
    price: '192',
    namePhoto: {
      1: 'televisores9-1.jpg',
      2: 'televisores9-2.jpg',
    },
  },
  {
    nameProduct: 'Tv pórtatil con adaptador de modulador RF',
    brand: 'RCA 9',
    yearOfProduction: 1975,
    category: 'televisores',
    description:
      'Para los amantes de búsqueda de cobertura, mueves las antenas y a jugar',
    price: '135',
    namePhoto: {
      1: 'televisores10-1.jpg',
      2: 'televisores10-2.jpg',
    },
  },
];
