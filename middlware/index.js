const authUser = require('./authUser');
const productExist = require('./productExist');
const userCanEdit = require('./userCanEdit');
const userExists = require('./userExists');
const productActive = require('./productActive');

module.exports = {
  authUser,
  userExists,
  userCanEdit,
  productExist,
  productActive,
};
