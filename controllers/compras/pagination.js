// const getDB = require('../../ddbb/getDB');

// const pagination = async (req, res, next) => {
//   let connection;

//   try {
//     connection = await getDB();
//     const numeroFilas;
//     const peticionBaseDeDatos;
//     const numeroProductoPorPagina = Number(req.query.npp, 5) || 1;
//     const pagina = Number(req.query.page, 5) || 0;
//     const numeroDePaginas;
//     const skip = pagina * numeroProductoPorPagina
//     const limiteParametro = skip + ',' + skip +numeroProductoPorPagina
//     console.log(data);
//     res.send({
//       status: 'ok',
//       message: data,
//     });
//   } catch (error) {
//     next(error);
//   } finally {
//     if (connection) connection.release();
//   }
// };

// module.exports = pagination;

// app.get('/', function (req, res) {
//     var numRows;
//     var queryPagination;
//     var numPerPage = parseInt(req.query.npp, 10) || 1;
//     var page = parseInt(req.query.page, 10) || 0;
//     var numPages;
//     var skip = page * numPerPage;
//     // Here we compute the LIMIT parameter for MySQL query
//     var limit = skip + ',' + skip + numPerPage;
//     queryAsync('SELECT count(*) as numRows FROM wp_posts')
//     .then(function(results) {
//       numRows = results[0].numRows;
//       numPages = Math.ceil(numRows / numPerPage);
//       console.log('number of pages:', numPages);
//     })
//     .then(() => queryAsync('SELECT * FROM wp_posts ORDER BY ID DESC LIMIT ' + limit))
//     .then(function(results) {
//       var responsePayload = {
//         results: results
//       };
//       if (page < numPages) {
//         responsePayload.pagination = {
//           current: page,
//           perPage: numPerPage,
//           previous: page > 0 ? page - 1 : undefined,
//           next: page < numPages - 1 ? page + 1 : undefined
//         }
//       }
//       else responsePayload.pagination = {
//         err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
//       }
//       res.json(responsePayload);
//     })
//     .catch(function(err) {
//       console.error(err);
//       res.json({ err: err });
//     });
//   });
