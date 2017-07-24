const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cakeCategory = require('../../model/cake/cake-category.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/cake/get-list-cake-category', function(req, res) {
    cakeCategory.getListCakeCategory()
        .then(function(result) {
            if (result.length == 0) {
                res.send({
                    status: 2,
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
});

module.exports = app;
