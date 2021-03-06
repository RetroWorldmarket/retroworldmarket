const addPhotoProduct = require('./addProductPhoto');
const editProduct = require('./editProduct');
const newProduct = require('./newProduct');
const deleteProduct = require('./deleteProduct');
const sellRetro = require('./sellretro');
const reservedProduct = require('./reservedRetro');
const requestReserve = require('./requestReserve');
const deletePhoto = require('./deletePhoto');
const rejectReserve = require('./rejectReserve');
const addFirstPhoto = require('./addFirstPhoto');

module.exports = {
  addFirstPhoto,
  addPhotoProduct,
  editProduct,
  newProduct,
  deleteProduct,
  sellRetro,
  reservedProduct,
  requestReserve,
  rejectReserve,
  deletePhoto,
};
