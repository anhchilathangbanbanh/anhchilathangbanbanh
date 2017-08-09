const billDetail = require('../../model/bill/bill_detail.model');

var exports = {};

exports.getTopSelling = function(req, res) {
    billDetail.getTopSelling()
        .then(function(result) {
            res.json(result);
        }, function(err) {
            res.json(err);
        });
}

exports.createNewBillDetail = function(req, res) {
    billDetail.createNewBillDetail(req.body)
        .then(function(result) {
            res.json(result);
        }, function(err) {
            res.json(err);
        });
}

module.exports = exports;
