var CT = require("../modules/country-list");
var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');

exports.getSessionData = function(user, cb) {
	var data = {};
	Trip.find()
	.sort('-updated_at')
	.populate('user likes tags favorites comments')
	.lean()
	.exec(function(err, trips) {
		if (user == null) {
			data.countries = CT;
		}
		else {
			data.curuser = user;
		}
		for(var i = 0; i < trips.length; i++) {
			trips[i].num_likes = trips[i].likes.length;
			trips[i].num_favorites = trips[i].favorites.length;
			trips[i].num_tags = trips[i].tags.length;
			trips[i].num_comments = trips[i].comments.length;
		}
		data.showPicUpload = true;
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
