const mongoose = require('mongoose');
const q = require('q');

var Schema = mongoose.Schema;
cake_categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    avatar: [{
        type: String,
        required: true
    }],
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
var cake_category = mongoose.model('cake_category', cake_categorySchema);

var exports = {};
exports.getListCakeCategory = function() {
    var queryStr = {
        status: 1
    };
    var deferred = q.defer();
    cake_category.find(queryStr, function(err, data) {
        if (err) {
            deferred.reject(err);
        }else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

module.exports = exports;
