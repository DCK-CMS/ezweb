module.exports = function(app) {
  var pagesController  = require('../controllers/visitor_pages.controller');

  // site visitor routes
  app.get('/views/:slug', pagesController.getPage);

  // root route
  app.get('/', pagesController.getRoot);
};
