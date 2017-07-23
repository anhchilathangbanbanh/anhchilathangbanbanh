const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cakeCategory = require('../../model/cake/cake-category.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    cakeCategory.getListCakeCategory()
        .then(function(result) {
            res.send({
                status: 1,
                message: 'Success',
                data: result
            });
        }, function(err) {
            res.send({ status: 0, message: err});
        });
});

module.exports = app;
