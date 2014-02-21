var SH = require("../lib/session_helper");
var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');

exports.search = function(req, res){
	SH.getSessionData(req.session.user, function(data) {
		var query = req.query.query;
		data.prevQuery = query;

		var filteredTrips = [];
		var pattern = new RegExp(query, 'i');

		if(query) {
			Trip.find([{'user': { $regex: pattern }}, { 'title': {$regex: pattern }}, { 'location': {$regex: pattern}}])
			.populate("user")
			.exec(function(err, trips) {
				data.numTrips = trips.length;
				data.trips = trips;
				return res.render('search/search', data);
			});
		}
		else {
			Trip.find({})
			.populate("user")
			.exec(function(err, trips) {
				data.numTrips = trips.length;
				data.trips = trips;
				return res.render('search/search', data);
			});
		}
	});
};