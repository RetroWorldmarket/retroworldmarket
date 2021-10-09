const getDB = require('../../ddbb/getDB');

const getProduct = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    const {idProduct} = req.params;

    const [getProduct] = await connection.query(`
    SELECT products.id, products.idUser , products.nameProduct , products.brand , products.yearOfProduction , products.status, products.category , products.description , products.price, AVG(IFNULL(votes.vote, 0)) AS votes
    FROM products 
    LEFT JOIN  votes ON (products.idUser = votes.idUser)
    WHERE products.id = ?
	GROUP BY products.id

    `, [idProduct]);
  
  const [foto] = await connection.query(`
  SELECT namePhoto
  FROM photos
  WHERE idProduct = ?

  `

  , [ idProduct]);

  const data = [...getProduct, foto]
  console.log(data);

  res.send({
    status: "ok",
    data

  })

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getProduct;