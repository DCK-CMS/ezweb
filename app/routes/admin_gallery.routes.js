module.exports = function(app) {
  var galleryController  = require('../controllers/admin_gallery.controller');

  // restful admin gallery routes
  app.route('/admin/gallery')
    .get(galleryController.index)
    .post(galleryController.create);

  // restful admin gallery routes
  app.route('/admin/gallery/:id')
    .get(galleryController.show)
    .put(galleryController.update)
    .delete(galleryController.delete);


};
