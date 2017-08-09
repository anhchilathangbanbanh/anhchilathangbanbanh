const express = require('express');

const controller = require('./upload');

var router = express.Router();
router.route('/')
    .post(controller.uploadImg);

module.exports = router;
