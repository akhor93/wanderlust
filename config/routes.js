var index = require('../routes/index');
var users = require('../routes/users');
var search = require('../routes/search');

module.exports = function (app) {
  // Add routes here
	app.get('/', index.home);
	app.get('/trips', index.trips);
	app.get('/user', users.show);
	app.get('/followers', index.followers);
	app.get('/search', search.search);
};