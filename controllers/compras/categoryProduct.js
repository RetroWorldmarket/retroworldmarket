const getDB = require('../../ddbb/getDB');

const categoryProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //Obtenemos los QUERYSTRING que llegarán por las categorias
    // Primero obtenemos los QUERYSTRING que llegarán: (search, order y direction)
    const { category } = req.query;

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
    console.log('category tiene: ', category);
    console.log('valoresCategories tiene: ', valoresCategories);
    console.log('la condicion tiene: ', !valoresCategories.includes(category));
    console.log('category es un : ', typeof category);

    //le pedimos la respuesta a la  base de datos para obtener la información
    if (!valoresCategories.includes(category)) {
      products = await connection.query(
        `
        SELECT products.id, products.nameProduct, products.idUser, products.brand, products.price, products.category, products.yearOfProduction, products.status, namePhoto, vote, province
          FROM products
          LEFT JOIN photos on (products.id = photos.idProducts)
          left join users on (products.idUser = users.id)
          left join votes on (users.id = votes.idUsers)
          WHERE products.active = true
          order by products.yearOfProduction
        `
      );
    } else {
      products = await connection.query(
        `
        SELECT products.id, products.nameProduct, products.idUser, products.brand, products.price, products.category, products.yearOfProduction, products.status, namePhoto, vote, province
          FROM products
          LEFT JOIN photos on (products.id = photos.idProducts)
          left join users on (products.idUser = users.id)
          left join votes on (users.id = votes.idUsers)
          WHERE products.category = ? AND  products.active = true
          order by products.yearOfProduction
      `,
        [`${category}`]
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
