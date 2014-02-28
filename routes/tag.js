var async = require("async");
var SH = require("../lib/session_helper");

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');
var Tag = mongoose.model('Tag');

exports.show = function(req, res) {
	var tagText = req.params.id;
	SH.getSessionData(req.session.user, function(data) {
    
  	Tag.findOne({text: tagText})
    .lean()
    .exec(function(err, tag) {
    	if(err) return console.log(err);
      var asyncfunctions = [];
      var i;
      for(i = 0; i < tag.trips.length; i++) {
        var func = function(cb) {
          var id = tag.trips[i];
          Trip.findById(id)
          .populate('user tags likes favorites')
          .exec(function(err, trip) {
            i++;
            cb(null, trip);
          });
        };
        asyncfunctions.push(func);
      }
      i = 0;
      async.series(asyncfunctions, function(err, results) {
        for(var i = 0; i < results.length; i++) {
          tag.trips[i] = results[i];
        }
        data.tag = tag;
        console.log(data);
        res.render('tags/show', data);
      });
    	
    	
			
    });
  });
}