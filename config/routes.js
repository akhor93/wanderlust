//Modules
var AM = require("../modules/account-manager");

//Controllers
var index = require('../routes/index');
var search = require('../routes/search');
var sessions = require('../routes/sessions');
var users = require('../routes/users');

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

	//Followers
	app.get('/followers', index.followers);

	//Search
	app.get('/search', search.search);

	//Testing
	app.get('/print', function(req, res) {
		AM.getAllRecords( function(e, accounts){
			console.log(accounts);
		});
		AM.getAllRecords( function(e, accounts){
			res.render('print', { title : 'Account List', accts : accounts });
		});
	});
};