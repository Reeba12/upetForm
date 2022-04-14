const mongoose = require('mongoose');

const userInfo = mongoose.Schema({
  key: String,
  firstName: String,
  lastName: String,
  Phone: Number,
  email: String,
  password: String,
});
const DB = mongoose.model('UserInfo', userInfo);
module.exports = DB;
