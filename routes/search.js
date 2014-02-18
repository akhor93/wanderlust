var SH = require("../lib/session_helper");

exports.search = function(req, res){
  data = {};
	data = SH.getSessionData(req.session.user);
	var query = req.query.query;
	data.prevQuery = query;
	data.numTrips = trips.length;
	var filteredTrips = [];
	var pattern = new RegExp(query, 'i');

	if(query) {
		Trip.find({'user': { $regex: pattern }}, { 'title': {$regex: pattern }}, { 'location': {$regex: pattern}})
	}
	else {
		Trip.find({}, function(err, trips) {
			data.trips = trips;
		});
	}

	Trip.find({}, function(err, trips) {
		if(query) {
			for(var i = 0; i < trips.length; i++) {
				if(pattern.test(trips[i].user) || pattern.test(trips[i].title) || pattern.test(trips[i].location)) {
					filteredTrips.push(trips[i]);
				}
			}
			data.trips = filteredTrips;
		}
		else {
			data.trips = trips;
		}
	});
	
	
	res.render('search/search', data);
};