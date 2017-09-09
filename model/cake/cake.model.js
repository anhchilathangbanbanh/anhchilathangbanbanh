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
        ref: 'cake_category'
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
                deferred.reject(err.message);
            }else {
                deferred.resolve(data);
            }
        });
    return deferred.promise;
};

exports.getCakeById = function(id) {
    var deferred = q.defer();
    var queryCondition = {
        _id: { $in: id },
        status: 1
    }
    cake.find(queryCondition)
        .exec(function(err, data) {
            if (data) {
                deferred.resolve(data);
            }else {
                deferred.reject(err.message);
            }
        });
    return deferred.promise;
}

exports.getCakeByCategory = function(cakeCategory) {
    var queryStr = {
        status: 1,
        _category: cakeCategory
    };
    var deferred = q.defer();
    cake.find(queryStr)
        // .limit(numberOfDataDisplay)
        // .skip(page * numberOfDataDisplay)
        .populate({
            path: '_category',
            select: 'name'
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

// find by 1 of 4 options: _id, product_code, name, img_path
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
                deferred.reject(err.message);
            }else {
                deferred.resolve(data);
            }
        });
    return deferred.promise;
};

exports.findCakeWithExceptionalCondition = function(queryStr, exception) {
    var deferred = q.defer();
    var queryCondition = [
        { product_code: queryStr },
        { name: queryStr },
        { img_path: queryStr }
    ];
    var exceptionalCondition = { _id: { $ne: exception } };
    cake.find({ $and: [
        { $or: queryCondition },
        exceptionalCondition
    ]})
        .exec(function(err, data) {
            if (err) {
                deferred.reject(err.message);
            }else {
                deferred.resolve(data);
            }
        });
    return deferred.promise;
}

exports.createNewCake = function(cakeInfo) {
    var newCake = new cake(cakeInfo);
    var deferred = q.defer();
    newCake.save(function(err) {
        if (err) {
            deferred.reject(err.message);
        }else {
            deferred.resolve('Success');
        }
    });
    return deferred.promise;
};

exports.updateCakeInfo = function(cakeId, cakeUpdatedInfo) {
    var queryStr = {
        _id: cakeId,
        status: 1
    };
    var deferred = q.defer();
    cake.findOneAndUpdate(queryStr, { $set: cakeUpdatedInfo }, function(err) {
        if (err) {
            deferred.reject(err.message);
        }else {
            deferred.resolve('Success');
        }
    });
    return deferred.promise;
};

exports.deleteCake = function(cakeId) {
    var queryStr = {
        _id: cakeId,
        status: 1
    };
    var deferred = q.defer();
    cake.findOneAndUpdate(queryStr, { $set: { status: 0 } }, function(err, data) {
        if (err) {
            deferred.reject({ status: 0, message: err.message});
        }else if (data) {
            deferred.resolve({ status: 1, message: 'Success' });
        }else if (!data) {
            deferred.reject({ status: 0, message: 'Not found'});
        }
    });
    return deferred.promise;
};

module.exports = exports;
