//////////////////////////////////////
/// Barra de busqueda de productos ///
//////////////////////////////////////
// Devuelve los productos (activos) filtrados por los para metros enviados por QueryStrings

const getDB = require('../../ddbb/getDB');

const search = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Primero obtenemos los QUERYSTRING que llegarán: (search, order y direction)
    const { search, order, direction , page , limmit } = req.query;
    console.log('req.query tiene: ', req.query);

    // Las busquedas estarán referenciadas a las siguientes tuplas si coinciden
    // con los parametros buscados
    const validOrderOptions = [
      'nameProduct',
      'brand',
      'yearOfProduction',
      'status',
      'category',
      'description',
      'price',
      'createdDate',
      'idUser',
      'province',
    ];

    // Los valores de dirección:
    const validDirectionOptions = ['DESC', 'ASC'];

    // Establecemos que el orden por defecto sea createdDate
    // Primero se recorre el array validOrderOptions buscando la coincidencia con el
    // criterio recibido, si no lo encuentra, entra el operador ternario (?) y asigna createdDate.
    const orderBy = validOrderOptions.includes(order) ? order : 'createdDate';

    // Establecemos la dirección por defecto en caso que no venga ninguna dirección dada:
    // Con el mismo método que orderBy
    const orderDirection = validDirectionOptions.includes(direction)
      ? direction
      : 'ASC';

    // Almacenaremos los resultados de la búsqueda en una variable:
    let items;

    // Ahora le preguntamos a la BdD:
    if (search) {
      [items] = await connection.query(
        `
            SELECT products.nameProduct, products.brand, products.yearOfProduction, products.status, products.category, products.description, products.price, products.createdDate, products.idUser 
            FROM products
            LEFT JOIN users ON users.province
            WHERE products.nameProduct LIKE ? OR products.brand LIKE ? OR products.yearOfProduction LIKE ? OR products.status LIKE ? OR products.category LIKE ? OR products.description LIKE ? OR products.price LIKE ? OR products.createdDate LIKE ? OR products.idUser LIKE ? OR users.province LIKE ?
            ORDER BY ${orderBy} ${orderDirection}
        `,
        [
          `%${search}%`,
          `%${search}%`,
          `%${search}%`,
          `%${search}%`,
          `%${search}%`,
          `%${search}%`,
          `%${search}%`,
          `%${search}%`,
          `%${search}%`,
          `%${search}%`,
        ]
      );
      // Tests para encontrar error de sintaxis
      //    WHERE products.nameProduct LIKE ? OR products.brand LIKE ? OR products.yearOfProduction LIKE ? OR products.status LIKE ? OR products.category LIKE ? OR products.description LIKE ? OR products.price LIKE ? OR products.createdDate LIKE ? OR products.idUser LIKE ? OR users.province LIKE ?
      //    , %${search}%, %${search}%, %${search}%, %${search}%, %${search}%, %${search}%, %${search}%, %${search}%, %${search}%
      //    GROUP BY products.createdDate
      //
      //
      //
      // Si el usuario no introdujo un parametro de búsqueda, la damos una busqueda por defecto de productos
      // ordenador por fecha de subida
    } else {
      [items] = await connection.query(
        `
                SELECT products.nameProduct, products.brand, products.yearOfProduction, products.status, products.category, products.description, products.price, products.createdDate, products.idUser FROM products
                LEFT JOIN users ON user.province
                GROUP BY products.createdDate
                ORDER BY ${orderBy} ${orderDirection}
            `
      );
    }
    // Tests
    //  LEFT JOIN users AS province_product ON (products.idUser = user.province)
    //

    console.log('items tiene : ', items);
    // Si la BdD no arroja resultados, mostramos un mensaje y lanzamos un error:
    if (items.length < 1) {
      const error = new Error('No hay elementos que coincidan con la busqueda');
      error.httpStatus = 404;
      throw error;
    }

    const data = paginacion(items, page, limit);

    res.send({
      status: 'ok',
      data,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = search;
