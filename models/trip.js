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
  likes: { type: Number, default: 0},
  favorites: { type: Number, default: 0},
  tags: { type: Schema.ObjectId, ref: 'Tag'},
  comments: { type: Schema.ObjectId, ref: 'Comment'}
})

 /**
 * Validations
 */

// var validatePresenceOf = function (value) {
//   return value && value.length
// }

// UserSchema.path('name').validate(function (name) {
//   return name.length
// }, 'Name cannot be blank');

// UserSchema.path('email').validate(function (email) {
//   return email.length
// }, 'Email cannot be blank');

// UserSchema.path('email').validate(function (email, fn) {
//   var User = mongoose.model('User')

//   // Check only when it is a new user or when email field is modified
//   if (this.isNew || this.isModified('email')) {
//     User.find({ email: email }).exec(function (err, users) {
//       fn(!err && users.length === 0)
//     })
//   } else fn(true)
// }, 'Email already exists');

// UserSchema.path('username').validate(function (username, fn) {
//   var User = mongoose.model('User')

//   // Check only when it is a new user or when email field is modified
//   if (this.isNew || this.isModified('username')) {
//     User.find({ username: username }).exec(function (err, users) {
//       fn(!err && users.length === 0)
//     })
//   } else fn(true)
// }, 'Username already exists')

// UserSchema.path('username').validate(function (username) {
//   return username.length
// }, 'Username cannot be blank');

// UserSchema.path('hashed_password').validate(function (hashed_password) {
//   return hashed_password.length
// }, 'Password cannot be blank');

/**
 * Pre-save hook
 */
TripSchema.pre('save', function(next) {
  // if (!validatePresenceOf(this.password))
  //   next(new Error('Invalid password'));
  // if(this.username == 'akhor') this.admin = true;
  next();
});


/**
 * Methods
 */
TripSchema.methods = {
	// authenticate: function (plainText) {
	//   return this.encryptPassword(plainText) === this.hashed_password
	// },
	// makeSalt: function () {
 //    return Math.round((new Date().valueOf() * Math.random())) + '';
 //  },
 //  encryptPassword: function (password) {
 //    if (!password) return ''
 //    var encrypred
 //    try {
 //      encrypred = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
 //      return encrypred
 //    } catch (err) {
 //      return ''
 //    }
 //  }
}

/**
 * Create Object
 */
mongoose.model('Trip', TripSchema)


