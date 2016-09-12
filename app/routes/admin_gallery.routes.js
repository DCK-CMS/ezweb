module.exports = function(app) {
  var galleryController  = require('../controllers/admin_gallery.controller');

  // restful admin gallery routes
  app.route('/admin/gallery')
    .get(galleryController.index)
    .post(galleryController.create);

};
