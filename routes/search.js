var SH = require("../lib/session_helper");

exports.search = function(req, res){
  data = {};
	data = SH.getSessionData(req.session.user, data);
	res.render('search/search', data);
};