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
  cloudinary = require('cloudinary'),
  expressLayouts = require('express-ejs-layouts');
var isLoggedIn = require('./auth.middleware').isLoggedIn;


module.exports = function() {

  // Instantiate express
  var app = express();
  require('./passport')(passport); //pass passport for configuration

  //cloudinary configuration
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
  });

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
  // app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(methodOverride('_method'));

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

  //routes protection
  // app.all("/admin/*", isLoggedIn, function(req, res, next) {
  //   next(); // if the middleware allowed us to get here,
  //   // just move on to the next route handler
  // });

  app.use(function(req, res, next) {
    // this middleware will call for each requested
    // and we checked for the requested query properties
    // if _method was existed
    if (req.query._method == 'DELETE') {
      // change the original METHOD
      // into DELETE method
      req.method = 'DELETE';
      // and set requested url
      req.url = req.path;
    }
    next();
  });


  /* ~~~~ Setting up routes ~~~~ */
  require('../app/routes/user.routes')(app, passport); //load our routes and pass in our app and fully configured passport
  require('../app/routes/sessions.routes')(app);
  require('../app/routes/admin_pages.routes')(app);
  require('../app/routes/admin_gallery.routes')(app);
  require('../app/routes/visitor_pages.routes')(app);

  return app;
};
