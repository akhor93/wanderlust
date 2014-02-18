var CT = require("../modules/country-list");
var trip_data = require('../data.json');

exports.getSessionData = function(user, allTrips) {
	data = {};
	if (user == null) {
		data = {
			countries: CT,
			// trips: trip_data.trips
		}
	} else {
		var all_trips = trip_data.trips;
		var trips_data;
		if (!allTrips) {
			trips_data = {
		    	col0: [],
		    	col1: [],
		    	col2: [],
		    	col3: [],
		    	totalTrips: 0
		    };
		    var username = user.username;
		    var count = 0;
		    for (var i = 0; i < all_trips.length; i++) {
		      if (all_trips[i].user == username) {
		      	var col_name = "col" + (count % 4).toString();
		        trips_data[col_name].push(all_trips[i]);
		        count++;
		        trips_data["totalTrips"] = count;
		      }
		    }			
		} else {
			trips_data = all_trips;
		}
		data = {
			user: user,
			// trips: trips_data
		}
	}
	return data;
}

exports.loggedIn = function(user) {
	if (user == null) {
		return false;
	} else {
		return true;
	}
}
