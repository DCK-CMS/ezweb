module.exports = function(app) {
  var pagesController  = require('../controllers/pages.controller');

  // restful admin pages routes
  app.route('/admin/pages')
    .get(pagesController.index);

  app.route('/admin/pages/new')
    .get(pagesController.new)
    .post(pagesController.create);

  app.route('/admin/pages/:id')
     .get(pagesController.show)
     .put(pagesController.update)
     .delete(pagesController.delete);

  // site visitor routes
  app.get('/views/:slug', pagesController.getPage);

};