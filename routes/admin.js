//Utils
var async = require("async");

//Models
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');
var Comment = mongoose.model('Comment');
var Tag = mongoose.model("Tag");
var Like = mongoose.model('Like');
var Favorite = mongoose.model('Favorite');
var Tag = mongoose.model('Tag');

var trips = require('../data.json');

exports.dashboard = function(req, res) {
	res.render('admin/dashboard');
}

exports.print = function(req, res){
	// if(req.session.user) {
	// 	if(req.session.user.admin) {
			User.find({}, function (err, users) {
				if(err) console.log(err);
				else {
					res.render('admin/print', { users: users});
				}
			});
	// 	}
	// }
	// else {
	// 	res.redirect('/');
	// }
};

exports.print_trips = function(req, res) {
  Trip.find({})
  .populate('user tags comments likes favorites')
  .exec(function(err, trips) {
    if(err) {
      console.log(err);
      res.redirect('/');
    }
    console.log(trips);
    alltrips = {};
    alltrips.trips = trips;
    res.render('admin/print_trips', alltrips);
  });
}

exports.reset = function(req, res){
	// if(req.session.user) {
	// 	if(req.session.user.admin) {
      async.parallel([
        function(cb) {
          User.remove({}, function (err) {
            if(err) console.log(err);
            else cb();
          });
        },
        function(cb) {
          Trip.remove({}, function (err) {
            if(err) console.log(err);
            else cb();
          });
        },
        function(cb) {
          Comment.remove({}, function (err) {
            if(err) console.log(err);
            else cb();
          });
        },
        function(cb) {
          Like.remove({}, function (err) {
            if(err) console.log(err);
            else cb();
          });
        },
        function(cb) {
          Favorite.remove({}, function (err) {
            if(err) console.log(err);
            else cb();
          });
        },
        function(cb) {
          Tag.remove({}, function (err) {
            if(err) console.log(err);
            else cb();
          });
        },
      ], function(err) {
        initialize();
        //Log out
        res.clearCookie('user');
        res.clearCookie('pass');
        req.session.destroy(function(e) {});
        console.log("End of Initialization");
        res.redirect('/');
      });
	// 	}
 //    else res.redirect('/');
	// }
 //  else {
 //    res.redirect('/');
 //  }
};

function initialize() {
  var andrew;
  var lucy;
  async.parallel([
    function(cb) {
      andrew = new User({
        name      : 'Andrew Khor',
        email     : 'akhor93@stanford.edu',
        username  : 'akhor',
        password  : 'gloving',
        country   : 'United States',
        profile_image: '/images/andrew.jpg',
        aboutMe: "Vivian's Mitch. I loooove One Direction."
      });
      andrew.save(function(err) {
        if(err) console.log("error initializing andrew: " + err);
        else cb();
      });
    },
    function(cb) {
      lucy = new User({
        name      : 'Lucy Wang',
        email     : 'lucywang@stanford.edu',
        username  : 'lucywang',
        password  : 'password',
        country   : 'United States',
        profile_image: '/images/profpic_venice_square.jpeg',
        aboutMe: "Imperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring."
      });
      lucy.save(function(err) {
        if(err) console.log("error initializing lucy" + err);
        else cb();
      });
    }
  ], function(err) {
    createTrips(lucy, andrew);
  });
}

