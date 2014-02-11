var SH = require("../lib/session_helper");

exports.show = function(req, res){
	data = {};
  data = SH.getSessionData(req.session.user, data);
  res.render('users/show', data);
};