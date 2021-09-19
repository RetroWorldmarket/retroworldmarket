const getDB = require('../../ddbb/getDB');

const categoryProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Obtenemos los QUERYSTRING que llegarán por las categorias

    //obtenemos la categoria del body (se la pedimos al 'usuario')
    const { categoria } = req.body;
    //hacer categoria por numeros

    //valores para category ---> sacada de las columnas que hicimos en base de datos

    const valoresCategories = [
      'Ordenadores',
      'Televisores',
      'Telefonía',
      'Música y Rádio',
      'Consolas y Juegos',
    ];

    //declaramos fuera la variable donde se almacenarán los productos por categorias

    let products = [];

    //le pedimos la respuesta a la  base de datos para obtener la información

    if (categoria > valoresCategories.length - 1) {
      products = await connection.query(
        `
        SELECT products.id, products.nameProduct, products.brand, products.price, products.category, products.idUser, products.yearOfProduction,
        AVG(IFNULL(idUser_votes.vote, 0)) AS votes
        FROM products, users 
        LEFT JOIN votes AS idUser_votes ON (users.id = idUser_votes.id)
       group by id
        ORDER BY products.yearOfProduction ASC 
        `
      );
    } else {
      products = await connection.query(
        `
        SELECT products.id, products.nameProduct, products.brand, products.price, products.category, products.idUser, products.yearOfProduction,
        AVG(IFNULL(idUser_votes.vote, 0)) AS votes
        FROM products, users 
        LEFT JOIN votes AS idUser_votes ON (users.id = idUser_votes.id)
        WHERE products.category = ?
       group by id
        ORDER BY products.yearOfProduction ASC 
    `,
        [valoresCategories[categoria]]
      );
    }

    res.send({
      status: 'ok',
      products: products[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = categoryProduct;
