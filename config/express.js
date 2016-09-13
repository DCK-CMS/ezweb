// INITIALIZER
var config = require('./config'),
  express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  passport = require('passport'),
  flash = require('connect-flash'),
  session = require('express-session'),
  expressLayouts = require('express-ejs-layouts');
  var isLoggedIn = require('./auth.middleware').isLoggedIn;


module.exports = function() {

  // Instantiate express
  var app = express();
  require('./passport')(passport); //pass passport for configuration

  // initialize the required module
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: false
  })); // get information from html
  app.use(bodyParser.json());
  app.use(methodOverride());

  // required for passport
  app.use(cookieParser());
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));
  app.use(passport.initialize());
  app.use(passport.session()); //persistent login sessions
  app.use(flash()); // to flash messages stored in session

  //views setup
  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.use(express.static('public'));

  app.all("/admin/*", isLoggedIn, function(req, res, next) {
    next(); // if the middleware allowed us to get here,
    // just move on to the next route handler
  });



  /* ~~~~ Setting up routes ~~~~ */
  require('../app/routes/user.routes')(app, passport); //load our routes and pass in our app and fully configured passport
  require('../app/routes/sessions.routes')(app);
  require('../app/routes/admin_pages.routes')(app);
  require('../app/routes/admin_gallery.routes')(app);
  require('../app/routes/visitor_pages.routes')(app);

  return app;
};
