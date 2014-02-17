//Models
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');

var trips = require('../data.json');

exports.dashboard = function(req, res) {
	res.render('admin/dashboard');
}

exports.print = function(req, res){
	// if(req.session.user) {
	// 	if(req.session.user.admin) {
			User.find({}, function (err, users) {
				if(err) console.log(err);
				else {
					res.render('admin/print', { users: users});
				}
			});
	// 	}
	// }
	// else {
	// 	res.redirect('/');
	// }
};

exports.print_trips = function(req, res) {
	Trip.find({}, function(err, trips) {
		if(err) {
			console.log(err);
			res.redirect('/');
		}
		else {
			console.log(trips);
			res.render('admin/print_trips', trips);
		}
	});
}

exports.reset = function(req, res){
	if(req.session.user) {
		if(req.session.user.admin) {
			User.remove({}, function (err) {
				if(err) console.log(err);
			});
			Trip.remove({}, function (err) {
				if(err) console.log(err);
			});
			initialize();
		}
	}
	res.redirect('/');
};

function initialize() {
	var andrew = new User({
    name      : 'Andrew Khor',
    email     : 'akhor93@stanford.edu',
    username  : 'akhor',
    password  : 'gloving',
    country   : 'United States'
  });
  andrew.save(function(err) {
  	if(err) console.log("error initializing andrew");
  });
  var lucy = new User({
    name      : 'Lucy Wang',
    email     : 'lucyywang@stanford.edu',
    username  : 'lucywang',
    password  : 'password',
    country   : 'United States'
  });
  lucy.save(function(err) {
  	if(err) console.log("error initializing lucy");
  });
}