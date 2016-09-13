var mongoose = require('mongoose');

var headerSchema = new mongoose.Schema({
  attribute: String,
  value: String,
  type: String,
  class: String
});
module.exports = mongoose.model('Header', headerSchema);
