var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: [true,"Please key in a URL slug for the new page like 'About' or 'Contact'!"]
  },
  template: String,
  title: String,
  carousel_title: String,
  carousel_img: String,
  text: String,
  section: String,
  img:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }],
  imgUrl: String
});
module.exports = mongoose.model('Page',pageSchema);
