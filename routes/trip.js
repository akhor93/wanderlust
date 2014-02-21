var async = require("async");
var SH = require("../lib/session_helper");
var fs = require('fs');
//Models
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');
var Comment = mongoose.model('Comment');

var allData = require('../data.json');

exports.show = function(req, res) {
	var tripID = req.params.id;
  SH.getSessionData(req.session.user, function(data) {
    Trip.findById(tripID)
    .populate('user likes favorites tags comments')
    .lean()
    .exec(function(err, trip) {
      if(err) {
        console.log("Could not find trip: " + tripID);
        return res.redirect('/');
      }
      var trip_comments;
      async.parallel([
        function(cb) {
          Comment.find({trip: trip._id})
          .populate('user')
          .exec(function(err, comments) {
            if(err) return cb(err);
            trip_comments = comments;
            cb();
          });
        }
      ], function(err, results) {
        trip.comments = trip_comments;
        data.trip = trip;
        data.user = trip.user;
        trip.num_likes = trip.likes.length;
        trip.num_favorites = trip.favorites.length;
        trip.num_tags = trip.tags.length;
        trip.num_comments = trip.comments.length;
        if(req.session.user && trip.user._id == req.session.user._id) data.isowner = true;
        res.render('trip/show', data);
      });
    });
  });
}

exports.create = function(req, res) {
	//Get Moment library
	var trip = new Trip({
		user       : req.session.user.id,
    title      : req.param('title'),
    location   : req.param('location'),
    description: req.param('description'),
  });
  trip.save(function(err) {
  	if(err) {
  		console.log("ERROR Saving trip");
  		res.send("Error saving trip", 400);
  	}
  	else {
  		res.redirect('trip/' + trip.id);
  	}
  })
}

exports.edit = function(req, res) {
  // if(!req.session.user) return redirect('/');
  var tripID = req.param('id');
  SH.getSessionData(req.session.user, function(data) {
    Trip.findOne({_id: tripID}, function(err, trip) {
      if(err) {
        console.log("Could not find trip: " + trip);
        res.redirect('/');
      }
      else if(trip.user != req.session.user._id) {
        console.log("Does not own trip");
        res.redirect('/');
      }
      else {
        data.trip = trip;
        res.render('trip/edit', data);
      }
    });
  });
}

exports.update = function(req, res) {
  if(req.session.user) {
    var tripID = req.param('tripid');
    Trip.findById(tripID, function(err, trip) {
      var title = req.param('title');
      var location = req.param('location');
      var description = req.param('description');
      console.log(req.files);
      async.parallel([
        function(cb) {
          if(req.files) {
            if(req.files.large_image) {
              movefile(req.files.large_image, req.session.user, function(imagepath) {
                if(imagepath == null) cb("problem saving large image");
                Trip.update({_id: tripID}, { $set: {image_large: imagepath} } ,null, function(err, trip) {
                  if(err) return cb("Unable to save trip: " + err);
                  cb();
                });
              });
            }
          }
        },
        function(cb) {
          if(req.files) {
            if(req.files.small_0) {
              movefile(req.files.small_0, req.session.user, function(imagepath) {
                if(imagepath == null) cb("problem saving small image 0");
                var pathobj = { "image_small.0": imagepath };
                Trip.update({_id: tripID}, { $set: pathobj } ,null, function(err, trip) {
                  if(err) return cb("Unable to save trip: " + err);
                  cb();
                });
              });
            }
          }
        },
        function(cb) {
          if(req.files) {
            if(req.files.small_1) {
              movefile(req.files.small_1, req.session.user, function(imagepath) {
                if(imagepath == null) cb("problem saving small image 1");
                var pathobj = { "image_small.1": imagepath };
                Trip.update({_id: tripID}, { $set: pathobj } ,null, function(err, trip) {
                  if(err) return cb("Unable to save trip: " + err);
                  cb();
                });
              });
            }
          }
        },
        function(cb) {
          if(req.files) {
            if(req.files.small_2) {
              movefile(req.files.small_2, req.session.user, function(imagepath) {
                if(imagepath == null) cb("problem saving small image 2");
                var pathobj = { "image_small.2": imagepath };
                Trip.update({_id: tripID}, { $set: pathobj } ,null, function(err, trip) {
                  if(err) return cb("Unable to save trip: " + err);
                  cb();
                });
              });
            }
          }
        },
        function(cb) {
          if(req.files) {
            if(req.files.small_3) {
              movefile(req.files.small_3, req.session.user, function(imagepath) {
                if(imagepath == null) cb("problem saving small image 3");
                var pathobj = { "image_small.3": imagepath };
                Trip.update({_id: tripID}, { $set: pathobj } ,null, function(err, trip) {
                  if(err) return cb("Unable to save trip: " + err);
                  cb();
                });
              });
            }
          }
        },
        function(cb) {
          Trip.update({_id: tripID}, { $set: {title: title, location: location, description: description} } ,null, function(err, trip) {
            if(err) return cb("Unable to save trip: " + err);
            cb();
          });
        }
      ], function(err) {
        if(err) return res.send(err, 400);
        res.send("ok", 200);
      });
    });
  }
  else {
    res.send('need to be logged in', 400);
  }
}

function movefile(file, user, cb) {
  var usable_path = "/uploads/" + user._id + "" + file.name;
  var newpath = __dirname + "/../public" + usable_path;
  
  async.series([
    function(cb) {
      var is = fs.createReadStream(file.path);
      var os = fs.createWriteStream(newpath);
      is.pipe(os);
      is.on('end',function() {
          fs.unlinkSync(file.path);
          cb();
      });
    }
    
    ], function(err) {
      console.log(usable_path);
      cb(usable_path);
    });
}

