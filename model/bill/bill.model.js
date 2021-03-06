const mongoose = require('mongoose');
const q = require('q');

const cake = require('../cake/cake.model');
// const bill_detail = require('./bill_detail.model');

var Schema = mongoose.Schema;
var billSchema = new Schema({
    customer_name: {
        type: String,
        required: [true, 'Name is required!']
    },
    customer_phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[0-9]+$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },

    },
    customer_address: {
        type: String,
        required: [true, 'Address is required!']
    },
    _detail_purchase: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'bill_detail'
        }]
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
        .populate({
            path: '_detail_purchase',
            select: 'cake_name qualtity_purchase'
        })
        .exec(function(err, data) {
            if (err) {
                deferred.reject(err.message);
            }else {
                deferred.resolve(data);
            }
        });
    return deferred.promise;
};

exports.getBillById = function(id) {
    var queryStr = {
        status: 1,
        _id: id
    };
    var deferred = q.defer();
    bill.findOne(queryStr)
        .populate({
            path: '_detail_purchase._cake',
            select: 'name price quantity'
        })
        .exec(function(err, data) {
            if (err) {
                deferred.reject(err.message);
            }else {
                deferred.resolve(data);
            }
        });
    return deferred.promise;
}

exports.createNewBill = function(orderInfo) {
    var newOrder = new bill(orderInfo);
    var deferred = q.defer();
    newOrder.save(function(err, bill) {
        if (err) {
            deferred.reject(err.message);
        }else {
            deferred.resolve(bill);
        }
    });
    return deferred.promise;
}

module.exports = exports;
