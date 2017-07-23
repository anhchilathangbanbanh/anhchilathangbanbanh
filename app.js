const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multiparty = require('multiparty');
const mongoose = require('mongoose');

const cakeCategory = require('./controller/cake/cake.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname + '/view');
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine', 'ejs');

<<<<<<< HEAD
mongoose.connect('mongodb://localhost/anhchilathangbanbanh', function(err) {
    if (err) {
        console.log('MongoDB connection error: ' + err);
        // return reject(err);
        process.exit(1);
    }
=======
app.get('/', function(req, res) {
    res.render('pages/index');
>>>>>>> ce904048a150423937d3eaeda3af009e185993ac
});

app.use(cakeCategory);

// app.get('/', function(req, res) {
//     res.render('index');
// });

// app.post('/upload', function(req, res) {
//     var form = new multiparty.Form();
//     form.parse(req, function(err, fields, files) {
//        var audio = files.audio[0];
//        fs.readFile(audio.path, 'utf8', function(err, data) {
//            if (err) {
//               console.log('Error1: ' + err);
//           }else {
//              var path = './public/audio/' + audio.originalFilename;
//              fs.writeFile(path, data, function(err) {
//                 if (err) {
//                     console.log('Error2: ' + err);
//                 }else {
//                     res.send('Success');
//                 }
//              });
//           }
//        })
//     });
// });

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
})
