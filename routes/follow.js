var async = require('async');
var SH = require("../lib/session_helper");
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.follow_user = function(req, res) {
	if (req.session.user) {
		var userToFollow = req.param('userID');
		var curr_user = req.session.user._id;
		async.parallel([
			function(cb) {
				User.update({_id: curr_user}, {$push: { following: userToFollow} }, {upsert: true})
					.exec(function(err) {
						if (err) {
							console.log("couldn't update following: " + err);
							return cb(err);
						}
					});		
				cb();
			},
			function(cb) {
				User.update({_id: userToFollow}, {$push: { followers: curr_user} }, {upsert: true})
					.exec(function(err) {
						if (err) {
							console.log("couldn't update followers: " + err);
							return cb(err);
						}
					});		
				cb();
			}
		], function(err) {
			if (err) return res.send(err, 400);
			res.send(userToFollow, 200);
		});
	} else {
		res.send('must be logged in to follow', 400);
	}
}

exports.followers = function(req, res) {
	var userID = req.params.user;

	SH.getSessionData(req.session.user, function(data) {
		async.parallel([
			function(cb) {
				User.findById(userID)
					.populate('followers following')
					.lean()
					.exec(function(err, user) {
						if (err) {
							console.log("error couldn't find user: " + err);
						} else {
							data.user = user;
							cb();
						}
					});
			},
			function(cb) {
				User.findById(userID)
					.populate('followers')
					.lean()
					.exec(function(err, user) {
						if (err) {
							console.log("error couldn't find user: " + err);
						} else {
							var followers = user.followers;
							var followers_col = { //data columnized
								col0: [],
								col1: []
							};					
							console.log("curuser: ");
							console.log(data.curuser);
							for (var i = 0; i < followers.length; i++) {
                				var col_name = "col" + (i % 2).toString();
                				if (data.curuser) {
                					var curuser_following = data.curuser.following;
                					var follower_id = followers[i]._id;
                					var curuser_id = data.curuser._id;
                					if (follower_id == curuser_id) {
                						followers[i]['thatsMe'] = true;
                					} else {
                						followers[i]['thatsMe'] = false;
                					}
                					var isFollowing = false;                					
                					for (var j = 0; j < curuser_following.length; j++) {
                						if (curuser_following[i] == follower_id) {
                							isFollowing = true;
                							break;
                						} 
                					}
                					if (isFollowing) {
                						followers[i]['curuser_following'] = true;
                					} else {
                						followers[i]['curuser_following'] = false;
                					}
                				}
                				followers_col[col_name].push(followers[i]);
							}
							console.log("user's followers:");
							console.log(followers_col);							
							data.followers = followers_col;
							cb();
						}
					});
			}
		], function(err) {
			res.render('users/followers', data);
		});
	});

}

