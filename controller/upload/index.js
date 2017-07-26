const express = require('express');

const controller = require('./upload.js');

var router = express.Router();
router.post('/', controller.uploadImg);

module.exports = router;
