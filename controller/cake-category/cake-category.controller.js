const bodyParser = require('body-parser');

const cakeCategory = require('../../model/cake/cake-category.model');

var exports = {};
exports.getListCakeCategory = function(req, res) {
    cakeCategory.getListCakeCategory()
        .then(function(result) {
            if (result.length == 0) {
                res.send({
                    status: 1,
                    message: 'There was no any data'
                });
            }else if (result.length > 0) {
                res.send({
                    status: 1,
                    message: 'Success',
                    data: result
                });
            }
        }, function(err) {
            res.send({ status: 0, message: err});
        });
};

module.exports = exports;
