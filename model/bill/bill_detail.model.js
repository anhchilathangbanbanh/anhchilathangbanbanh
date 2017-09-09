const mongoose = require('mongoose');
const q = require('q');

const cake = require('../cake/cake.model');
const bill = require('./bill.model');

var Schema = mongoose.Schema;
var billDetailSchema = mongoose.Schema({
    _bill: {
        type: Schema.Types.ObjectId,
        ref: 'bill',
        required: true
    },
    _cake: {
        type: Schema.Types.ObjectId,
        ref: 'cake',
        required: true
    },
    qualtity_purchase: {
        type: Number,
        required: true
    },
    amount: {
        type: Number
    },
    status: {
        type: Number,
        default: 1
    }
});

billDetailSchema.pre('save', function(next) {
    var self = this;

    cake.getCakeById(self._cake)
        .then(function(data) {
            if (!data) {
                next(new Error('Don\'t have this cake'));
            }else {
                // check if amount of purchase greater then current number of this cake
                if (self.quantity_purchase > data.quantity) {
                    next(new Error('Don\'t have enough cake'));
                }else {
                    // update current number of this cake
                    data[0].qualtity -= self.qualtity_purchase;
                    data[0].save(function(err) {
                        if (err) {
                            next(new Error(err));
                        }else {
                            next();
                        }
                    });
                    // then calculate price of order
                    self.amount = self.qualtity_purchase * data[0].price;
                }
            }
        }, function(err) {
            next(new Error(err));
        });
});

var bill_detail = mongoose.model('bill_detail', billDetailSchema);

var exports = {};
exports.getTopSelling = function(startDate, endDate) {
    var deferred = q.defer();
    bill_detail.aggregate([
        {
            // group by cake to countculate number of cake was sold
            $group: {
                _id: '$_cake',
                total: { $sum: '$qualtity_purchase'}
            }
        },
        { $sort: { total: -1 } },
        { $limit: 5 }
    ], function(err, data) {
        if (err) {
            deferred.reject(err);
        }else {
            var topSellingCake = [];
            data.forEach(function(v, i) {
                topSellingCake.push(v._id);
            });
            cake.getCakeById(topSellingCake).then(function(result) {
                deferred.resolve(result);
            }, function(err) {
                deferred.reject(err);
            });
        }
    });
    return deferred.promise;
}

exports.getAllCakeInBill = function() {
    var deferred = q.defer();

    bill_detail.aggregate([
        {
            $group: {
                _id: '$_bill',
                cake: { $push: '$_cake'}
            }
        }
    ], function(err, result) {
        if (err) {
            deferred.reject(err);
        }else {
            var cakes = [];
            result.forEach(function(bill) {
                bill.cake.forEach(function(cake) {
                    cakes.push(cake);
                });
            });

            cake.getCakeById(cakes).then(function(data) {
                deferred.resolve(data);
            }, function(err) {
                deferred.reject(err);
            });
        }
    });

    return deferred.promise;
}

exports.createNewBillDetail = function(orderInfo) {
    var newOrder = new bill_detail(orderInfo);
    var deferred = q.defer();
    newOrder.save(function(err, billDetail) {
        if (err) {
            deferred.reject(err.message);
        }else {

            var billInfo._detail_purchase.push({
                ordered_cake: billDetail._id,
                total_of_each_cake: billDetail.amount
            });
            // then update bill info
            billDetail.save(function(err, data) {
                if (err) {
                    deferred.reject(err);
                }else {
                    console.log('Run before?');
                    deferred.resolve(data);
                }
            });
        }
    });
    return deferred.promise;
}

module.exports = exports;
