var mongoose = require('mongoose'),
  bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
  user_name: String,
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(e) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e);
      },
      message: '{VALUE} is not a valid email address!'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: function(pwd) {
        return pwd.length >= 6;
      },
      message: 'Password too short!'
    }
  }
});

//bcrypt
userSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(5, function(err, salt) {
      if (err) return next(err);
      //hash it
      bcrypt.hash(user.password, salt, function(err, hash) {
        //store
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
userSchema.methods.authenticate = function(password, callback) {
  //compare password
  bcrypt.compare(password, this.password, function(err, is_match) {
    callback(null, is_match);
  });
};

module.exports = mongoose.model('User', userSchema);
