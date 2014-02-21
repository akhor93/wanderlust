var SH = require("../lib/session_helper");
// var async = require('async');

var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');

exports.home = function(req, res){
	SH.getSessionData(req.session.user, function(data) {
		Trip.find({featured: true}, function(err, trips) {
			data.featured = trips;
			console.log(data);
			res.render('index', data);
		})
	});
};

