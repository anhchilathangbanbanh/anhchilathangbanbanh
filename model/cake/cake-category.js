const mongoose = require('mongoose');
const q = require('q');

var Schema = mongoose.Schema;
cakeCategorySchema = new Schema({
    category_id: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true
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
var cakeCategory = mongoose.model('cakeCategory', cakeCategorySchema);

var exports = {};
exports.getListCakeCategory = function() {
    var queryStr = {
        status: 1
    };
    var deferred = q.defer();
    cakeCategory.find(queryStr, function(err, data) {
        if (err) {
            deferred.reject(err);
        }else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

module.exports = exports;
