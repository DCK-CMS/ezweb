// INITIALIZER
var config            = require('./config'),
    express           = require('express'),
    morgan            = require('morgan'),
    compress          = require('compression'),
    methodOverride    = require('method-override'),
    morgan            = require('morgan'),
    bodyParser        = require('body-parser'),
    expressLayouts    = require('express-ejs-layouts');


module.exports = function() {

  // Instantiate express
  var app = express();

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
  // app.use(session({
  //   saveUninitialized: true,
  //   resave: true,
  //   secret: config.sessionSecret
  // }));

  app.set('views', './app/views');
  app.set('view engine', 'ejs');
  app.use(expressLayouts);
  app.use(express.static('public'));

  /* ~~~~ Setting up routes ~~~~ */
  require('../app/routes/sessions.routes')(app);
  require('../app/routes/pages.routes')(app);

  return app;
};
