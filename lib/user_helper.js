var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.userHeaderData = function(data, userDisplayed, cb) {
	//userDisplayed is the id of the user being displayed on the page
	User.findById(userDisplayed)
		.populate('followers following')
		.lean()
		.exec(function(err, user) {
			if (err) {
				console.log("error couldn't find user: " + err);
				cb(data)
			} else {
				data.user = user;
				if (data.curuser) {
					if (data.curuser._id == userDisplayed) {
						data.thatsMe = true;		
					} else {
						data.thatsMe = false;
					}
					User.find({_id: userDisplayed, followers: data.curuser._id}, function(err, user) {
						if(user.length > 0) {
							data.curuser_following = true;
						} else {
							data.curuser_following = false;
						}
						cb(data);
					});
				} else {
					cb(data);
				}
			}
		});

}
