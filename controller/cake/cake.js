const fs = require('fs');
const multiparty = require('multiparty');
const bodyParser = require('body-parser');

const cake = require('../../model/cake/cake.js');

var exports = {};
exports.getListCake = function(req, res) {
    cake.getListCake()
        .then(function(result) {
            res.json({
                stautus: 1,
                message: 'Success',
                data: result
            });
        }, function(err) {
            res.json({
                status: 0,
                message: err
            });
        });
};

var uploadImg = function(req, res, next) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var image = files.images[0];
        console.log(image);
        fs.readFile(image.path, function(err, data) {
            if (err) {
                res.send('Error1: ' + err);
            }else {
                var path = './images/' + image.originalFilename;
                fs.writeFile(path, data, function(err) {
                    if (err) {
                        res.send('Error2: ' + err);
                    }else {
                        next();
                    }
                });
            }
        });
    });
}

exports.createNewCake = function(req, res) {
    cake.createNewCake(req.body)
        .then(function(result) {
            res.json({ status: 1, message: result });
        }, function(err) {
            res.json({ status: 0, message: err });
        });
};

exports.checkRequiredFields = function(req, res, next) {
    if (!req.body.product_code) {
        res.json({ status: 0, message: 'Product code is required' });
    }else if (!req.body.name) {
        res.json({ status: 0, message: 'Name is required' });
    }else if (!req.body._category) {
        res.json({ status: 0, message: 'Category is required' });
    }else if (!req.body.price) {
        res.json({ status: 0, message: 'Price is required' });
    }else if (!req.body.qualtity) {
        res.json({ status: 0, message: 'Qualtity is required' });
    }else if (!req.body.img_path) {
        res.json({ status: 0, message: 'Image is required' });
    }else {
        next();
    }
}

exports.checkDuplicateFields = function(req, res, next) {
    cake.getOneCake(req.body.product_code)
        .then(function(result) {
            if (result) {
                res.json({ status: 0, message: 'Product code is already existed' });
            }else {
                cake.getOneCake(req.body.name)
                    .then(function(result) {
                        if (result) {
                            res.json({ status: 0, message: 'Name of cake is already existed' });
                        }else {
                            cake.getOneCake(req.body.img_path)
                                .then(function(result) {
                                    if (result) {
                                        res.send({ status: 0, message: 'Image file name is already existed' });
                                    }else {
                                        next();
                                    }
                                }, function(err) {
                                    next(err);
                                });
                        }
                    }, function(err) {
                        next(err);
                    });
            }
        }, function(err) {
            next(err);
        });
}


module.exports = exports;
