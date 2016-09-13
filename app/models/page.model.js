var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: [true, "Please key in a URL slug for the new page like 'About' or 'Contact'!"],
    trim: true
  },
  template: String,
  title: {
    type: String,
    unique: true,
    required: [true, "Title is required!"],
    trim: true
  },
  carousel_title: String,
  carousel_img: String,
  text: String,
  section: String,
  img: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }],
  imgUrl: String,
  address: String,
  contact_no: String,
  header: String
});
module.exports = mongoose.model('Page', pageSchema);
