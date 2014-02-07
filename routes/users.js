var mongoose = require('mongoose');
var User = mongoose.model('User');

var login = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  res.redirect(redirectTo)
}

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