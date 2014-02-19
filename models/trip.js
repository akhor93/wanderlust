/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 /**
 	* Trip Schema
 	*/
var TripSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  location: { type: String, required: true },
  description: { type: String},
  image_large: { type: String},
  image_small: [{ type: String}],
  likes: [{ type: Schema.ObjectId, ref: 'Like' }],
  favorites: [{ type: Schema.ObjectId, ref: 'Favorite' }],
  tags: [{ type: Schema.ObjectId, ref: 'Tag'}],
  comments: [{ type: Schema.ObjectId, ref: 'Comment'}]
})

/**
 * Pre-save hook
 */
TripSchema.pre('save', function(next) {
  next();
});


/**
 * Methods
 */
TripSchema.methods = {
  counts: function () {
    this.num_likes = this.likes.length;
    this.num_favorites = this.favorites.length;
    this.num_tags = this.tags.length;
    this.num_comments = this.comments.length;
  },

}

/**
 * Create Object
 */
mongoose.model('Trip', TripSchema)


