var SH = require("../lib/session_helper");
var mongoose = require('mongoose');
var User = mongoose.model('User');
var trip_data = require('../data.json');

var login = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  res.redirect(redirectTo)
}

exports.show = function(req, res){
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
  
};

exports.signin = function(req, res) {}


/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}