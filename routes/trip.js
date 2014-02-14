var SH = require("../lib/session_helper");
//Models
var mongoose = require('mongoose');
var User = mongoose.model('User');
var allData = require('../data.json');


exports.show = function(req, res) {
	var tripID = req.params.id;
	var trips = allData.trips;
	data = {};
  data = SH.getSessionData(req.session.user);
	for(var i = 0; i < trips.length; i++) {
		if (trips[i].id == tripID) {
			data.trip = trips[i];
			return res.render('trip/show', data);
		}
	}
	res.redirect('/');
}

exports.create = function(req, res) {
	var trips = allData.trips;
	var tripID = trips.length+1;
	//Get Moment library
	var trip = {
		id         : tripID,
		user       : req.session.user.username,
    title      : req.param('title'),
    location   : req.param('location'),
    description: req.param('description'),
    num_likes  : 0,
    num_fav    : 0,
    comments   : []
  };
  trips.push(trip);
  res.redirect('trip/' + tripID);
}