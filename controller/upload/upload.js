const multiparty = require('multiparty');
const fs = require('fs');

exports.uploadImg = function(req, res, next) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var image = files.images[0];
        fs.readFile(image.path, function(err, data) {
            if (err) {
                res.send({ status: 0, message: err });
            }else {
                // filename = originalFilename + timestamps + extention
                var filename = image.originalFilename.slice(0, image.originalFilename.indexOf('.')) + '_' + Date.now() +
                                image.originalFilename.slice(image.originalFilename.indexOf('.'), image.originalFilename.length);
                var path = './assets/' + filename;
                fs.writeFile(path, data, function(err) {
                    if (err) {
                        res.send({ status: 0, message: err });
                    }else {
                        res.send({
                            status: 1,
                            message: 'Success',
                            data: path
                        });
                    }
                });
            }
        });
    });
}

module.exports = exports;
