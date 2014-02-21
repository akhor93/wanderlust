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
  location: { type: String, required: true },
  description: { type: String },
  image_large: { type: String, default: '/images/300x180tripfiller.jpg'},
  image_small: [{ type: String }],
  likes: [{ type: Schema.ObjectId, ref: 'Like' }],
  favorites: [{ type: Schema.ObjectId, ref: 'Favorite' }],
  tags: [{ type: Schema.ObjectId, ref: 'Tag' }],
  comments: [{ type: Schema.ObjectId, ref: 'Comment' }],
  created_at: { type: Date },
  updated_at: { type: Date }
})

/**
 * Pre-save hook
 */
TripSchema.pre('save', function(next) {
  this.updated_at = new Date;
  if ( !this.created_at ) {
    this.created_at = new Date;
  }
  next();
});

/**
 * Pre-update hook
 */
TripSchema.pre('update', function(next) {
  console.log("UPDATEd");
  this.updated_at = new Date;
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


