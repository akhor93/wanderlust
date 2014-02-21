var CT = require("../modules/country-list");
var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');

exports.getSessionData = function(user, allTrips) {
	var data = {};
	var working = true;
	Trip.find()
	.populate('user likes tags comments')
	.exec(function(err, trips) {
		if(err) console.log("err: " + err);
		if (user == null) {
			data.countries = CT;
		}
		else {
			data.user = user;
		}
		if(allTrips) {
			data.trips = trips;
		}
		working = false;
		return data;
	});
}

exports.loggedIn = function(user) {
	if (user == null) {
		return false;
	} else {
		return true;
	}
}
