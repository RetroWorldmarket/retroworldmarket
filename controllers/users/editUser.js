const getDB = require('../../ddbb/getDB');

// Traemos la función formatDate creada en helpers para establecer la fecha de modificación:
const { formatDate } = require('../../helpers.js');

const editUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Antes que nada tenemos que acceder al usuario (idUser). Esto se hace mediante
    // el PathParam (:idProduct).
    // Obtenemos los PathParams del objeto req.params y, mediante destructuring, nos quedamos con
    // el id del producto:
    const { idUser } = req.params;

    // Declarar la autorización en una constante. La autorización viene del middleware authUser.js
    //
    const idReqUser = req.userAuth.id;

    if (product.length < 1) {
      const error = new Error('El producto no fue encontrado');
      error.httpStatus = 400;
      throw error;
    }

    // Aquí obtendremos las propiedades existentes (con destructuring) del producto
    // que vamos a editar (que nos viene en el body de la request):
    // Declaramos la variable con let porque la vamos a modificar.
    let {
      idUser,
      nameProduct,
      brand,
      yearOfProduction,
      status,
      category,
      description,
      price,
      createdDate,
      active,
    } = req.body;

    // En caso que no hubiera NINGUNA propiedad (sería porque no hay producto), lanzamos un error:
    if (
      !idUser &&
      !nameProduct &&
      !brand &&
      !yearOfProduction &&
      !status &&
      !category &&
      !description &&
      !price &&
      !createdDate &&
      !active
    ) {
      const error = new Error('Faltan datos del Retro');
      error.httpStatus = 400;
      throw error;
    }

    // Si llega hasta aquí es porque no hay errores, entonces vamos a editar.
    // Nos interesa quedarnos con los valores que traía el producto (línea 16 declaramos
    // el OBJETO product como variable), para editar solo lo que haya que cambiar.
    //idUser = idUser || product[0].idUser;
    nameProduct = nameProduct || product[0].nameProduct;
    brand = brand || product[0].brand;
    yearOfProduction = yearOfProduction || product[0].yearOfProduction;
    status = status || product[0].status;
    category = category || product[0].category;
    description = description || product[0].description;
    price = price || product[0].price;

    // Establecer el valor para fecha de modificación del producto (modifiedDate).
    const modifiedDate = formatDate(new Date());

    // Por último actualizamos el producto en la Base de Datos:
    await connection.query(
      `
        UPDATE products SET nameProduct = ?, brand = ?, yearOfProduction = ?, status = ?, category = ?, description = ?, price = ?, modifiedDate = ? WHERE id = ?`,
      [
        nameProduct,
        brand,
        yearOfProduction,
        status,
        category,
        description,
        price,
        modifiedDate,
        idProduct,
      ]
    );

    // ...Y enviamos la response:
    res.send({
      status: 'Ok',
      product: {
        id: idProduct,
        idUser,
        nameProduct,
        brand,
        yearOfProduction,
        status,
        category,
        description,
        price,
        modifiedDate,
        message: 'El producto se ha actualizado correctamente',
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUser;
