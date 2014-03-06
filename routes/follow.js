var async = require('async');
var SH = require("../lib/session_helper");
var UH = require('../lib/user_helper');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.follow_user = function(req, res) {
	if (req.session.user) {
		var userToFollow = req.param('userID');
		var curr_user = req.session.user._id;
		console.log("curr_user (the one following): " + curr_user);
		async.parallel([
			function(cb) {
				User.update({_id: curr_user}, {$push: { following: userToFollow} }, {upsert: true})
					.exec(function(err, user) {
						if (err) {
							console.log("couldn't update following: " + err);
						} else {
							cb();
						}
					});		
			},
			function(cb) {
				User.update({_id: userToFollow}, {$push: { followers: curr_user} }, {upsert: true})
					.exec(function(err, user) {
						if (err) {
							console.log("couldn't update followers: " + err);
						} else {
							cb();
						}
					});		
			}
		], function(err, results) {
			if (err) {
				return res.send(err, 400);
			} else {
				User.findById(curr_user, function(err, user) {
					if (err) return res.send(err, 400);
					req.session.user = user;
					res.send(userToFollow, 200);
				});				
			}
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
				UH.userHeaderData(data, userID, function(data) {
					cb();
				});

				// User.findById(userID)
				// 	.populate('followers following')
				// 	.lean()
				// 	.exec(function(err, user) {
				// 		if (err) {
				// 			console.log("error couldn't find user: " + err);
				// 		} else {
				// 			data.user = user;
				// 			if (data.curuser) {
				// 				User.find({_id: userID, followers: data.curuser._id}, function(err, user) {
				// 					if(user.length > 0) {
				// 						data.curuser_following = true;
				// 					} else {
				// 						data.curuser_following = false;
				// 					}
				// 					cb();
				// 				});
				// 			} else {
				// 				cb();
				// 			}
				// 		}
				// 	});
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
                						if (curuser_following[j] == follower_id) {
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

exports.following = function(req, res) {
	var userID = req.params.user;

	SH.getSessionData(req.session.user, function(data) {
		async.parallel([
			function(cb) {
				UH.userHeaderData(data, userID, function(data) {
					cb();
				});

				// User.findById(userID)
				// 	.populate('followers following')
				// 	.lean()
				// 	.exec(function(err, user) {
				// 		if (err) {
				// 			console.log("error couldn't find user: " + err);
				// 		} else {
				// 			data.user = user;
				// 			cb();
				// 		}
				// 	});
			},
			function(cb) {
				User.findById(userID)
					.populate('following')
					.lean()
					.exec(function(err, user) {
						if (err) {
							console.log("error couldn't find user: " + err);
						} else {
							var following = user.following;
							var following_col = { //data columnized
								col0: [],
								col1: []
							};					
							console.log("curuser: ");
							console.log(data.curuser);
							for (var i = 0; i < following.length; i++) {
                				var col_name = "col" + (i % 2).toString();
                				if (data.curuser) {
                					var curuser_following = data.curuser.following; //who the current user is following

                					var following_id = following[i]._id; //the id of the following user
                					
                					var curuser_id = data.curuser._id;
                					if (following_id == curuser_id) {
                						following[i]['thatsMe'] = true;
                					} else {
                						following[i]['thatsMe'] = false;
                					}

                					var isFollowing = false;                					
                					for (var j = 0; j < curuser_following.length; j++) {
                						if (curuser_following[j] == following_id) {
                							isFollowing = true;
                							break;
                						} 
                					}
                					if (isFollowing) {
                						following[i]['curuser_following'] = true;
                					} else {
                						following[i]['curuser_following'] = false;
                					}
                				}
                				following_col[col_name].push(following[i]);
							}
							console.log("user following:");
							console.log(following_col);							
							data.following = following_col;
							cb();
						}
					});
			}
		], function(err) {
			res.render('users/following', data);
		});
	});
}

