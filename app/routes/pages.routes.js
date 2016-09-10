module.exports = function(app) {
  var pagesController  = require('../controllers/pages.controller');

  //restful admin pages routes
  app.route('/admin/pages')
    .get(pagesController.index);

  app.route('/admin/pages/new')
    .get(pagesController.new);
  // app.route('/commonquestions/new')
  //   .get(commonquestionsController.new);
  //
  // app.route('/commonquestions/show')
  //   .get(commonquestionsController.show);
};
