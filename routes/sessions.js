var CT = require("../modules/country-list");
var AM = require("../modules/account-manager");
var EM = require("../modules/email-dispatcher");

exports.signup = function(req, res) {
  AM.addNewAccount({
    name      : req.param('name'),
    email     : req.param('email'),
    username  : req.param('username'),
    pass      : req.param('password'),
    country   : req.param('country')
  }, function(e) {
    if(e) {
      res.send(e, 400);
    }
    else {
      res.send('ok', 200);
    }
  });
}

exports.login = function(req, res) {
  console.log('params');
  console.log(req.param('username'));
  console.log(req.param('password'));
  AM.manualLogin(req.param('username'), req.param('password'), function(e, o){
    if (!o){
      res.send(e, 400);
    } else{
        req.session.user = o;
      if (req.param('remember-me') == 'true'){
        res.cookie('username', o.user, { maxAge: 900000 });
        res.cookie('password', o.pass, { maxAge: 900000 });
      }
      res.send(o, 200);
    }
  });
}