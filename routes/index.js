exports.home = function(req, res){
  res.render('index');
};

exports.trips = function(req, res){
  res.render('trips');
};

exports.followers = function(req, res){
  res.render('followers');
};