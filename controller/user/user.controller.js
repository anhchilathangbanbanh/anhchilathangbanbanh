const jwt = require('jsonwebtoken');

const user = require('../../model/user/user.model');
const config = require('../../config');

var exports = {};
exports.register = function(req, res) {
  user.register(req.body.username, req.body.password)
    .then(function(data) {
      res.json({
        status: 1,
        message: 'Success'
      });
    }, function(err) {
      res.json({
        status: 0,
        message: err
      });
    });
}

exports.login = function(req, res) {
  user.login(req.body.username, req.body.password)
    .then(function(data) {
      var userData = {
        _id: data._id,
        username: data.username
      };
      var token = jwt.sign({data: userData}, config.SECRET_KEY, {expiresIn : '30d'});

      res.json({
        status: 1,
        message: 'Success',
        login_token: token
      });
    }, function(err) {
      res.json({
        status: 0,
        message: err.message
      });
    });
}

module.exports = exports;
