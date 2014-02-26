var async = require("async");
var SH = require("../lib/session_helper");
var fs = require('fs');
// var s3 = require('s3');
// var cred = require('../awscred.json');
// var client = s3.createClient({
//   key: cred.accessKeyId,
//   secret: cred.secretAccessKey,
//   bucket: "wanderlustapp"
// });
var AWS = require('aws-sdk'); 
AWS.config.loadFromPath('awscred.json');
var s3 = new AWS.S3();
//Models
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');
var Comment = mongoose.model('Comment');

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
        console.log(data);
        res.render('trip/show', data);
      });
    });
  });
}

exports.create = function(req, res) {
	//Get Moment library
	var userID = req.session.user._id;
  var trip = new Trip({
		user       : userID,
    title      : req.param('title'),
    location   : req.param('location'),
    description: req.param('description'),
  });
  async.parallel([
    function(cb) {
      trip.save(function(err, trip) {
          if(err) console.log("error saving trip: " + err);
          User.update({"_id": userID}, {$push: { trips: trip._id } }, {upsert: true})
            .exec(function(err) {
              if(err) console.log("error adding new trip: " + err);
              else cb();
            });    
        });
    }
  ], function(err) {
    console.log("new trip id: " + trip._id);
    res.redirect('trip/' + trip._id);
  });
}

exports.edit = function(req, res) {
  if(!req.session.user) return redirect('/');
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
            else cb();
          }
          else cb();
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
            else cb();
          }
          else cb();
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
            else cb();
          }
          else cb();
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
            else cb();
          }
          else cb();
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
            else cb();
          }
          else cb();
        },
        function(cb) {
          Trip.update({_id: tripID}, { $set: {title: title, location: location, description: description} } ,null, function(err, trip) {
            if(err) return cb("Unable to save trip: " + err);
            cb();
          });
        }
      ], function(err) {
        if(err) return res.send(err, 400);
        return res.send("ok", 200);
      });
    });
  }
  else {
    res.send('need to be logged in', 400);
  }
}

function movefile(file, user, cb) {
  var usable_path = user._id + "" + file.name;
  // var headers = {
  //   'Content-Type' : 'image/jpg',
  //   'x-amz-acl'    : 'public-read'
  // };
  // var newpath = __dirname + "/../public" + usable_path;
  
  // var uploader = client.upload(file.path, usable_path, headers);
  // uploader.on('error', function(err) {
  //   console.error("unable to upload:", err.stack);
  // });
  // uploader.on('progress', function(amountDone, amountTotal) {
  //   console.log("progress", amountDone, amountTotal);
  // });
  // uploader.on('end', function(url) {
  //   console.log("file available at", url);
  //   return url;
  // });
  fs.stat(file.path, function(err, file_info) {
    var bodyStream = fs.createReadStream(file.path);
    var params = {
      Bucket: "wanderlustapp/uploads",
      Key: usable_path,
      ContentLength: file_info.size,
      Body: bodyStream
    };

    s3.putObject(params, function(err, data) {
      if(err) {
        console.log("Error uploading image: " + err);
        cb(null);
      }
      var completeaddress = "https://s3-us-west-1.amazonaws.com/wanderlustapp/uploads/" + usable_path;
      console.log("uploaded successfully " + completeaddress);
      cb(completeaddress);
    });
  });
    


  // async.series([
  //   function(cb) {
  //     var is = fs.createReadStream(file.path);
  //     var os = fs.createWriteStream(newpath);
  //     is.pipe(os);
  //     is.on('end',function() {
  //         fs.unlinkSync(file.path);
  //         cb();
  //     });
  //   }
    
  //   ], function(err) {
  //     console.log(usable_path);
  //     cb(usable_path);
  //   });
}

