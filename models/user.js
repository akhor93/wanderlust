/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 /**
 	* User Schema
 	*/
var UserSchema = mongoose.Schema({
	name: { type: String, default: '' },
	email: { type: String, default: '' }
})

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })

/**
 * Validations
 */
 UserSchema.path('name').required(true, 'Name cannot be blank');
 UserSchema.path('email').required(true, 'Email cannot be blank');

/**
 * Methods
 */
UserSchema.methods = {
	authenticate: function (plainText) {
	  return this.encryptPassword(plainText) === this.hashed_password
	},
	makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },
  encryptPassword: function (password) {
    if (!password) return ''
    var encrypred
    try {
      encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
      return encrypred
    } catch (err) {
      return ''
    }
  },
	test: function() {
		console.log('test called by: ' + this.name);
	}
	
}
/**
 * Create Object
 */
mongoose.model('User', UserSchema)

/**
 * Exports
 */
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
}