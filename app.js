var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var server = http.createServer(app);
app.set('port', process.env.PORT || 9292);

// CORS Middleware that sends HTTP headers with every request
// Allows connections from http://localhost:9292
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9292');
    res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');

    next();
}

app.configure(function(){
  app.set('port', process.env.PORT || 9292);
  app.set('/', __dirname);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(app.router);
  app.use(express.static(path.join(__dirname)));
  app.use(express.errorHandler());
});


//boot
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});