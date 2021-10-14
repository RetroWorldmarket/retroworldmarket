const getDB = require('../../ddbb/getDB');
const { paginacion } = require('../../helpers');

const categoryProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();
    const { page, limit } = req.query;

    //Obtenemos los QUERYSTRING que llegarán por las categorias
    // Primero obtenemos los QUERYSTRING que llegarán: (search, order y direction)
    const { category } = req.query;

    //valores para category ---> sacada de las columnas que hicimos en base de datos
    const valoresCategories = [
      'ordenadores',
      'televisores',
      'telefonia',
      'musica y radio',
      'consolas y juegos',
    ];

    //declaramos fuera la variable donde se almacenarán los productos por categorias
    let products = [];
    let photos = [];

    //le pedimos la respuesta a la  base de datos para obtener la información
    if (!valoresCategories.includes(category)) {
      [products] = await connection.query(
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
        ) 
        GROUP BY p.id, ph1.namePhoto
        ORDER BY p.id ASC;
        `
      );
    } else {
      [products] = await connection.query(
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
        ) AND p.category = ?
        GROUP BY p.id, ph1.namePhoto
        ORDER BY p.id ASC;      `,
        [`${category}`]
      );
    }
    const data = paginacion(products, page, limit);

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

module.exports = categoryProduct;
