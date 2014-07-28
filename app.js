
/**
 * Module dependencies.
 */

var express = require('express');
var jade = require('jade');
var stylus = require('stylus');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(
//   stylus.middleware({
//     src: __dirname + '/public',
//     compile: compile
//   })
// );
function compile(str, path) {
  return stylus(str)
    .set('filename', path);
}

app.use(
  stylus.middleware({
    src: path.resolve(__dirname),
    dest: path.resolve(__dirname, 'public'),
    compile: compile
  })
);
console.log(path.resolve(__dirname));
console.log(path.resolve(__dirname, 'public'));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
