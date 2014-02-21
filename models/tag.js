/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 /**
 	* Trip Schema
 	*/
var TagSchema = new Schema({
  trips: [{ type: Schema.ObjectId, ref: 'Trip'}],
  text: { type: String, required: true},
  created_at: { type: Date },
  updated_at: { type: Date }
})

/**
 * Pre-save hook
 */
TagSchema.pre('save', function(next) {
	this.updated_at = new Date;
  if ( !this.created_at ) {
    this.created_at = new Date;
  }
  next();
});

/**
 * Methods
 */
TagSchema.methods = {
  
}

/**
 * Create Object
 */
mongoose.model('Tag', TagSchema)