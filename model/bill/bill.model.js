const mongoose = require('mongoose');
const q = require('q');

const cake = require('../cake/cake.model');
// const bill_detail = require('./bill_detail.model');

var Schema = mongoose.Schema;
var billSchema = new Schema({
    customer: {
        type: String
    },
    _detail_purchase: {
        type: [{
            ordered_cake: {
                type: Schema.Types.ObjectId,
                ref: 'cake'
            },
            qualtity_purchase: Number
        }],
        required: true
    },
    total_amount: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
var bill = mongoose.model('bill', billSchema);

var exports = {};
exports.getListBill = function() {
    var queryStr = {
        status: 1
    };
    var deferred = q.defer();
    bill.find(queryStr)
        .exec(function(err, data) {
            if (err) {
                deferred.reject(err.message);
            }else {
                deferred.resolve(data);
            }
        });
    return deferred.promise;
};

exports.createNewBill = function(orderInfo) {
    var newOrder = new bill(orderInfo);
    var deferred = q.defer();
    newOrder.save(function(err, data) {
        if (err) {
            deferred.reject(err.message);
        }else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

module.exports = exports;
