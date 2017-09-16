const billDetail = require('../../model/bill/bill_detail.model');

var exports = {};

exports.getTopSelling = function(req, res) {
    billDetail.getTopSelling()
        .then(function(result) {
            res.json({status: 1, message: 'Success', data: result});
        }, function(err) {
            res.json({status: 0, message: err});
        });
}

module.exports = exports;
