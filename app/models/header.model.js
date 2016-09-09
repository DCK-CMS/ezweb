var mongoose = require('mongoose');

var headerSchema = new mongoose.Schema({
  logo: String,
  bg_color: String
});
module.exports = mongoose.model('Header',headerSchema);
