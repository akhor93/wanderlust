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
var favorites = require('../routes/favorites');
var tag = require('../routes/tag');
var follow = require('../routes/follow');

//Models
var mongoose = require('mongoose');
var User = mongoose.model('User');

// var helpers = require('../helpers/handlebar_helpers');

module.exports = function (app) {

	//TRIPS
	app.post('/trip/create', trip.create);
	app.post('/trip/update', trip.update);
	app.get('/trip/edit/:id', trip.edit);
	app.get('/trip/:id', trip.show);
	

	//USERS
	app.get('/user/edit', users.edit);
	app.post('/user', users.update);
	app.get('/user/:id', users.show);
	
	//Likes
	app.post('/like_trip', likes.create);

	//Favorites
	app.post('/favorite_trip', favorites.create);

	//Comments
	app.post('/add_comment', comments.create);

	//Tags
	app.get('/tag/:id', tag.show);
	//Followers & Following
	app.get('/followers/:user', follow.followers);
	app.get('/following/:user', follow.following);
	app.post('/follow', follow.follow_user);

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

	//HOME
	app.get('/', index.home);
	app.get("/index2", index.home2);
};