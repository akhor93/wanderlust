var async = require("async");

var mongoose = require('mongoose');
// var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');
var Like = mongoose.model('Like');

exports.create = function(req, res) {
	if(req.session.user) {
		var tripID = req.param('tripID');
		var userID = req.session.user._id;
		async.parallel([
			function(cb) {
				Like.find({user: userID, trip: tripID}, function(err, like) {
					if(like.length > 0) {
						return cb("Already liked");
					}
					cb();
				})
			}
		], function(err) {
			if(err) return res.send(err, 400);
			var like = new Like({
				user: userID,
				trip: tripID,
			});
			like.save(function(err, saved_like) {
				if(err) return res.send("unable to save like", 400);
				async.parallel([
					function(cb) {
						Trip.update({_id: tripID}, {$push: { 'likes': saved_like._id}})
						.exec(function(err, trip){
							if(err) {
								console.log('Could not update trip with like: ' + err);
								return cb(err);
							}
							cb();
						});
					}
				], function(err) {
					if(err) return res.send(err, 400);
					res.send("ok", 200);
				});
			})
		})
	}
	else {
		res.send("must be logged in to like", 400);
	}
}