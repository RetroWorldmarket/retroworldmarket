//////////////////////////////////////
/// Barra de busqueda de productos ///
//////////////////////////////////////
// Devuelve los productos (activos) filtrados por los para metros enviados por QueryStrings

const getDB = require('../../ddbb/getDB');
const { paginacion } = require('../../helpers');

const search = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Primero obtenemos los QUERYSTRING que llegarán: (search, order y direction)
    const { search, order, direction, page, limit } = req.query;

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
    const orderBy = validOrderOptions.includes(order) ? order : 'p.createdDate';

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
        SELECT p.id, p.nameProduct, p.idUser, p.brand, p.price, p.category, 
        p.yearOfProduction, p.status, ph1.namePhoto, u.province, AVG(IFNULL(v.vote, 0)) AS votes
        FROM products p
        LEFT JOIN users u ON (p.idUser = u.id)
        LEFT JOIN votes v ON (u.id = v.idUser)
        JOIN photos ph1 ON ph1.idProduct = p.id 
        WHERE NOT EXISTS (
          SELECT *
            FROM photos ph2
            WHERE  ph2.idProduct = ph1.idProduct
            AND (ph2.idProduct > ph1.idProduct OR (ph2.createdDate = ph1.createdDate AND ph2.id > ph1.id))
        ) AND  p.nameProduct LIKE ? OR p.brand LIKE ? OR p.yearOfProduction LIKE ? OR p.status LIKE ? OR p.category LIKE ? OR p.description LIKE ? OR p.price LIKE ? OR p.createdDate LIKE ? OR p.idUser LIKE ? OR u.province LIKE ?
        GROUP BY p.id, ph1.namePhoto; `,
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
        SELECT p.id, p.nameProduct, p.idUser, p.brand, p.price, p.category, 
        p.yearOfProduction, p.status, ph1.namePhoto, u.province, AVG(IFNULL(v.vote, 0)) AS votes

        FROM products p
        LEFT JOIN users u ON (p.idUser = u.id)
        LEFT JOIN votes v ON (u.id = v.idUser)
        JOIN photos ph1 ON ph1.idProduct = p.id 
        WHERE NOT EXISTS (
          SELECT *
            FROM photos ph2
            WHERE  ph2.idProduct = ph1.idProduct
            AND (ph2.idProduct > ph1.idProduct OR (ph2.createdDate = ph1.createdDate AND ph2.id > ph1.id))
        ) AND  p.category LIKE "ordenadores" OR p.brand LIKE "toshiba"
        GROUP BY p.id, ph1.namePhoto
        ORDER BY p.id AND ${orderBy} ${orderDirection};  `
      );
    }
    // Tests
    // ORDER BY ${orderBy} ${orderDirection}
    //  LEFT JOIN users AS province_product ON (products.idUser = user.province)
    //

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
