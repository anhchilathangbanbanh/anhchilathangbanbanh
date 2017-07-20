var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var multiparty = require('multiparty');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/upload', function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
       var audio = files.audio[0];
       fs.readFile(audio.path, 'utf8', function(err, data) {
           if (err) {
              console.log('Error1: ' + err);
          }else {
             var path = './public/audio/' + audio.originalFilename;
             fs.writeFile(path, data, function(err) {
                if (err) {
                    console.log('Error2: ' + err);
                }else {
                    res.send('Success');
                }
             });
          }
       })
    });
});

app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
})
