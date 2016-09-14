module.exports = function(app) {
  var pagesController  = require('../controllers/admin_pages.controller');

  // restful admin pages routes
  app.route('/admin/pages')
    .get(pagesController.index);

  app.route('/admin/pages/new')
    .get(pagesController.new)
    .post(pagesController.create);

  app.route('/admin/pages/setHeader')           .post(pagesController.updateHeader);

  app.route('/admin/pages/:id')
     .get(pagesController.show)
     .put(pagesController.update)
     .delete(pagesController.delete);

};
