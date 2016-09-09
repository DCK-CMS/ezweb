var mongoose = require('mongoose');

var footerSchema = new mongoose.Schema({
  text: String
});
module.exports = mongoose.model('Footer',footerSchema);
