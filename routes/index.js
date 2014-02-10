var CT = require("../modules/country-list");

exports.home = function(req, res){
	var username;
	if(req.session.user == null) {
		console.log("not logged in");
		username = "NOT LOGGED IN"
	}
	else {
		console.log(req.session.user);
		console.log(req.session.user['name']);
		username = req.session.user.name
	}

	res.render('index', {
    title: 'signup',
    countries: CT,
    user: req.session.user
	});
};

exports.trips = function(req, res){
  res.render('trips');
};

exports.followers = function(req, res){
  res.render('followers');
};