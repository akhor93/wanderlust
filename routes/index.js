var SH = require("../lib/session_helper");
var async = require('async');
var moment = require('moment');
//Models
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
				.lean()
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
				for(var j = 0; j < data.trips[i].comments.length; j++) {
					var timeago = moment(data.trips[i].comments[j].created_at).fromNow();
					data.trips[i].comments[j].timeago = timeago;
				}
			}
			Trip.find({featured: true}, function(err, trips) {
				data.featured = trips;
				data.showPicUpload = false;
				res.render('index', data);
			});
		});
	});
};
exports.home2 = function(req, res){
	SH.getSessionData(req.session.user, function(data) {
		var asyncfunctions = [];
		var i;
		for(i = 0; i < data.trips.length; i++) {
			var func = function(cb) {
				var id = data.trips[i]._id;
				Comment.find({trip: id})
				.populate('user trip')
				.lean()
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
				for(var j = 0; j < data.trips[i].comments.length; j++) {
					var timeago = moment(data.trips[i].comments[j].created_at).fromNow();
					data.trips[i].comments[j].timeago = timeago;
				}
			}
			Trip.find({featured: true}, function(err, trips) {
				data.featured = trips;
				data.showPicUpload = true;
				res.render('index', data);
			});
		});
	});
};

