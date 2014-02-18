/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 /**
 	* Comment Schema
 	*/
var CommentSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  trip: { type: Schema.ObjectId, ref: 'Trip', required: true },
  date: { type: Date, default: Date.now, required: true }
})

/**
 * Pre-save hook
 */
CommentSchema.pre('save', function(next) {
  next();
});


/**
 * Methods
 */
CommentSchema.methods = {
  
}

/**
 * Create Object
 */
mongoose.model('Comment', CommentSchema)