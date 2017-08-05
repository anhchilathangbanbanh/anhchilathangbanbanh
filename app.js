const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
// const multiparty = require('multiparty');
const mongoose = require('mongoose');

const config = require('../config.js');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ====================================
    SET headers
=====================================*/
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'localhost:3000');

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
app.set('views', '../client/view');
app.use('/public', express.static('../client/public'));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
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
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "application/json"});
  // response.end("Hello World\n");
});

app.set('port', (process.env.PORT || config.PORT));
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
})
