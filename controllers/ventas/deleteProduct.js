// primero nos conectamos a la BD (getDB)
const getDB = require('../../ddbb/getDB.js');
//importamos la fecha de eliminacion de producto
//const { formatDate } = require('../../helpers.js');

//creamos la funcion de DeleteProduct y establecemos la conecction
const deleteProduct = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        //obtenemos el idProducts a eliminar
        const { idProduct } = req.params;

        //comprobamos que el idProduct exista
        const [product] = await connection.query(
            `
SELECT * FROM products WHERE id = ?`,
            [idProduct]
        );

        if (product.length < 1) {
            const error = new Error('El producto no fue encontrado');
            error.httpStatus = 404;
            throw error;
        }

        //verificamos que el usuario que desea eliminar el producto sea administrador
        if (
            req.userAuth.id !== Number(product[0].idUser) &&
            req.userAuth.rol !== 'administrador'
        ) {
            //si no es administrador de producto lanzamos error
            const error = new Error(
                'Debe ser Aministrador o el creador del producto para poder eliminarlo'
            );

            error.httpStatus = 401;
            throw error;
        }

        // ya identificado el producto borramos producto
        await connection.query(
            `
DELETE FROM products WHERE id = ?
`,
            [idProduct]
        );

        res.send({
            status: 'ok',
            message: 'Producto eliminado',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteProduct;
