module.exports = function(app) {
  var sessionsController  = require('../controllers/sessions.controller');

  // admin login route
  app.route('/admin')
    .get(sessionsController.new);

 };
