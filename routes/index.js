exports.home = function(req, res){
  res.render('index');
};

exports.trips = function(req, res){
  res.render('trips');
};

exports.user = function(req, res){
  res.render('user');
};

exports.followers = function(req, res){
  res.render('followers');
};