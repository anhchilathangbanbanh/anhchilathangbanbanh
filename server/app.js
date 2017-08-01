const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multiparty = require('multiparty');
const mongoose = require('mongoose');

const config = require('../config.json');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*==================================
    SET VIEW ENGINE
==================================*/
app.set('views', '../client/view');
app.use('/public', express.static('../client/public'));
app.set('view engine', 'ejs');

/*===================================
    CONNECT TO DB
===================================*/
// if (process.env.NODE_ENV == 'production') {
    mongoose.connect('mongodb://anhchilathangbanbanh:123456@ds111123.mlab.com:11123/anhchilathangbanbanh', function(err) {
        if (err) {
            console.log('abc');
            console.log('MongoDB connection error: ' + err);
            process.exit(1);
        }
    });
// }else {
//     mongoose.connect(config.DB_URL, function(err) {
//         if (err) {
//
//             console.log('MongoDB connection error: ' + err);
//             process.exit(1);
//         }
//     });
// }

app.get('/', function(req, res) {
    res.render('./pages/index');
});

/*=============================
    ROUTERS
=============================*/
app.use('/api/cake-category', require('./controller/cake-category/index.js'));
app.use('/api/cake', require('./controller/cake/index.js'));
app.use('/api/upload', require('./controller/upload/index.js'));

/*===================================
    SET PORT
===================================*/
app.set('port', (process.env.PORT || config.PORT));
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
})
