const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const mongoose = require('mongoose');

const config = require('./config');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ====================================
    SET HEADER
=====================================*/
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


/*==================================
    SET VIEW ENGINE
==================================*/
app.use(express.static(path.join(__dirname, './client/view/build')));

/*==================================
    ALLOW ACCESS TO ASSETS FOLDER TO GET IMAGES VIA URL
==================================*/
app.use('/assets', express.static(path.join(__dirname, './assets')));

/*===================================
    CONNECT TO DB
===================================*/
if (process.env.NODE_ENV == 'production') {
    mongoose.connect('mongodb://anhchilathangbanbanh:123456@ds111123.mlab.com:11123/anhchilathangbanbanh', function(err) {
        if (err) {
            console.log('MongoDB connection error: ' + err);
            process.exit(1);
        }
    });
}else {
    mongoose.connect(config.DB_URL, function(err) {
        if (err) {
            console.log('MongoDB connection error: ' + err);
            process.exit(1);
        }else {
            console.log('MongoDB connect success');
        }
    });
}

/*=============================
    ROUTERS
=============================*/
app.use('/api/cake-category', require('./controller/cake-category/index'));
app.use('/api/cake', require('./controller/cake/index'));
app.use('/api/upload', require('./controller/upload/index'));
app.use('/api/bill', require('./controller/bill/index'));
app.use('/api/bill-detail', require('./controller/bill-detail/index'));
app.use('/api/user', require('./controller/user/index'));

/*===================================
    SET PORT
===================================*/

app.set('port', (process.env.PORT || config.PORT));
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
})
