var express = require('./config/express'),
    mongoose = require('./config/mongoose');

var db = mongoose();
var app = express();

app.set('port', (process.env.PORT || 1337));

app.listen(app.get('port'), function() {
  console.log('Running at ', app.get('port'));
});

module.exports = app;
