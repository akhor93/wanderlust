var SH = require("../lib/session_helper");
var async = require('async');
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');

exports.home = function(req, res){
	SH.getSessionData(req.session.user, function(data) {
		var asyncfunctions = [];
		var i;
		for(i = 0; i < data.trips.length; i++) {
			var func = function(cb) {
				var id = data.trips[i]._id;
				Comment.find({trip: id})
				.populate('user trip')
				.exec(function(err, comments) {
					i++;
					cb(null, comments);
				});
			};
			asyncfunctions.push(func);
		}
		i = 0;
		async.series(asyncfunctions, function(err, results) {
			for(var i = 0; i < results.length; i++) {
				data.trips[i].comments = results[i];
			}
			Trip.find({featured: true}, function(err, trips) {
				data.featured = trips;
				console.log(data);
				res.render('index', data);
			});
		});
	});
};

