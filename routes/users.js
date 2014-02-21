var async = require('async');
var SH = require("../lib/session_helper");
var mongoose = require('mongoose');
var User = mongoose.model('User');
var CT = require("../modules/country-list");
var Trip = mongoose.model('Trip');

exports.edit = function(req, res) {
  SH.getSessionData(req.session.user, function(data) {
    User.findOne({_id: req.session.user._id}, function(err, user) {
      if(err) {
        console.log("Could not find user: " + err);
        res.redirect('/');
      }
      else {
        data.user = user;
        console.log(data);
        data.countries = CT;
        res.render('users/edit', data);
      }
    });
  });
}

exports.show = function(req, res) {
  var userID = req.params.id;
  SH.getSessionData(req.session.user, function(data) {
    async.parallel([
      function(cb) {
        User.findById(userID)
          .populate('followers following')
          .lean()
          .exec(function(err, user) {
            if(err) {
              console.log("error couldn't find user: " + err);
            } else {
              data.user = user;
              cb();      
            }
        });
      },
      function(cb) {
        Trip.find({user: userID})
          .populate('user likes favorites tags comments')
          .lean()
          .exec(function(err, trips) {
            if(err) {
              console.log("error couldn't find trips" + err);
            } else {
              var user_trips = {
                col0: [],
                col1: [],
                col2: [],
                col3: [],
              };
              for (var i = 0; i < trips.length; i++) {
                var col_name = "col" + (i % 4).toString();
                var totalImages = trips[i]["image_small"].length + 1;
                trips[i]["totalImages"] = totalImages;
                trips[i]["date"] = formatDate(trips[i]["date"]);
                user_trips[col_name].push(trips[i]);
              }
              data.trips = user_trips;  
              cb();          
            }
        }); 
      }
    ], function(err) {
      if (req.session.user) data.logged_in = true;
      console.log(data);
      res.render('users/show', data);
    });
  });
}

function formatDate(date) {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return date.toLocaleDateString('en-US', options);
}

exports.update = function(req, res) {
  if(req.session.user) {
    User.findById(req.session.user._id, function(err, user) {
      if(req.param('password')) {
        User.update({_id: req.session.user._id}, {name: req.param('name'), email: req.param('email'), country: req.param('country'), username: req.param('username'), password: req.param('password')}, function(err, user) {
          if(err) return res.send("Unable to save user: " + err, 400);
          return res.send('ok', 200);
        });
      }
      else {
        User.update({_id: req.session.user._id}, {name: req.param('name'), email: req.param('email'), country: req.param('country'), username: req.param('username')}, function(err, user) {
          if(err) return res.send("Unable to save user: " + err, 400);
          return res.send('ok', 200);
        });
      }
    });
  }
  else {
    res.send('need to be logged in', 400);
  }
}