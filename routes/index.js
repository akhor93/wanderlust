var CT = require("../modules/country-list");

exports.home = function(req, res){
	res.render('index', {
    title: 'signup',
    countries: CT
	});
};

exports.trips = function(req, res){
  res.render('trips');
};

exports.followers = function(req, res){
  res.render('followers');
};