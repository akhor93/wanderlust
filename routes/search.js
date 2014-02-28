var SH = require("../lib/session_helper");
var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');

exports.search = function(req, res){
	SH.getSessionData(req.session.user, function(data) {
		var query = req.query.query;
		data.prevQuery = query;

		var filteredTrips = [];
		var pattern = new RegExp(".*" + query + ".*", 'i');

		if(query) {
			for(var i = 0; i < data.trips.length; i++) {
				if(pattern.test(data.trips[i].user.username) || pattern.test(data.trips[i].title) || pattern.test(data.trips[i].location) || pattern.test(data.trips[i].title)) {
					filteredTrips.push(data.trips[i]);
					continue;
				}
				for(var j = 0; j < data.trips[i].tags.length; j++) {
					if(pattern.test(data.trips[i].tags[j].text)) {
						filteredTrips.push(data.trips[i]);
						break;
					}
				}
			}
			data.trips = filteredTrips;
			data.numTrips = filteredTrips.length;
			return res.render('search/search', data);
		}
		else {
			data.numTrips = data.trips.length;
			return res.render('search/search', data);
		}
	});
};