//////////////////////////////////////////////////////////////////////////////////////////////////
// Faltaría:
//            - Si se modifica el email, enviar un nuevo correo de verificación ( con todo lo que
//              ello implica)
//            - AGREGAR el AVATAR
//            - Para modificar el PASSWORD haremos un CONTROLADOR EXCLUSIVO para eso.
//
//
//      ¡¡¡¡¡¡¡¡¡¡¡     MUY IMPORTANTE:     !!!!!!!!!!!!
//        Cuando se hagan test en Postman enviar el body en formato json
//              ----------NO EN FORMATO form-data--------

const getDB = require('../../ddbb/getDB');

// Traemos la función formatDate creada en helpers para establecer la fecha de modificación:
const { formatDate , generateCryptoString,guardarFoto,borrarFoto} = require('../../helpers.js');
const { deletePhoto } = require('../ventas');

const editUser = async (req, res, next) => {
  let connection;

  try {
    connection = await getDB();

    // Antes que nada tenemos que acceder al usuario (idUser). Esto se hace mediante
    // el PathParam (:idProduct).
    // Obtenemos los PathParams del objeto req.params y, mediante destructuring, nos quedamos con
    // el id del usuario:
    const { idUser } = req.params;

    // Comprobamos el tipo de dato que teine idUser
    console.log('Este es el idUser: ', typeof idUser, idUser);

    /////////////////////////////////////////////////////////////////////////////////////////
    ///   AQUÍ TENEMOS UNA DUDA ANOTADA: POR QUÉ el .id de req.userAuth para recoger el   ///
    ///   id del usuario. Es imprescindible??? Cómo funciona realmente??                  ///
    /////////////////////////////////////////////////////////////////////////////////////////

    // Declarar la autorización en una constante. La autorización viene del middleware authUser.js
    // Es decir, el usuario ya está autorizado (esa es la diferencia entre idUser y idReqUser)
    const idReqUser = req.userAuth.id;

    

    // Ahora bien, vamos pedirle al body de la request todos los campos que podemos modificar:
    const { name, email, alias, location, province, postalCode } = req.body;

    



    // Si en el paso anterior no nos llega NINGÚN dato, lanzamos un error (no se puede
    // modificar lo que no tenemos, no?):
    if (!name && !email && !alias && !location && !province && !postalCode) {
      const error = new Error('Faltan campos del usuario');
      error.httpStatus = 400;
      throw error;
    }

    // Vamos a cerciorarnos que el usuario esté modificando sú propio perfíl, si no
    // fuera así, lanzaríamos el error 403 Forbbiden (El cliente no posee los permisos
    // necesarios para cierto contenido,)
    // Hemos comprobado que idUser es un string y que idReqUser es un Number,
    // así que tenemos que pasar idUser a Number:
    if (Number(idUser) !== idReqUser) {
      const error = new Error('No tiene permisos para editar este usuario');
      error.httpStatus = 403;
      throw error;
    }

    // Ahora obtenemos los datos del usuario de la Base de Datos:
    const [user] = await connection.query(
      `
    SELECT name, email, alias, location, province, postalCode FROM users WHERE id = ?
    `,
      [idUser]
    );

    // Creamos la fecha de modificación, para agregar al campo modifiedDate:
    const modifiedDate = formatDate(new Date());

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////
    /// Empezamos las modificaciones. Las haremos en distintos IFs  ///
    ///////////////////////////////////////////////////////////////////

    ///////////////////
    /// Editar name ///
    ///////////////////

    // En caso que el usuario me envie un dato name y que sea distinto al name
    // que ya existe, entonces lo cambiamos en la BdD:
    if (name && user[0].name !== name) {
      await connection.query(
        `
        UPDATE users SET name = ?, modifiedDate = ? WHERE id = ?
      `,
        [name, modifiedDate, idUser]
      );
    }

    ////////////////////
    /// Editar email ///
    ////////////////////

    // En caso que el usuario me envie un dato email vamos a comprobar que sea
    // distinto al email que ya existe
    if (email && email !== user[0].email) {
      // Debemos comprobar que el nuevo email no esté repetido en la Base de Datos:
      const [existingEmail] = await connection.query(
        `
        SELECT id FROM users WHERE email = ?
      `,
        [email]
      );
      // Si existingEmail tiene un valor, es porque el email está repetido y
      // lanzaremos un error 409 Conflict (Hay un conflicto)
      if (existingEmail.length > 0) {
        const error = new Error('Ya existe un usuario con el mismo email');
        error.httpStatus = 409;
        throw error;
      }
    }

    // Una vez pasadas las comprobaciones, podemos actualizar la BdD con el nuevo email:
    await connection.query(
      `
      UPDATE users SET email = ?, modifiedDate = ? WHERE id = ?
    `,
      [email, modifiedDate, idUser]
    );

    ////////////////////
    /// Editar alias ///
    ////////////////////

    // En caso que el usuario me envie un dato alias y que sea distinto al alias
    // que ya existe, entonces lo cambiamos en la BdD:
    if (alias && user[0].alias !== alias) {
      await connection.query(
        `
        UPDATE users SET alias = ?, modifiedDate = ? WHERE id = ?
      `,
        [alias, modifiedDate, idUser]
      );
    }

    ///////////////////////
    /// Editar location ///
    ///////////////////////

    // En caso que el usuario me envie un dato location y que sea distinto al location
    // que ya existe, entonces lo cambiamos en la BdD:
    if (location && user[0].location !== location) {
      await connection.query(
        `
        UPDATE users SET location = ?, modifiedDate = ? WHERE id = ?
      `,
        [location, modifiedDate, idUser]
      );
    }

    ///////////////////////
    /// Editar province ///
    ///////////////////////

    // En caso que el usuario me envie un dato province y que sea distinto al province
    // que ya existe, entonces lo cambiamos en la BdD:
    if (province && user[0].province !== province) {
      await connection.query(
        `
        UPDATE users SET province = ?, modifiedDate = ? WHERE id = ?
      `,
        [province, modifiedDate, idUser]
      );
    }

    ///////////////////////
    /// Editar postalCode ///
    ///////////////////////

    // En caso que el usuario me envie un dato postalCode y que sea distinto al postalCode
    // que ya existe, entonces lo cambiamos en la BdD:
    if (postalCode && user[0].postalCode !== postalCode) {
      await connection.query(
        `
        UPDATE users SET postalCode = ?, modifiedDate = ? WHERE id = ?
      `,
        [postalCode, modifiedDate, idUser]
      );

     
      
    }
     /////////////////////////
      /// Obtenemos el avatar////
      //////////////////////////
    //Comprobamos tiene un avatar previo
    if (req.files && req.files.avatar) {

      if( idUser[0].avatar) await borrarFoto( idUser[0].avatar)

      const nombreAvatar = await guardarFoto (req.files.avatar)

      await connection.query(`
        UPDATE users SET avatar = ? , modifiedDate = ? WHERE  id = ?,

        
      `
      [ nombreAvatar , modifiedDate, idUser]
      );


    }

  

    // Por último enviamos la respuesta al usuario:
    res.send({
      status: 'Ok',
      message: 'Los datos del usuario han sido actualizados correctamente',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editUser;
