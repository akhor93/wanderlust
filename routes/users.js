var async = require('async');
var SH = require("../lib/session_helper");
var mongoose = require('mongoose');
var User = mongoose.model('User');
var CT = require("../modules/country-list");

exports.edit = function(req, res) {
  data = {};
  data = SH.getSessionData(req.session.user, false);
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
}

exports.show = function(req, res) {
  data = {};
  data = SH.getSessionData(req.session.user, false);

  var userID = req.params.id;
  User.findById(userID, function(err, user) {
    if(err) {
      console.log("Could not find user: " + userID);
      res.redirect('/');
    }
    else {
      data.user = user;
      res.render('users/show', data);
    }
  });
}

exports.update = function(req, res) {
  console.log("!" + req.param('password'));
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