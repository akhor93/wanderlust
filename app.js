
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
// var mongoose = require('mongoose');
var handlebars = require('express3-handlebars')
var hbs = require('express3-handlebars').create();

var index = require('./routes/index');

// Example route
// var user = require('./routes/user');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log("TSET");
// });

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Wanderlust Awesome Secret Key. Hello Viv'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.home);
app.get('/trips', index.trips);
app.get('/user', index.user);
app.get('/followers', index.followers);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//Databases
var users = {
	0: {
		name: 'Web Developer',
		admin: true
	},
	1: {
		name: 'John Smith',
		admin: false
	}
}
