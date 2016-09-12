module.exports = function(app) {
  var pagesController  = require('../controllers/pages.controller');

  // restful admin pages routes
  app.route('/admin/pages')
    .get(pagesController.index);

  app.route('/admin/pages/new')
    .get(pagesController.new)
    .post(pagesController.create);

  // site visitor routes
  app.get('/views/:slug', pagesController.getPage);

};
