const bill = require('../../model/bill/bill.model');

var exports = {};

exports.getListBill = function(req, res) {
    bill.getListBill()
        .then(function(result) {
            res.json({status: 1, data: result});
        }, function(err) {
            res.json({status: 0, message: err});
        });
}

exports.createNewBill = function(req, res) {
    bill.createNewBill(req.body)
        .then(function(result) {
            res.send(result);
        }, function(err) {
            res.send(err);
        });
}

module.exports = exports;
