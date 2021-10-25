const getDB = require('../../ddbb/getDB');

const getProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const { idProduct } = req.params;

    const [getProduct] = await connection.query(
      `
      SELECT products.id, products.idUser , products.nameProduct , products.brand , products.yearOfProduction , products.status, products.category , products.description , products.price,
      users.name, users.province, AVG(IFNULL(votes.vote, 0)) AS votes
      FROM products 
      LEFT JOIN  votes ON (products.idUser = votes.idUser)
      LEFT JOIN users ON (products.idUser = users.id)
      WHERE products.id = ?
      GROUP BY products.id

    `,
      [idProduct]
    );

    const [fotos] = await connection.query(
      `
  SELECT namePhoto
  FROM photos
  WHERE idProduct = ?

  `,

      [idProduct]
    );

    res.send({
      status: 'ok',
      producto: {
        ...getProduct,
        fotos,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getProduct;
