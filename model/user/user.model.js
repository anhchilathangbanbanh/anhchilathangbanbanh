const mongoose = require('mongoose');
const crypto = require('crypto');
const q = require('q');

var Schema = mongoose.Schema;
userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
      type: String,
      default: 'user'
    },
    salt: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.pre('save', function(next) {
  // Handle new/update passwords
  if (!this.isModified('password')) {
    return next();
  }
  var obj = this;
  // Make salt with a callback
  this.makeSalt(function(saltErr, salt) {
    if (saltErr) {
      return next(saltErr);
    }
    obj.salt = salt;
    obj.encryptPassword(obj.password, function(encryptErr, hashedPassword){
      if (encryptErr) {
        return next(encryptErr);
      }
      obj.password = hashedPassword;
      next();
    });
  });
});

userSchema.methods = {
/**
* Authenticate - check if the passwords are the same
*
* @param {String} password
* @param {Function} callback
* @return {Boolean}
* @api public
*/
  authenticate: function(password, callback) {
    if (!callback) {
      return this.password === this.encryptPassword(password);
    }
    this.encryptPassword(password, function(err, pwdGen) {
      if (err) {
        return callback(err);
      }
      if (this.password === pwdGen) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  },
/**
* Make salt
*
* @param {Number} byteSize Optional salt byte size, default to 16
* @param {Function} callback
* @return {String}
* @api public
*/
  makeSalt: function(byteSize, callback) {
    var defaultByteSize = 16;
    if (typeof arguments[0] === 'function') {
        callback = arguments[0];
        byteSize = defaultByteSize;
    }
    else if (typeof arguments[1] === 'function') {
        callback = arguments[1];
      }
      if (!byteSize) {
        byteSize = defaultByteSize;
      }
      if (!callback) {
        return crypto.randomBytes(byteSize).toString('base64');
      }
      return crypto.randomBytes(byteSize, function(err, salt) {
        if (err) {
          callback(err);
        } else {
          callback(null, salt.toString('base64'));
        }
      });
    },
/**
* Encrypt password
*
* @param {String} password
* @param {Function} callback
* @return {String}
* @api public
*/
  encryptPassword: function(password, callback) {
    if (!password || !this.salt) {
      return null;
    }
    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = new Buffer(this.salt, 'base64');
    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                    .toString('base64');
    }
    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, function(err, key){
      if (err) {
        callback(err);
      } else {
        callback(null, key.toString('base64'));
      }
    });
  }
};


var user = mongoose.model('user', userSchema);

var exports = {};
exports.register = function(username, password) {
    newUser = new user({
        username: username,
        password: password
    });

    var deferred = q.defer();
    newUser.save(function(err, data) {
        if (err) {
            deferred.reject(err);
        }else if (data) {
            deferred.resolve(data);
        }
    });

    return deferred.promise;
}

exports.login = function(username, password) {
    var deferred = q.defer();

    user.findOne({ username: username })
        .exec(function(err, data) {
            if (err) {
                deferred.reject(err);
            }else if (data) {
              if (data.authenticate(password)) {
                deferred.resolve(data);
              }else {
                deferred.reject({ message: 'Wrong username or password!' });
              }
            }else if (!data) {
                deferred.reject({ message: 'Wrong username or password!' });
            }
        });

    return deferred.promise;
}

module.exports = exports;
