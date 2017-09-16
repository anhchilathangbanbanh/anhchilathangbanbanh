const bill = require('../../model/bill/bill.model');
const billDetail = require('../../model/bill/bill_detail.model');

var exports = {};

exports.getListBill = function(req, res) {
    bill.getListBill()
        .then(function(result) {
            res.json({status: 1, message: 'Success', data: result});
        }, function(err) {
            res.json({status: 0, message: err});
        });
}

exports.createNewBill = function(req, res) {
    bill.createNewBill(req.body)
        .then(function(bill) {
            req.body.billDetail.forEach(function(cake, index) {
                var billDetailData = {
                    _bill: bill._id,
                    _cake: cake.id,
                    qualtity_purchase: cake.qualtityPurchase
                };

                billDetail.createNewBillDetail(billDetailData)
                    .then(function(result) {
                        if (index == req.body.billDetail.length - 1) {
                            res.json({ status: 1, message: 'Success' });
                        }
                    }, function(err) {
                        res.json({status: 0, message: err});
                    });
            });
        }, function(err) {
            res.json({status: 0, message: err});
        });
}

module.exports = exports;
