var async = require("async");

var mongoose = require('mongoose');
// var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');
var Favorite = mongoose.model('Favorite');

exports.create = function(req, res) {
	if(req.session.user) {
		var tripID = req.param('tripID');
		var userID = req.session.user._id;
		async.parallel([
			function(cb) {
				Favorite.find({user: userID, trip: tripID}, function(err, favorite) {
					if(favorite.length > 0) {
						return cb("Already favorited");
					}
					cb();
				})
			}
		], function(err) {
			if(err) return res.send(err, 400);
			var favorite = new Favorite({
				user: userID,
				trip: tripID,
			});
			favorite.save(function(err, saved_favorite) {
				if(err) return res.send("unable to save favorite", 400);
				async.parallel([
					function(cb) {
						Trip.update({_id: tripID}, {$push: { 'favorites': saved_favorite._id}})
						.exec(function(err, trip){
							if(err) {
								console.log('Could not update trip with favorite: ' + err);
								return cb(err);
							}
							cb();
						});
					}
				], function(err) {
					if(err) return res.send(err, 400);
					res.send(tripID, 200);
				});
			})
		})
	}
	else {
		res.send("must be logged in to favorite", 400);
	}
}