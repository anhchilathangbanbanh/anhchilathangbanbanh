const bill = require('../../model/bill/bill_detail.model');

var exports = {};

exports.getTopSelling = function(req, res) {
    bill.getTopSelling()
        .then(function(result) {
            res.send(result);
        }, function(err) {
            res.send(err);
        });
}

module.exports = exports;
