var CT = require("../modules/country-list");
var trip_data = require('../data.json');

exports.getSessionData = function(user) {
	data = {};
	if (user == null) {
		data = {
			countries: CT
		}
		console.log("Not logged in");
	} else {
	    var all_trips = trip_data.trips;
	    var user_trips = {
	    	col0: [],
	    	col1: [],
	    	col2: [],
	    	col3: [],
	    	totalTrips: 0
	    };
	    var username = user.username;
	    var count = 0;
	    console.log("Username on users database: " + username);
	    for (var i = 0; i < all_trips.length; i++) {
	      console.log("Username on trips database: " + all_trips[i].user);
	      if (all_trips[i].user == username) {
	      	var col_name = "col" + (count % 4).toString();
	      	console.log(col_name);
	        user_trips[col_name].push(all_trips[i]);
	        count++;
	        user_trips["totalTrips"] = count;
	      }
	    }
	    console.log(user_trips);
		data = {
			user: user,
			trips: user_trips
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