function createTrips(lucy, andrew) {
  var t1 = new Trip({
    user: lucy._id,
    title: "San Francisco",
    date: "July 9, 2014",
    location: "San Francisco, CA",
    description: "Loved my trip to the Bay!",
    image_large: "/images/goldengate.jpg",
    image_small: ["/images/fishermans-wharf.jpg", "/images/painted_ladies.jpg", "/images/clarion_alley.jpg", "/images/lands_end.jpg"]
  });
  t1.save(function(err, t1) {
    if(err) console.log("error saving trip 1");
    User.update({"_id": lucy._id}, {$push: { trips: t1._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding trip 1 to user lucy: " + err);
      });    
  });
  var t2 = new Trip({
    user: lucy._id,
    title: "Venice",
    date: "June 6, 2013",
    location: "Venice, Italy",
    description: "My summer of art, music, and gelato.", 
    image_large: "/images/venice.jpg",
    image_small: ["/images/venice-gondola.jpg", "/images/venice_piazza.jpg", "/images/venice_flooded.jpg", "/images/venice_rialto-bridge.jpg"]
  });
  t2.save(function(err, t2) {
    if(err) console.log("error saving trip 2");
    User.update({"_id": lucy._id}, {$push: { trips: t2._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding trip 2 to user lucy: " + err);
      });     
  });
  var t3 = new Trip({
    user: lucy._id,
    title: "Greece",
    date: "April 4, 2013",
    location: "Greece",
    description: "Study abroad, Spring 2013 -- couldn't have asked for more.", 
    image_large: "/images/greece_sunset.jpg",
    image_small: ["/images/greece.jpg", "/images/greece_pier.jpeg", "/images/greece_ocean.jpeg", "/images/greece_athens.jpg"]
  });
  t3.save(function(err, t3) {
    if(err) console.log("error saving trip 3");
    User.update({"_id": lucy._id}, {$push: { trips: t3._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding trip 3 to user lucy: " + err);
      });     
  });
  var t4 = new Trip({
    user: andrew._id,
    title: "Tahiti",
    date: "December 15, 2012",
    location: "Tahiti",
    description: "Vacation with the fam.", 
    image_large: "/images/tahiti.jpg",
    image_small: ["/images/tahiti_resort.jpg", "/images/tahiti_swimming.jpg", "/images/tahiti_turtle.jpg", "/images/tahiti_islanders.jpg"]
  });
  t4.save(function(err, t4) {
    if(err) console.log("error saving trip 4");
    User.update({"_id": andrew._id}, {$push: { trips: t4._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding trip 4 to user andrew: " + err);
      });     
  });  
  var t5 = new Trip({
    user: andrew._id,
    title: "Paris",
    date: "June 13, 2012",
    location: "Paris, France",
    description: "Backpacking in France!", 
    image_large: "/images/Paris_Large.jpg",
    image_small: ["/images/paris_arc.jpg", "/images/paris_bridge.jpg", "/images/paris_locks.jpg", "/images/paris_cafe.jpg"]
  });
  t5.save(function(err, t5) {
    if(err) console.log("error saving trip 5");
    User.update({"_id": andrew._id}, {$push: { trips: t5._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding trip 5 to user andrew: " + err);
    });
  });
  var featParis = new Trip({
    user: andrew._id,
    title: "French Adventure",
    date: "July 20, 2013",
    location: "Paris, France",
    description: "There's no European destination quit like Paris, the City of Love.", 
    image_large: "/images/Paris_Small.jpg",
    image_small: ["/images/ParisPic1.jpg", "/images/ParisPic2.jpg", "/images/ParisPic3.jpg", "/images/ParisPic4.jpg"],
    featured: true
  });
  featParis.save(function(err, trip) {
    if(err) console.log("error saving featured Paris");
    User.update({"_id": andrew._id}, {$push: { trips: trip._id } }, {upsert: true})
      .exec(function(err) {});
  }); 
  var featMaldives = new Trip({
    user: andrew._id,
    title: "Maldives",
    date: "June 10, 2011",
    location: "Republic of the Maldives",
    description: "The Maldives is the ultimate tropical destination.", 
    image_large: "/images/Maldives_Small.jpg",
    image_small: ["/images/MaldivesPic1.jpg", "/images/MaldivesPic2.jpg", "/images/MaldivesPic3.jpg", "/images/MaldivesPic4.jpg"],
    featured: true
  });
  featMaldives.save(function(err, trip) {
    if(err) console.log("error saving featured Maldives");
    User.update({"_id": andrew._id}, {$push: { trips: trip._id } }, {upsert: true})
      .exec(function(err) {});
  }); 
  var featTahoe = new Trip({
    user: andrew._id,
    title: "Lake Tahoe",
    date: "December 21, 2012",
    location: "Lake Tahoe, California",
    description: "Come ride the slopes of the finest mountain range on the American West Coast", 
    image_large: "/images/TahoePicCover.jpg",
    image_small: ["/images/TahoePic1.jpg", "/images/TahoePic2.jpg", "/images/TahoePic3.jpg", "/images/TahoePic4.jpg"],
    featured: true
  });
  featTahoe.save(function(err, trip) {
    if(err) console.log("error saving featured Tahoe");
    User.update({"_id": andrew._id}, {$push: { trips: trip._id } }, {upsert: true})
      .exec(function(err) {});
  }); 
  var featEgypt = new Trip({
    user: andrew._id,
    title: "Giza",
    date: "May 1, 2012",
    location: "Giza, Egypt",
    description: "Behold the legendary Egyptian pyramids on the unforgetable journey.", 
    image_large: "/images/Pyramid_Small.jpg",
    image_small: ["/images/EgyptPic1.jpg", "/images/EgyptPic2.jpg", "/images/EgyptPic3.jpg", "/images/EgyptPic4.jpg"],
    featured: true
  });
  featEgypt.save(function(err, trip) {
    if(err) console.log("error saving featured Egypt");
    User.update({"_id": andrew._id}, {$push: { trips: trip._id } }, {upsert: true})
      .exec(function(err) {});
  }); 
  var featRio = new Trip({
    user: andrew._id,
    title: "Rio",
    date: "March, 2012",
    location: "Rio de Janeiro, France",
    description: "The ultimate South American Adventure.", 
    image_large: "/images/Rio_Small.jpg",
    image_small: ["/images/RioPic1.jpg", "/images/RioPic2.jpg", "/images/RioPic3.jpg", "/images/RioPic4.jpg"],
    featured: true
  });
  featRio.save(function(err, trip) {
    if(err) console.log("error saving featured Rio");
    User.update({"_id": andrew._id}, {$push: { trips: trip._id } }, {upsert: true})
      .exec(function(err) {});
  }); 

  var tag1 = new Tag({
    text: "Adventure"
  });
  var tag2 = new Tag({
    text: "Arts"
  });
  var tag3 = new Tag({
    text: "Relaxation"
  });  
  var tag4 = new Tag({
    text: "Paradise"
  });

  tag1.save(function(err, tag1) {
    if(err) console.log("error saving tag 1 - adventure");
    Trip.update({"_id": t1._id}, {$push: { tags: tag1._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding tag 1 to trip");
      });
    Trip.update({"_id": t5}, {$push: { tags: tag1._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding tag 1 to trip");
      });  
    Tag.update({"_id": tag1}, {$push: {trips: t1._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });  
    Tag.update({"_id": tag1}, {$push: {trips: t5._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });        
  });      

  tag2.save(function(err, tag2) {
    if(err) console.log("error saving tag 2 - arts");
    Trip.update({"_id": t1}, {$push: { tags: tag2._id } }, {upsert: true})
      .exec(function(err, t) {
        if(err) console.log("error adding tag 2 to trip");
      });
    Trip.update({"_id": t2}, {$push: { tags: tag2._id } }, {upsert: true})
      .exec(function(err, t) {
        if(err) console.log("error adding tag 2 to trip");
      });
    Trip.update({"_id": t3}, {$push: { tags: tag2._id } }, {upsert: true})
      .exec(function(err, t) {
        if(err) console.log("error adding tag 2 to trip");
      });
    Trip.update({"_id": t5}, {$push: { tags: tag2._id } }, {upsert: true})
      .exec(function(err, t) {
        if(err) console.log("error adding tag 2 to trip");
      });      
    Tag.update({"_id": tag2}, {$push: {trips: t1._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });  
    Tag.update({"_id": tag2}, {$push: {trips: t2._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });  
    Tag.update({"_id": tag2}, {$push: {trips: t3._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });  
    Tag.update({"_id": tag2}, {$push: {trips: t5._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });                      
  });

  tag3.save(function(err, tag3) {
    if(err) console.log("error saving tag 3 - relaxation");
    Trip.update({"_id": t2}, {$push: { tags: tag3._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding tag 3 to trip");
      });
    Trip.update({"_id": t3}, {$push: { tags: tag3._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding tag 3 to trip");
      });  
    Trip.update({"_id": t4}, {$push: { tags: tag3._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding tag 3 to trip");
      }); 
    Trip.update({"_id": t5}, {$push: { tags: tag3._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding tag 3 to trip");
      });      
    Tag.update({"_id": tag3}, {$push: {trips: t2._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });  
    Tag.update({"_id": tag3}, {$push: {trips: t3._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });  
    Tag.update({"_id": tag3}, {$push: {trips: t4._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });  
    Tag.update({"_id": tag3}, {$push: {trips: t5._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });                                    
  });

  tag4.save(function(err, tag4) {
    if(err) console.log("error saving tag 4 - paradise");
    Trip.update({"_id": t3}, {$push: { tags: tag4._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding tag 4 to trip");
      });
    Trip.update({"_id": t4}, {$push: { tags: tag4._id } }, {upsert: true})
      .exec(function(err) {
        if(err) console.log("error adding tag 4 to trip");
      });  
    Tag.update({"_id": tag4}, {$push: {trips: t3._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });  
    Tag.update({"_id": tag4}, {$push: {trips: t4._id}}, {upsert: true})
      .exec(function(err, tag) {
        if(err) console.log("error adding trip to tag");
    });        
  });    
}