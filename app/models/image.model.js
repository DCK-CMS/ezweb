var mongoose = require('mongoose');

var imgSchema = new mongoose.Schema({
  img_url: String,
  name: String
});
module.exports = mongoose.model('Image',imgSchema);
