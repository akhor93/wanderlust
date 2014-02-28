var async = require("async");
var SH = require("../lib/session_helper");

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');
var Tag = mongoose.model('Tag');

exports.create = function(req, res) {

}

exports.show = function(req, res) {
	var tagText = req.params.id;
	SH.getSessionData(req.session.user, function(data) {
		Tag.find({text: tagText})
    .populate('trips')
    .exec(function(err, tag) {
    	if(err) console.log(err);
    	data.tag = tag[0];
    	console.log(data);
			res.render('tags/show', data);
    });
  });
}