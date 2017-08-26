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

exports.createNewBillDetail = function(orderInfo) {
    var newOrder = new bill_detail(orderInfo);
    var deferred = q.defer();
    newOrder.save(function(err, billDetail) {
        if (err) {
            deferred.reject(err.message);
        }else {
            // push this bill detail to _detail_purchase field in bill collection
            bill.getBillById(billDetail._bill)
                .then(function(billInfo) {
                    if (!billInfo) {
                        deferred.reject('This bill not existed');
                    }else {
                        // update order in this bill
                        billInfo._detail_purchase.push({
                            ordered_cake: billDetail._id,
                            total_of_each_cake: billDetail.amount
                        });

                        // calculate total money of bill that match with this bill
                        bill_detail.aggregate([
                            {
                                $match: { _bill: billInfo._id }
                            },
                            {
                                $group: {
                                    _id: '$_bill',
                                    total: { $sum: '$amount'}
                                }
                            }
                        ], function(err, result) {
                            if (err) {
                                deferred.reject(err);
                            }else {
                                billInfo.total = result[0].total;

                                // then update bill info
                                billInfo.save(function(err, data) {
                                    if (err) {
                                        deferred.reject(err);
                                    }else {
                                        console.log('Run before?');
                                        deferred.resolve(data);
                                    }
                                });
                            }
                        });
                    }
                }, function(err) {
                    deferred.reject(err);
                });
        }
    });
    return deferred.promise;
}

module.exports = exports;
