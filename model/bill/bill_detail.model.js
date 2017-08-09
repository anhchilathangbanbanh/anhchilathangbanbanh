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
    amount_of_purchase: {
        type: Number,
        required: true
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
                if (self.amount_of_purchase > data.quantity) {
                    next(new Error('Don\'t have enough cake'));
                }else {
                    // update current number of this cake
                    data.quantity -= self.amount_of_purchase;
                    data.save(function(err) {
                        if (err) {
                            next(new Error(err));
                        }else {
                            next();
                        }
                    });
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
                total: { $sum: '$amount_of_purchase'}
            }
        },
        { $sort: { total: -1 } },
        { $limit: 5 }
    ], function(err, data) {
        if (err) {
            deferred.reject({status: 0, message: err });
        }else {
            deferred.resolve({status: 1, message: data});
        }
    });
    return deferred.promise;
}

exports.createNewBillDetail = function(orderInfo) {
    var newOrder = new bill_detail(orderInfo);
    var deferred = q.defer();
    newOrder.save(function(err, billDetail) {
        if (err) {
            deferred.reject({ status: 0, message: err.message });
        }else {
            // push this bill detail to _detail_purchase field in bill collection
            bill.getBillById(billDetail._bill)
                .then(function(bill) {
                    if (!bill) {
                        deferred.reject({ status: 0, message: 'This bill not existed' });
                    }else {
                        bill._detail_purchase.push(billDetail._id);
                        // update order in this bill
                        bill.save(function(err) {
                            if (err) {
                                deferred.reject({ status: 0, message: err });
                            }else {
                                deferred.resolve({ status: 1, message: 'Order succesfully' })
                            }
                        });
                    }
                }, function(err) {
                    deferred.reject({ status: 0, message: err });
                });
        }
    });
    return deferred.promise;
}

module.exports = exports;
