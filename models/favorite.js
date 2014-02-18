/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Favorite Schema
 */
var FavoriteSchema = new Schema({
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
FavoriteSchema.pre('save', function(next) {

  next();
});


/**
 * Methods
 */
FavoriteSchema.methods = {

}

/**
 * Create Object
 */
mongoose.model('Favorite', FavoriteSchema);
