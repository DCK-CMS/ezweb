module.exports = function(app) {
  var pagesController  = require('../controllers/visitor_pages.controller');

  // site visitor routes
  app.get('/views/:slug', pagesController.getPage);

  // dummy route for templating
  app.get('/home', pagesController.getHome);
};
