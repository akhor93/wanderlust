var SH = require("../lib/session_helper");

exports.home = function(req, res){
	data = {};
	data = SH.getSessionData(req.session.user, true);
	//data.key = value
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