const getDB = require('../../ddbb/getDB');

const { formatDate } = require('../../helpers');

  // Fecha de reserva
  const fechadereserva = formatDate(new Date());

const reservedProduct = async (req, res, next) => {
  let connection;


  try {
    connection = await getDB();
      console.log(req.params)
    // Obtenemos el id del producto
    const { idProduct } = req.params;

  

    //Estado de un producto
    const estadosProductos =[

      'activo',
      'sold',
      'reservado'
    ]
    //comprobamos que el producto existe en la base de datos, sino existe lanzamos error el producto no fue encontrado

    const [product] = await connection.query(
      `
        SELECT * FROM products WHERE id = ?`,
      [idProduct]
    );

    console.log(product)

    if (product.length < 1) {
      const error = new Error('El producto no fue encontrado');
      error.httpStatus = 400;
      throw error;
    }

      // el prodcuto ya fue reservado
      if (idProduct[0].reserved===1) { 
        
        const error = new Error('El producto ya fue reservado');
        error.httpStatus= 400;
        throw error;
      }
    console.log(idProduct[0].reserved)
    //
    
    
      // realizamos los cambios del producto en la base de datos
    await connection.query(
      `UPDATE products SET active = ?,  reserved = ? WHERE id = ?`,
      [0, 1, idProduct]
  );

  res.send({
      status: 'ok',
      Messages: "El producto ha sido reservado correctamente"
  });
} catch (error) {
  next(error);
} finally {
  if (connection) connection.release();
}


};

module.exports = reservedProduct;
