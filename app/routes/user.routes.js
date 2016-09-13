module.exports = function(app, passport) {
  app.route('/login')
    .get(function(req, res) {
      res.render('admin/sessions/new', {
        title: 'Login to CMS',
        message: req.flash('loginMessage')
      }); //render login page and messages
    })
    .post(passport.authenticate('login', {
      successRedirect: '/admin/pages',
      failureRedirect: '/admin',
      failureFlash: true //allow flash messages
    }));

  app.route('/signup')
    .get(function(req, res) {
      res.render('admin/sessions/signup', {
        title: 'Signup to CMS',
        message: req.flash('signupMessage')
      });
    })
    .post(passport.authenticate('signup', {
      successRedirect: '/admin/pages',
      failureRedirect: '/signup',
      failureFlash: true
    }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/admin');
  });


};
