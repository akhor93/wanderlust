var CT = require("../modules/country-list");

exports.getSessionData = function(user) {
	data = {};
	if(user == null) {
		data = {
			countries: CT
		}
	}
	else {
		data = {
			user: user
		}
	}
	return data;
}