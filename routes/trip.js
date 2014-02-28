var async = require("async");
var SH = require("../lib/session_helper");
var image_helper = require('../lib/image_helper');
var moment = require('moment');
//Models
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');
var Comment = mongoose.model('Comment');
var Tag = mongoose.model('Tag');

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
        for(var i = 0; i < trip.comments.length; i++) {
          trip.comments[i].timeago = moment(trip.comments[i].created_at).fromNow();
        }
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
    description: req.param('description')
  });
  async.parallel([
    function(cb) {
      trip.save(function(err, trip) {
          if(err) return cb("error saving trip: " + err);
          User.update({"_id": userID}, {$push: { trips: trip._id } }, {upsert: true})
            .exec(function(err) {
              if(err) cb(err);
              else cb(null, trip);
            });
        });
    }
  ], function(err, trip) {
    if(err) return res.send(err, 400);
    var createtagfunctions = [];
    var i;
    console.log(req.body.tags);
    console.log(trip + "1");
    for(i = 0; i < req.body.tags[0].length; i++) {
      var func = function(cb) {
        var text = req.body.tags[0][i];
        Tag.findOne({text: text}, function(err, tag) {
          if(tag) {
            // console.log(tag);
            // console.log(tag._id);
            // console.log(trip._id);
            Tag.update({_id: tag._id}, {$push: { trips: tripID}}, function(err) {
              if(err) {
                i++;
                cb("error updating existing tag: " + err);
              }
              else {
                Trip.update({_id: tripID}, {$push: { tags: tag._id}}, function(err) {
                  i++;
                  cb();
                });
              }
            });
          }
          else {
            var newtag = new Tag({text: text });
            newtag.save(function(err, newtag) {
              Tag.update({_id: newtag._id}, {$push: { trips: tripID}}, function(err) {
                if(err) {
                  i++;
                  cb("error updating new tag: " + err);
                }
                else {
                  Trip.update({_id: tripID}, {$push: { tags: newtag._id}}, function(err) {
                    i++;
                    cb();
                  });
                }
              });
            });
          }
        });
      };
      createtagfunctions.push(func);
    }
    i = 0;
    var tripID = trip._id;
    console.log(trip + "TTT");
    async.series(createtagfunctions, function(err) {
      if(err) return res.send(err, 400);
      async.parallel([
        function(cb) {
          if(req.files) {
            if(req.files.large_image) {
              image_helper.uploadfile(req.files.large_image, req.session.user, function(imagepath) {
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
              image_helper.uploadfile(req.files.small_0, req.session.user, function(imagepath) {
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
              image_helper.uploadfile(req.files.small_1, req.session.user, function(imagepath) {
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
              image_helper.uploadfile(req.files.small_2, req.session.user, function(imagepath) {
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
              image_helper.uploadfile(req.files.small_3, req.session.user, function(imagepath) {
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
        }
      ], function(err) {
        res.send(trip._id, 200);
      });
    });
  });
}

exports.edit = function(req, res) {
  if(!req.session.user) return redirect('/');
  var tripID = req.param('id');
  SH.getSessionData(req.session.user, function(data) {
    Trip.findOne({_id: tripID})
    .populate('tags')
    .lean()
    .exec(function(err, trip) {
      if(err) {
        console.log("Could not find trip: " + trip);
        res.redirect('/');
      }
      else if(trip.user != req.session.user._id) {
        console.log("Does not own trip");
        res.redirect('/');
      }
      else {
        tags = [];
        for(var i = 0; i < trip.tags.length; i++) {
          tags.push('"' + trip.tags[i].text + '"');
        }
        trip.tags = tags;
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
              image_helper.uploadfile(req.files.large_image, req.session.user, function(imagepath) {
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
              image_helper.uploadfile(req.files.small_0, req.session.user, function(imagepath) {
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
              image_helper.uploadfile(req.files.small_1, req.session.user, function(imagepath) {
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
              image_helper.uploadfile(req.files.small_2, req.session.user, function(imagepath) {
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
              image_helper.uploadfile(req.files.small_3, req.session.user, function(imagepath) {
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
        Trip.findById(tripID).populate('tags').lean().exec(function(err, trip) {
          deletetags = [];
          addtags = []
          for(var i = 0; i < trip.tags.length; i++) deletetags.push(trip.tags[i].text);
          for(var i = 0; i < req.body.tags[0].length; i++) addtags.push(req.body.tags[0][i]);
          for(var i = 0; i < trip.tags.length; i++) {
            for(var j = 0; j < req.body.tags[0].length; j++) {
              if(req.body.tags[0][j] == trip.tags[i].text) {
                var index = deletetags.indexOf(trip.tags[i].text);
                deletetags.splice(index, 1);
                index = addtags.indexOf(req.body.tags[0][j]);
                addtags.splice(index, 1);
              }
            }
          }
          asyncfunctions = [];
          var i = 0;
          for(i = 0; i < deletetags.length; i++) {
            var func = function(cb) {
              Tag.findOne({text: deletetags[i]}, function(err, tag) {
                async.parallel([
                  function(cb2) {
                    Trip.update({_id: trip._id}, {$pull: {'tags': tag._id}}, function(err) {
                      cb2();
                    });
                  },
                  function(cb2) {
                    Tag.update({_id: tag._id}, {$pull: {'trips': trip._id}}, function(err) {
                      cb2();
                    });
                  }
                  ], function(err) {
                    i++;
                    cb();
                  });
              });
            }
            asyncfunctions.push(func);
          }
          var j = 0;
          for(j = 0; j < addtags.length; j++) {
            var func = function(cb) {
              var trips = [trip._id];
              var tag = new Tag({text: addtags[j], trips: trips});
              tag.save(function(err, tag) {
                Trip.update({_id: trip._id}, {$push: { tags: tag._id}}, function(err) {
                  j++;
                  cb();
                });
              });
            }
            asyncfunctions.push(func);
          }
          i = 0;
          j = 0;
          async.series(asyncfunctions, function(err) {
            return res.send(trip._id, 200);
          });
        });
      });
    });
  }
  else {
    res.send('need to be logged in', 400);
  }
}


