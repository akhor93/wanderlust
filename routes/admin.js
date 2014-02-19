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
			alltrips = {};
			alltrips.trips = trips;
			res.render('admin/print_trips', alltrips);
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
  	if(err) console.log("error initializing andrew: " + err);
  });
  var lucy = new User({
    name      : 'Lucy Wang',
    email     : 'lucywang@stanford.edu',
    username  : 'lucywang',
    password  : 'password',
    country   : 'United States'
  });
  lucy.save(function(err) {
  	if(err) console.log("error initializing lucy");
  });
  var t1 = new Trip({
  	user: lucy._id,
  	title: "San Francisco",
  	date: "July 9, 2014",
  	location: "San Francisco, CA",
  	description: "Loved my trip to the Bay!",
  	images: ["images/goldengate.jpg", "images/fishermans-wharf.jpg", "images/painted_ladies.jpg", "images/clarion_alley.jpg", "images/lands_end.jpg"],
  	likes: [],
  	favorites: [],
  	tags: [],
  	comments: []
  });
  t1.save(function(err) {
  	if(err) console.log("error saving trip 1");
  });
  var t2 = new Trip({
  	user: lucy._id,
  	title: "Paris, Je t'aime",
  	date: "June 13, 2012",
  	location: "Paris, France",
  	description: "Backpacking in France!", 	
  	images: ["images/Paris_Large.jpg"],
  	likes: [],
  	favorites: [],
  	tags: [],
  	comments: []
  });
  t2.save(function(err) {
  	if(err) console.log("error saving trip 2");
  });
  var t3 = new Trip({
    user: lucy._id,
    title: "Paris, Je t'aime2",
    date: "June 13, 2012",
    location: "Paris, France",
    description: "Backpacking in France!",  
    images: ["images/Paris_Large.jpg"],
    likes: [],
    favorites: [],
    tags: [],
    comments: []
  });
  t3.save(function(err) {
    if(err) console.log("error saving trip 3");
  });
}