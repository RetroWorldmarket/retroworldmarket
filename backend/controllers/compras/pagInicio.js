const getDB = require('../../ddbb/getDB');

const pagInicio = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    //declaramos fuera la variable donde se almacenarán los productos por categorias
    const [products] = await connection.query(
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
        `
    );

    let productos = [];

    for (let i = 0; i < 5; i++) {
      let idProduct = Math.ceil(Math.random() * products.length - 1);
      productos.push(products[idProduct]);
    }
    //le pedimos la respuesta a la  base de datos para obtener la información
    res.send({
      status: 'ok',
      productos,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = pagInicio;
