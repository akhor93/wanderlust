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
  text: { type: String, required: true}
})

/**
 * Pre-save hook
 */
TagSchema.pre('save', function(next) {
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