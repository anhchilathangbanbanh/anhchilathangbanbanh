const express = require('express');

const controller = require('./bill_detail.controller');

var router = express.Router();
router.route('/get-top-selling')
    .get(controller.getTopSelling);
router.route('/create-new-bill-detail')
    .post(controller.createNewBillDetail);

module.exports = router;
