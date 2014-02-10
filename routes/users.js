var CT = require("../modules/country-list");
var AM = require("../modules/account-manager");
var EM = require("../modules/email-dispatcher");

exports.show = function(req, res){
	var andrew = new User({ name: 'Andrew Khor', email: 'akhor93@stanford.edu'} );
  // andrew.save(function( err, andrew) {
  // 	if(err) {
  // 		console.log('error saving user');
  // 	}
  // 	andrew.test();
  // });
  console.log(andrew);
  res.render('users/show', {
  	name: andrew.name,
  	email: andrew.email,
  	user: andrew
  });
};

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