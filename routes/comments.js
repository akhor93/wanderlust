var async = require("async");

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');

exports.create = function(req, res) {
	if(req.session.user) {
		var locals = {};
		async.parallel([
			function(cb) {
				Trip.findById(req.param('trip_id'), function(err, trip) {
					if(err) return cb(err);
					locals.trip = trip;
					cb();
				});
			},
			function(cb) {
				User.findById(req.session.user._id, function(err, user) {
					if(err) return cb(err);
					locals.user = user;
					cb();
				});
			}
		], function(err) {
			if(err) {
				console.log(err);
				return res.send(err, 400);
			}
			var text = req.param('text');
			var comment = new Comment({
				user: locals.user._id,
				text: text,
				trip: locals.trip._id
			});
			comment.save(function(err, saved_comment) {
				if(err) {
					console.log(err);
					return res.send(err, 400);
				}
				async.parallel([
					function(cb) {
						Trip.update(locals.trip, {$push: { 'comments': saved_comment._id}})
						.exec(function(err, trip){
							if(err) {
								console.log('Could not update trip with comment: ' + err);
								return cb(err);
							}
							cb();
						});
					}
					], function(err) {
						if(err) return res.send(err, 400);
						Comment.findOne(saved_comment).populate('user trip').exec(function(err, item) {
							return res.json(item);
						});
					});
			});
		});
	}
	else {
		res.send("must be logged in to comment", 400);
	}
}