const mongoose = require('mongoose');
const q = require('q');

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
var bill_detail = mongoose.model('bill_detail', billDetailSchema);

var exports = {};
exports.getTopSelling = function() {
    var deferred = q.defer();
    bill_detail.aggregate([
        // {
        //     $group: {
        //         _id: {
        //             _cake: '$_cake',
        //             amount_of_purchase: '$amount_of_purchase'
        //         },
        //         amount_of_purchase_count: { $sum: '$amount_of_purchase'}
        //     }
        // },
        {
            // group by cake to countculate number of cake was sold
            //
            $group: {
                _id: '$_cake',
                total: { $sum: '$amount_of_purchase'}
            }
        },
        { $sort: { total: -1 } },
        { $limit: 5 }
    ], function(err, data) {
        if (err) {
            deferred.reject(err);
        }else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

module.exports = exports;
