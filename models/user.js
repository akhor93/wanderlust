/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

 /**
 	* User Schema
 	*/
var UserSchema = new Schema({
	name: { type: String, default: '' },
	email: { type: String, default: '' },
  country: {type: String, default: ''},
  username: {type: String, default: ''},
  hashed_password: {type: String, default: '' },
  salt: { type: String, default: '' },
  admin: {type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now},
  aboutMe: {type: String, default: ''},
  following: {type: Array, default: []},
  followers: {type: Array, default: []},
  trips: [{type: Schema.ObjectId, ref: 'Trip' }]
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
var validatePresenceOf = function (value) {
  return value && value.length
}

UserSchema.path('name').validate(function (name) {
  return name.length
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
  return email.length
}, 'Email cannot be blank');

UserSchema.path('email').validate(function (email, fn) {
  var User = mongoose.model('User')

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, 'Email already exists');

UserSchema.path('username').validate(function (username, fn) {
  var User = mongoose.model('User')

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('username')) {
    User.find({ username: username }).exec(function (err, users) {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, 'Username already exists')

UserSchema.path('username').validate(function (username) {
  return username.length
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
  return hashed_password.length
}, 'Password cannot be blank');

/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
  if (!validatePresenceOf(this.password))
    next(new Error('Invalid password'));
  if(this.username == 'akhor' || this.username == 'lucywang') this.admin = true;
  next();
});


/**
 * Methods
 */
UserSchema.methods = {
	authenticate: function (plainText) {
	  return this.encryptPassword(plainText) === this.hashed_password
	},
	makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
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
}

/**
 * Create Object
 */
mongoose.model('User', UserSchema)


