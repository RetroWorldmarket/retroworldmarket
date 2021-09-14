///////////////////////
/// Formatear Fecha ///
///////////////////////

// Creamos una función que se encarga de formatear una fecha (dependencia date-fns)
// porque el DATETIME de la BD no entiende el formato de new Date().

// Importamos solo la función FORMATEAR de date-fns con destructuring:
const { format } = require('date-fns');

function formatDate(date) {
  // La función retorna la fecha dada en formato Año, Mes, Día, Horas, Minutos y Segundos
  return format(date, 'yyyy-MM-dd-HH-mm-ss');
}

// Exportamos la función:
module.exports = {
  formatDate,
};
/////////////////////////////////////////////////////////////////////////////////////
