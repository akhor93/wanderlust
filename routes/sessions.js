var CT = require("../modules/country-list");
// var AM = require("../modules/account-manager");
// var EM = require("../modules/email-dispatcher");

var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.signup = function(req, res) {
  var user = new User({
    name      : req.param('name'),
    email     : req.param('email'),
    username  : req.param('username'),
    password  : req.param('password'),
    country   : req.param('country'),
    aboutMe   : req.param('aboutMe')
  });
  user.save(function(err) {
    if(err) {
      console.log("ERROR SAVING USER: " + err);
      return res.send("Error saving user", 400);
    }
    req.session.user = user;
    res.send('ok', 200);
  });
}

exports.login = function(req, res) {
  User.findOne({ username: req.param('username') }, function(err, user) {
    if(err) console.log(err);
    if(!user) {
      return res.send("User not found", 400);
    }
    if(user.authenticate(req.param('password'))) {
      if(Math.floor((Math.random()*10)+1)%2 == 1) {
        User.findOne({username: req.param('username')}).lean().exec(function(err, user) {
          user.showPicUpload = true;
          req.session.user = user;
          res.send("ok", 200);
        });
      }
      else {
        req.session.user = user;
        res.send("ok", 200);
      }
    }
    else {
      res.send("Password invalid", 400);
    }
  });
}

exports.signout = function(req, res) {
  if(req.param('logout') == 'true') {
    res.clearCookie('user');
    res.clearCookie('pass');
    req.session.destroy(function(e) {
      res.send('ok', 200);
    });
  }
}