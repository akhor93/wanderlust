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
  images: [{ type: String }],
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
}

/**
 * Create Object
 */
mongoose.model('Trip', TripSchema)


