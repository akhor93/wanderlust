var SH = require("../lib/session_helper");
var data = require("../data.json");

exports.home = function(req, res){
	data = {};
	data = SH.getSessionData(req.session.user, true);
	res.render('index', data);
};

exports.trips = function(req, res){
  data = {};
	data = SH.getSessionData(req.session.user);
	res.render('trips', data);
};

exports.followers = function(req, res){
  data = {};
	data = SH.getSessionData(req.session.user);
	res.render('followers', data);
};

exports.incrementLikes = function(req, res) {
	console.log("reached controller");
	var tripID = req.params.id;
	console.log(tripID);
	var newNum = data['trips'][tripID]['num_likes'] + 1;
	data['trips'][tripID]['num_likes'] = newNum;
	var dataToPass = {
		num_likes: newNum,
		trip_id: tripID
	}
	res.json(dataToPass);
}