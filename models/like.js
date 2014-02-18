/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Like Schema
 */
var LikeSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'User' },
	trip: { type: Schema.ObjectId, ref: 'Trip'},
	date: { type: Date, default: Date.now },
});


/**
 * Validations
 */


/**
 * Pre-save hook
 */
LikeSchema.pre('save', function(next) {

  next();
});


/**
 * Methods
 */
LikeSchema.methods = {

}

/**
 * Create Object
 */
mongoose.model('Like', LikeSchema);
