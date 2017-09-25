const jwt = require('jsonwebtoken');

const config = require('../../config');

var exports = {};
exports.authentication = function(req, res, next) {
  jwt.verify(req.body.token, config.SECRET_KEY, function(err, decoded) {
    if (err) {
      res.json({ status: 0, message: err.message });
    }else {
      req.user = decoded.data;
      next();
    }
  });
}

module.exports = exports;
