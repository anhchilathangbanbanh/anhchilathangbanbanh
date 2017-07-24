const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multiparty = require('multiparty');
const mongoose = require('mongoose');

const cakeCategory = require('./controller/cake/cake-category.js');
const cake = require('./controller/cake/cake.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/view');
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/anhchilathangbanbanh', function(err) {
    if (err) {
        console.log('MongoDB connection error: ' + err);
        process.exit(1);
    }
});
var router = express.Router();

app.get('/', function(req, res) {
    res.render('pages/index');
});

router.get('/api/cake/get-list-cake', cake.getListCake);
router.post('/api/cake/create-new-cake', cake.checkRequiredFields, cake.checkDuplicateFields, cake.createNewCake);

// app.use(cakeCategory);
app.use(router);

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
})
