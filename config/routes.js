//Modules
var AM = require("../modules/account-manager");

//Controllers
var index = require('../routes/index');
var search = require('../routes/search');
var sessions = require('../routes/sessions');
var users = require('../routes/users');

//Models
var mongoose = require('mongoose');
var User = mongoose.model('User');

// var helpers = require('../helpers/handlebar_helpers');

module.exports = function (app) {
	//HOME
	app.get('/', index.home);

	//TRIPS
	app.get('/trips', index.trips);

	//USERS
	app.get('/user', users.show);

	//Session
	app.post('/signup', sessions.signup);
	app.post('/login', sessions.login);
	app.post('/signout', sessions.signout);

	//Followers
	app.get('/followers', index.followers);

	//Search
	app.get('/search', search.search);

	//Testing
	app.get('/print', function(req, res) {
		if(req.session.user) {
			if(req.session.user.admin) {
				User.find({}, function (err, users) {
					if(err) console.log(err);
					else {
						res.render('print', { users: users});
					}
				});
			}
		}
		else {
			res.redirect('/');
		}
	});
	app.get('/dbreset', function(req, res) {
		if(req.session.user) {
			if(req.session.user.admin) {
				User.remove({}, function(err) {
					console.log("Removed users");
				});
			}
		}
		res.redirect('/');
	});
};