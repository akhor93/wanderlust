var async = require('async');
var SH = require("../lib/session_helper");
var mongoose = require('mongoose');
var User = mongoose.model('User');
var CT = require("../modules/country-list");

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
  SH.getSessionData(req.session.user, function(data) {
    var all_trips = data.trips;
    var user_trips = {
      col0: [],
      col1: [],
      col2: [],
      col3: [],
      totalTrips: 0
    };
    var username = data.curuser.username;
    var count = 0;
    console.log("Username on users database: " + username);
    for (var i = 0; i < all_trips.length; i++) {
      var trip_username = all_trips[i].user.username;
      // console.log("Username on trips database: " + trip_username);
      if (trip_username == username) {
        var col_name = "col" + (count % 4).toString();
        var totalImages = all_trips[i]["image_small"].length + 1;
        // console.log(totalImages);
        all_trips[i]["totalImages"] = totalImages;
        //all_trips[i]["date"] = formatDate(all_trips[i]["date"]);
        // console.log(all_trips[i]);
        user_trips[col_name].push(all_trips[i]);
        count++;
      }
    }
    user_trips["totalTrips"] = count;
    data.trips = user_trips;
    console.log("Final data:");
    console.log(data);
    res.render('users/show', data);
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