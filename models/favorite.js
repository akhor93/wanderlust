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
	created_at: { type: Date },
  updated_at: { type: Date }
});

/**
 * Pre-save hook
 */
FavoriteSchema.pre('save', function(next) {
	this.updated_at = new Date;
  if ( !this.created_at ) {
    this.created_at = new Date;
  }
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
