const express = require('express');

const controller = require('./bill_detail.controller');

var router = express.Router();
router.route('/get-top-selling')
    .get(controller.getTopSelling);

module.exports = router;
