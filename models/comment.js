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
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() }
})

/**
 * Pre-save hook
 */
CommentSchema.pre('save', function(next) {
  this.updated_at = new Date;
  if ( !this.created_at ) {
    this.created_at = new Date;
  }
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