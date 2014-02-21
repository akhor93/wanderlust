var CT = require("../modules/country-list");
var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');

exports.getSessionData = function(user, cb) {
	var data = {};
	Trip.find()
	.populate('user likes tags comments')
	.lean()
	.exec(function(err, trips) {
		if (user == null) {
			data.countries = CT;
		}
		else {
			data.user = user;
		}
		data.trips = trips;
		cb(data);
	});
}

exports.loggedIn = function(user) {
	if (user == null) {
		return false;
	} else {
		return true;
	}
}
