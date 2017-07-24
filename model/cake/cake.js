const mongoose = require('mongoose');
const q = require('q');

var Schema = mongoose.Schema;
var cakeSchema = new Schema({
    product_code: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    _category: {
        type: Schema.Types.ObjectId,
        ref: 'cakeCategory'
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    qualtity: {
        type: Number,
        required: true
    },
    img_path: {
        type: String,
        required: true,
        unique: true
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
var cake = mongoose.model('cake', cakeSchema);

var exports = {};
exports.getListCake = function() {
    var queryStr = {
        status: 1
    };
    var deferred = q.defer();
    cake.find(queryStr)
        .populate({
            path: '_category',
            select: 'name'
        })
        .exec(function(err, data) {
            if (err) {
                deferred.reject(err);
            }else {
                deferred.resolve(data);
            }
        });
    return deferred.promise;
};

// find by 1 of 3 options: product_code, name, img_path
exports.getOneCake = function(queryStr) {
    var deferred = q.defer();
    var queryCondition = [
        { product_code: queryStr },
        { name: queryStr },
        { img_path: queryStr }
    ];
    cake.findOne({ $or: queryCondition })
        .populate({
            path: '_category',
            select: 'name'
        })
        .exec(function(err, data) {
            if (err) {
                deferred.reject(err);
            }else {
                deferred.resolve(data);
            }
        });
    return deferred.promise;
};

exports.createNewCake = function(cakeInfo) {
    var newCake = new cake(cakeInfo);
    var deferred = q.defer();
    newCake.save(function(err) {
        if (err) {
            deferred.reject(err);
        }else {
            deferred.resolve('Success');
        }
    });
    return deferred.promise;
};

module.exports = exports;
