//Modules
var AM = require("../modules/account-manager");

//Controllers
var index = require('../routes/index');
var trip = require('../routes/trip');
var search = require('../routes/search');
var sessions = require('../routes/sessions');
var users = require('../routes/users');
var admin = require('../routes/admin');
var comments = require('../routes/comments');
var likes = require('../routes/likes');

//Models
var mongoose = require('mongoose');
var User = mongoose.model('User');

// var helpers = require('../helpers/handlebar_helpers');

module.exports = function (app) {
	//HOME
	app.get('/', index.home);

	//TRIPS
	app.get('/trip/:id', trip.show);
	app.post('/trip', trip.create);

	//USERS
	app.get('/user/edit', users.edit);
	app.post('/user', users.update);
	app.get('/user/:id', users.show);
	
	//Likes
	app.post('/like_trip', likes.create);

	//Comments
	app.post('/add_comment', comments.create);

	//Session
	app.post('/signup', sessions.signup);
	app.post('/login', sessions.login);
	app.post('/signout', sessions.signout);

	//Search
	app.get('/search', search.search);

	//Testing/Admin
	app.get('/admin', admin.dashboard);
	app.get('/print', admin.print);
	app.get('/print_trips', admin.print_trips);
	app.get('/reset', admin.reset);
};