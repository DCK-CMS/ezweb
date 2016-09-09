var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: String,
  user_name: String,
  password: String
});
module.exports = mongoose.model('User',userSchema);
